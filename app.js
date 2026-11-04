const S=[
{id:1,t:"Bhatiali",bn:"ভাটিয়ালি",cat:"Work song",reg:"Delta",lang:"Bengali (eastern dialects)",th:"Rivers, longing, travel",ctx:"Sung by boatmen drifting downstream",ins:"Voice, dotara"},
{id:2,t:"Bhawaiya",bn:"ভাওয়াইয়া",cat:"Love song",reg:"North Bengal",lang:"Rajbanshi",th:"Separation, buffalo herding",ctx:"Pastoral songs of the northern plains",ins:"Dotara, bansuri"},
{id:3,t:"Baul songs",bn:"বাউল গান",cat:"Spiritual song",reg:"Nadia–Kushtia",lang:"Bengali",th:"Inner self, wandering",ctx:"Sung by wandering mystics",ins:"Ektara, dubki"},
{id:4,t:"Agomoni",bn:"আগমনী",cat:"Festival song",reg:"Nadia–Kushtia",lang:"Bengali",th:"Daughter’s homecoming",ctx:"Sung before Durga Puja",ins:"Harmonium, voice"},
{id:5,t:"Gambhira",bn:"গম্ভীরা",cat:"Ritual song",reg:"Malda",lang:"Bengali (Malda dialect)",th:"Social satire, Shiva worship",ctx:"Performed at spring festivals",ins:"Dhol, kansi"},
{id:6,t:"Jhumur",bn:"ঝুমুর",cat:"Seasonal song",reg:"Purulia",lang:"Bengali, Kurmali",th:"Harvest, courtship",ctx:"Sung and danced during festivals",ins:"Madal, dhamsa"},
{id:7,t:"Jari",bn:"জারি",cat:"Narrative song",reg:"Delta",lang:"Bengali",th:"Lament, historical tales",ctx:"Group performance with dance",ins:"Dhol, kartal"},
{id:8,t:"Alkap",bn:"আলকাপ",cat:"Seasonal song",reg:"Malda",lang:"Bengali, Santhali influences",th:"Humour, rural life",ctx:"Troupe entertainment after harvest",ins:"Harmonium, dholak"}];
const D=[
{k:"Folk song",t:"Bhatiali",r:"Delta",x:"Songs of boatmen on wide rivers, where the current sets the tempo.",f:"The name is linked to the Bengali word for ebb tide."},
{k:"Instrument",t:"Dotara",r:"Bengal",x:"A long-necked string instrument that accompanies many folk styles.",f:"Its name means two strings, though many have four."},
{k:"Motif",t:"The river as a road",r:"Delta",x:"Rivers appear as travel, separation and the passing of time.",f:"The same river can mean different things in different songs."},
{k:"Tradition",t:"Agomoni",r:"Bengal",x:"Songs about the goddess’s annual visit, told through a mother waiting for her daughter.",f:"They are sung in the weeks before Durga Puja."}];
const T={en:{h1:"Folk and Folk-Related Oral & Performance Traditions",place:"of West Bengal & Bangladesh",sub:"A living archive of folk songs and oral traditions from West Bengal and Bangladesh, open to researchers, students, musicians and anyone curious.",b1:"Explore Archive",b2:"Compare Songs",b3:"Contribute",n1:"Explore Archive"},
bn:{h1:"লোক এবং লোক-সম্পর্কিত মৌখিক ও পরিবেশন ঐতিহ্য",place:"পশ্চিমবঙ্গ ও বাংলাদেশ",sub:"পশ্চিমবঙ্গ ও বাংলাদেশের লোকগান ও মৌখিক ঐতিহ্যের একটি জীবন্ত সংগ্রহশালা।",b1:"সংগ্রহ দেখুন",b2:"গান তুলনা করুন",b3:"অবদান রাখুন",n1:"সংগ্রহ দেখুন"}};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
function openDialog(id){const dialog=$("#"+id);if(!dialog)return;if(typeof dialog.showModal=="function")dialog.showModal();else dialog.setAttribute("open","")}
function closeDialog(id){const dialog=$("#"+id);if(!dialog)return;if(typeof dialog.close=="function")dialog.close();else dialog.removeAttribute("open")}
let cat="All",reg="",qs="",cmp=[],fav=new Set();
const cats=["All",...new Set(S.map(s=>s.cat))];
function toast(m){const t=$("#toast");t.textContent=m;t.classList.add("on");clearTimeout(toast.h);toast.h=setTimeout(()=>t.classList.remove("on"),2400)}
function render(){
 const q=qs.toLowerCase();
 const L=S.filter(s=>(cat=="All"||s.cat==cat)&&(!reg||s.reg==reg)&&(!q||Object.values(s).join(" ").toLowerCase().includes(q)));
 $("#count").textContent=L.length+" of "+S.length+" sample songs"+(reg?" in "+reg:"");
 $("#songs").innerHTML=L.length?L.map(s=>`<article class="card song-card" data-song="${s.id}" tabindex="0" role="button" aria-label="Open details for ${s.t}"><span><span class="tag">${s.cat}</span><span class="tag sample">Sample</span></span><h3>${s.t}</h3><span class="bn">${s.bn}</span><p class="meta">${s.reg} · ${s.lang}</p><p style="margin:0">${s.ctx}. Themes: ${s.th.toLowerCase()}.</p><div class="acts"><button data-c="${s.id}" aria-pressed="${cmp.includes(s.id)}">${cmp.includes(s.id)?"Added":"Add to compare"}</button><button data-f="${s.id}" aria-pressed="${fav.has(s.id)}">${fav.has(s.id)?"Saved":"Save"}</button></div></article>`).join(""):`<p>No songs match. <button data-reset>Reset filters</button></p>`;
 $("#cats").innerHTML=cats.map(c=>`<button class="chip" aria-pressed="${c==cat}" data-cat="${c}">${c}</button>`).join("")+(reg?`<button class="chip" data-clear>Clear place: ${reg}</button>`:"");
 $("#tray").classList.toggle("on",cmp.length>0);
 $("#tn").textContent=cmp.length+" of 5 selected";
 $("#tc").innerHTML=cmp.map(i=>`<button class="chip" data-c="${i}" aria-label="Remove ${S.find(s=>s.id==i).t}">${S.find(s=>s.id==i).t} ×</button>`).join("");
}
document.addEventListener("click",e=>{
 const b=e.target.closest("[data-c],[data-f],[data-cat],[data-clear],[data-soon],[data-compare],[data-q],[data-reset],[data-reg],[data-doc],[data-close-dialog],[data-song]");if(!b)return;
 const d=b.dataset;
 if(d.c){const i=+d.c;if(cmp.includes(i))cmp=cmp.filter(x=>x!=i);else if(cmp.length>=5)return toast("You can compare up to five songs.");else cmp.push(i);render()}
 else if(d.f){const i=+d.f;fav.has(i)?fav.delete(i):fav.add(i);toast(fav.has(i)?"Saved for this session. Accounts will keep favourites.":"Removed");render()}
 else if(d.cat){cat=d.cat;render()}
 else if("clear" in d){reg="";render()}
 else if(d.q!==undefined){qs=d.q;$("#q").value=qs;render();$("#archive").scrollIntoView()}
 else if("reset" in d){cat="All";reg="";qs="";$("#q").value="";render()}
 else if(d.reg){reg=d.reg;render();$("#archive").scrollIntoView()}
 else if(d.song){const song=S.find(s=>s.id==+d.song);if(!song)return;$("#songTitle").textContent=song.t;$("#songBody").innerHTML=`<p class="bn">${song.bn}</p><p>${song.ctx}.</p><dl><dt>Region</dt><dd>${song.reg}</dd><dt>Language</dt><dd>${song.lang}</dd><dt>Themes</dt><dd>${song.th}</dd><dt>Instruments</dt><dd>${song.ins}</dd></dl><p class="meta">This is a sample archive record for the Lokosongeet prototype.</p>`;openDialog("songDlg")}
 else if(d.doc){const docs={"Fieldwork notes on boatmen’s songs":"Notes from a Delta field visit, including performance context and boatmen’s descriptions of the river.","Scanned manuscript, wedding songs":"A sample OCR preview of wedding-song verses collected in Nadia.","Translation notes on Gambhira verses":"Working translation notes for Gambhira verses from Malda."};$("#docTitle").textContent=d.doc;$("#docBody").textContent=docs[d.doc];openDialog("docDlg")}
 else if(d.closeDialog)closeDialog(d.closeDialog)
 else if(d.soon)toast(d.soon);
 else if("compare" in d){if(cmp.length<2)toast("Pick at least two songs to compare.")}
});
$$("[data-provider]").forEach(b=>b.onclick=()=>toast(`${b.dataset.provider} OAuth is ready for backend configuration.`));
$("#sform").onsubmit=e=>{e.preventDefault();qs=$("#q").value;render();$("#archive").scrollIntoView()};
$("#q").oninput=e=>{qs=e.target.value;render()};
$("#sug").innerHTML=S.map(s=>`<option value="${s.t}">`).join("");
$("#clr").onclick=()=>{cmp=[];render()};
$("#go").onclick=()=>{
 if(cmp.length<2)return toast("Pick at least two songs to compare.");
 const R=[["Category","cat"],["Region","reg"],["Language","lang"],["Themes","th"],["Performance context","ctx"],["Instruments","ins"]];
 const P=cmp.map(i=>S.find(s=>s.id==i));
 $("#tbl").innerHTML="<tr><th></th>"+P.map(p=>`<th>${p.t}</th>`).join("")+"</tr>"+R.map(r=>`<tr><th>${r[0]}</th>${P.map(p=>`<td>${p[r[1]]}</td>`).join("")}</tr>`).join("");
 openDialog("dlg")};
$("#cls").onclick=()=>closeDialog("dlg");
$("#signin").onclick=()=>openDialog("signinDlg");
$("#signinForm").onsubmit=e=>{e.preventDefault();const email=new FormData(e.target).get("email");localStorage.setItem("lokosongeetUser",email);closeDialog("signinDlg");$("#signin").textContent="Signed in";toast("Signed in for this browser session.")};
const signedInUser=localStorage.getItem("lokosongeetUser");if(signedInUser)$("#signin").textContent="Signed in";
$("#contributeBtn").onclick=()=>openDialog("contributeDlg");
$("#contributeForm").onsubmit=e=>{e.preventDefault();const title=new FormData(e.target).get("title");closeDialog("contributeDlg");e.target.reset();toast(`“${title}” was added to your local submissions.`)};
$("#songs").addEventListener("keydown",e=>{if((e.key=="Enter"||e.key==" ")&&e.target.closest("[data-song]")&&!e.target.closest("button")){e.preventDefault();e.target.closest("[data-song]").click()}});
const RC={"Delta":"#4f8a8b","North Bengal":"#7a8f3a","Nadia–Kushtia":"#e0a100","Malda":"#b5381f","Purulia":"#8a5a2b"};
$("#regs").innerHTML=Object.keys(RC).map(r=>`<button class="reg" style="--c:${RC[r]}" data-reg="${r}"><i></i><b>${r}</b><span>${S.filter(s=>s.reg==r).length} sample songs</span></button>`).join("");
const links=$$("nav a");
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){let hit=false;links.forEach(a=>{const m=!hit&&a.getAttribute("href")=="#"+e.target.id;if(m)hit=true;a.classList.toggle("on",m)})}}),{rootMargin:"-40% 0px -55% 0px"});
["archive","docs","assistant","daily","contribute","about"].forEach(id=>{const n=document.getElementById(id);n&&io.observe(n)});
addEventListener("scroll",()=>$("header").classList.toggle("sc",scrollY>8),{passive:true});
$$(".orn").forEach(o=>o.innerHTML='<svg viewBox="0 0 100 100"><use href="#mot"/></svg>');
addEventListener("keydown",e=>{if(e.key=="/"&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)){e.preventDefault();$("#q").focus()}});
const F={gourd:"Gourd body. The hollow gourd amplifies the string, and many ektaras stretch a skin over it.",neck:"Split bamboo neck. Squeezing the two halves together changes the pitch.",peg:"Tuning peg. Turning it tightens or loosens the single string.",string:"One string. It gives a steady drone, often heard under Baul singing."};
let ac,last=0,snd=true;
function pluck(){const t=performance.now();if(t-last<400)return;last=t;
 $$("#ek animate").forEach(a=>a.beginElement&&a.beginElement());const m=$("#ek .mg");m.classList.remove("hit");void m.getBoundingClientRect();m.classList.add("hit");
 if(!snd)return;
 try{ac=ac||new(window.AudioContext||window.webkitAudioContext)();ac.resume();const n=ac.currentTime,o=ac.createOscillator(),f=ac.createBiquadFilter(),g=ac.createGain();o.type="sawtooth";o.frequency.value=196;f.type="lowpass";f.frequency.setValueAtTime(2600,n);f.frequency.exponentialRampToValueAtTime(380,n+1.6);g.gain.setValueAtTime(.0001,n);g.gain.exponentialRampToValueAtTime(.2,n+.01);g.gain.exponentialRampToValueAtTime(.0001,n+2);o.connect(f);f.connect(g);g.connect(ac.destination);o.start(n);o.stop(n+2.1)}catch(e){}}
$$("#ek .part").forEach(p=>{const k=p.dataset.part;const go=()=>{$("#fact").textContent=F[k];if(k=="string")pluck()};
 p.addEventListener("click",go);
 p.addEventListener("keydown",e=>{if(e.key=="Enter"||e.key==" "){e.preventDefault();go()}});
 if(k=="string")p.addEventListener("pointerenter",pluck)});
$("#snd").onclick=()=>{snd=!snd;$("#snd").textContent=snd?"Sound on":"Sound off";$("#snd").setAttribute("aria-pressed",snd)};
const day=Math.floor(Date.now()/864e5),pick=D[day%D.length];
$("#dd").textContent=new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})+" · Sample entry";
$("#dbody").innerHTML=`<h3>${pick.t}</h3><p class="meta" style="color:inherit;opacity:.8">${pick.k} · ${pick.r}</p><p>${pick.x}</p><p><b>Did you know?</b> ${pick.f}</p><button class="btn" id="bookmark">Bookmark</button> <button class="btn" id="share">Share</button>`;
$("#bookmark").onclick=()=>{const saved=localStorage.getItem("lokosongeetBookmark")==pick.t;if(saved){localStorage.removeItem("lokosongeetBookmark");$("#bookmark").textContent="Bookmark";toast("Bookmark removed")}else{localStorage.setItem("lokosongeetBookmark",pick.t);$("#bookmark").textContent="Bookmarked";toast("Saved in this browser")}};
if(localStorage.getItem("lokosongeetBookmark")==pick.t)$("#bookmark").textContent="Bookmarked";
$("#share").onclick=async()=>{try{await navigator.clipboard.writeText(pick.t+": "+pick.x);toast("Copied to clipboard")}catch(e){toast("Copy is not available in this browser")}};
$("#askform").onsubmit=e=>{e.preventDefault();const q=$("#ask").value.toLowerCase();let answer="Try asking about a song, region, river, festival, or instrument.";if(q.includes("river"))answer="Bhatiali and Jari are connected with the Delta. Bhatiali is sung by boatmen drifting downstream, while Jari carries lament and historical tales.";else if(q.includes("festival")||q.includes("durga"))answer="Agomoni is sung before Durga Puja and tells of the goddess’s homecoming.";else if(q.includes("instrument"))answer="The archive lists ektara, dotara, bansuri, dhol, madal, and harmonium among the sample instruments.";else if(q.includes("region"))answer="The sample archive covers Delta, North Bengal, Nadia–Kushtia, Malda, and Purulia.";$("#answer").textContent=answer};
$("#stats").innerHTML=[[S.length,"Sample songs"],[3,"Sample documents"],[0,"Contributors"],[new Set(S.map(s=>s.reg)).size,"Regions"]].map(a=>`<div><b>${a[0]}</b>${a[1]}</div>`).join("");
let lg="en";$("#lang").onclick=()=>{lg=lg=="en"?"bn":"en";$("#lang").textContent=lg=="en"?"বাংলা":"English";document.documentElement.lang=lg;$$("[data-i]").forEach(n=>{if(n.dataset.i=="h1")n.firstChild.textContent=T[lg].h1;else n.textContent=T[lg][n.dataset.i]})};
$("#theme").onclick=()=>{const r=document.documentElement,dk=getComputedStyle(r).getPropertyValue("--bg").trim()=="#1f160a";r.dataset.theme=dk?"light":"dark";$("#theme").textContent=dk?"Dark":"Light"};
render();
