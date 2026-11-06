import pathlib,json,re,collections
root=pathlib.Path(__file__).resolve().parents[1]
path=root/'data/seeds/ugc-2026-11-06.json'
items=json.loads(path.read_text())
for i in items:
 i['directory_checked_at']='2026-11-06'
 i['directory_evidence']='Official UGC category table retrieved through official-domain search results on 2026-11-06. Identity/category only; programme, campus, admission and website availability are separate checks.'
path.write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n')
old=json.loads((root/'data/seeds/specialists.json').read_text())
def norm(v):return re.sub('[^a-z0-9]','',v.lower().replace('suhrawardy','suhrawardi').replace('’',"'"))
lookup={norm(i['name_en']):i for i in old}
result=[]
for item in json.loads((root/'data/bmdc-reviewed-identities.json').read_text()):
 name=item['name'];base=lookup.get(norm(name));slug=re.sub('[^a-z0-9]+','-',name.lower()).strip('-')
 i=base or dict(id='bmdc-'+slug,slug=slug,name_en=name,name_bn=None,kind=item['kind'],category=None,ownership='unknown',directory_listed=False,regulatory_status='not_verified',admission_permission='not_verified',website_url=None,website_verified=False,aliases=[],tags=[],snapshot_date='2026-11-06')
 i.update(source_id='bmdc',source_url='https://www.bmdc.org.bd/about-college-n',directory_checked_at='2026-11-06',source_section=item['source_section'],source_line=item['source_line'],ownership=item['ownership'] if 'Govt' in item['source_section'] else 'unknown',provenance='Identity transcribed from the BMDC source table on 2026-11-06. Section affiliations may describe historical sessions. Current recognition and DGME admission authorization require individual confirmation.')
 result.append(i)
seen={norm(i['name_en']) for i in result}
result += [i for i in old if norm(i['name_en']) not in seen]
assert len(set(i['slug'] for i in result))==len(result)
(root/'data/seeds/specialists.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('Specialists',len(result),dict(collections.Counter(i['kind'] for i in result)))
