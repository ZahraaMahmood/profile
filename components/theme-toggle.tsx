'use client';
import {useEffect,useState} from 'react';
import {Moon,Sun} from 'lucide-react';
export function ThemeToggle(){const [theme,setTheme]=useState<'dark'|'light'>('dark');useEffect(()=>{const stored=localStorage.getItem('theme');const next=stored==='light'||stored==='dark'?stored:(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');setTheme(next);document.documentElement.dataset.theme=next},[]);function toggle(){const next=theme==='dark'?'light':'dark';setTheme(next);document.documentElement.dataset.theme=next;localStorage.setItem('theme',next)}return <button onClick={toggle} type="button" className="theme-toggle" aria-label={`Switch to ${theme==='dark'?'light':'dark'} theme`}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button>}
