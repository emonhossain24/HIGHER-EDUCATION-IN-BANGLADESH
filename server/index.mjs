import http from 'node:http';
import {formatCalendar} from './calendar.mjs';
import {extensions,rebuildSearch,publishScheduled} from './extensions.mjs';
import {readFileSync,existsSync,mkdirSync,statSync,chmodSync} from 'node:fs';
import {resolve,extname} from 'node:path';
import {pathToFileURL} from 'node:url';
import {openDatabase,seed,root,one,run} from './db.mjs';
import {api} from './api.mjs';
import {getSession,checkCsrf} from './auth.mjs';
import {HttpError,assert} from './domain.mjs';
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.pdf':'application/pdf','.json':'application/json; charset=utf-8'};
export function createApp(options={}){
  const portArg=process.argv.indexOf('--port');const port=Number(options.port??(portArg>=0?process.argv[portArg+1]:undefined)??process.env.PORT??3000),dataDir=resolve(options.dataDir||process.env.DATA_DIR||resolve(root,'var'));
  mkdirSync(dataDir,{recursive:true,mode:0o700});
  const config={port,dataDir,appUrl:options.appUrl||process.env.APP_URL||`http://localhost:${port}`,cookieSecure:options.cookieSecure??process.env.COOKIE_SECURE==='true',mailUrl:process.env.MAIL_WEBHOOK_URL||'',mailToken:process.env.MAIL_WEBHOOK_TOKEN||'',devMail:process.env.DEV_MAIL==='true',imageConvert:process.env.IMAGE_CONVERT_PATH||'magick',clamscan:process.env.CLAMSCAN_PATH||'',...options};
  if(process.env.NODE_ENV==='production'){assert(config.appUrl.startsWith('https://')&&config.cookieSecure,'Production requires an HTTPS APP_URL and secure cookies.');assert(!config.devMail,'DEV_MAIL must be disabled in production.');}
  const db=options.db||openDatabase(resolve(dataDir,'hebd.sqlite'));seed(db);rebuildSearch(db);if(existsSync(resolve(dataDir,'hebd.sqlite')))chmodSync(resolve(dataDir,'hebd.sqlite'),0o600);
  const server=http.createServer(async(req,res)=>{
    res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('X-Frame-Options','DENY');res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
    if(config.cookieSecure)res.setHeader('Strict-Transport-Security','max-age=31536000; includeSubDomains');
    try{
      const url=new URL(req.url,'http://localhost');let body;
      if(!['GET','HEAD'].includes(req.method)){
        assert(req.headers['content-type']?.startsWith('application/json'),'Send JSON content.',415);const buffers=[];let size=0;for await(const chunk of req){size+=chunk.length;assert(size<=8*1024*1024,'Request too large.',413);buffers.push(chunk);}try{body=JSON.parse(Buffer.concat(buffers).toString()||'{}');}catch{throw new HttpError(400,'Invalid JSON.');}assert(body&&typeof body==='object'&&!Array.isArray(body),'Send a JSON object.');
      }
      const ctx={req,res,url,body,db,config,session:getSession(db,req)};
      if(url.pathname==='/calendar.ics'&&req.method==='GET'){const result=await extensions({...ctx,url:new URL('/api/calendar',config.appUrl)});res.setHeader('Content-Type','text/calendar; charset=utf-8');res.setHeader('Content-Disposition','attachment; filename="hebd-admissions.ics"');res.end(formatCalendar(result.items));return;}
      if(url.pathname.startsWith('/api/')){res.setHeader('Cache-Control','no-store');checkCsrf(ctx);const value=await api(ctx);if(!['GET','HEAD'].includes(req.method))rebuildSearch(db);res.setHeader('Content-Type','application/json; charset=utf-8');res.end(JSON.stringify(value));return;}
      assert(['GET','HEAD'].includes(req.method),'Method not allowed.',405);
      const path=decodeURIComponent(url.pathname);
      if(path==='/theme.css'){
        const r=one(db,"SELECT published FROM record WHERE id='site'");const s=JSON.parse(r?.published||'{}'),c=s.colors||{};const color=(x,f)=>/^#[a-fA-F0-9]{6}$/.test(x)?x:f;
        res.setHeader('Content-Type','text/css');res.setHeader('Cache-Control','no-cache');res.end(`:root{--accent:${color(c.accent,'#0b7165')};--ink:${color(c.ink,'#142e37')};--bg:${color(c.background,'#f6f7f4')};--body-font:${s.font==='serif'?'Georgia,serif':'Inter,"Noto Sans Bengali",system-ui,sans-serif'}}`);return;
      }
      if(path==='/robots.txt'){res.setHeader('Content-Type','text/plain');res.end(`User-agent: *\nDisallow: /admin\nDisallow: /account\nDisallow: /messages\nDisallow: /api\nSitemap: ${config.appUrl}/sitemap.xml\n`);return;}
      if(path==='/sitemap.xml'){
        res.setHeader('Content-Type','application/xml');const routes=['/','/universities','/programmes','/admissions','/scholarships','/rankings','/sources','/methodology',...db.prepare('SELECT slug,kind FROM institution WHERE deleted_at IS NULL').all().map(i=>i.kind==='university'?'/universities/'+i.slug:'/institutions/'+i.kind.replace('_college','').replace('_institute','')+'/'+i.slug)];res.end(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${escape(config.appUrl+r)}</loc></url>`).join('')}</urlset>`);return;
      }
      let file=resolve(root,'public','.'+path);
      if(path.startsWith('/media/')){assert(/^\/media\/[a-f0-9-]+\.(png|jpg|webp|pdf)$/.test(path),'File not found.',404);assert(one(db,'SELECT 1 FROM media WHERE url=? AND deleted_at IS NULL',path),'File not found.',404);file=resolve(dataDir,'.'+path);}
      if((path.startsWith('/assets/')||path.startsWith('/media/')||['/workspace.js','/app.js','/admin.js','/ui.js','/i18n.js','/styles.css'].includes(path))&&existsSync(file)&&statSync(file).isFile()){
        assert(file.startsWith(resolve(root,'public')+'/')||file.startsWith(resolve(dataDir,'media')+'/'),'File not found.',404);res.setHeader('Content-Type',mime[extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-cache');if(extname(file)==='.pdf')res.setHeader('Content-Disposition','attachment');if(req.method==='HEAD')res.end();else res.end(readFileSync(file));return;
      }
      assert(!extname(path),'Page not found.',404);
      let title='Higher Education in Bangladesh',description='Explore Bangladesh higher education institutions with source-linked information, admissions, fees and community perspectives.';
      const pathParts=path.split('/').filter(Boolean);const last=['programmes','admissions','fees','scholarships','rankings','reviews','community','campus','contacts'].includes(pathParts.at(-1))&&pathParts.length>2?pathParts.at(-2):pathParts.at(-1);
      if((path.startsWith('/universities/')||path.startsWith('/institutions/'))&&last){let i=one(db,'SELECT * FROM institution WHERE (slug=? OR id=?) AND deleted_at IS NULL',last,last);if(!i){const a=one(db,'SELECT * FROM alias WHERE alias=?',last);if(a){i=one(db,'SELECT * FROM institution WHERE id=?',a.institution_id);res.writeHead(301,{Location:'/universities/'+i.slug});res.end();return;}}assert(i,'Institution not found.',404);title=JSON.parse(i.data).name_en+' | HEBD';}
      let html=readFileSync(resolve(root,'public/index.html'),'utf8').replaceAll('%%TITLE%%',escape(title)).replaceAll('%%DESCRIPTION%%',escape(description)).replaceAll('%%CANONICAL%%',escape(config.appUrl+path));
      res.setHeader('Content-Type','text/html; charset=utf-8');res.setHeader('Cache-Control','no-cache');res.end(req.method==='HEAD'?'':html);
    }catch(e){const status=e.status||500;res.statusCode=status;res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');if(!e.status)console.error('Request failed:',e.code||e.name);res.end(JSON.stringify({error:e.status?e.message:'The request could not be completed. Please try again.'}));}
  });
  return {server,db,config};
}
if(import.meta.url===pathToFileURL(process.argv[1]||'').href){
  if(existsSync(resolve(root,'.env')))process.loadEnvFile(resolve(root,'.env'));
  const app=createApp();const jobs=setInterval(()=>{try{const changes=publishScheduled(app.db);if(changes.length)rebuildSearch(app.db);}catch(e){console.error('Publication worker failed:',e.name);}},30000);jobs.unref();app.server.listen(app.config.port,process.env.HOST||'0.0.0.0',()=>console.log(`HEBD listening on port ${app.config.port}`));
  for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>app.server.close(()=>{app.db.close();process.exit(0);}));
}
