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
      <a class="btn ${active==='evidence'?'primary':''}" href="/evidence/">Evidence Vault</a>
    </nav>
  </div>
</header>`;
}
function mountNav(active){ document.body.insertAdjacentHTML('afterbegin', navHTML(active)); }
function escapeHTML(s){return (s||'').replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));}

const publicEvidence = [
  { id:1, title:"Letter of Administration - Legal Fraud Foundation", description:"2004 Letters of Administration limited to 'personal property'—used to control landed assets.", safeLink:"/open/01" },
  { id:2, title:"The Vanished White House Letter (2013)", description:"Letter acknowledging Onyebuchi Ugwu—disappeared shortly after delivery.", safeLink:"/open/02" },
  { id:3, title:"MOU: Clyvia GmbH & Bulwark Project (€600K Commission)", description:"Binding MOU establishing 10% commission—clear financial motive for erasure.", safeLink:"/open/03" }
];

function initEvidence(){
  const pub = document.getElementById('public-vault');
  if(!pub) return;
  pub.innerHTML = '';
  publicEvidence.forEach(item=>{
    const card = document.createElement('article'); card.className='card';
    card.innerHTML = `
      <div class="card-b">
        <h3 style="margin:2px 0">${escapeHTML(item.title)}</h3>
        <p class="small" style="margin:6px 0">${escapeHTML(item.description||'')}</p>
        <a class="btn primary" href="${item.safeLink}">View Evidence</a>
      </div>
    `;
    pub.appendChild(card);
  });
}

const linkMap = {
  "/open/01": "https://YOUR-BASE44-LINK-1",
  "/open/02": "https://YOUR-BASE44-LINK-2",
  "/open/03": "https://YOUR-BASE44-LINK-3"
};

(function(){
  const path = window.location.pathname.replace(/\/+$/,'/'); 
  const key = path.endsWith('/') ? path.slice(0,-1) : path;
  if (linkMap[key]) {
    window.location.replace(linkMap[key]);
  }
})();

function initReport() {}
function initJournal() {}
