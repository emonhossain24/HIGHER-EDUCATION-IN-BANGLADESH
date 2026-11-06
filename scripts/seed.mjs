import {openDatabase,seed,root} from '../server/db.mjs';
import {resolve} from 'node:path';
const db=openDatabase(resolve(process.env.DATA_DIR||resolve(root,'var'),'hebd.sqlite'));seed(db);console.log('Seed imported idempotently. Existing records preserved.');db.close();
