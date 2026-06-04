export function mountLegacyActivityFinder(){
let DATA=[];
let META={"generated": "2026-04-27", "records": 32675, "authorities": 19, "review": 21286, "regulated": 4607, "authorityCounts": {"ADGM": 1125, "Ajman FZ": 1600, "DAFZA": 2041, "DDA": 650, "DMCC": 979, "Dubai Aviation FZ": 1301, "Dubai CommerCity": 2026, "DWTC": 1204, "Hamriyah": 360, "IFZA": 812, "JAFZA": 1556, "Mainland": 2372, "Meydan": 3463, "RAK DED": 4760, "RAKEZ": 3462, "SHAMS": 935, "SPC": 1776, "SRTIP": 931, "UAQ FZ": 1322}, "licenses": ["Business Invest", "Commercial", "E-Commerce", "E-commerce", "Education", "Educational", "Event Management", "Family Office Management (Multi Family)", "Family Office Management (Single Family)", "Financial (Category A)", "Free lancer", "Freelance Permit", "Freelancer", "Freelancers", "General Trading", "General Trading (Commercial)", "Includes firms engaged in making the products that are used to protect marine environment from fabrics and plastic, such as, silt curtains to contain dredging silt and turbidity, oil booms for oil spills and chemicals, debris barriers for rubbish and seaw", "Individual / Professional", "Industrial", "industrial", "Industry", "Media", "Non-Financial (Category B)", "Pioneer", "Pioneers", "Premium Commercial", "Premium Service", "Professional", "Retail (Category C)", "Service", "services", "Services", "Special Premium Commercial", "Svc", "Tourism", "Trading", "Virtual Assets"], "types": ["Research & Development", "Service", "Special", "Standard", "Trade"], "categories": ["B Mining and Quarrying", "Business", "C Manufacturing", "Commercial", "D Electricity, gas, steam and air conditioning supply", "E Water supply; sewerage, waste management and remediation activities", "Education", "F - Construction", "F Construction", "Freelance Permit", "Freelancers", "Freezone", "G Wholesale and retail trade; repair of motor vehicles and motorcycles", "H Transportation and storage", "I Accommodation and food service activities", "Industrial", "J Information and communication", "K Financial and insurance activities", "L Real estate activities", "M - Professional, Scientific, and Technical activities", "M Professional, scientific and technical activities", "m Professional, scientific and technical activities", "Media", "N Administrative and support service activities", "Non-Freezone", "O Public administration and defence; compulsory social security", "P Education", "Premium Commercial", "Premium Service", "Q Human health and social work activities", "R Arts, entertainment and recreation", "S Other service activities", "Service", "Services & Consultancy", "Special Premium Commercial", "T Activities of households as employers; undifferentiated goods- and services-producing activities of households for own use", "U Activities of extraterritorial organizations and bodies", "W Ministry of Defense related activities (Tawzun)", "Wholesale & Retail"], "regulations": ["Non-Regulated", "Regulated"], "reviews": ["OK", "Review"]};
const state={search:"",authority:"",license:"",type:"",category:"",regulation:"",review:"",page:1,pageSize:50,sortKey:"authority",sortDir:"asc"};
const $=id=>document.getElementById(id);
const SOFTWARE_NAME="Activity Finder";
const SOFTWARE_DESC="UAE Authority Activity Finder";
const COMPANY_NAME="Iraa Global";
const COMPANY_URL="https://www.iraaglobal.com/activities-finder";
const dom={topSearch:$("topSearch"),authority:$("authority"),license:$("license"),type:$("type"),category:$("category"),regulation:$("regulation"),review:$("review"),zones:$("zones"),visible:$("visibleCount"),zoneCount:$("zoneCount"),regulated:$("regulatedCount"),reviewCount:$("reviewCount"),rows:$("rows"),empty:$("empty"),range:$("rangeText"),pageText:$("pageText"),pageSize:$("pageSize"),prev:$("prev"),next:$("next"),home:$("homeBtn"),clear:$("clearBtn"),export:$("exportBtn"),savedBtn:$("savedBookmarksBtn"),savedCount:$("savedCount"),drawer:$("drawer"),detailTitle:$("detailTitle"),detailSub:$("detailSub"),detail:$("detail"),detailActions:$("detailActions"),close:$("close"),savedPage:$("savedPage"),bookmarkSub:$("bookmarkSub"),bookmarkList:$("bookmarkList"),bookmarkClose:$("bookmarkClose"),bookmarkExcel:$("bookmarkExcel"),bookmarkPdf:$("bookmarkPdf"),bookmarkWhatsApp:$("bookmarkWhatsApp"),bookmarkClear:$("bookmarkClear")};

const filterPanel=$("filterPanel");
const filterToggle=$("filterToggle");
const filterClose=$("filterClose");
const filterOverlay=$("filterOverlay");
let filterTouchStartX=0;
let filterTouchStartY=0;
let filterTouchDeltaX=0;
function openFilter(){
  if(!filterPanel)return;
  filterPanel.classList.add("open");
  filterOverlay?.classList.add("open");
  document.body.classList.add("filter-open");
  filterToggle?.setAttribute("aria-expanded","true");
}
function closeFilter(){
  if(!filterPanel)return;
  filterPanel.classList.remove("open");
  filterOverlay?.classList.remove("open");
  document.body.classList.remove("filter-open");
  filterToggle?.setAttribute("aria-expanded","false");
}
function toggleFilter(){filterPanel?.classList.contains("open")?closeFilter():openFilter();}

const fmt=n=>new Intl.NumberFormat("en-US").format(n);
const esc=v=>String(v||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

const BOOKMARK_KEY="activityFinderBookmarksV1";
function loadBookmarks(){try{return JSON.parse(localStorage.getItem(BOOKMARK_KEY)||"{}");}catch(e){return {};}}
function saveBookmarks(bookmarks){localStorage.setItem(BOOKMARK_KEY,JSON.stringify(bookmarks));}
function getBookmarkItems(){const bookmarks=loadBookmarks();return Object.values(bookmarks).map(b=>({bookmark:b,activity:DATA.find(r=>r.id===b.id)})).filter(x=>x.activity).sort((a,b)=>new Date(b.bookmark.savedAt||0)-new Date(a.bookmark.savedAt||0));}
function isBookmarked(id){return Boolean(loadBookmarks()[id]);}
function bookmarkCount(){return Object.keys(loadBookmarks()).length;}
function updateBookmarkCount(){const count=fmt(bookmarkCount());if(dom.savedCount)dom.savedCount.textContent=count;if(dom.bookmarkSub)dom.bookmarkSub.textContent=count+" saved";}
function toggleBookmark(activity){const bookmarks=loadBookmarks();if(bookmarks[activity.id]){if(confirm("Remove this activity from saved bookmarks?")){delete bookmarks[activity.id];saveBookmarks(bookmarks);}}else{bookmarks[activity.id]={id:activity.id,savedAt:new Date().toISOString()};saveBookmarks(bookmarks);}updateBookmarkCount();render();renderBookmarkList();if(dom.drawer.classList.contains("open"))renderDetailBookmarkAction(activity);}
function bookmarkButton(activity){return '<button class="bookmark-btn '+(isBookmarked(activity.id)?'saved':'')+'" type="button" data-bookmark="'+esc(activity.id)+'" title="'+(isBookmarked(activity.id)?'Remove bookmark':'Save bookmark')+'" aria-label="'+(isBookmarked(activity.id)?'Remove bookmark':'Save bookmark')+'">♥</button>';}
function renderDetailBookmarkAction(activity){if(!dom.detailActions)return;dom.detailActions.innerHTML=bookmarkButton(activity);const btn=dom.detailActions.querySelector("[data-bookmark]");if(btn)btn.onclick=e=>{e.stopPropagation();toggleBookmark(activity);};}
function openBookmarks(){renderBookmarkList();closeDrawer();closeFilter();hideInfoPages();document.body.classList.add("bookmark-active");$("landing").classList.add("hidden");$("app").classList.add("open");if(dom.savedPage)dom.savedPage.classList.add("open");window.scrollTo({top:0,behavior:"smooth"});}
function closeBookmarks(){document.body.classList.remove("bookmark-active");dom.savedPage.classList.remove("open");$("landing").classList.add("hidden");$("app").classList.add("open");setTimeout(()=>dom.topSearch.focus(),0);}
function bookmarkRowsForExport(){return getBookmarkItems().map(({bookmark,activity},i)=>({No:i+1,Authority:activity.authority||"",Code:activity.code||"",Name:activity.name||"",Description:activity.description||activity.category||activity.sector||"",License:activity.license||"",Type:activity.type||"",Regulation:activity.regulation||activity.approvalRequired||"",Source:activity.source||"",Saved:new Date(bookmark.savedAt||Date.now()).toLocaleString()}));}
function renderBookmarkList(){if(!dom.bookmarkList)return;const items=getBookmarkItems();updateBookmarkCount();if(!items.length){dom.bookmarkList.innerHTML='<div class="bookmark-empty">No saved bookmarks yet. Click the heart beside any activity to save it.</div>';return;}dom.bookmarkList.innerHTML='<div class="bookmark-table-wrap"><table class="bookmark-table"><thead><tr><th>No.</th><th>Authority</th><th>Code</th><th>Activity Name</th><th>Description</th><th>License</th><th>Action</th></tr></thead><tbody>'+items.map(({activity},i)=>'<tr><td>'+(i+1)+'</td><td>'+esc(activity.authority)+'</td><td class="code">'+esc(activity.code||"—")+'</td><td><strong>'+esc(activity.name)+'</strong></td><td class="desc-cell">'+esc(activity.description||activity.category||activity.sector||"")+'</td><td>'+esc(activity.license||"")+'</td><td><div class="bookmark-actions"><button class="btn" type="button" data-open-bookmark="'+esc(activity.id)+'">Open</button><button class="btn" type="button" data-remove-bookmark="'+esc(activity.id)+'">Remove</button></div></td></tr>').join("")+'</tbody></table></div>';dom.bookmarkList.querySelectorAll("[data-open-bookmark]").forEach(btn=>btn.onclick=()=>{const r=DATA.find(x=>x.id===btn.dataset.openBookmark);if(r){closeBookmarks();detail(r);}});dom.bookmarkList.querySelectorAll("[data-remove-bookmark]").forEach(btn=>btn.onclick=()=>{const bookmarks=loadBookmarks();delete bookmarks[btn.dataset.removeBookmark];saveBookmarks(bookmarks);renderBookmarkList();render();});}
function exportBookmarksExcel(){const rows=bookmarkRowsForExport();if(!rows.length){alert("No saved bookmarks to export.");return;}const heads=Object.keys(rows[0]);const table='<table><thead><tr>'+heads.map(h=>'<th>'+esc(h)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(r=>'<tr>'+heads.map(h=>'<td>'+esc(r[h])+'</td>').join('')+'</tr>').join('')+'</tbody></table>';const html='<!doctype html><html><head><meta charset="utf-8"></head><body><div class="export-brand"><img src="assets/images/logo-transparent.svg" alt="'+COMPANY_NAME+'"></div><h2>'+SOFTWARE_NAME+' - Saved Bookmarks</h2><p><strong>'+SOFTWARE_DESC+'</strong><br>Generated from '+COMPANY_NAME+'<br><a href="'+COMPANY_URL+'">'+COMPANY_URL+'</a><br>Generated '+esc(new Date().toLocaleString())+'</p>'+table+'</body></html>';const blob=new Blob([html],{type:'application/vnd.ms-excel;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='activity-finder-bookmarks.xls';a.click();URL.revokeObjectURL(url);}
function exportBookmarksPdf(){const rows=bookmarkRowsForExport();if(!rows.length){alert("No saved bookmarks to export.");return;}const heads=["No","Authority","Code","Name","Description","License"];const body=rows.map(r=>'<tr><td>'+esc(r.No)+'</td><td>'+esc(r.Authority)+'</td><td>'+esc(r.Code)+'</td><td>'+esc(r.Name)+'</td><td>'+esc(r.Description)+'</td><td>'+esc(r.License)+'</td></tr>').join('');const w=window.open('', '_blank');if(!w){alert('Please allow pop-ups to export PDF.');return;}w.document.write('<!doctype html><html><head><title>'+SOFTWARE_NAME+' Bookmarks</title><style>body{font-family:Arial,sans-serif;color:#1f2d3d;margin:24px}.export-brand{display:flex;align-items:center;gap:10px;margin-bottom:10px}.export-brand img{width:128px;height:auto}h1{font-size:22px;margin:0 0 4px}.sub{color:#66788a;margin-bottom:18px;line-height:1.45}table{width:100%;border-collapse:collapse;font-size:12px}th,td{border:1px solid #d8e0e8;padding:8px;text-align:left;vertical-align:top}th{background:#f0f5f8}@media print{button{display:none}}</style></head><body><button onclick="window.print()">Print / Save as PDF</button><div class="export-brand"><img src="assets/images/logo-transparent.svg" alt="'+COMPANY_NAME+'"></div><h1>'+SOFTWARE_NAME+' - Saved Bookmarks</h1><div class="sub"><strong>'+SOFTWARE_DESC+'</strong><br>Generated from '+COMPANY_NAME+'<br><a href="'+COMPANY_URL+'">'+COMPANY_URL+'</a><br>Generated '+esc(new Date().toLocaleString())+' &middot; '+rows.length+' saved</div><table><thead><tr>'+heads.map(h=>'<th>'+h+'</th>').join('')+'</tr></thead><tbody>'+body+'</tbody></table><script>setTimeout(()=>window.print(),300)<\/script></body></html>');w.document.close();}
function clearBookmarks(){if(!bookmarkCount()){alert("No saved bookmarks to clear.");return;}if(confirm("Clear all saved bookmarks?")){saveBookmarks({});updateBookmarkCount();renderBookmarkList();render();}}
function shareBookmarksWhatsApp(){const rows=bookmarkRowsForExport();if(!rows.length){alert("No saved bookmarks to share.");return;}const text=SOFTWARE_NAME+' - Saved Bookmarks\n'+SOFTWARE_DESC+'\nGenerated from '+COMPANY_NAME+'\n'+COMPANY_URL+'\n\n'+rows.map(r=>r.No+'. '+r.Name+'\nAuthority: '+r.Authority+'\nCode: '+(r.Code||'—')+'\nLicense: '+(r.License||'—')+'\nDescription: '+(r.Description||'—')).join('\n\n');window.open('https://wa.me/?text='+encodeURIComponent(text),'_blank');}
function fillSelect(node,values,label){node.innerHTML=`<option value="">All ${label}</option>`;values.filter(Boolean).forEach(v=>node.insertAdjacentHTML("beforeend",`<option value="${esc(v)}">${esc(v)}</option>`));}
function init(){fillSelect(dom.authority,Object.keys(META.authorityCounts),"Authorities");fillSelect(dom.license,META.licenses,"License Types");fillSelect(dom.type,META.types,"Activity Types");fillSelect(dom.category,META.categories,"Categories");fillSelect(dom.regulation,META.regulations,"Regulation");fillSelect(dom.review,META.reviews,"Review Status");Object.entries(META.authorityCounts).forEach(([name,count])=>{const b=document.createElement("button");b.type="button";b.className="zone";b.dataset.name=name;b.innerHTML=`<span>${esc(name)}</span><small>${fmt(count)}</small>`;b.onclick=()=>{state.authority=state.authority===name?"":name;dom.authority.value=state.authority;state.page=1;render();};dom.zones.appendChild(b);});}
function ok(r){if(state.search){const terms=state.search.toLowerCase().split(/\s+/).filter(Boolean);if(!terms.every(t=>r.search.includes(t)))return false;}return (!state.authority||r.authority===state.authority)&&(!state.license||r.license===state.license)&&(!state.type||r.type===state.type)&&(!state.category||r.category===state.category)&&(!state.regulation||r.regulation===state.regulation)&&(!state.review||r.review===state.review);}
function getRows(){const dir=state.sortDir==="asc"?1:-1;return DATA.filter(ok).sort((a,b)=>String(a[state.sortKey]||"").localeCompare(String(b[state.sortKey]||""),undefined,{numeric:true,sensitivity:"base"})*dir);}
function pill(value,cls=""){return `<span class="pill ${cls}">${esc(value||"Blank")}</span>`;}
function render(){document.querySelectorAll(".zone").forEach(z=>z.classList.toggle("active",z.dataset.name===state.authority));const rows=getRows();dom.visible.textContent=fmt(rows.length);dom.zoneCount.textContent=fmt(new Set(rows.map(r=>r.authority).filter(Boolean)).size);dom.regulated.textContent=fmt(rows.filter(r=>r.regulation==="Regulated"||r.approvalRequired==="Yes").length);dom.reviewCount.textContent=fmt(rows.filter(r=>r.review==="Review").length);const pages=Math.max(1,Math.ceil(rows.length/state.pageSize));state.page=Math.min(Math.max(1,state.page),pages);const start=(state.page-1)*state.pageSize;const slice=rows.slice(start,start+state.pageSize);dom.rows.innerHTML="";slice.forEach(r=>{const tr=document.createElement("tr");tr.innerHTML=`<td>${bookmarkButton(r)}</td><td>${esc(r.authority)}</td><td class="code">${esc(r.code)}</td><td class="name">${esc(r.name)}</td><td>${esc(r.license)}</td><td>${esc(r.type)}</td><td>${r.regulation==="Regulated"||r.approvalRequired==="Yes"?pill(r.regulation||"Approval","reg"):pill(r.regulation||"Not specified")}</td><td>${r.review==="Review"?pill("Review","review"):pill(r.review||"OK","ok")}</td><td class="desc"><div class="clamp">${esc(r.description)}</div></td>`;tr.onclick=e=>{if(e.target.closest("[data-bookmark]")){toggleBookmark(r);return;}detail(r);};dom.rows.appendChild(tr);});dom.empty.hidden=rows.length>0;const end=rows.length?Math.min(start+state.pageSize,rows.length):0;dom.range.textContent=rows.length?`${fmt(start+1)}-${fmt(end)} of ${fmt(rows.length)}`:"0 results";dom.pageText.textContent=`Page ${fmt(state.page)} of ${fmt(pages)}`;dom.prev.disabled=state.page<=1;dom.next.disabled=state.page>=pages;}
function detail(r){dom.detailTitle.textContent=r.name||"Activity";dom.detailSub.textContent=[r.authority,r.code].filter(Boolean).join(" - ");const fields=[["Authority Zone",r.authority],["Activity Code",r.code],["License Type",r.license],["Activity Type",r.type],["Category",r.category],["Sector",r.sector],["Segment",r.segment],["Group",r.group],["Status",r.status],["Regulation",r.regulation],["Approval Required",r.approvalRequired],["Approval Stage",r.approvalStage],["Approval Entity 1",r.entity1],["Approval Entity 2",r.entity2],["Approval Details",r.approvalDetails],["NOC Requirement",r.noc],["Third Party Approval",r.thirdParty],["Restrictions",r.restrictions],["Property Requirement",r.property],["Facility Requirement",r.facility],["Package Eligibility",r.package],["Business Centre Allowed",r.businessCentre],["Office Allowed",r.office],["LLC Allowed",r.llc],["Branch Allowed",r.branch],["Minimum Share Capital",r.capital],["Activity Price/Fee",r.fee],["Documents Required",r.documents],["Qualification Requirement",r.qualification],["AML",r.aml],["ESR",r.esr],["Source File",r.source],["Source Sheet/Page",r.sourcePage],["Source Row",r.sourceRow],["Source URL",r.sourceUrl],["Review Status",r.review],["Review Notes",r.reviewNotes],["Extraction Confidence",r.confidence],["Description",r.description],["Special Notes",r.notes]];renderDetailBookmarkAction(r);dom.detail.innerHTML="";fields.filter(([,v])=>v).forEach(([k,v])=>dom.detail.insertAdjacentHTML("beforeend",`<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`));dom.drawer.classList.add("open");dom.drawer.setAttribute("aria-hidden","false");}
function closeDrawer(){dom.drawer.classList.remove("open");dom.drawer.setAttribute("aria-hidden","true");}
function csv(){const rows=getRows();const heads=["Authority","Activity Code","Activity Name","Description","License Type","Activity Type","Category","Regulation","Review Status","Source File"];const keys=["authority","code","name","description","license","type","category","regulation","review","source"];const lines=[heads.join(",")];rows.forEach(r=>lines.push(keys.map(k=>`"${String(r[k]||"").replace(/"/g,'""')}"`).join(",")));const blob=new Blob([lines.join("\n")],{type:"text/csv;charset=utf-8"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="filtered-activities.csv";a.click();URL.revokeObjectURL(url);}
function clearAll(){Object.assign(state,{search:"",authority:"",license:"",type:"",category:"",regulation:"",review:"",page:1});["topSearch","authority","license","type","category","regulation","review"].forEach(k=>dom[k].value="");render();}
function setSearchValue(value){
  state.search=value.toLowerCase();
  dom.topSearch.value=value;
  state.page=1;
  render();
}
dom.topSearch.addEventListener("input",e=>setSearchValue(e.target.value));
dom.topSearch.addEventListener("keydown",e=>{if(e.key==="Enter")render();});
["authority","license","type","category","regulation","review"].forEach(k=>dom[k].addEventListener("change",e=>{state[k]=e.target.value;state.page=1;render();}));
dom.pageSize.onchange=e=>{state.pageSize=Number(e.target.value);state.page=1;render();};dom.prev.onclick=()=>{state.page--;render();};dom.next.onclick=()=>{state.page++;render();};dom.home.onclick=showHome;dom.clear.onclick=clearAll;if(dom.export)dom.export.onclick=csv;dom.savedBtn.onclick=openBookmarks;dom.close.onclick=closeDrawer;dom.bookmarkClose.onclick=closeBookmarks;dom.bookmarkExcel.onclick=exportBookmarksExcel;dom.bookmarkPdf.onclick=exportBookmarksPdf;dom.bookmarkWhatsApp.onclick=shareBookmarksWhatsApp;if(dom.bookmarkClear)dom.bookmarkClear.onclick=clearBookmarks;document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeDrawer();if(dom.savedPage.classList.contains("open"))closeBookmarks();closeFilter();}});document.querySelectorAll("th[data-sort]").forEach(th=>th.onclick=()=>{const key=th.dataset.sort;if(state.sortKey===key)state.sortDir=state.sortDir==="asc"?"desc":"asc";else{state.sortKey=key;state.sortDir="asc";}render();});

filterToggle?.addEventListener("click",toggleFilter);
filterClose?.addEventListener("click",closeFilter);
filterOverlay?.addEventListener("click",closeFilter);
filterPanel?.addEventListener("touchstart",e=>{
  if(!filterPanel.classList.contains("open"))return;
  const touch=e.touches[0];
  filterTouchStartX=touch.clientX;
  filterTouchStartY=touch.clientY;
  filterTouchDeltaX=0;
},{passive:true});
filterPanel?.addEventListener("touchmove",e=>{
  if(!filterPanel.classList.contains("open"))return;
  const touch=e.touches[0];
  filterTouchDeltaX=touch.clientX-filterTouchStartX;
},{passive:true});
filterPanel?.addEventListener("touchend",e=>{
  if(!filterPanel.classList.contains("open"))return;
  const verticalDrift=Math.abs((e.changedTouches[0]?.clientY||filterTouchStartY)-filterTouchStartY);
  if(filterTouchDeltaX < -70 && verticalDrift < 80)closeFilter();
},{passive:true});


function buildMetaFromData(rows){
  const unique = key => [...new Set(rows.map(r=>r[key]).filter(Boolean))].sort((a,b)=>String(a).localeCompare(String(b),undefined,{sensitivity:"base"}));
  const authorityCounts = {};
  rows.forEach(r=>{ if(r.authority) authorityCounts[r.authority]=(authorityCounts[r.authority]||0)+1; });
  return {
    generated:"2026-04-27",
    records:rows.length,
    authorities:Object.keys(authorityCounts).length,
    review:rows.filter(r=>r.review==="Review").length,
    regulated:rows.filter(r=>r.regulation==="Regulated"||r.approvalRequired==="Yes").length,
    authorityCounts:Object.fromEntries(Object.entries(authorityCounts).sort((a,b)=>a[0].localeCompare(b[0]))),
    licenses:unique("license"),
    types:unique("type"),
    categories:unique("category"),
    regulations:unique("regulation"),
    reviews:unique("review")
  };
}
function updateDatasetLabels(){
  document.querySelectorAll(".sub").forEach(el=>{
    if(el.textContent.includes("100 sample activities") || el.textContent.includes("19 authorities")){
      el.innerHTML = fmt(META.records)+" activities &middot; "+fmt(META.authorities)+" authorities &middot; generated "+META.generated;
    }
  });
  document.querySelectorAll(".landing-tools span").forEach(el=>{
    if(el.textContent.includes("100 sample activities")) el.textContent = fmt(META.records)+" activities";
    if(el.textContent.includes("19 authority")) el.textContent = fmt(META.authorities)+" authority zones";
  });
}
async function bootActivityFinder(){
  try{
    const res=await fetch("data/activities.json",{cache:"no-store"});
    if(!res.ok) throw new Error("Could not load data/activities.json");
    DATA=await res.json();
    META=buildMetaFromData(DATA);
    updateDatasetLabels();
  }catch(err){
    console.error(err);
    alert("Activity data could not be loaded. Start this app through start.bat or a local web server, not by opening index.html directly.");
  }
  init();render();updateBookmarkCount();renderBookmarkList();
}
bootActivityFinder();

let introFinished=false;
function finishIntro(){
  if(introFinished)return;
  introFinished=true;
  const intro=$("intro");
  document.body.classList.remove("intro-active");
  if(intro){
    intro.classList.add("intro-done");
    setTimeout(()=>intro.remove(),380);
  }
  setTimeout(()=>{if(!$("app").classList.contains("open"))$("landingSearch").focus();},420);
}
setTimeout(finishIntro,3000);
function hideInfoPages(){["versionPage","aboutPage","privacyPage","termsPage","legalPage"].forEach(id=>$(id)?.classList.remove("open"));}
function showHome(){
  document.body.classList.remove("bookmark-active");
  if(dom.savedPage)dom.savedPage.classList.remove("open");
  closeDrawer();
  closeFilter();
  hideInfoPages();
  $("app").classList.remove("open");
  $("landing").classList.remove("hidden");
  setTimeout(()=>$("landingSearch").focus(),0);
}
function openDashboard(query=""){
  document.body.classList.remove("bookmark-active");
  if(dom.savedPage)dom.savedPage.classList.remove("open");
  hideInfoPages();
  $("landing").classList.add("hidden");
  $("app").classList.add("open");
  state.search=query.trim().toLowerCase();
  dom.topSearch.value=query.trim();
  state.page=1;
  
  render();
  setTimeout(()=>dom.topSearch.focus(),0);
}
function suggestionRows(q){
  const terms=q.toLowerCase().split(/\s+/).filter(Boolean);
  if(!terms.length)return [];
  return DATA.filter(r=>terms.every(t=>(r.search||"").includes(t))).slice(0,6);
}
$("landingBtn").onclick=()=>openDashboard($("landingSearch").value);
$("browseAll").onclick=()=>openDashboard("");
$("landingSearch").addEventListener("keydown",e=>{if(e.key==="Enter")openDashboard(e.currentTarget.value);});
document.querySelectorAll(".quick-chip").forEach(btn=>btn.onclick=()=>{const q=btn.dataset.search;$("landingSearch").value=q;openDashboard(q);});

function showInfoPage(id){
  document.body.classList.remove("bookmark-active");
  if(dom.savedPage)dom.savedPage.classList.remove("open");
  closeDrawer();
  closeFilter();
  hideInfoPages();
  $("landing").classList.add("hidden");
  $("app").classList.remove("open");
  $(id).classList.add("open");
  window.scrollTo({top:0,behavior:"smooth"});
}
function backFromInfoPage(){showHome();}
$("versionLogBtn").onclick=()=>showInfoPage("versionPage");
$("aboutBtn").onclick=()=>showInfoPage("aboutPage");
$("privacyBtn").onclick=()=>showInfoPage("privacyPage");
$("termsBtn").onclick=()=>showInfoPage("termsPage");
$("legalBtn").onclick=()=>showInfoPage("legalPage");
$("versionBackBtn").onclick=backFromInfoPage;
document.querySelectorAll(".policy-back").forEach(btn=>btn.onclick=backFromInfoPage);
}
