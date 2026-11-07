import {randomUUID} from 'node:crypto';
import {validateRelations,relationsApi} from './relations.mjs';
import {extensions,rebuildSearch,enqueueAlerts} from './extensions.mjs';
import {readFileSync,writeFileSync,mkdirSync,appendFileSync,unlinkSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
import {all,one,run,transaction,audit,revision,notify,defaults,defaultNav} from './db.mjs';
import {assert,HttpError,clean,now,safeUrl,kinds,riskKinds,editRoles,reviewRoles,modRoles,staffRoles,validateRecord,validateInstitution,admissionStatus,calculateFee,eligibility} from './domain.mjs';
import {randomToken,tokenHash,passwordHash,passwordMatches,validPassword,createSession,requireUser,requireRole,rateLimit,publicUser,verifyTotp} from './auth.mjs';
const json=JSON.stringify;
const parsed=r=>r?{...r,data:JSON.parse(r.data),published:r.published?JSON.parse(r.published):null}:null;
const validId=x=>typeof x==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(x);
const published=(db,kind)=>all(db,'SELECT * FROM record WHERE kind=? AND published IS NOT NULL AND deleted_at IS NULL',kind).map(r=>({id:r.id,institution_id:r.institution_id,...JSON.parse(r.published)}));
const setting=db=>({...defaults,...published(db,'settings').find(r=>r.id==='site')});
const notifyOwner=(db,id,body,href)=>{if(id)notify(db,id,body,href);};
const blocked=(db,a,b)=>one(db,'SELECT 1 FROM block WHERE (user_id=? AND blocked_id=?) OR (user_id=? AND blocked_id=?)',a,b,b,a);
function publicInstitution(row){return {...JSON.parse(row.data),version:row.version};}
function getInstitution(db,id){const r=one(db,'SELECT * FROM institution WHERE (id=? OR slug=?) AND deleted_at IS NULL',id,id);assert(r,'Institution not found.',404);return r;}
function publicRecords(db,kind,inst){return published(db,kind).filter(r=>!inst||r.institution_id===inst).map(r=>{
  if(r.expires_at&&Date.parse(r.expires_at)<=Date.now()&&r.verification==='verified')r.verification='expired';
  return kind==='admission'?{...r,status:admissionStatus(r)}:r;
});}
function sessionCookie(ctx,token){ctx.res.setHeader('Set-Cookie',`hebd_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800${ctx.config.cookieSecure?'; Secure':''}`);}
async function deliver(ctx,to,subject,text){
  if(ctx.config.sendMail)return ctx.config.sendMail({to,subject,text});
  if(ctx.config.mailUrl){const response=await fetch(ctx.config.mailUrl,{method:'POST',headers:{'Content-Type':'application/json',...(ctx.config.mailToken?{Authorization:'Bearer '+ctx.config.mailToken}:{})},body:json({to,subject,text}),signal:AbortSignal.timeout(10000)});assert(response.ok,'Email delivery failed. Please try again later.',503);return;}
  assert(ctx.config.devMail,'Email delivery has not been configured by the site operator.',503);
  mkdirSync(ctx.config.dataDir,{recursive:true});appendFileSync(resolve(ctx.config.dataDir,'dev-mail.jsonl'),json({to,subject,text,time:now()})+'\n',{mode:0o600});
}
function needMail(ctx){assert(ctx.config.mailUrl||ctx.config.devMail||ctx.config.sendMail,'Email delivery has not been configured by the site operator.',503);}
function tokenFor(db,user,purpose){const token=randomToken();run(db,'DELETE FROM tokens WHERE user_id=? AND purpose=?',user.id,purpose);run(db,'INSERT INTO tokens VALUES(?,?,?,?)',tokenHash(token),user.id,purpose,Date.now()+3600000);return token;}
function verifyToken(db,token,purpose){const found=one(db,'SELECT * FROM tokens WHERE hash=? AND purpose=? AND expires_at>?',tokenHash(String(token||'')),purpose,Date.now());assert(found,'This link is invalid or expired. Request a new one.');return found;}
function auditRevision(db,user,type,id,version,before,after,reason){revision(db,type,id,version,before,user.id,reason);audit(db,user.id,'update',type,id,before,after,reason);}
export async function api(ctx){
  const {req,res,db,url}=ctx,method=req.method,p=url.pathname,b=ctx.body||{},parts=p.split('/').filter(Boolean);
  const relation=await relationsApi(ctx);if(relation!==undefined)return relation;
  const extension=await extensions(ctx);if(extension!==undefined)return extension;
  const ip=req.socket.remoteAddress||'unknown';rateLimit(db,`api:${ip}`,400,60000);
  if(p==='/api/health'&&method==='GET')return {ok:one(db,'SELECT 1 ok').ok===1,service:'hebd',mail_configured:!!(ctx.config.mailUrl||ctx.config.sendMail),development_mail:!!ctx.config.devMail};
  if(p==='/api/source-discovery'&&method==='GET'){const items=JSON.parse(readFileSync(new URL('../data/official-source-discovery.json',import.meta.url),'utf8'));return {items:items.filter(i=>!url.searchParams.get('institution_id')||i.id===url.searchParams.get('institution_id')),disclosure:'Source discovery is not current-content verification. Consult effective sessions and source notices.'};}
  if(p==='/api/health')return {ok:true,database:one(db,'PRAGMA quick_check').quick_check==='ok'};
  if(p==='/api/session'&&method==='GET')return {user:publicUser(ctx.session),csrf:ctx.session?.csrf,mail_ready:!!(ctx.config.mailUrl||ctx.config.devMail||ctx.config.sendMail)};
  if(p==='/api/bootstrap')return {settings:setting(db),navigation:published(db,'navigation').find(r=>r.id==='nav')||defaultNav,counts:all(db,'SELECT category,count(*) count FROM institution WHERE category IS NOT NULL AND deleted_at IS NULL GROUP BY category'),specialists:one(db,'SELECT count(*) count FROM institution WHERE category IS NULL AND deleted_at IS NULL').count,snapshot_date:'2026-11-06',sources:published(db,'source')};
  if(p==='/api/auth/signup'&&method==='POST'){
    rateLimit(db,`signup:${ip}`,5,3600000);assert(setting(db).registration!==false,'Registration is currently paused.',403);needMail(ctx);
    const email=clean(b.email,250).toLowerCase(),name=clean(b.name,80),handle=clean(b.handle,30).toLowerCase();validPassword(b.password);
    assert(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),'Enter a valid email address.');assert(name.length>=2,'Enter your display name.');assert(/^[a-z0-9_]{3,30}$/.test(handle),'Handle must contain 3–30 lowercase letters, numbers or underscores.');
    assert(!one(db,'SELECT 1 FROM users WHERE email=? OR handle=?',email,handle),'This email or handle is already registered.',409);
    const id=randomUUID();run(db,'INSERT INTO users(id,email,handle,name,password,created_at) VALUES(?,?,?,?,?,?)',id,email,handle,name,passwordHash(b.password),now());
    const token=tokenFor(db,{id},'verify');await deliver(ctx,email,'Verify your HEBD email',`${ctx.config.appUrl}/verify?token=${token}`);return {message:'Account created. Check your email to verify your address before signing in.'};
  }
  if(p==='/api/auth/verify'&&method==='POST'){
    const token=verifyToken(db,b.token,'verify');transaction(db,()=>{run(db,'UPDATE users SET verified=1 WHERE id=?',token.user_id);run(db,'DELETE FROM tokens WHERE hash=?',token.hash);});return {message:'Email verified. You can now sign in.'};
  }
  if(p==='/api/auth/resend'&&method==='POST'){
    rateLimit(db,`mail:${ip}`,4,3600000);needMail(ctx);const user=one(db,'SELECT * FROM users WHERE email=? AND deleted_at IS NULL',clean(b.email,250).toLowerCase());
    if(user&&!user.verified)await deliver(ctx,user.email,'Verify your HEBD email',`${ctx.config.appUrl}/verify?token=${tokenFor(db,user,'verify')}`);return {message:'If an unverified account matches, a new link has been sent.'};
  }
  if(p==='/api/auth/login'&&method==='POST'){
    rateLimit(db,`login:${ip}`,15,900000);const user=one(db,'SELECT * FROM users WHERE email=? AND deleted_at IS NULL',clean(b.email,250).toLowerCase());
    assert(user&&passwordMatches(String(b.password||''),user.password)&&!user.banned,'Email or password is incorrect.',401);assert(user.verified,'Verify your email before signing in.',403);
    let mfa=null;if(staffRoles.includes(user.role)){const step=verifyTotp(user,b.code);assert(step!==null,'A fresh authenticator code is required for staff sign-in.',403);run(db,'UPDATE users SET totp_last=? WHERE id=?',step,user.id);mfa=Date.now();}
    const s=createSession(db,user,mfa);sessionCookie(ctx,s.token);return {user:publicUser(user),csrf:s.csrf};
  }
  if(p==='/api/auth/reauth'&&method==='POST'){
    const u=requireUser(ctx);rateLimit(db,`mfa:${u.id}`,8,900000);const user=one(db,'SELECT * FROM users WHERE id=?',u.id),step=verifyTotp(user,b.code);assert(passwordMatches(String(b.password||''),user.password)&&step!==null,'Password or authenticator code is incorrect.',401);transaction(db,()=>{run(db,'UPDATE users SET totp_last=? WHERE id=?',step,u.id);run(db,'UPDATE sessions SET mfa_at=? WHERE token=?',Date.now(),u.token);});return {ok:true};
  }
  if(p==='/api/auth/logout'&&method==='POST'){if(ctx.session)run(db,'DELETE FROM sessions WHERE token=?',ctx.session.token);res.setHeader('Set-Cookie','hebd_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');return {ok:true};}
  if(p==='/api/auth/forgot'&&method==='POST'){
    rateLimit(db,`mail:${ip}`,4,3600000);needMail(ctx);const user=one(db,'SELECT * FROM users WHERE email=? AND deleted_at IS NULL',clean(b.email,250).toLowerCase());if(user)await deliver(ctx,user.email,'Reset your HEBD password',`${ctx.config.appUrl}/reset?token=${tokenFor(db,user,'reset')}`);return {message:'If an account matches, a password reset link has been sent.'};
  }
  if(p==='/api/auth/reset'&&method==='POST'){
    const token=verifyToken(db,b.token,'reset');validPassword(b.password);transaction(db,()=>{run(db,'UPDATE users SET password=? WHERE id=?',passwordHash(b.password),token.user_id);run(db,'DELETE FROM tokens WHERE hash=?',token.hash);run(db,'DELETE FROM sessions WHERE user_id=?',token.user_id);});return {message:'Password changed and all sessions revoked.'};
  }
  if(p==='/api/institutions'&&method==='GET'){
    const q=clean(url.searchParams.get('q'),150).toLowerCase(),category=url.searchParams.get('category'),kind=url.searchParams.get('kind'),division=url.searchParams.get('division'),field=url.searchParams.get('field'),notice=url.searchParams.get('notice');
    let items=all(db,'SELECT * FROM institution WHERE deleted_at IS NULL').map(publicInstitution).filter(i=>(!q||[i.name_en,i.name_bn,i.slug,i.website_raw,i.name_en.split(/\s+/).filter(x=>!['of','and','&','the'].includes(x.toLowerCase())).map(x=>x[0]).join(''),...(i.aliases||[])].filter(Boolean).join(' ').toLowerCase().includes(q))&&(!category||i.category===category)&&(!kind||i.kind===kind||kind==='textile'&&i.kind.startsWith('textile_')||kind==='medical'&&i.kind==='medical_college'||kind==='dental'&&i.kind.startsWith('dental_'))&&(!division||i.division===division)&&(!field||i.tags?.includes(field))&&(!notice||i.notice_flag));
    const ids=url.searchParams.get('ids');if(ids)items=items.filter(i=>ids.split(',').includes(i.id));
    items.sort((a,b)=>a.name_en.localeCompare(b.name_en));if(url.searchParams.get('sort')==='za')items.reverse();
    const total=items.length,page=Math.max(1,Number(url.searchParams.get('page'))||1),limit=Math.min(250,Math.max(1,Number(url.searchParams.get('limit'))||12));return {items:items.slice((page-1)*limit,page*limit),total,page,pages:Math.ceil(total/limit)};
  }
  if(parts[1]==='institutions'&&parts[2]&&method==='GET'){
    let row=one(db,'SELECT * FROM institution WHERE (id=? OR slug=?) AND deleted_at IS NULL',parts[2],parts[2]);if(!row){const alias=one(db,'SELECT * FROM alias WHERE alias=?',parts[2]);if(alias)row=getInstitution(db,alias.institution_id);}assert(row,'Institution not found.',404);
    const institution=publicInstitution(row),records={};for(const kind of kinds.filter(k=>!['settings','navigation','page','source'].includes(k)))records[kind]=publicRecords(db,kind,row.id);
    const reviews=all(db,`SELECT r.*,u.name,u.handle FROM review r JOIN users u ON r.author_id=u.id WHERE institution_id=? AND r.state='published' AND u.deleted_at IS NULL`,row.id);return {institution,records,reviews,rating:reviews.length>=5?reviews.reduce((s,r)=>s+r.stars,0)/reviews.length:null,review_count:reviews.length};
  }
  if(p==='/api/catalogue'&&method==='GET'){
    const kind=url.searchParams.get('kind');assert(kinds.includes(kind),'Unknown catalogue.');let items=publicRecords(db,kind,url.searchParams.get('institution_id'));
    const q=clean(url.searchParams.get('q'),150).toLowerCase();if(q)items=items.filter(r=>json(r).toLowerCase().includes(q));for(const key of ['level','publisher','product','scope','edition','session','status'])if(url.searchParams.has(key))items=items.filter(r=>String(r[key])===url.searchParams.get(key));
    return {items};
  }
  if(p==='/api/eligibility'&&method==='POST'){const record=publicRecords(db,'admission').find(r=>r.id===b.id);assert(record,'Admission not found.',404);assert(record.verification==='verified'&&!['closed','cancelled','superseded','restricted','not_verified'].includes(record.status),'No current verified eligibility rules are available.');return eligibility(record.rules,b.profile||{});}
  if(p==='/api/fees/calculate'&&method==='POST'){const fee=publicRecords(db,'fee').find(r=>r.id===b.id);assert(fee,'Fee schedule not found.',404);return calculateFee(fee,Number(b.waiver)||0);}
  if(p==='/api/posts'&&method==='GET'){
    const args=[],filters=["p.state='published'","u.deleted_at IS NULL"];if(url.searchParams.get('institution_id')){filters.push('p.institution_id=?');args.push(url.searchParams.get('institution_id'));}if(url.searchParams.get('q')){filters.push('(p.title LIKE ? OR p.body LIKE ?)');args.push('%'+clean(url.searchParams.get('q'),100)+'%','%'+clean(url.searchParams.get('q'),100)+'%');}if(url.searchParams.get('id')){filters.push('p.id=?');args.push(url.searchParams.get('id'));}
    const user=ctx.session?.id||'';filters.push('NOT EXISTS(SELECT 1 FROM block WHERE (user_id=? AND blocked_id=p.author_id) OR (blocked_id=? AND user_id=p.author_id))');args.push(user,user);
    const sort=url.searchParams.get('sort');if(sort==='unanswered')filters.push("p.topic='Question' AND NOT EXISTS(SELECT 1 FROM accepted_answer a WHERE a.post_id=p.id)");if(url.searchParams.get('topic')){filters.push('p.topic=?');args.push(clean(url.searchParams.get('topic'),40));}if(sort==='following'){assert(ctx.session,'Sign in to view followed feeds.',401);filters.push(`EXISTS(SELECT 1 FROM follow f WHERE f.user_id=? AND ((f.target_type='institution' AND f.target_id=p.institution_id) OR (f.target_type='topic' AND f.target_id=p.topic) OR (f.target_type='member' AND f.target_id=p.author_id)))`);args.push(user);}
    const posts=all(db,`SELECT p.*,u.name,u.handle,(SELECT count(*) FROM representative_grant g WHERE g.user_id=p.author_id AND g.institution_id=p.institution_id AND g.revoked_at IS NULL AND g.expires_at>strftime('%Y-%m-%dT%H:%M:%fZ','now')) institution_representative,(SELECT comment_id FROM accepted_answer WHERE post_id=p.id) accepted_id,(SELECT count(*) FROM reaction r WHERE target_type='post' AND target_id=p.id) likes,(SELECT count(*) FROM comment c WHERE post_id=p.id AND c.state='published') comments,(SELECT count(*) FROM reaction r WHERE target_type='post' AND target_id=p.id AND user_id=?) liked FROM post p JOIN users u ON u.id=p.author_id WHERE ${filters.join(' AND ')} ORDER BY ${sort==='relevant'?'likes DESC,':''} p.created_at DESC LIMIT 100`,user,...args);
    return {items:posts};
  }
  if(p==='/api/posts'&&method==='POST'){
    const u=requireUser(ctx);rateLimit(db,`post:${u.id}`,12,86400000);const title=clean(b.title,180),body=clean(b.body,10000);assert(title.length>=3&&body.length>=5,'Add a title and at least five characters of text.');if(b.institution_id)getInstitution(db,b.institution_id);
    const topic=clean(b.topic,40)||'Discussion';assert(['Discussion','Question','Admissions','Scholarships','Campus life','Events'].includes(topic),'Choose a supported topic.');if(b.media_url)assert(one(db,'SELECT 1 FROM media WHERE url=? AND owner_id=? AND deleted_at IS NULL',b.media_url,u.id),'Upload your own media first.');
    const id=randomUUID();run(db,'INSERT INTO post(id,author_id,institution_id,title,body,topic,media_url,created_at) VALUES(?,?,?,?,?,?,?,?)',id,u.id,b.institution_id||null,title,body,topic,b.media_url||null,now());return {id};
  }
  if(parts[1]==='posts'&&parts[2]){
    const post=one(db,'SELECT * FROM post WHERE id=?',parts[2]);assert(post,'Post not found.',404);
    if(parts[3]==='comments'&&method==='GET'){assert(post.state==='published','Post unavailable.',404);return {items:all(db,`SELECT c.*,u.name,u.handle FROM comment c JOIN users u ON u.id=c.author_id WHERE post_id=? AND c.state='published' AND u.deleted_at IS NULL ORDER BY c.created_at`,post.id)};}
    if(parts[3]==='comments'&&method==='POST'){
      const u=requireUser(ctx);assert(post.state==='published'&&!blocked(db,u.id,post.author_id),'Replies are unavailable.',403);rateLimit(db,`comment:${u.id}`,60,86400000);const body=clean(b.body,5000);assert(body.length>=2,'Write a reply.');if(b.parent_id)assert(one(db,'SELECT 1 FROM comment WHERE id=? AND post_id=? AND state=?',b.parent_id,post.id,'published'),'Reply target is unavailable.');
      const id=randomUUID();run(db,'INSERT INTO comment(id,post_id,author_id,parent_id,body,created_at) VALUES(?,?,?,?,?,?)',id,post.id,u.id,b.parent_id||null,body,now());if(post.author_id!==u.id)notifyOwner(db,post.author_id,`${u.name} replied to your post.`,`/community/post/${post.id}`);return {id};
    }
    if(['PATCH','DELETE'].includes(method)&&!parts[3]){
      const u=requireUser(ctx);assert(post.author_id===u.id,'Only the author can edit this post.',403);assert(post.state!=='hidden','This post is under moderation.',403);
      if(method==='DELETE'){run(db,"UPDATE post SET state='deleted' WHERE id=?",post.id);return {ok:true};}
      const title=clean(b.title,180),body=clean(b.body,10000);assert(title.length>=3&&body.length>=5,'Title and post text are required.');transaction(db,()=>{auditRevision(db,u,'post',post.id,1,post,{title,body},'Author edit');run(db,'UPDATE post SET title=?,body=?,edited_at=? WHERE id=?',title,body,now(),post.id);});return {ok:true};
    }
  }
  if(parts[1]==='comments'&&parts[2]&&['PATCH','DELETE'].includes(method)){const u=requireUser(ctx),c=one(db,'SELECT * FROM comment WHERE id=?',parts[2]);assert(c&&c.author_id===u.id,'You cannot change this reply.',403);assert(c.state!=='hidden','This reply is under moderation.',403);if(method==='DELETE')run(db,"UPDATE comment SET state='deleted' WHERE id=?",c.id);else{const body=clean(b.body,5000);assert(body.length>=2,'Write a reply.');run(db,'UPDATE comment SET body=? WHERE id=?',body,c.id);}return {ok:true};}
  if(p==='/api/reactions'&&method==='POST'){
    const u=requireUser(ctx);assert(['post','comment'].includes(b.type),'Invalid reaction target.');assert(one(db,`SELECT 1 FROM ${b.type} WHERE id=? AND state='published'`,b.id),'Content unavailable.',404);
    const has=one(db,'SELECT 1 FROM reaction WHERE user_id=? AND target_type=? AND target_id=?',u.id,b.type,b.id);if(has)run(db,'DELETE FROM reaction WHERE user_id=? AND target_type=? AND target_id=?',u.id,b.type,b.id);else run(db,'INSERT INTO reaction VALUES(?,?,?)',u.id,b.type,b.id);return {liked:!has};
  }
  if(p==='/api/reviews'&&method==='POST'){
    const u=requireUser(ctx);getInstitution(db,b.institution_id);assert(Number.isInteger(b.stars)&&b.stars>=1&&b.stars<=5,'Rating must be 1–5.');assert(['student','alumnus','applicant','guardian','other'].includes(b.relationship),'Select your relationship.');const pros=clean(b.pros,3000),cons=clean(b.cons,3000);assert(pros.length>=5&&cons.length>=5,'Describe both strengths and areas for improvement.');
    const old=one(db,'SELECT * FROM review WHERE author_id=? AND institution_id=?',u.id,b.institution_id);if(old){assert(old.state!=='hidden','Your review is under moderation.',403);transaction(db,()=>{auditRevision(db,u,'review',old.id,1,old,b,'Reviewer edit');run(db,"UPDATE review SET stars=?,relationship=?,pros=?,cons=?,state='published' WHERE id=?",b.stars,b.relationship,pros,cons,old.id);});return {id:old.id};}
    const id=randomUUID();run(db,'INSERT INTO review(id,author_id,institution_id,stars,relationship,pros,cons,created_at) VALUES(?,?,?,?,?,?,?,?)',id,u.id,b.institution_id,b.stars,b.relationship,pros,cons,now());return {id};
  }
  if(parts[1]==='reviews'&&parts[2]&&method==='DELETE'){const u=requireUser(ctx);const result=run(db,"UPDATE review SET state='deleted' WHERE id=? AND author_id=?",parts[2],u.id);assert(result.changes,'Review not found.',404);return {ok:true};}
  if(p==='/api/saved'){
    const u=requireUser(ctx);if(method==='GET')return {items:all(db,'SELECT * FROM bookmark WHERE user_id=? ORDER BY created_at DESC',u.id).map(r=>({...r,institution:r.target_type==='institution'?publicInstitution(getInstitution(db,r.target_id)):undefined,post:r.target_type==='post'?one(db,"SELECT id,title,body FROM post WHERE id=? AND state='published'",r.target_id):undefined}))};
    assert(['institution','post','topic'].includes(b.type)&&validId(b.id),'Invalid bookmark.');if(b.type==='institution')getInstitution(db,b.id);if(b.type==='post')assert(one(db,"SELECT 1 FROM post WHERE id=? AND state='published'",b.id),'Post not found.',404);
    if(method==='DELETE')run(db,'DELETE FROM bookmark WHERE user_id=? AND target_type=? AND target_id=?',u.id,b.type,b.id);else run(db,'INSERT OR IGNORE INTO bookmark VALUES(?,?,?,?)',u.id,b.type,b.id,now());return {ok:true};
  }
  if(p==='/api/reports'&&method==='POST'){
    rateLimit(db,`report:${ctx.session?.id||ip}`,8,3600000);assert(['post','comment','review','user','institution','correction','appeal','representative'].includes(b.type),'Choose a report type.');const body=clean(b.body,4000);assert(body.length>=10,'Please provide at least ten characters of detail.');if(b.source_url)safeUrl(b.source_url);if(['correction','representative'].includes(b.type))assert(b.source_url,'An official evidence URL is required.');
    const id=randomUUID();run(db,'INSERT INTO report(id,author_id,target_type,target_id,body,source_url,created_at) VALUES(?,?,?,?,?,?,?)',id,ctx.session?.id||null,b.type,clean(b.id,100)||null,body,b.source_url||null,now());return {id,message:'Your submission has been saved for review.'};
  }
  if(p==='/api/blocks'){
    const u=requireUser(ctx);if(method==='GET')return {items:all(db,'SELECT b.blocked_id,u.name,u.handle FROM block b JOIN users u ON u.id=b.blocked_id WHERE b.user_id=?',u.id)};
    assert(b.user_id!==u.id&&one(db,'SELECT 1 FROM users WHERE id=? AND deleted_at IS NULL',b.user_id),'User unavailable.');if(method==='DELETE')run(db,'DELETE FROM block WHERE user_id=? AND blocked_id=?',u.id,b.user_id);else run(db,'INSERT OR IGNORE INTO block VALUES(?,?)',u.id,b.user_id);return {ok:true};
  }
  if(p==='/api/users/search'&&method==='GET'){requireUser(ctx);const q=clean(url.searchParams.get('q'),30);assert(q.length>=3,'Type at least three characters.');return {items:all(db,`SELECT id,name,handle FROM users WHERE deleted_at IS NULL AND verified=1 AND banned=0 AND json_extract(privacy,'$.public_profile')=1 AND handle LIKE ? LIMIT 12`,q+'%')};}
  if(p==='/api/conversations'){
    const u=requireUser(ctx);assert(setting(db).messaging!==false,'Messaging is paused.',403);
    if(method==='GET')return {items:all(db,`SELECT c.*,a.name requester_name,b.name recipient_name FROM conversation c JOIN users a ON a.id=c.requester_id JOIN users b ON b.id=c.recipient_id WHERE requester_id=? OR recipient_id=? ORDER BY created_at DESC`,u.id,u.id)};
    rateLimit(db,`dmreq:${u.id}`,8,86400000);assert(b.recipient_id!==u.id&&!blocked(db,u.id,b.recipient_id),'This message request is unavailable.',403);assert(one(db,'SELECT 1 FROM users WHERE id=? AND verified=1 AND banned=0 AND deleted_at IS NULL',b.recipient_id),'User unavailable.',404);
    const existing=one(db,'SELECT * FROM conversation WHERE (requester_id=? AND recipient_id=?) OR (requester_id=? AND recipient_id=?)',u.id,b.recipient_id,b.recipient_id,u.id);if(existing)return {id:existing.id};
    const id=randomUUID();run(db,'INSERT INTO conversation(id,requester_id,recipient_id,created_at) VALUES(?,?,?,?)',id,u.id,b.recipient_id,now());notifyOwner(db,b.recipient_id,`${u.name} sent a message request.`,'/messages');return {id};
  }
  if(parts[1]==='conversations'&&parts[2]){
    const u=requireUser(ctx),c=one(db,'SELECT * FROM conversation WHERE id=?',parts[2]);assert(c&&[c.requester_id,c.recipient_id].includes(u.id),'Conversation not found.',404);assert(!blocked(db,c.requester_id,c.recipient_id),'Messaging is blocked.',403);
    if(method==='PATCH'&&!parts[3]){assert(c.recipient_id===u.id&&c.state==='requested','Only the recipient can decide a pending request.',403);assert(['accepted','declined'].includes(b.state),'Choose accept or decline.');run(db,'UPDATE conversation SET state=? WHERE id=?',b.state,c.id);return {ok:true};}
    if(parts[3]==='messages'){
      assert(c.state==='accepted','Accept the request before exchanging messages.',403);
      if(method==='GET')return {items:all(db,'SELECT * FROM message WHERE conversation_id=? ORDER BY created_at LIMIT 500',c.id)};
      rateLimit(db,`dm:${u.id}`,100,3600000);const body=clean(b.body,4000);assert(body.length,'Write a message.');const id=randomUUID();run(db,'INSERT INTO message VALUES(?,?,?,?,?)',id,c.id,u.id,body,now());return {id};
    }
  }
  if(p==='/api/notifications'){
    const u=requireUser(ctx);if(method==='GET')return {items:all(db,'SELECT * FROM notification WHERE user_id=? ORDER BY created_at DESC LIMIT 100',u.id)};run(db,'UPDATE notification SET read_at=? WHERE user_id=?',now(),u.id);return {ok:true};
  }
  if(p==='/api/account'){
    const u=requireUser(ctx);if(method==='GET')return {user:publicUser(u),privacy:JSON.parse(one(db,'SELECT privacy FROM users WHERE id=?',u.id).privacy),sessions:all(db,'SELECT expires_at,mfa_at FROM sessions WHERE user_id=?',u.id),reports:all(db,'SELECT id,target_type,status,resolution FROM report WHERE author_id=?',u.id)};
    if(method==='PATCH'){const name=clean(b.name,80);assert(name.length>=2,'Display name is required.');run(db,'UPDATE users SET name=?,privacy=? WHERE id=?',name,json({email_alerts:!!b.email_alerts,public_profile:!!b.public_profile}),u.id);return {ok:true};}
    if(method==='DELETE'){
      assert(!staffRoles.includes(u.role),'Staff account deletion requires the operator recovery process.',403);const user=one(db,'SELECT * FROM users WHERE id=?',u.id);assert(passwordMatches(String(b.password||''),user.password),'Confirm your password.',401);
      transaction(db,()=>{run(db,'DELETE FROM sessions WHERE user_id=?',u.id);run(db,'DELETE FROM tokens WHERE user_id=?',u.id);run(db,'DELETE FROM bookmark WHERE user_id=?',u.id);run(db,'DELETE FROM notification WHERE user_id=?',u.id);run(db,'DELETE FROM reaction WHERE user_id=?',u.id);run(db,'DELETE FROM block WHERE user_id=? OR blocked_id=?',u.id,u.id);run(db,"UPDATE users SET email=?,name='Deleted member',handle=?,password='',privacy='{}',totp=NULL,deleted_at=? WHERE id=?",u.id+'@deleted.invalid','deleted_'+u.id,now(),u.id);run(db,"UPDATE post SET state='deleted' WHERE author_id=?",u.id);run(db,"UPDATE comment SET state='deleted' WHERE author_id=?",u.id);run(db,"UPDATE review SET state='deleted' WHERE author_id=?",u.id);run(db,"UPDATE message SET body='[removed by account deletion]' WHERE sender_id=?",u.id);});return {ok:true};
    }
  }
  if(p==='/api/account/export'&&method==='GET'){const u=requireUser(ctx);return {user:publicUser(u),posts:all(db,'SELECT * FROM post WHERE author_id=?',u.id),comments:all(db,'SELECT * FROM comment WHERE author_id=?',u.id),reviews:all(db,'SELECT * FROM review WHERE author_id=?',u.id),saved:all(db,'SELECT * FROM bookmark WHERE user_id=?',u.id),messages:all(db,'SELECT * FROM message WHERE sender_id=?',u.id),reports:all(db,'SELECT * FROM report WHERE author_id=?',u.id)};}
  if(p==='/api/account/revoke-sessions'&&method==='POST'){const u=requireUser(ctx);run(db,'DELETE FROM sessions WHERE user_id=? AND token<>?',u.id,u.token);return {ok:true};}
  if(p==='/api/media'&&method==='POST'){
    const u=requireUser(ctx);rateLimit(db,`upload:${u.id}`,10,86400000);const data=Buffer.from(String(b.base64||''),'base64');assert(data.length>0&&data.length<=5*1024*1024,'Files must be smaller than 5 MB.');const alt=clean(b.alt,250),license=clean(b.license,300);assert(alt&&license,'Add alternative text and rights/permission information.');
    let ext=data.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))?'png':data[0]===255&&data[1]===216&&data[2]===255?'jpg':data.subarray(0,4).toString()==='RIFF'&&data.subarray(8,12).toString()==='WEBP'?'webp':null;
    if(data.subarray(0,5).toString()==='%PDF-'){assert(ctx.config.clamscan,'PDF uploads require a configured malware scanner. Link official documents instead.',503);ext='pdf';}
    assert(ext,'Only PNG, JPEG, WebP and scanned PDF files are accepted.');const id=randomUUID(),path=resolve(ctx.config.dataDir,'media',id+'.'+ext);mkdirSync(resolve(ctx.config.dataDir,'media'),{recursive:true});writeFileSync(path,data,{mode:0o600});
    if(ext!=='pdf')try{execFileSync(ctx.config.imageConvert||'magick',['-limit','memory','64MiB','-limit','map','128MiB','-limit','time','15',path+'[0]','-strip','-resize','2400x2400>',path],{timeout:20000,stdio:'ignore'});}catch{unlinkSync(path);throw new HttpError(400,'The image could not be decoded safely. Ask the operator to configure ImageMagick.');}
    if(ext==='pdf')try{execFileSync(ctx.config.clamscan,['--no-summary',path],{timeout:30000,stdio:'ignore'});}catch{unlinkSync(path);throw new HttpError(400,'The document could not pass malware scanning.');}
    const url='/media/'+id+'.'+ext;run(db,'INSERT INTO media VALUES(?,?,?,?,?,?,NULL)',id,u.id,url,alt,license,now());return {id,url,alt};
  }
  if(parts[1]==='admin')return admin(ctx);
  throw new HttpError(404,'API endpoint not found.');
}
async function admin(ctx){
  const {req,db,url}=ctx,method=req.method,p=url.pathname,b=ctx.body||{},parts=p.split('/').filter(Boolean),u=requireRole(ctx,staffRoles);
  if(p==='/api/admin/summary')return {institutions:one(db,'SELECT count(*) n FROM institution WHERE deleted_at IS NULL').n,users:one(db,'SELECT count(*) n FROM users WHERE deleted_at IS NULL').n,posts:one(db,"SELECT count(*) n FROM post WHERE state='published'").n,records:all(db,'SELECT kind,status,count(*) n FROM record GROUP BY kind,status'),reports:one(db,"SELECT count(*) n FROM report WHERE status='open'").n,coverage:{ugc_directory:181,expected_ugc:181,verified_admissions:published(db,'admission').filter(x=>x.verification==='verified').length,verified_fees:published(db,'fee').filter(x=>x.verification==='verified').length,verified_programmes:published(db,'programme').filter(x=>x.verification==='verified').length},sources:all(db,'SELECT * FROM source_check ORDER BY checked_at DESC LIMIT 50')};
  if(p==='/api/admin/audit'){requireRole(ctx,['admin','owner']);return {items:all(db,'SELECT * FROM audit ORDER BY created_at DESC LIMIT 300')};}
  if(p==='/api/admin/records'&&method==='GET'){requireRole(ctx,editRoles);return {items:all(db,'SELECT * FROM record ORDER BY updated_at DESC').map(parsed)};}
  if(p==='/api/admin/records'&&method==='POST'){
    requireRole(ctx,editRoles);const id=b.id||randomUUID(),kind=b.kind,reason=clean(b.reason,1000);assert(reason.length>=5,'Explain the change in at least five characters.');
    const data=structuredClone(b.data);if(kind==='institution'){validateInstitution(data);data.title=data.name_en;}else validateRecord(kind,data);
    validateRelations(db,kind,data,b.institution_id);
    const previous=one(db,'SELECT * FROM record WHERE id=?',id);assert(!previous||previous.kind===kind,'Content type cannot be changed.');assert(!previous||b.version===previous.version,'This content changed elsewhere. Reload before saving.',409);if(b.institution_id)getInstitution(db,b.institution_id);
    return transaction(db,()=>{
      if(previous){auditRevision(db,u,'record',id,previous.version,parsed(previous),data,reason);run(db,"UPDATE record SET data=?,status='draft',version=version+1,updated_by=?,approved_by=NULL,updated_at=? WHERE id=?",json(data),u.id,now(),id);}
      else{run(db,'INSERT INTO record(id,kind,institution_id,data,created_by,updated_by,updated_at) VALUES(?,?,?,?,?,?,?)',id,kind,b.institution_id||null,json(data),u.id,u.id,now());audit(db,u.id,'create','record',id,null,data,reason);}
      return parsed(one(db,'SELECT * FROM record WHERE id=?',id));
    });
  }
  if(parts[2]==='records'&&parts[3]){
    requireRole(ctx,editRoles);const r=one(db,'SELECT * FROM record WHERE id=?',parts[3]);assert(r,'Content not found.',404);
    if(parts[4]==='history')return {items:all(db,"SELECT * FROM revision WHERE object_type='record' AND object_id=? ORDER BY created_at DESC",r.id).map(x=>({...x,data:JSON.parse(x.data)}))};
    const reason=clean(b.reason,1000);assert(reason.length>=5,'Explain the action in at least five characters.');assert(b.version===r.version,'This content changed elsewhere. Reload first.',409);
    if(parts[4]==='publish'&&method==='POST'){
      requireRole(ctx,reviewRoles);const d=JSON.parse(r.data);assert(!r.deleted_at,'Restore the record first.');
      if(riskKinds.has(r.kind)||r.kind==='institution'||r.kind==='representative')assert(u.id!==r.updated_by&&u.id!==r.created_by,'A different authorized reviewer must publish high-impact changes.',403);
      if(r.kind==='settings'||r.kind==='navigation')requireRole(ctx,['admin','owner']);
      if(r.kind==='institution'){validateInstitution(d);if(d.regulatory_status==='verified'||d.admission_permission==='verified')assert(d.checked_at&&d.source_url,'Verified status needs current source evidence.');}
      else validateRecord(r.kind,d,true);
      validateRelations(db,r.kind,d,r.institution_id);
      if(r.kind==='representative')assert(one(db,'SELECT 1 FROM representative_grant WHERE id=? AND user_id=? AND institution_id=? AND revoked_at IS NULL AND expires_at>?',d.grant_id,r.created_by,r.institution_id,now()),'Representative authority is absent, expired or revoked.');
      if(r.kind==='ranking'&&r.institution_id){const inst=publicInstitution(getInstitution(db,r.institution_id));assert(inst.kind==='university','Colleges cannot inherit university world rankings.');}
      if(r.kind==='admission'&&r.institution_id){const inst=publicInstitution(getInstitution(db,r.institution_id));if(inst.notice_flag)assert(d.notice_review_url&&d.notice_reviewed_at,'Review the UGC notice before publishing an admission window.');}
      if(d.superseded_by)assert(one(db,'SELECT 1 FROM record WHERE id=? AND kind=? AND published IS NOT NULL',d.superseded_by,r.kind),'A superseding record must already be published.');
      return transaction(db,()=>{
        auditRevision(db,u,'record',r.id,r.version,parsed(r),d,reason);
        if(r.kind==='institution'){
          const previous=one(db,'SELECT * FROM institution WHERE id=?',d.id);assert(d.id,'Institution ID is required.');
          if(previous&&previous.slug!==d.slug)run(db,'INSERT OR REPLACE INTO alias VALUES(?,?)',previous.slug,d.id);
          run(db,'INSERT INTO institution(id,slug,category,kind,data) VALUES(?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET slug=excluded.slug,category=excluded.category,kind=excluded.kind,data=excluded.data,version=institution.version+1',d.id,d.slug,d.category||null,d.kind,json(d));
        }
        if(r.kind==='representative'&&(d.summary_en||d.summary_bn)){const inst=one(db,'SELECT * FROM institution WHERE id=?',r.institution_id),updated=JSON.parse(inst.data);for(const key of ['summary_en','summary_bn'])if(d[key])updated[key]=d[key];run(db,'UPDATE institution SET data=?,version=version+1 WHERE id=?',JSON.stringify(updated),inst.id);}
        run(db,"UPDATE record SET published=data,status='published',approved_by=?,version=version+1,updated_at=? WHERE id=?",u.id,now(),r.id);enqueueAlerts(db,r,d);return {ok:true};
      });
    }
    if(parts[4]==='rollback'&&method==='POST'){
      const rev=one(db,"SELECT * FROM revision WHERE id=? AND object_type='record' AND object_id=?",b.revision_id,r.id);assert(rev,'Revision not found.',404);const old=JSON.parse(rev.data),data=old.data||old;
      return transaction(db,()=>{auditRevision(db,u,'record',r.id,r.version,parsed(r),data,reason);run(db,"UPDATE record SET data=?,status='draft',updated_by=?,approved_by=NULL,version=version+1,updated_at=? WHERE id=?",json(data),u.id,now(),r.id);return {ok:true,message:'Revision restored as a draft; review and publish to make it live.'};});
    }
    if(['DELETE','PATCH'].includes(method)||parts[4]==='unpublish'){
      requireRole(ctx,reviewRoles);assert(!['site','nav'].includes(r.id),'Core appearance/navigation can be edited or rolled back but not removed.');
      return transaction(db,()=>{auditRevision(db,u,'record',r.id,r.version,parsed(r),b,reason);if(parts[4]==='unpublish'||method==='DELETE')run(db,'UPDATE record SET published=NULL,status=?,deleted_at=?,version=version+1 WHERE id=?',method==='DELETE'?'deleted':'draft',method==='DELETE'?now():null,r.id);else run(db,"UPDATE record SET deleted_at=NULL,status='draft',version=version+1 WHERE id=?",r.id);return {ok:true};});
    }
  }
  if(p==='/api/admin/import'&&method==='POST'){
    requireRole(ctx,editRoles);assert(Array.isArray(b.records)&&b.records.length>0&&b.records.length<=250,'Import 1–250 JSON records at a time.');const errors=[];
    b.records.forEach((r,i)=>{try{if(r.kind==='institution')validateInstitution(r.data);else validateRecord(r.kind,r.data);if(r.institution_id)getInstitution(db,r.institution_id);if(r.id)assert(!one(db,'SELECT 1 FROM record WHERE id=?',r.id),'Existing IDs require individual reconciliation.');}catch(e){errors.push({row:i+1,error:e.message});}});
    if(b.preview!==false)return {valid:!errors.length,errors,count:b.records.length};assert(!errors.length,'Import has validation errors.');const reason=clean(b.reason,1000);assert(reason.length>=5,'An import reason is required.');
    return transaction(db,()=>{for(const r of b.records){const id=r.id||randomUUID(),d=r.data;if(r.kind==='institution')d.title=d.name_en;run(db,'INSERT INTO record(id,kind,institution_id,data,created_by,updated_by,updated_at) VALUES(?,?,?,?,?,?,?)',id,r.kind,r.institution_id||null,json(d),u.id,u.id,now());audit(db,u.id,'import','record',id,null,d,reason);}return {imported:b.records.length,state:'draft'};});
  }
  if(p==='/api/admin/export'){requireRole(ctx,['admin','owner']);return {schema:1,institutions:all(db,'SELECT * FROM institution').map(publicInstitution),records:all(db,'SELECT * FROM record').map(parsed),exported_at:now()};}
  if(p==='/api/admin/reports'&&method==='GET'){requireRole(ctx,modRoles);audit(db,u.id,'review_cases','report',null,null,null,'Authorized review of user-submitted reports; private conversation bodies excluded except explicitly shared selected-message evidence');return {items:all(db,'SELECT * FROM report ORDER BY created_at DESC')};}
  if(parts[2]==='reports'&&parts[3]&&method==='PATCH'){
    requireRole(ctx,modRoles);assert(['open','reviewing','resolved','dismissed'].includes(b.status),'Invalid case state.');assert(clean(b.resolution,2000).length>=5,'Explain the case decision.');const old=one(db,'SELECT * FROM report WHERE id=?',parts[3]);assert(old,'Case not found.',404);transaction(db,()=>{run(db,'UPDATE report SET status=?,resolution=? WHERE id=?',b.status,clean(b.resolution,2000),old.id);audit(db,u.id,'case','report',old.id,old,b,b.resolution);if(old.author_id)notifyOwner(db,old.author_id,`Your case ${old.id.slice(0,8)} is ${b.status}.`,'/account');});return {ok:true};
  }
  if(p==='/api/admin/moderation'&&method==='GET'){requireRole(ctx,modRoles);return {posts:all(db,'SELECT id,title,author_id,state,created_at FROM post ORDER BY created_at DESC LIMIT 200'),reviews:all(db,'SELECT * FROM review ORDER BY created_at DESC LIMIT 200'),comments:all(db,'SELECT * FROM comment ORDER BY created_at DESC LIMIT 200')};}
  if(p==='/api/admin/moderation'&&method==='POST'){
    requireRole(ctx,modRoles);assert(['post','review','comment'].includes(b.type)&&['published','hidden','deleted'].includes(b.state),'Invalid moderation action.');assert(clean(b.reason,1000).length>=5,'A moderation reason is required.');const old=one(db,`SELECT * FROM ${b.type} WHERE id=?`,b.id);assert(old,'Content not found.',404);transaction(db,()=>{run(db,`UPDATE ${b.type} SET state=? WHERE id=?`,b.state,b.id);audit(db,u.id,'moderate',b.type,b.id,old,{state:b.state},b.reason);notifyOwner(db,old.author_id,`Your ${b.type} was ${b.state}: ${clean(b.reason,1000)}`,'/account');});return {ok:true};
  }
  if(p==='/api/admin/users'&&method==='GET'){requireRole(ctx,['admin','owner']);return {items:all(db,'SELECT id,name,email,handle,role,verified,banned,created_at,deleted_at FROM users ORDER BY created_at DESC')};}
  if(parts[2]==='users'&&parts[3]&&method==='PATCH'){
    requireRole(ctx,['owner']);assert(ctx.session.mfa_at>Date.now()-5*60000,'Reauthenticate before changing access.',403);const old=one(db,'SELECT * FROM users WHERE id=?',parts[3]);assert(old,'User not found.',404);assert(old.id!==u.id,'Change your own access through the operator recovery process.',403);assert(clean(b.reason,1000).length>=5,'A reason is required.');
    if(b.role){assert(['user','representative',...staffRoles].includes(b.role),'Invalid role.');assert(!staffRoles.includes(b.role)||old.totp,'Provision staff MFA with the operator CLI before granting a staff role.');}
    transaction(db,()=>{run(db,'UPDATE users SET role=?,banned=? WHERE id=?',b.role||old.role,b.banned===undefined?old.banned:b.banned?1:0,old.id);run(db,'DELETE FROM sessions WHERE user_id=?',old.id);audit(db,u.id,'access','user',old.id,{role:old.role,banned:old.banned},{role:b.role||old.role,banned:b.banned},b.reason);});return {ok:true};
  }
  if(p==='/api/admin/media'&&method==='GET'){requireRole(ctx,['admin','owner']);return {items:all(db,'SELECT * FROM media ORDER BY created_at DESC')};}
  if(parts[2]==='media'&&parts[3]&&['DELETE','PATCH'].includes(method)){requireRole(ctx,['admin','owner']);const old=one(db,'SELECT * FROM media WHERE id=?',parts[3]);assert(old,'Media not found.',404);run(db,'UPDATE media SET deleted_at=? WHERE id=?',method==='DELETE'?now():null,old.id);audit(db,u.id,method==='DELETE'?'delete':'restore','media',old.id,old,b,clean(b.reason,1000)||'Media library change');return {ok:true};}
  throw new HttpError(404,'Admin endpoint not found.');
}
