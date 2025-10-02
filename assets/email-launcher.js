/*
  Email Launcher Button
  - Injects a "Nouveau courriel" button into the editing interface.
  - On click, opens the default mail client with current Subject + Body via a mailto: link.
  - Heuristics used to locate subject & body fields (input/textarea/contenteditable).
*/
(function(){
  const BTN_ID='email-launch-btn';
  if(document.getElementById(BTN_ID)) return; // avoid duplicates

  function log(...a){ try{ console.debug('[email-launcher]',...a);}catch(_){} }

  // Heuristic finders
  function findSubject(){
    // Look for input or textarea with name/id including subject, or label containing Objet/Subject
    const candidates = Array.from(document.querySelectorAll('input,textarea'));
    let best = candidates.find(el=>/subject|objet/i.test(el.name||'') || /subject|objet/i.test(el.id||''));
    if(best) return best;
    // Label association
    for(const el of candidates){
      if(!el.id) continue;
      const lab=document.querySelector(`label[for="${el.id}"]`);
      if(lab && /objet|subject/i.test(lab.textContent||'')) return el;
    }
    // Fallback: first text input near a label containing Objet
    const labels = Array.from(document.querySelectorAll('label'));
    const labelObjet = labels.find(l=>/objet|subject/i.test(l.textContent||''));
    if(labelObjet){ const inp = labelObjet.parentElement && labelObjet.parentElement.querySelector('input,textarea'); if(inp) return inp; }
    return null;
  }
  function isEditable(el){ return !!el && (el.tagName==='TEXTAREA' || el.isContentEditable || (el.getAttribute && el.getAttribute('role')==='textbox')); }
  function findBody(){
    // Prefer explicit markers
    const explicit = document.querySelector('[data-email-body],[data-body],[data-editor="body"]'); if(explicit) return explicit;
    // Largest textarea / contenteditable as fallback
    const all = Array.from(document.querySelectorAll('textarea,[contenteditable="true"],[contenteditable=""],div[role=textbox]'))
      .filter(isEditable);
    if(!all.length) return null;
    return all.sort((a,b)=> (b.getBoundingClientRect().height*b.getBoundingClientRect().width) - (a.getBoundingClientRect().height*a.getBoundingClientRect().width))[0];
  }

  function buildButton(container){
    const btn=document.createElement('button');
    btn.id=BTN_ID; btn.type='button'; btn.textContent='Nouveau courriel';
    btn.style.cssText='background:var(--tb-teal,#0d8094);color:#fff;border:1px solid var(--tb-teal,#0d8094);padding:8px 16px;font-size:13px;font-weight:600;border-radius:14px;cursor:pointer;letter-spacing:.3px;display:inline-flex;align-items:center;gap:6px;box-shadow:0 4px 14px -6px rgba(15,23,42,.4),0 2px 4px -2px rgba(15,23,42,.25);transition:background .18s,transform .18s;';
    btn.onmouseenter=()=>{ btn.style.filter='brightness(1.08)'; };
    btn.onmouseleave=()=>{ btn.style.filter='none'; };
    btn.onclick=()=>{
      try {
        const subjEl=findSubject();
        const bodyEl=findBody();
        const subjectRaw = subjEl ? (subjEl.value || subjEl.textContent || '') : '';
        let bodyRaw = bodyEl ? (bodyEl.value || (bodyEl.innerText || bodyEl.textContent) || '') : '';
        // Basic trimming
        const subject = subjectRaw.trim().slice(0,200); // keep subject reasonable
        bodyRaw = bodyRaw.replace(/\n{3,}/g,'\n\n');
        const body = bodyRaw.trim();
        const encSubj = encodeURIComponent(subject);
        const encBody = encodeURIComponent(body);
        const mailto = `mailto:?subject=${encSubj}&body=${encBody}`;
        log('opening mailto', { length: mailto.length });
        // Very long bodies can overflow typical OS limits; warn in console
        if(mailto.length > 1800){ console.warn('[email-launcher] mailto URL is large; some clients may truncate.'); }
        window.location.href = mailto; // direct open (lets system handler decide)

        // Also copy subject + body to clipboard for convenience
        const clipText = subject ? `Sujet: ${subject}\n\n${body}` : body;
        if(navigator.clipboard && clipText.trim()){
          navigator.clipboard.writeText(clipText).then(()=>{
            showCopiedToast(btn, subject ? 'Sujet + corps copiés' : 'Corps copié');
          }).catch(err=>{
            log('clipboard write failed', err);
          });
        } else if(clipText.trim()) {
          // Fallback method
            const ta=document.createElement('textarea');
            ta.style.position='fixed'; ta.style.opacity='0'; ta.value=clipText; document.body.appendChild(ta); ta.select();
            try { document.execCommand('copy'); showCopiedToast(btn, subject ? 'Sujet + corps copiés' : 'Copié'); } catch(e){ log('execCommand copy failed', e); }
            document.body.removeChild(ta);
        }
      } catch(e){ console.error('[email-launcher] failed to build email', e); }
    };
    container.appendChild(btn);
  }

  function showCopiedToast(anchor, text){
    try {
      const existing=document.getElementById('email-launcher-toast'); if(existing) existing.remove();
      const div=document.createElement('div');
      div.id='email-launcher-toast';
      div.textContent=text;
      div.style.cssText='position:fixed;z-index:2147483601;background:#0d8094;color:#fff;padding:6px 12px;font-size:12px;border-radius:20px;box-shadow:0 4px 10px -2px rgba(0,0,0,.35);opacity:0;transform:translateY(6px);transition:opacity .25s,transform .25s;pointer-events:none;';
      const rect = anchor.getBoundingClientRect();
      const top = rect.top - 38; const left = rect.left + (rect.width/2);
      div.style.top = (top < 8 ? rect.bottom + 8 : top) + 'px';
      div.style.left = (left) + 'px';
      div.style.transform = 'translate(-50%, 6px)';
      document.body.appendChild(div);
      requestAnimationFrame(()=>{ div.style.opacity='1'; div.style.transform='translate(-50%,0)'; });
      setTimeout(()=>{ div.style.opacity='0'; div.style.transform='translate(-50%, -4px)'; }, 1800);
      setTimeout(()=>{ div.remove(); }, 2400);
    } catch(e){ log('toast failed', e); }
  }

  function findToolbar(){
    // Seek a container with existing action buttons like Copier / Exporter
    const buttons = Array.from(document.querySelectorAll('button'));
    const copyBtn = buttons.find(b=>/copier|copy/i.test(b.textContent||''));
    if(copyBtn){ return copyBtn.parentElement || copyBtn.closest('div'); }
    // fallback: first element with multiple buttons
    const multi = buttons.map(b=> b.parentElement).find(p=> p && p.querySelectorAll('button').length>=2);
    return multi || null;
  }

  function inject(){
    if(document.getElementById(BTN_ID)) return;
    const subj=findSubject(); const body=findBody();
    if(!subj && !body){ return; } // wait until at least one appears
    let toolbar=findToolbar();
    if(toolbar){ buildButton(toolbar); log('button added to toolbar'); return; }
    // fallback: fixed floating button bottom left
    const floatWrap=document.createElement('div');
    floatWrap.style.cssText='position:fixed;left:14px;bottom:18px;z-index:2147483600;';
    document.body.appendChild(floatWrap);
    buildButton(floatWrap);
    log('button added (floating fallback)');
  }

  // Poll a few times then stop (React/SPA mounts)
  let tries=0; const max=40; const iv=setInterval(()=>{ tries++; inject(); if(document.getElementById(BTN_ID) || tries>=max) clearInterval(iv); }, 400);
  if(document.readyState!=='loading') inject(); else document.addEventListener('DOMContentLoaded', inject);
})();
