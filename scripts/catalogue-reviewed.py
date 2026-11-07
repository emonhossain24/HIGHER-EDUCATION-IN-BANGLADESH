import json,pathlib
root=pathlib.Path(__file__).resolve().parents[1]
records=[]
def add(id,kind,inst,data):
 data.update(checked_at='2026-11-06',verification='verified',provenance='Official source checked on 2026-11-06; a field may still be explicitly unknown. No admission or award guarantee.')
 if kind=='fee':
  data['expires_at']='2027-02-04T00:00:00+06:00'
  data['review_policy']='Platform review due after 90 days; this is not an institution-declared fee expiry.'
 records.append(dict(id=id,kind=kind,institution_id=inst,data=data))
ulab='ugc-private-047';brac='ugc-private-016'
u='https://admissions.ulab.edu.bd/undergraduate-programs/tuition-fees';b='https://www.bracu.ac.bd/admissions/tuition-and-fees'
for code,title,credits,rate,total in [('bba','Bachelor of Business Administration',130,6000,851500),('msj','BSS in Media Studies and Journalism',130,6400,903500),('english','BA in English and Humanities',130,4650,676000),('bangla','BA in Bangla Language and Literature',130,1800,305500),('cse','BSc in Computer Science and Engineering',140,5000,771500),('eee','BSc in Electrical and Electronic Engineering',140,5000,771500),('ess','BSc in Environmental Science and Sustainability',130,5500,786500)]:
 pid='ulab-'+code
 add(pid,'programme',ulab,dict(title=title,level='Bachelor',credits=credits,duration_months=None,source_url=u,programme_approval='not_verified',curriculum_version='not stated by fee page'))
 add(pid+'-fees','fee',ulab,dict(title='ULAB '+code.upper()+' — published fee page',programme_id=pid,effective_session='Intake not specified on published fee page',source_url=u,basis='published_total',published_total=total,credits=credits,per_credit=rate,waiver_cap=40,terms=None,per_term=None,one_time=None,other_required=None,excludes='Remedial courses, living expenses and any future revisions. Published page incorporates specified activity charges.',fee_note='Published total is shown directly; missing component schedules are not inferred. For EEE/ESS the page separately advertises a special waiver; confirm eligibility and stacking.'))
for code,title in [('cse','BSc in Computer Science and Engineering'),('cs','BSc in Computer Science'),('bba','Bachelor of Business Administration')]:
 add('brac-'+code,'programme',brac,dict(title=title,level='Bachelor',source_url='https://www.bracu.ac.bd/ug-domestic-applicant',credits=None,duration_months=None,programme_approval='not_verified'))
 add('brac-'+code+'-spring-2027-fees','fee',brac,dict(title='BRAC '+code.upper()+' — Spring 2027 fees',programme_id='brac-'+code,effective_session='Spring 2027',source_url=b,credits=None,per_credit=8250,terms=None,per_term=14175 if code=='cse' else 10520,one_time=36400,other_required=None,waiver_cap=0,residential_semester=90000,application_fee=1750,fee_note='One-time subtotal: admission 33,900 + library 2,500. Residential semester and application charges are separate. Credits/charged terms and other required components must be confirmed; no full-degree total inferred.'))
add('brac-spring-2027','admission',brac,dict(title='BRAC University undergraduate — Spring 2027',session='Spring 2027',effective_session='Spring 2027',source_url='https://www.bracu.ac.bd/ug-domestic-applicant',application_url='https://connect.bracu.ac.bd/',deadline_date='2026-11-22',deadline_time='not stated',exam_at='2026-11-27T09:30:00+06:00',opens_at=None,closes_at=None,rules=[],eligibility_note='Programme-specific requirements and equivalence rules must be checked in the official notice. No generic all-programme GPA rule is applied.'))
add('ulab-spring-2027','admission',ulab,dict(title='ULAB undergraduate — Spring 2027 announcement',session='Spring 2027',effective_session='Spring 2027',source_url='https://admissions.ulab.edu.bd/',application_url='https://oam.ulab.edu.bd/',announcement_state='open as stated on source page',deadline_date=None,exam_date='2026-12-03',exam_time='not stated',opens_at=None,closes_at=None,rules=[],eligibility_note='Current source announces admission, but does not state an exact closing time in the retrieved text. Confirm with Admissions.'))
add('ulab-waiver-summary','scholarship',ulab,dict(title='ULAB undergraduate tuition-waiver pathways',effective_session='Current published policy checked 2026-11-06; confirm intake',source_url=u,benefit='Tuition-only waivers; rate depends on published academic/relationship criteria.',criteria='The source lists merit and relationship categories. Refer to the original table for exact criteria and excluded fourth-subject treatment.',renewal='Confirm continued eligibility and renewal performance requirements with ULAB.',stacking='Ordinary combined waiver capped at 40%; separately qualifying 100% cases have different conditions.',application_url='https://admissions.ulab.edu.bd/undergraduate-programs/scholarships-financial-aid'))
(root/'data/seeds/reviewed-catalogue.json').write_text(json.dumps(records,ensure_ascii=False,indent=2)+'\n')
p=root/'data/seeds/specialists.json';specialists=json.loads(p.read_text())
for i in specialists:
 if 'recognition withheld' in i['name_en'].lower():i.update(regulatory_status='recognition_withheld_in_source',notice_flag=True,notice_text='BMDC source row explicitly states recognition withheld. Do not infer admission eligibility.')
p.write_text(json.dumps(specialists,ensure_ascii=False,indent=2)+'\n')
print(len(records),'source-backed catalogue records')
