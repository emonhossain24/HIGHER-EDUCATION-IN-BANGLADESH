import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {randomUUID,randomBytes} from 'node:crypto';
import {openDatabase,seed,root,one,run,audit} from '../server/db.mjs';
import {passwordHash,validPassword,base32} from '../server/auth.mjs';
import {assert,staffRoles,now} from '../server/domain.mjs';
// Read operator credentials from stdin so they do not appear in shell history or process arguments.
const input=JSON.parse(readFileSync(0,'utf8'));const {email,password,name,role='owner'}=input;
assert(email&&name&&staffRoles.includes(role),'Provide email, name, password and a staff role.');validPassword(password);
const db=openDatabase(resolve(process.env.DATA_DIR||resolve(root,'var'),'hebd.sqlite'));seed(db);const old=one(db,'SELECT * FROM users WHERE email=?',email.toLowerCase());assert(!old||input.rotate===true,'Account exists. Set rotate=true deliberately to replace credentials.');
const id=old?.id||randomUUID(),secret=base32(randomBytes(20));
if(old){run(db,'UPDATE users SET password=?,role=?,verified=1,totp=?,totp_last=NULL WHERE id=?',passwordHash(password),role,secret,id);run(db,'DELETE FROM sessions WHERE user_id=?',id);}else run(db,'INSERT INTO users(id,email,handle,name,password,role,verified,totp,created_at) VALUES(?,?,?,?,?,?,1,?,?)',id,email.toLowerCase(),'staff_'+id.slice(0,8),name,passwordHash(password),role,secret,now());
audit(db,id,'provision','user',id,old?{role:old.role}:null,{role},'Local operator staff provisioning');
console.log('Provisioned '+email+' as '+role+'. Add this secret to your authenticator; keep it private:');console.log(secret);console.log('otpauth://totp/HEBD:'+encodeURIComponent(email)+'?secret='+secret+'&issuer=HEBD');db.close();
