import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawn} from 'node:child_process';
const root=resolve(import.meta.dirname,'..');
const qa=existsSync(resolve(root,'var/browser-qa.enabled'));
if(qa&&process.env.NODE_ENV==='production')throw Error('Browser fixture cannot run in production.');
const child=spawn(process.execPath,['--watch',resolve(root,qa?'tests/browser-fixture.mjs':'server/index.mjs'),...process.argv.slice(2)],{stdio:'inherit',env:{...process.env,...(qa?{HEBD_BROWSER_QA:'1'}:{})}});
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal));
child.on('exit',code=>process.exit(code||0));
