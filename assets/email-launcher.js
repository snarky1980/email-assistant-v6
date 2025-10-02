/*
  Email Launcher (simplified, always-on)
  - Persistent floating button (bottom-left) with sage frame.
  - Copies Subject + Body (if found) to clipboard first, then opens mailto.
  - Keeps re-injecting to survive UI mode changes.
*/
(function(){
  const BTN_ID='email-launch-btn';
  const WRAP_ID='email-launch-btn-wrap';

  function log(...a){ try{ console.debug('[email-launcher]',...a);}catch(_){} }

  function findSubject(){
    // Direct attribute / placeholder search
    const attrSel='input[name*="objet" i],input[id*="objet" i],input[placeholder*="objet" i],input[name*="subject" i],input[id*="subject" i],input[placeholder*="subject" i]';
    let el=document.querySelector(attrSel);
    if(el) return el;
    // Label based
    const labels=Array.from(document.querySelectorAll('label')).filter(l=>/objet|subject/i.test(l.textContent||''));
    for(const lab of labels){
      if(lab.htmlFor){ const byId=document.getElementById(lab.htmlFor); if(byId) return byId; }
      const inside=lab.querySelector('input,textarea'); if(inside) return inside;
      const next=lab.nextElementSibling; if(next && /INPUT|TEXTAREA/.test(next.tagName)) return next;
    }
    // Fallback: first single-line text input (not a search, not hidden) with length < 200
    const generic=Array.from(document.querySelectorAll('input[type="text"],input:not([type]),input[type="search"]'))
      .filter(i=> i.offsetWidth>120 && i.value && i.value.length<200);
    return generic[0] || null;
  }

  function isEditable(el){ return !!el && (el.tagName==='TEXTAREA' || el.isContentEditable || (el.getAttribute && el.getAttribute('role')==='textbox')); }
  function findBody(){
    const explicit=document.querySelector('[data-email-body],[data-body],[data-editor="body"]'); if(explicit) return explicit;
    const all=Array.from(document.querySelectorAll('textarea,[contenteditable="true"],[contenteditable=""],div[role=textbox]')).filter(isEditable);
    if(!all.length) return null;
    return all.sort((a,b)=> (b.getBoundingClientRect().height*b.getBoundingClientRect().width) - (a.getBoundingClientRect().height*a.getBoundingClientRect().width))[0];
  }

  function ensureWrapper(){
    let wrap=document.getElementById(WRAP_ID);
    if(!wrap){
      wrap=document.createElement('div');
      wrap.id=WRAP_ID;
      wrap.style.cssText='position:fixed;left:14px;bottom:18px;z-index:2147483600;';
      document.body.appendChild(wrap);
    }
    return wrap;
  }

  function ensureButton(){
    const wrap=ensureWrapper();
    let btn=document.getElementById(BTN_ID);
    if(!btn){
      btn=document.createElement('button');
      btn.id=BTN_ID; btn.type='button';
      btn.textContent='Nouveau courriel';
      btn.title='Ouvrir un nouveau courriel + copier Sujet & Corps';
      btn.onclick=handleClick;
      btn.onmouseenter=()=>{ btn.style.filter='brightness(1.05)'; };
      btn.onmouseleave=()=>{ btn.style.filter='none'; };
      wrap.appendChild(btn);
    }
    btn.style.cssText='background:#f6faf7;color:#0d5d63;border:2px solid #93b89d;padding:10px 18px;font-size:13px;font-weight:600;border-radius:18px;cursor:pointer;letter-spacing:.3px;display:inline-flex;align-items:center;gap:6px;box-shadow:0 4px 14px -6px rgba(15,23,42,.28),0 2px 4px -2px rgba(15,23,42,.18);transition:background .18s,transform .18s,border-color .25s; font-family:inherit;';
  }

  function handleClick(){
    try {
      const subjEl=findSubject();
      const bodyEl=findBody();
      const subjectRaw=subjEl ? (subjEl.value || subjEl.textContent || '') : '';
      let bodyRaw=bodyEl ? (bodyEl.value || bodyEl.innerText || bodyEl.textContent || '') : '';
      const subject=subjectRaw.replace(/\s+/g,' ').trim().slice(0,200);
      bodyRaw=bodyRaw.replace(/\n{3,}/g,'\n\n');
      const body=bodyRaw.trim();
      const clipText= subject ? `Sujet: ${subject}\n\n${body}` : body;
      copyToClipboard(clipText, subject ? 'Sujet + corps copiés' : 'Copié');
      const mailto=`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if(mailto.length>1800) console.warn('[email-launcher] mailto long; possible truncation');
      setTimeout(()=>{ window.location.href=mailto; },40);
    } catch(e){ console.error('[email-launcher] click failed', e); }
  }

  function copyToClipboard(text,label){
    if(!text || !text.trim()) return;
    if(navigator.clipboard){
      navigator.clipboard.writeText(text).then(()=> showToast(label)).catch(()=> fallbackCopy(text,label));
    } else fallbackCopy(text,label);
  }
  function fallbackCopy(text,label){
    try { const ta=document.createElement('textarea'); ta.style.position='fixed'; ta.style.opacity='0'; ta.value=text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove(); showToast(label); } catch(e){ log('fallback copy failed', e); }
  }
  function showToast(text){
    const anchor=document.getElementById(BTN_ID); if(!anchor) return;
    const existing=document.getElementById('email-launcher-toast'); if(existing) existing.remove();
    const div=document.createElement('div');
    div.id='email-launcher-toast';
    div.textContent=text;
    div.style.cssText='position:fixed;z-index:2147483601;background:#0d5d63;color:#fff;padding:6px 12px;font-size:12px;border-radius:20px;box-shadow:0 4px 10px -2px rgba(0,0,0,.35);opacity:0;transform:translateY(6px);transition:opacity .25s,transform .25s;pointer-events:none;';
    const r=anchor.getBoundingClientRect();
    const top=r.top-44; const left=r.left + r.width/2;
    div.style.top=(top<8 ? r.bottom+8 : top)+'px';
    div.style.left=left+'px';
    div.style.transform='translate(-50%, 6px)';
    document.body.appendChild(div);
    requestAnimationFrame(()=>{ div.style.opacity='1'; div.style.transform='translate(-50%,0)'; });
    setTimeout(()=>{ div.style.opacity='0'; div.style.transform='translate(-50%,-4px)'; },1600);
    setTimeout(()=>{ div.remove(); },2300);
  }

  function start(){ ensureButton(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', start); else start();
  setInterval(()=>{ ensureButton(); }, 2000); // persistence
})();
