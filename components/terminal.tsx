'use client';
import {useState, useRef, FormEvent} from 'react';
import {Terminal as TerminalIcon} from 'lucide-react';
const replies: Record<string,string[]> = {
 help:['Available commands: about, stack, experience, projects, contact, github, clear'],
 about:['Zahraa Mahmood — backend-focused full-stack engineer based in Mosul, Iraq.','I build dependable backend systems, cloud integrations, and services that scale.'],
 stack:['Node.js · TypeScript · PostgreSQL · AWS · Docker · REST APIs · integrations'],
 experience:['5+ years in software engineering; backend systems, payments, subscription flows, cloud operations.'],
 projects:['01 Resilient subscription flows','02 Streaming content ingestion','03 AWS backend operations'],
 contact:['Email: zahraamahmood222@gmail.com','Or scroll to the contact form below.'],
 github:['github.com/ZahraaMahmood']
};
type Line={input?:string;output:string};
export function Terminal(){const [value,setValue]=useState('');const [lines,setLines]=useState<Line[]>([{output:'Welcome to ZahraaOS · type help to get started.'}]);const field=useRef<HTMLInputElement>(null);
function submit(e:FormEvent){e.preventDefault();const command=value.trim().toLowerCase();if(!command)return;if(command==='clear'){setLines([])}else setLines(prev=>[...prev,{input:command,output:(replies[command]||[`Command not found: ${command}. Try help.`]).join('\n')}].slice(-12));setValue('')}
return <div className="terminal-shell" onClick={()=>field.current?.focus()}><div className="terminal-bar"><span className="traffic">● ● ●</span><span><TerminalIcon size={14}/> zahraa@portfolio:~</span><span className="terminal-tag">INTERACTIVE</span></div><div className="terminal-body" role="log" aria-live="polite">{lines.map((line,i)=><div className="terminal-line" key={i}>{line.input&&<div><span className="prompt">➜ ~</span> {line.input}</div>}<pre>{line.output}</pre></div>)}<form onSubmit={submit} className="terminal-entry"><label htmlFor="command-line" className="prompt">➜ ~</label><input ref={field} id="command-line" value={value} onChange={e=>setValue(e.target.value)} autoComplete="off" spellCheck={false} aria-label="Terminal command" placeholder="type help"/><button type="submit" aria-label="Run command">↵</button></form></div></div>}
