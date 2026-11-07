import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {admissionStatus,calculateFee,validateRecord} from '../server/domain.mjs';
import {translate} from '../public/i18n.js';
const read=path=>JSON.parse(readFileSync(new URL(path,import.meta.url),'utf8'));
const records=[...read('../data/seeds/reviewed-catalogue.json'),...read('../data/seeds/current-catalogue.json')];
test('76 source-backed records are unique and satisfy publication validation',()=>{
 assert.equal(records.length,76);assert.equal(new Set(records.map(x=>x.id)).size,76);
 for(const record of records)validateRecord(record.kind,record.data,true);
 assert.equal(records.filter(x=>x.kind==='fee').length,32);
});
test('all 181 universities have an explicit discovery outcome, not a verification claim',()=>{
 const rows=read('../data/official-source-discovery.json');assert.equal(rows.length,181);assert.equal(new Set(rows.map(x=>x.id)).size,181);
 assert.equal(rows.filter(x=>x.sources.length).length,143);
 assert.equal(rows.reduce((sum,x)=>sum+x.sources.length,0),374);
 for(const row of rows){assert(!('verification' in row));for(const source of row.sources){assert.equal(new URL(source.url).protocol,'https:');assert(source.title);}}
});
test('mixed-credit published tuition is the waiver basis and unknown components stay unknown',()=>{
 const fee=records.find(x=>x.id==='ewu-cse-fees').data;
 const cost=calculateFee({...fee,waiver_cap:25},20);
 assert.equal(cost.tuition,904000);assert.equal(cost.net,1003400-904000*.2);
 assert.notEqual(fee.published_tuition,fee.credits*fee.per_credit);
 assert.equal(calculateFee(records.find(x=>x.id==='nsu-cse-fees').data).status,'not_verified');
 assert.throws(()=>validateRecord('fee',{title:'Invalid total',published_total:20,published_tuition:30}));
 assert.throws(()=>validateRecord('fee',{title:'Invalid total',published_total:-1}));
});
test('independently known deadline timestamps validate without inventing an opening',()=>{
 const record=records.find(x=>x.id==='uiu-spring-2027-ug').data;
 validateRecord('admission',record,true);assert.equal(admissionStatus(record,new Date('2026-11-07')),'announcement_only');
 const du=records.find(x=>x.id==='du-2026-27-science').data;
 assert.equal(admissionStatus(du,new Date('2026-11-07')),'upcoming');
 assert.equal(admissionStatus(du,new Date('2026-11-11T06:00:00Z')),'open');
 assert.equal(admissionStatus(du,new Date('2026-11-25T17:59:00Z')),'closed');
});
test('Bengali interface audit passes while official identifiers and member content remain intact',()=>{
 execFileSync(process.execPath,[new URL('../scripts/audit-i18n.mjs',import.meta.url).pathname]);
 assert.equal(translate('QS'),'QS');assert.equal(translate('An original member sentence'),'An original member sentence');
 assert.notEqual(translate('Opt in to email alerts'),'Opt in to email alerts');
 assert.notEqual(translate('Switch language'),'Switch language');
});
test('browser fixture refuses activation without explicit QA and in production',()=>{
 const script=new URL('./browser-fixture.mjs',import.meta.url).pathname;
 assert.throws(()=>execFileSync(process.execPath,[script],{env:{...process.env,HEBD_BROWSER_QA:'',NODE_ENV:'test'},stdio:'pipe'}));
 assert.throws(()=>execFileSync(process.execPath,[script],{env:{...process.env,HEBD_BROWSER_QA:'1',NODE_ENV:'production'},stdio:'pipe'}));
});
