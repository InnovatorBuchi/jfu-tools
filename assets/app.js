function navHTML(active){
  return `
<header class="header">
  <div class="wrap nav">
    <div class="brand">
      <span class="dot"></span>
      <div>
        <div class="title">JusticeForUgwu.org</div>
        <div style="font-size:12px;color:#516074">Trauma-informed platform for evidence & truth</div>
      </div>
    </div>
    <nav class="menu">
      <a class="btn ${active==='home'?'primary':''}" href="/">Home</a>
      <a class="btn ${active==='trauma'?'primary':''}" href="/trauma/">What Is Trauma?</a>
      <a class="btn ${active==='check'?'primary':''}" href="/check/">Check Yourself</a>
      <a class="btn ${active==='how'?'primary':''}" href="/how/">How Are You?</a>
      <a class="btn ${active==='report'?'primary':''}" href="/report/">Report Tool</a>
      <a class="btn ${active==='evidence'?'primary':''}" href="/evidence/">Evidence Vault</a>
      <a class="btn ${active==='journal'?'primary':''}" href="/journal/">Journal</a>
    </nav>
  </div>
</header>`;
}
function mountNav(active){ document.body.insertAdjacentHTML('afterbegin', navHTML(active)); }
function escapeHTML(s){return (s||'').replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]));}

/* Sample data */
const publicEvidence=[{id:1,title:"Letter of Administration",category:"Legal Documents",uploadDate:"2024-01-25",fileType:"JPG",description:"Sample evidence item",imageUrl:"https://via.placeholder.com/400"}];
const privateEvidence=[{id:1,title:"Private Forensic Report",category:"Technical Evidence",uploadDate:"2024-01-20",fileType:"PDF",hash:"a1b2c3",fileName:"report.pdf"}];

/* Evidence Vault */
function initEvidence(){
  const pub=document.getElementById('public-vault');
  if(pub){
    pub.innerHTML='';
    publicEvidence.forEach(item=>{
      const card=document.createElement('article'); card.className='card';
      card.innerHTML=`<div class="card-b"><h3>${escapeHTML(item.title)}</h3><p>${escapeHTML(item.description)}</p></div>`;
      pub.appendChild(card);
    });
  }
}

/* Report Tool */
const RKEY='jfu_reports_v1';
function initReport(){
  const t=document.getElementById('r-title'); if(!t) return;
  const c=document.getElementById('r-cat'); const b=document.getElementById('r-body');
  const msg=document.getElementById('r-msg'); const box=document.getElementById('r-list');
  document.getElementById('r-save').onclick=()=>{
    const rec={id:Date.now(),title:t.value,category:c.value,body:b.value,created:new Date().toISOString()};
    if(!rec.title||!rec.body){msg.textContent='Required fields missing';return;}
    const list=JSON.parse(localStorage.getItem(RKEY)||'[]'); list.unshift(rec);
    localStorage.setItem(RKEY,JSON.stringify(list)); msg.textContent='Saved'; render();
  };
  function render(){const list=JSON.parse(localStorage.getItem(RKEY)||'[]');box.innerHTML='';list.forEach(it=>{box.innerHTML+=`<div class="card"><div class="card-b"><b>${escapeHTML(it.title)}</b><br/>${escapeHTML(it.body)}</div></div>`});}
  render();
}

/* Journal */
const JKEY='jfu_journal_v1';
function initJournal(){
  const t=document.getElementById('j-title'); if(!t) return;
  const b=document.getElementById('j-body'); const msg=document.getElementById('j-msg'); const box=document.getElementById('j-list');
  document.getElementById('j-save').onclick=()=>{
    const rec={id:Date.now(),title:t.value||'Untitled',body:b.value,created:new Date().toISOString()};
    if(!rec.body){msg.textContent='Write something first';return;}
    const list=JSON.parse(localStorage.getItem(JKEY)||'[]'); list.unshift(rec);
    localStorage.setItem(JKEY,JSON.stringify(list)); msg.textContent='Saved'; render();
  };
  function render(){const list=JSON.parse(localStorage.getItem(JKEY)||'[]');box.innerHTML='';list.forEach(it=>{box.innerHTML+=`<div class="card"><div class="card-b"><b>${escapeHTML(it.title)}</b><br/>${escapeHTML(it.body)}</div></div>`});}
  render();
}
