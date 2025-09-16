
// Simple client-side search using a local JSON index.
let INDEX = [];
async function loadIndex(){
  if(INDEX.length) return;
  try{
    const r = await fetch('data/search_index.json');
    INDEX = await r.json();
  }catch(e){
    console.error('Failed to load index', e);
  }
}
function scoreItem(item, q){
  q = q.toLowerCase();
  let s = 0;
  if(item.title.toLowerCase().includes(q)) s += 100;
  if(item.description && item.description.toLowerCase().includes(q)) s += 40;
  if(item.tags && item.tags.join(' ').toLowerCase().includes(q)) s += 30;
  return s;
}
function renderResults(list, container){
  container.innerHTML='';
  if(!list.length){
    container.innerHTML = '<div class="result-card"><p>No results found. Try different words or browse categories above.</p></div>';
    return;
  }
  list.forEach(function(it){
    var div = document.createElement('div'); div.className='result-card';
    var h = document.createElement('h3'); h.textContent = it.title;
    var meta = document.createElement('div'); meta.className='meta';
    meta.innerHTML = '<span class="category-badge">'+it.type+'</span> • '+(it.source || 'Trusted source');
    var p = document.createElement('p'); p.textContent = it.description || '';
    var link = document.createElement('a'); link.href = it.url || '#'; link.target='_blank'; link.textContent = 'Open resource';
    div.appendChild(h); div.appendChild(meta); div.appendChild(p);
    if(it.type === 'Lecture' && it.videoId){
      var iframe = document.createElement('iframe');
      iframe.className='media-embed';
      iframe.width = '100%';
      iframe.height = '220';
      iframe.src = 'https://www.youtube.com/embed/' + it.videoId + '?rel=0';
      iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen','');
      div.appendChild(iframe);
    }
    div.appendChild(link);
    container.appendChild(div);
  });
}
function performSearch(q){
  var out = document.getElementById('results');
  if(!q) { out.innerHTML = '<div class="result-card"><p>Please type a search term or choose a category.</p></div>'; return; }
  var scored = INDEX.map(function(i){ return {i:i, s: scoreItem(i,q)}; }).filter(function(x){return x.s>0}).sort(function(a,b){return b.s-a.s}).map(function(x){return x.i});
  var top = scored.slice(0,30);
  renderResults(top, out);
  window.scrollTo({top:200, behavior:'smooth'});
}
// category browsing
function showCategory(type){
  var out = document.getElementById('results');
  var filtered = INDEX.filter(function(i){ return i.type.toLowerCase() === type.toLowerCase(); });
  renderResults(filtered, out);
  window.scrollTo({top:200, behavior:'smooth'});
}
// init
document.addEventListener('DOMContentLoaded', async function(){
  await loadIndex();
  var form = document.getElementById('searchForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var q = document.getElementById('q').value.trim();
    performSearch(q);
  });
  // quick category buttons
  document.querySelectorAll('[data-cat]').forEach(function(btn){
    btn.addEventListener('click', function(){ showCategory(btn.getAttribute('data-cat')); });
  });
});
