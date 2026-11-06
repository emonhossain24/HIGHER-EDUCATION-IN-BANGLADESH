import {DatabaseSync} from 'node:sqlite';
import {mkdirSync,readFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {randomUUID,createHash} from 'node:crypto';
import {now} from './domain.mjs';
import {extensionsSchema} from './extensions-schema.mjs';
export const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
export const defaults={title:'Higher Education in Bangladesh',title_bn:'বাংলাদেশে উচ্চশিক্ষা',brand_short:'HEBD',hero_en:'Your next chapter,\nin Bangladesh.',hero_bn:'আপনার পরবর্তী অধ্যায়,\nবাংলাদেশেই।',intro_en:'Explore institutions, understand admissions, and make an informed choice — with the source always in sight.',intro_bn:'প্রতিষ্ঠান খুঁজুন, ভর্তি সম্পর্কে জানুন ও তথ্যের উৎস দেখে সিদ্ধান্ত নিন।',logo_url:'/assets/bd-flag.svg',favicon_url:'/assets/bd-flag.svg',font:'system',colors:{accent:'#0b7165',ink:'#142e37',background:'#f6f7f4'},modules:['directory','subjects','admissions','compare','funding','rankings','community','sources'],footer_en:'Independent information and community platform. Not affiliated with or endorsed by UGC, BMDC, DGME, BUTEX or ranking publishers.',footer_bn:'স্বতন্ত্র তথ্য ও কমিউনিটি প্ল্যাটফর্ম। UGC, BMDC, DGME, BUTEX বা র‍্যাঙ্কিং প্রকাশকের অনুমোদিত অংশীদার নয়।',contact_en:'For corrections, use the source-linked correction form.',title_meta:'Higher Education in Bangladesh | Institution directory',registration:true,messaging:true};
export const defaultHomeContent={home_directory_heading:'Find your place.',home_pathways_heading:'Explore a different path.',home_admissions_heading:'The right information, at the right time.',home_compare_heading:'A better decision starts with a comparison.',home_budget_heading:'Understand the whole cost.',home_funding_heading:'Find financial support.',home_rankings_heading:'Read rankings in context.',home_community_heading:'Ask. Share. Learn from experience.',home_sources_heading:'Always follow the source.'};
defaults.content=defaultHomeContent;
export const defaultNav={title:'Main navigation',items:[{label:'Explore',label_bn:'প্রতিষ্ঠান',href:'/universities'},{label:'Programmes',label_bn:'প্রোগ্রাম',href:'/programmes'},{label:'Admissions',label_bn:'ভর্তি',href:'/admissions'},{label:'Funding',label_bn:'অর্থায়ন',href:'/scholarships'},{label:'Rankings',label_bn:'র‍্যাঙ্কিং',href:'/rankings'},{label:'Community',label_bn:'কমিউনিটি',href:'/community'}]};
export function openDatabase(path){
  mkdirSync(dirname(path),{recursive:true});const db=new DatabaseSync(path);db.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');
  db.exec(`
  CREATE TABLE IF NOT EXISTS institution(id TEXT PRIMARY KEY,slug TEXT NOT NULL UNIQUE,category TEXT,kind TEXT NOT NULL,data TEXT NOT NULL,version INTEGER NOT NULL DEFAULT 1,deleted_at TEXT);
  CREATE TABLE IF NOT EXISTS alias(alias TEXT PRIMARY KEY,institution_id TEXT NOT NULL REFERENCES institution(id));
  CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,email TEXT NOT NULL UNIQUE,handle TEXT NOT NULL UNIQUE,name TEXT NOT NULL,password TEXT NOT NULL,role TEXT NOT NULL DEFAULT 'user',verified INTEGER NOT NULL DEFAULT 0,totp TEXT,totp_last INTEGER,privacy TEXT NOT NULL DEFAULT '{}',banned INTEGER NOT NULL DEFAULT 0,created_at TEXT NOT NULL,deleted_at TEXT);
  CREATE TABLE IF NOT EXISTS sessions(token TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),csrf TEXT NOT NULL,expires_at INTEGER NOT NULL,mfa_at INTEGER);
  CREATE TABLE IF NOT EXISTS tokens(hash TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),purpose TEXT NOT NULL,expires_at INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS record(id TEXT PRIMARY KEY,kind TEXT NOT NULL,institution_id TEXT REFERENCES institution(id),data TEXT NOT NULL,published TEXT,status TEXT NOT NULL DEFAULT 'draft',version INTEGER NOT NULL DEFAULT 1,created_by TEXT,updated_by TEXT,approved_by TEXT,deleted_at TEXT,updated_at TEXT NOT NULL);
  CREATE INDEX IF NOT EXISTS record_kind_status ON record(kind,status,institution_id);
  CREATE TABLE IF NOT EXISTS revision(id TEXT PRIMARY KEY,object_type TEXT NOT NULL,object_id TEXT NOT NULL,version INTEGER NOT NULL,data TEXT NOT NULL,actor_id TEXT,reason TEXT NOT NULL,created_at TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS audit(id TEXT PRIMARY KEY,actor_id TEXT,action TEXT NOT NULL,object_type TEXT NOT NULL,object_id TEXT,before_hash TEXT,after_hash TEXT,reason TEXT NOT NULL,created_at TEXT NOT NULL);
  CREATE TRIGGER IF NOT EXISTS audit_no_update BEFORE UPDATE ON audit BEGIN SELECT RAISE(ABORT,'Audit events are append-only'); END;
  CREATE TRIGGER IF NOT EXISTS audit_no_delete BEFORE DELETE ON audit BEGIN SELECT RAISE(ABORT,'Audit events are append-only'); END;
  CREATE TABLE IF NOT EXISTS post(id TEXT PRIMARY KEY,author_id TEXT NOT NULL REFERENCES users(id),institution_id TEXT REFERENCES institution(id),title TEXT NOT NULL,body TEXT NOT NULL,topic TEXT NOT NULL,media_url TEXT,state TEXT NOT NULL DEFAULT 'published',edited_at TEXT,created_at TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS comment(id TEXT PRIMARY KEY,post_id TEXT NOT NULL REFERENCES post(id),author_id TEXT NOT NULL REFERENCES users(id),parent_id TEXT REFERENCES comment(id),body TEXT NOT NULL,state TEXT NOT NULL DEFAULT 'published',created_at TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS reaction(user_id TEXT NOT NULL REFERENCES users(id),target_type TEXT NOT NULL,target_id TEXT NOT NULL,PRIMARY KEY(user_id,target_type,target_id));
  CREATE TABLE IF NOT EXISTS bookmark(user_id TEXT NOT NULL REFERENCES users(id),target_type TEXT NOT NULL,target_id TEXT NOT NULL,created_at TEXT NOT NULL,PRIMARY KEY(user_id,target_type,target_id));
  CREATE TABLE IF NOT EXISTS review(id TEXT PRIMARY KEY,author_id TEXT NOT NULL REFERENCES users(id),institution_id TEXT NOT NULL REFERENCES institution(id),stars INTEGER NOT NULL CHECK(stars BETWEEN 1 AND 5),relationship TEXT NOT NULL,pros TEXT NOT NULL,cons TEXT NOT NULL,state TEXT NOT NULL DEFAULT 'published',created_at TEXT NOT NULL,UNIQUE(author_id,institution_id));
  CREATE TABLE IF NOT EXISTS report(id TEXT PRIMARY KEY,author_id TEXT REFERENCES users(id),target_type TEXT NOT NULL,target_id TEXT,body TEXT NOT NULL,source_url TEXT,status TEXT NOT NULL DEFAULT 'open',resolution TEXT,created_at TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS block(user_id TEXT REFERENCES users(id),blocked_id TEXT REFERENCES users(id),PRIMARY KEY(user_id,blocked_id),CHECK(user_id<>blocked_id));
  CREATE TABLE IF NOT EXISTS conversation(id TEXT PRIMARY KEY,requester_id TEXT NOT NULL REFERENCES users(id),recipient_id TEXT NOT NULL REFERENCES users(id),state TEXT NOT NULL DEFAULT 'requested',created_at TEXT NOT NULL,CHECK(requester_id<>recipient_id),UNIQUE(requester_id,recipient_id));
  CREATE TABLE IF NOT EXISTS message(id TEXT PRIMARY KEY,conversation_id TEXT NOT NULL REFERENCES conversation(id),sender_id TEXT NOT NULL REFERENCES users(id),body TEXT NOT NULL,created_at TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS notification(id TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),body TEXT NOT NULL,href TEXT NOT NULL,read_at TEXT,created_at TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS media(id TEXT PRIMARY KEY,owner_id TEXT REFERENCES users(id),url TEXT NOT NULL,alt TEXT NOT NULL,license TEXT NOT NULL,created_at TEXT NOT NULL,deleted_at TEXT);
  CREATE TABLE IF NOT EXISTS rate_limit(key TEXT PRIMARY KEY,count INTEGER NOT NULL,reset_at INTEGER NOT NULL);
  CREATE TABLE IF NOT EXISTS source_check(id TEXT PRIMARY KEY,record_id TEXT NOT NULL REFERENCES record(id),status INTEGER,hash TEXT,changed INTEGER NOT NULL DEFAULT 0,checked_at TEXT NOT NULL);
  CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY,value TEXT NOT NULL);
  `);
  extensionsSchema(db);
  return db;
}
export const one=(db,sql,...args)=>db.prepare(sql).get(...args);
export const all=(db,sql,...args)=>db.prepare(sql).all(...args);
export const run=(db,sql,...args)=>db.prepare(sql).run(...args);
export function transaction(db,fn){db.exec('BEGIN IMMEDIATE');try{const result=fn();db.exec('COMMIT');return result;}catch(e){db.exec('ROLLBACK');throw e;}}
const hash=v=>v==null?null:createHash('sha256').update(typeof v==='string'?v:JSON.stringify(v)).digest('hex');
export function audit(db,actor,action,type,id,before,after,reason){run(db,'INSERT INTO audit VALUES(?,?,?,?,?,?,?,?,?)',randomUUID(),actor,action,type,id,hash(before),hash(after),reason,now());}
export function revision(db,type,id,version,data,actor,reason){run(db,'INSERT INTO revision VALUES(?,?,?,?,?,?,?,?)',randomUUID(),type,id,version,JSON.stringify(data),actor,reason,now());}
export function notify(db,user,body,href){run(db,'INSERT INTO notification VALUES(?,?,?,?,?,?)',randomUUID(),user,body,href,null,now());}
export function seed(db){
  const entries=JSON.parse(readFileSync(resolve(root,'data/seeds/ugc-2026-11-06.json'),'utf8'));
  const specialists=JSON.parse(readFileSync(resolve(root,'data/seeds/specialists.json'),'utf8'));
  transaction(db,()=>{
    for(const item of [...entries,...specialists]){
      run(db,'INSERT OR IGNORE INTO institution(id,slug,category,kind,data) VALUES(?,?,?,?,?)',item.id,item.slug,item.category??null,item.kind,JSON.stringify(item));
      const previous=one(db,'SELECT * FROM institution WHERE id=?',item.id);
      if(previous.version===1&&!JSON.parse(previous.data).directory_checked_at&&item.directory_checked_at)run(db,'UPDATE institution SET data=? WHERE id=?',JSON.stringify(item),item.id);
    }
    for(const [id,kind,data] of [['site','settings',{...defaults,title:defaults.title}],['nav','navigation',defaultNav],...JSON.parse(readFileSync(resolve(root,'data/source-registry.json'),'utf8')).map(s=>[s.id,'source',s])])run(db,'INSERT OR IGNORE INTO record(id,kind,data,published,status,updated_at) VALUES(?,?,?,?,?,?)',id,kind,JSON.stringify(data),JSON.stringify(data),'published',now());
    for(const source of JSON.parse(readFileSync(resolve(root,'data/source-registry.json'),'utf8'))){const previous=one(db,'SELECT * FROM record WHERE id=?',source.id);if(previous&&previous.version===1&&source.checked_at&&!JSON.parse(previous.data).checked_at)run(db,'UPDATE record SET data=?,published=? WHERE id=?',JSON.stringify(source),JSON.stringify(source),source.id);}
    for(const item of JSON.parse(readFileSync(resolve(root,'data/seeds/reviewed-catalogue.json'),'utf8')))run(db,'INSERT OR IGNORE INTO record(id,kind,institution_id,data,published,status,updated_at) VALUES(?,?,?,?,?,?,?)',item.id,item.kind,item.institution_id,JSON.stringify(item.data),JSON.stringify(item.data),'published',now());
    run(db,'INSERT OR IGNORE INTO meta VALUES(?,?)','schema_version','1');
  });
}
