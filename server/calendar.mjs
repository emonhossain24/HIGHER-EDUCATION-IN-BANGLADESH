function escape(value){return String(value??'').replace(/[\\;,\r\n]/g,c=>({'\\':'\\\\',';':'\\;',',':'\\,','\r':'','\n':'\\n'}[c]));}
const utc=value=>new Date(value).toISOString().replace(/[-:]/g,'').replace(/\.\d+Z$/,'Z');
export function formatCalendar(items,stamp=new Date().toISOString()){
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//HEBD//Admissions//EN','CALSCALE:GREGORIAN',...items.flatMap((x,i)=>['BEGIN:VEVENT','UID:'+escape(x.id)+'-'+i+'@hebd','DTSTAMP:'+utc(stamp),x.time.length===10?'DTSTART;VALUE=DATE:'+x.time.replaceAll('-',''):'DTSTART:'+utc(x.time),'SUMMARY:'+escape(x.title),'DESCRIPTION:'+escape(x.session+' · '+x.source_url),'END:VEVENT']),'END:VCALENDAR'];
 // Fold by UTF-8 octets without breaking a code point (RFC 5545).
 return lines.flatMap(line=>{const result=[];let part='',size=0;for(const c of line){const bytes=Buffer.byteLength(c);if(size+bytes>74){result.push(part);part=' ';size=1;}part+=c;size+=bytes;}result.push(part);return result;}).join('\r\n')+'\r\n';
}
