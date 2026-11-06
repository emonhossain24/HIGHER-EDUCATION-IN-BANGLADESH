import {backup} from 'node:sqlite';
import {resolve} from 'node:path';
import {mkdirSync,chmodSync} from 'node:fs';
import {openDatabase,root} from '../server/db.mjs';
const directory=resolve(process.env.DATA_DIR||resolve(root,'var'));const out=resolve(process.argv[2]||resolve(directory,'backups',Date.now()+'.sqlite'));mkdirSync(resolve(out,'..'),{recursive:true,mode:0o700});const db=openDatabase(resolve(directory,'hebd.sqlite'));await backup(db,out);chmodSync(out,0o600);db.close();console.log('Consistent backup saved to '+out);
