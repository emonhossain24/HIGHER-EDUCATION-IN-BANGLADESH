"""Reproduce the supplied blueprint inventory without asserting live verification."""
import re,json,pathlib,collections
root=pathlib.Path(__file__).resolve().parents[1]
text=(root/'docs/HEBD_MASTER_WEBSITE_BLUEPRINT_v2.0.md').read_text()
part=text.split('## 18. MASTER DATA INVENTORY')[1].split('## 19.')[0]
cats={'18.1':'public','18.2':'private','18.3':'international','18.4':'cbhe'}
urls={'public':'public-universities','private':'private-universities','international':'international-universities','cbhe':'cbhe'}
records=[]
for section in re.split(r'(?=### 18\.)',part):
    cat=next((v for k,v in cats.items() if section.startswith('### '+k)),None)
    if not cat: continue
    for row,name,raw,flag in re.findall(r'^\| (\d+) \| (.*?) \| (.*?) \| (.*?) \|$',section,re.M):
        slug=re.sub(r'[^a-z0-9]+','-',name.lower().replace('&','and')).strip('-') or 'shariatpur-agricultural-university'
        anomalies=[]
        if raw=='—': anomalies.append('missing_website')
        if ', ' in raw or ' ' in raw or raw.endswith('.'): anomalies.append('malformed_or_multiple_website')
        records.append(dict(id=f'ugc-{cat}-{int(row):03}',slug=slug,name_en=name,name_bn=name if re.search('[\u0980-\u09ff]',name) else None,category=cat,kind='university',ownership={'public':'government','private':'private','international':'international','cbhe':'unknown'}[cat],directory_listed=True,directory_row=int(row),website_raw=None if raw=='—' else raw,website_url=None,website_verified=False,source_url='https://www.ugc.gov.bd/universities/'+urls[cat],source_id='ugc-'+cat,snapshot_date='2026-11-06',provenance='Supplied blueprint Section 18; not independently revalidated during implementation',notice_flag='⚠' in flag,notice_text=flag if '⚠' in flag else None,regulatory_status='not_verified',admission_permission='not_verified',division=None,district=None,founding_year=None,summary_en=None,summary_bn=None,aliases=[],tags=[],anomalies=anomalies))
counts=collections.Counter(x['category'] for x in records)
assert counts=={'public':61,'private':116,'international':3,'cbhe':1},counts
assert len(set(x['slug'] for x in records))==181
# Preserve duplicate domains as a review flag; never silently fix the published raw string.
domains=collections.Counter(x['website_raw'] for x in records if x['website_raw'])
for item in records:
    if domains[item['website_raw']]>1:item['anomalies'].append('shared_published_website')
(root/'data/seeds/ugc-2026-11-06.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
print(dict(counts))
