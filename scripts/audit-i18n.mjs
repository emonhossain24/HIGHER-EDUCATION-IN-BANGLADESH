import {readFileSync,readdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {translate,translationKeys} from '../public/i18n.js';
const root=resolve(import.meta.dirname,'..'),strings=new Set();
for(const name of readdirSync(resolve(root,'public'))){if(!/\.(js|html)$/.test(name)||name.startsWith('i18n'))continue;const source=readFileSync(resolve(root,'public',name),'utf8');for(const match of source.matchAll(/>\s*([A-Za-z][^<>{}$]*?)</g)){const value=match[1].trim();if(value.length<3||/=>|document\.|\.dataset|\.querySelector|===|`|String\(v|Request ID:|\.find\(|\.filter\(/.test(value))continue;strings.add(value);}}
for(const name of readdirSync(resolve(root,'public'))){if(!/\.(js|html)$/.test(name)||name.startsWith('i18n'))continue;const source=readFileSync(resolve(root,'public',name),'utf8');for(const pattern of [/\b(?:heading|empty|toast)\(\s*(['"])((?:\\.|(?!\1).)*?)\1/g, /(?:aria-label|placeholder|alt)="([A-Za-z][^"${}]*?)"/g])for(const match of source.matchAll(pattern)){const value=(match[2]??match[1]).trim();if(value.length>=3&&!value.includes("'+")&&!/^ugc-[a-z]+-\d+$/.test(value))strings.add(value);}}
for(const name of readdirSync(resolve(root,'server'))){if(!name.endsWith('.mjs'))continue;const source=readFileSync(resolve(root,'server',name),'utf8');for(const match of source.matchAll(/'([^'\n]{12,})'/g)){const value=match[1];if(/^[A-Z][a-z][A-Za-z0-9 ,.:;()/%–+?_-]+[.!]$/.test(value))strings.add(value);}}
const preserved=new Set(['THE','BD / 2026','QS']);
const missing=[...strings].filter(value=>!preserved.has(value)&&translate(value)===value).sort();
const report={interface_dictionary_entries:translationKeys().length,static_ui_strings_checked:strings.size,preserved_identifiers:[...preserved],missing};
if(process.argv.includes('--write'))writeFileSync(resolve(root,'docs/translation-audit.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));if(missing.length)process.exitCode=1;
