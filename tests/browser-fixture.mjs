// Isolated synthetic browser fixture. Not a production authentication mechanism.
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {randomUUID,randomBytes} from 'node:crypto';
import {createApp} from '../server/index.mjs';
import {run} from '../server/db.mjs';
import {createSession,passwordHash,base32} from '../server/auth.mjs';
if(process.env.NODE_ENV==='production'||process.env.HEBD_BROWSER_QA!=='1')throw Error('Synthetic browser fixture is disabled outside explicit isolated QA.');
const directory=mkdtempSync(join(tmpdir(),'hebd-browser-qa-'));
const flag=process.argv.indexOf('--port'),port=Number(flag>=0?process.argv[flag+1]:4173);
const app=createApp({port,dataDir:directory,appUrl:`http://127.0.0.1:${port}`,cookieSecure:false,sendMail:async()=>{},imageConvert:'convert'});
const people={};
for(const role of ['user','owner','fact_checker']){const id=randomUUID();people[role]=id;run(app.db,'INSERT INTO users(id,email,handle,name,password,role,verified,totp,created_at) VALUES(?,?,?,?,?,?,1,?,?)',id,role+'@browser-qa.invalid','qa_'+role,role==='user'?'QA Member':'QA '+role,passwordHash(randomBytes(32).toString('hex')),role,base32(randomBytes(20)),new Date().toISOString());}
const original=app.server.listeners('request')[0];app.server.removeAllListeners('request');
app.server.on('request',(req,res)=>{
 const path=req.url.split('?')[0];
 if(path==='/__qa'){res.setHeader('Content-Type','text/html; charset=utf-8');res.setHeader('Cache-Control','no-store');res.end('<!doctype html><html lang="en"><title>HEBD isolated browser QA</title><h1>HEBD isolated browser QA</h1><p>Synthetic accounts and a disposable database. No production accounts or mail delivery.</p><a href="/__qa/session/user">Open member fixture</a><br><a href="/__qa/session/owner">Open owner fixture</a><br><a href="/__qa/session/fact_checker">Open reviewer fixture</a></html>');return;}
 const match=path.match(/^\/__qa\/session\/(user|owner|fact_checker)$/);
 if(match){const session=createSession(app.db,{id:people[match[1]]},match[1]==='user'?null:Date.now());res.writeHead(303,{'Set-Cookie':`hebd_session=${session.token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=600`,'Cache-Control':'no-store',Location:match[1]==='user'?'/account':'/admin'});res.end();return;}
 original(req,res);
});
app.server.listen(port,'127.0.0.1',()=>console.log('HEBD isolated synthetic browser QA on '+port));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>app.server.close(()=>{app.db.close();rmSync(directory,{recursive:true,force:true});process.exit(0);}));
