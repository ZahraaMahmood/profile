'use client';
import {useState} from 'react';
import {Cloud, Database, Server, ShieldCheck, RadioTower, Activity, ArrowRight} from 'lucide-react';
const nodes = [
 {id:'edge',title:'Edge & API',subtitle:'Routing + authentication',details:'Request authentication, validation, rate controls, and contract boundaries form the public entry point.', icon:ShieldCheck},
 {id:'service',title:'Services',subtitle:'TypeScript / Node.js',details:'Business rules live in separately testable services with clear state transitions and reliable background work.',icon:Server},
 {id:'events',title:'Async flows',subtitle:'Events + webhooks',details:'Asynchronous events are processed with idempotency, retries, explicit outcomes, and observability.',icon:RadioTower},
 {id:'data',title:'Persistence',subtitle:'PostgreSQL',details:'Transactional data models, constraints, and efficient queries support a consistent source of truth.',icon:Database},
 {id:'observe',title:'Operations',subtitle:'AWS observability',details:'Structured logs, service metrics, and operational alerts support production diagnostics.',icon:Activity},
];
export function Architecture(){const [active,setActive]=useState('service'); const current=nodes.find(n=>n.id===active)!; return <div className="arch-wrap">
 <div className="arch-caption"><span className="live-dot"/> INTERACTIVE SYSTEM EXPLORER <span className="caption-right">Conceptual architecture · not a production diagram</span></div>
 <div className="arch-grid"><div className="arch-path">{nodes.map((n,i)=>{const Icon=n.icon;return <div key={n.id} className="node-holder"><button type="button" onClick={()=>setActive(n.id)} aria-pressed={active===n.id} className={`arch-node ${active===n.id?'selected':''}`}><Icon size={22}/><strong>{n.title}</strong><small>{n.subtitle}</small></button>{i<nodes.length-1&&<ArrowRight className="flow-arrow" size={17} aria-hidden/>}</div>})}</div>
 <div className="arch-detail" aria-live="polite"><div className="detail-top"><Cloud size={20}/><span>ARCHITECTURE NOTE / {current.id.toUpperCase()}</span></div><h3>{current.title}</h3><p>{current.details}</p><span className="small-muted">Select a component to explore its role.</span></div></div>
 </div>}
