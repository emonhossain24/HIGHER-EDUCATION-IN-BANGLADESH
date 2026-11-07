// Read-only smoke checks. A configured mail endpoint is not proof of inbox delivery.
const target=process.argv[2];
if(!target)throw Error('Usage: npm run verify:live -- https://your-production-origin');
const origin=new URL(target);
if(origin.protocol!=='https:'||origin.username||origin.password||origin.pathname!=='/'||origin.search||origin.hash)throw Error('Use the exact HTTPS production origin without credentials, path or query.');
const checks=[];
for(const path of ['/api/health','/api/bootstrap','/universities','/admissions','/calendar.ics']){
 try{
  const response=await fetch(new URL(path,origin),{redirect:'error',signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw Error('HTTP '+response.status);
  if(path==='/api/health'){
   const health=await response.json();
   if(health.service!=='hebd'||!health.ok)throw Error('HEBD database health failed');
   checks.push({path,status:'passed',mail_configured:health.mail_configured});
   if(!health.mail_configured||health.development_mail)checks.push({check:'production mail configuration',status:'failed'});
  }else{
   if(path==='/universities'&&(!response.headers.get('strict-transport-security')||!response.headers.get('content-security-policy')))throw Error('Required production security headers missing');
   checks.push({path,status:'passed'});
  }
 }catch(error){checks.push({path,status:'failed',reason:error.message});}
}
console.log(JSON.stringify({checks,live_email_delivery:'not tested; verify signup/recovery in a real inbox',browser_authentication:'not tested by this read-only script'},null,2));
if(checks.some(x=>x.status==='failed'))process.exitCode=1;
