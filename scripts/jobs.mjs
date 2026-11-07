import {resolve} from 'node:path';
import {existsSync} from 'node:fs';
import {openDatabase,root,all,one,run} from '../server/db.mjs';
import {publishScheduled,rebuildSearch} from '../server/extensions.mjs';
if(existsSync(resolve(root,'.env')))process.loadEnvFile(resolve(root,'.env'));
if(process.env.NODE_ENV==='production'&&process.env.MAIL_WEBHOOK_URL&&!process.env.MAIL_WEBHOOK_URL.startsWith('https://'))throw Error('Production email delivery requires HTTPS.');
const db=openDatabase(resolve(process.env.DATA_DIR||resolve(root,'var'),'hebd.sqlite'));
const published=publishScheduled(db);if(published.length)rebuildSearch(db);
for(const mail of all(db,"SELECT o.*,u.email,u.privacy,u.deleted_at,u.banned FROM outbox o JOIN users u ON u.id=o.user_id WHERE o.state='pending' AND o.attempts<5 ORDER BY o.created_at LIMIT 50")){
 if(mail.deleted_at||mail.banned||!JSON.parse(mail.privacy).email_alerts){run(db,"UPDATE outbox SET state='cancelled' WHERE id=?",mail.id);continue;}
 if(!process.env.MAIL_WEBHOOK_URL)continue;
 try{const res=await fetch(process.env.MAIL_WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json',...(process.env.MAIL_WEBHOOK_TOKEN?{Authorization:'Bearer '+process.env.MAIL_WEBHOOK_TOKEN}:{})},body:JSON.stringify({to:mail.email,subject:mail.subject,text:mail.body+'\n'+(process.env.APP_URL||'')+mail.href}),signal:AbortSignal.timeout(10000)});if(!res.ok)throw Error('Delivery not accepted');run(db,"UPDATE outbox SET state='sent',sent_at=?,attempts=attempts+1 WHERE id=?",new Date().toISOString(),mail.id);}catch{run(db,'UPDATE outbox SET attempts=attempts+1 WHERE id=?',mail.id);}
}
const time=Date.now();run(db,'DELETE FROM sessions WHERE expires_at<?',time);run(db,'DELETE FROM tokens WHERE expires_at<?',time);run(db,'DELETE FROM rate_limit WHERE reset_at<?',time);console.log(JSON.stringify({publications:published,pendingEmail:one(db,"SELECT count(*) n FROM outbox WHERE state='pending'").n}));db.close();
