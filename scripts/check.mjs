import {readFileSync,readdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..');
for(const dir of ['server','public','scripts','tests'])for(const file of readdirSync(resolve(root,dir)))if(/\.(mjs|js)$/.test(file))execFileSync(process.execPath,['--check',resolve(root,dir,file)]);
const data=JSON.parse(readFileSync(resolve(root,'data/seeds/ugc-2026-11-06.json')));assert.equal(data.length,181);assert.equal(new Set(data.map(i=>i.slug)).size,181);assert.deepEqual(Object.fromEntries(['public','private','international','cbhe'].map(k=>[k,data.filter(i=>i.category===k).length])),{public:61,private:116,international:3,cbhe:1});assert(data.every(i=>i.admission_permission==='not_verified'&&!i.website_verified));console.log('Syntax, unique routes, source defaults and 61/116/3/1 inventory verified.');
