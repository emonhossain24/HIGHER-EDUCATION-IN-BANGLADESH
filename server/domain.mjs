export class HttpError extends Error { constructor(status,message){super(message);this.status=status;} }
export const assert=(condition,message,status=400)=>{if(!condition)throw new HttpError(status,message);};
export const now=()=>new Date().toISOString();
export const clean=(value,max=4000)=>String(value??'').trim().slice(0,max);
export const kinds=['institution','source','campus','faculty','department','programme','course','admission','seat','fee','scholarship','ranking','regulatory','page','settings','navigation','representative'];
export const riskKinds=new Set(['admission','seat','fee','scholarship','ranking','regulatory']);
export const staffRoles=['editor','fact_checker','moderator','admin','owner'];
export const editRoles=['editor','fact_checker','admin','owner'];
export const reviewRoles=['fact_checker','admin','owner'];
export const modRoles=['moderator','admin','owner'];
export function safeUrl(value,{local=false}={}){
  if(local && /^\/(?:assets|media)\/[a-zA-Z0-9._/-]+$/.test(value||''))return value;
  try{const u=new URL(value);assert(['https:','http:'].includes(u.protocol),'Use an HTTP(S) source URL.');assert(!u.username&&!u.password,'Credentials in URLs are not allowed.');return u.href;}catch{throw new HttpError(400,'Use a valid HTTP(S) URL.');}
}
export function admissionStatus(data,date=new Date()){
  if(data.state==='cancelled')return 'cancelled';
  if(data.superseded_by)return 'superseded';
  if(data.verification!=='verified'||!data.source_url)return 'not_verified';
  if(!data.opens_at||!data.closes_at)return data.deadline_date||data.announcement_state?'announcement_only':'not_verified';
  if(data.restricted)return 'restricted';
  const start=Date.parse(data.opens_at),end=Date.parse(data.closes_at),time=date.getTime();
  if(!Number.isFinite(start)||!Number.isFinite(end)||end<=start)return 'not_verified';
  return time<start?'upcoming':time>=end?'closed':data.extended?'extended':'open';
}
export function calculateFee(fee,waiver=0){
  if(fee.basis==='published_total'&&fee.verification==='verified'&&['published_total','credits','per_credit'].every(k=>typeof fee[k]==='number'&&fee[k]>=0)){assert(Number.isFinite(waiver)&&waiver>=0&&waiver<=100,'Waiver must be between 0 and 100.');const allowed=Math.min(waiver,fee.waiver_cap??0),discount=(fee.published_tuition??fee.credits*fee.per_credit)*allowed/100;return {status:'estimated',gross:fee.published_total,tuition:fee.published_tuition??fee.credits*fee.per_credit,waiver:discount,net:Math.max(0,fee.published_total-discount),waiver_percent:allowed,currency:'BDT',basis:'Published source total minus tuition-only scenario waiver',excludes:fee.excludes};}
  const fields=['credits','per_credit','terms','per_term','one_time','other_required'];
  if(fields.some(k=>typeof fee[k]!=='number'||!Number.isFinite(fee[k])||fee[k]<0)||fee.verification!=='verified')return {status:'not_verified',message:'Unable to calculate reliably. Required inputs are not verified.'};
  assert(Number.isFinite(waiver)&&waiver>=0&&waiver<=100,'Waiver must be between 0 and 100.');
  const allowed=Math.min(waiver,fee.waiver_cap??0),tuition=fee.credits*fee.per_credit;
  const gross=tuition+fee.terms*fee.per_term+fee.one_time+fee.other_required;
  return {status:'estimated',gross,tuition,waiver:tuition*allowed/100,net:gross-tuition*allowed/100,waiver_percent:allowed,currency:'BDT',excludes:fee.excludes||'Housing, food, transport, books and retakes unless explicitly included.',formula:'credits × per-credit rate + terms × term charges + one-time + other required − tuition waiver'};
}
export function eligibility(rules,profile){
  if(!Array.isArray(rules)||!rules.length)return {result:'cannot_determine',checks:[]};
  const ops={gte:(a,b)=>a>=b,lte:(a,b)=>a<=b,eq:(a,b)=>String(a)===String(b),in:(a,b)=>Array.isArray(b)&&b.map(String).includes(String(a))};
  const checks=rules.map(r=>{const value=profile[r.field],missing=value===undefined||value===null||value==='';const numeric=['gte','lte'].includes(r.op);const valid=!missing&&(!numeric||(typeof value==='number'&&Number.isFinite(value)));return {label:r.label||r.field,field:r.field,expected:r.value,actual:value??null,status:!valid||!ops[r.op]?'unknown':ops[r.op](value,r.value)?'meets':'fails',source_url:r.source_url};});
  return {result:checks.some(c=>c.status==='fails')?'does_not_meet':checks.some(c=>c.status==='unknown')?'cannot_determine':'meets_stated_rules',checks};
}
export function validateRecord(kind,d,publish=false){
  assert(kinds.includes(kind),'Unknown content type.');assert(d&&typeof d==='object'&&!Array.isArray(d),'Content must be a JSON object.');
  assert(typeof d.title==='string'&&d.title.trim().length>=2&&d.title.length<=250,'A title of 2–250 characters is required.');
  assert(JSON.stringify(d).length<=100000,'Content is too large.');
  for(const [key,value] of Object.entries(d)){
    if((key.endsWith('_url')||key==='url')&&value)safeUrl(value,{local:['logo_url','favicon_url','image_url'].includes(key)});
    if(['credits','per_credit','terms','per_term','one_time','other_required','seats','duration_months','waiver_cap','rank_exact','rank_band_from','rank_band_to','published_total','published_tuition','lab_and_activities_total'].includes(key)&&value!==null&&value!==undefined)assert(typeof value==='number'&&Number.isFinite(value)&&value>=0,`${key} must be a nonnegative number.`);
  }
  if(d.checked_at)assert(Number.isFinite(Date.parse(d.checked_at)),'Checked date must be valid.');
  if(d.verification)assert(['not_verified','verified','conflicting','expired','not_applicable'].includes(d.verification),'Invalid verification state.');
  if(kind==='page'&&d.blocks){assert(Array.isArray(d.blocks)&&d.blocks.length<=50,'A page can contain up to 50 blocks.');for(const block of d.blocks){assert(['heading','paragraph','callout','link'].includes(block.type)&&typeof block.text==='string','Invalid content block.');if(block.type==='link')safeUrl(block.url);}}
  if(kind==='ranking'){
    assert(!d.rank_exact||(!d.rank_band_from&&!d.rank_band_to),'Exact rank and rank band cannot coexist.');
    if(d.rank_band_from||d.rank_band_to)assert(d.rank_band_from>0&&d.rank_band_to>=d.rank_band_from,'Invalid ranking band.');
    if(publish)assert(d.publisher&&d.product&&Number.isInteger(d.edition)&&d.scope&&d.source_url&&d.license_note,'Ranking needs publisher, product, edition, scope, source and a reuse-rights note.');
  }
  if(kind==='admission'){
    if(d.opens_at||d.closes_at){for(const value of [d.opens_at,d.closes_at].filter(Boolean))assert((/[Zz]$|[+-]\d\d:\d\d$/.test(value))&&Number.isFinite(Date.parse(value)),'Admission timestamps require a valid explicit time zone.');if(d.opens_at&&d.closes_at)assert(Date.parse(d.closes_at)>Date.parse(d.opens_at),'Closing time must follow opening time.');}
    if(publish)assert(d.session&&d.source_url,'Admission requires an effective session and source.');
    if(d.rules)for(const r of d.rules)assert(['gte','lte','eq','in'].includes(r.op)&&typeof r.field==='string'&&r.source_url,'Eligibility rules require a supported operator, field and source.');
  }
  if(kind==='seat'&&publish)assert(d.session&&d.programme_id&&d.quota&&Number.isInteger(d.seats),'Seats require session, programme, category and integer capacity.');
  if(kind==='fee'&&d.published_tuition!==undefined&&d.published_total!==undefined)assert(d.published_tuition<=d.published_total,'Tuition cannot exceed the published total.');
  if(d.expires_at)assert(Number.isFinite(Date.parse(d.expires_at)),'Review expiry must be valid.');
  if(kind==='fee'&&publish)assert(d.programme_id&&d.effective_session&&d.expires_at,'Fees require programme, effective session and expiry date.');
  if(kind==='scholarship'&&publish)assert(d.benefit&&d.criteria&&d.renewal,'Scholarships require benefit, criteria and renewal terms.');
  if(kind==='settings'){
    if('modules' in d)assert(Array.isArray(d.modules),'Homepage modules must be a list.');
    if('colors' in d)assert(d.colors&&typeof d.colors==='object'&&!Array.isArray(d.colors),'Palette must be an object.');
    for(const key of ['hero_en','hero_bn','intro_en','intro_bn','footer_en','footer_bn','logo_url','favicon_url'])if(key in d)assert(typeof d[key]==='string'&&(!['logo_url','favicon_url'].includes(key)||d[key].length>0),'Required appearance fields cannot be empty or invalid.');
    for(const key of ['registration','messaging'])if(key in d)assert(typeof d[key]==='boolean','Feature flags must be true or false.');
    for(const value of Object.values(d.colors||{}))assert(/^#[a-fA-F0-9]{6}$/.test(value),'Theme colors must use #RRGGBB.');
    if(d.font)assert(['system','serif','sans'].includes(d.font),'Unsupported font.');
    for(const key of ['logo_url','favicon_url'])if(d[key])safeUrl(d[key],{local:true});
    assert(!d.modules||d.modules.every(x=>['directory','subjects','admissions','compare','funding','rankings','community','sources'].includes(x)),'Unknown homepage module.');
  }
  if(kind==='navigation'){
    assert(Array.isArray(d.items)&&d.items.length<=12,'Navigation requires up to 12 items.');
    for(const item of d.items)assert(typeof item.label==='string'&&/^\/[a-z0-9?&=_/-]*$/i.test(item.href)&&!item.href.startsWith('//'),'Navigation must use safe local routes.');
  }
  if(publish&&riskKinds.has(kind))assert(d.source_url&&d.effective_session&&d.verification==='verified'&&d.checked_at,'Publishing this fact requires a source, effective session/edition, checked date and verification.');
  return d;
}
export function validateInstitution(d){
  assert(typeof d.name_en==='string'&&d.name_en.length>=2,'Institution name is required.');
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(d.slug),'Slug must contain lowercase words separated by hyphens.');
  assert(['university','medical_college','dental_college','dental_unit','textile_college','textile_institute','affiliated_college','nursing_institution','other_hei'].includes(d.kind),'Invalid institution kind.');
  assert(d.kind==='university'||!d.directory_listed,'Colleges cannot be counted as UGC universities.');
  assert(['public','private','international','cbhe',null].includes(d.category??null),'Invalid UGC category.');
  if(d.website_url){safeUrl(d.website_url);assert(d.website_verified===true,'Confirm verification before publishing a website link.');}
  if(d.regulatory_status==='verified'||d.admission_permission==='verified')assert(d.checked_at&&Number.isFinite(Date.parse(d.checked_at)),'Verified regulatory or admission status needs a valid checked date.');
  safeUrl(d.source_url);return d;
}
