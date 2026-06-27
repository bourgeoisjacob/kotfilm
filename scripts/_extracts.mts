import fs from "node:fs";
import { films } from "../lib/films";
import { personBios } from "../lib/personBios";
import { getJson } from "./ingest/http";
const slug=(s:string)=>s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g,"").trim().replace(/\s+/g,"-");
const FILM=/actor|actress|director|film|cinema|screenwriter|animator|cinematograph|producer|singer|composer|dancer|artist/i;
async function entity(name:string){
  const d:any=await getJson(`https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&type=item&language=en&limit=6&search=${encodeURIComponent(name)}`);
  const c=d.search??[]; const o=[...c.filter((x:any)=>FILM.test(x.description??"")),...c.filter((x:any)=>!FILM.test(x.description??""))];
  for(const x of o){ const e:any=await getJson(`https://www.wikidata.org/wiki/Special:EntityData/${x.id}.json`); const ent=e.entities?.[x.id]; const p31=(ent?.claims?.P31??[]).map((s:any)=>s.mainsnak?.datavalue?.value?.id); if(p31.includes("Q5")) return ent; }
  return null;
}
async function extract(lang:string,title:string){
  const d:any=await getJson(`https://${lang}.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=1&explaintext=1&redirects=1&titles=${encodeURIComponent(title)}`);
  const p=d.query?.pages; const pg=p?Object.values(p)[0] as any:undefined; return (pg?.extract||"").slice(0,700);
}
const names=new Map<string,string>();
for(const f of films){ names.set(slug(f.director),f.director); for(const c of f.cast||[]) names.set(slug(c),c); }
const targets=[...names.entries()].filter(([s])=>!(personBios as any)[s]);
const out:any={};
for(const [s,name] of targets){
  try{ const e=await entity(name); let ex=""; let src="";
    if(e){ const en=e.sitelinks?.enwiki?.title, ru=e.sitelinks?.ruwiki?.title;
      if(en){ex=await extract("en",en); src="en";}
      if((!ex||ex.length<120)&&ru){ex=await extract("ru",ru); src="ru";}
    }
    out[s]={name, src, ex};
    console.log(`${ex?"✓":"–"} ${s}`);
  }catch(e){ out[s]={name,src:"",ex:""}; console.log(`! ${s}`); }
}
fs.writeFileSync("scripts/_extracts.json", JSON.stringify(out,null,1));
console.log("done", Object.keys(out).length);
