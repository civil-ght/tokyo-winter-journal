/* Official Maps URLs: no API key, no geolocation, at most 3 intermediate stops. */
const LEG_MODES=[
 ['transit','walking','transit','walking','walking','walking','transit'],
 ['transit','walking','transit','walking','walking','walking','transit','walking','transit','transit'],
 ['transit','transit','transit','transit','transit','transit','walking','transit','transit'],
 ['transit','transit','walking','walking','transit','transit','transit','walking'],
 ['transit','walking','walking','walking','walking','walking','transit','transit',null]
];
const WALK_BUNDLES=[
 [{title:'银座购物候选串点',names:['美登利银座','伊东屋','GINZA SIX','UNIQLO','美登利银座'],places:['Umegaoka Sushi no Midori Ginza Japan','G.Itoya Ginza Japan','GINZA SIX Tokyo Japan','UNIQLO Ginza Japan','Umegaoka Sushi no Midori Ginza Japan'],note:'含3个途经点，是候选购物路线，实际选两家并留意叫号；不是要求全部逛完。'}],
 [{title:'东京站 → 皇居外苑',names:['丸之内站前广场','二重桥'],places:['Tokyo Station Marunouchi Square Japan','Nijubashi Bridge Tokyo Japan'],note:'上午步行段。'},{title:'涩谷 → 猫街 → 原宿',names:['涩谷路口','Hikarie','猫街','竹下通'],places:['Shibuya Scramble Crossing Japan','Shibuya Hikarie Japan','Cat Street Tokyo Japan','Takeshita Street Tokyo Japan'],note:'含2个途经点；午餐与商店停留会增加总时间，下午仍需回酒店。'}],
 [{title:'元箱根港 → 箱根神社',names:['元箱根港','箱根神社'],places:['Motohakone Port Japan','Hakone Shrine Japan'],note:'仅湖岸步行段。登山电车、缆车和船必须分别查运营，不能合成全天步行路线。'}],
 [{title:'河口湖站 → 缆车山麓站',names:['河口湖站','全景缆车山麓站'],places:['Kawaguchiko Station Japan','Mt. Fuji Panoramic Ropeway Japan'],note:'只到山麓乘车处，不是步行登山路线。大石公园往返使用下面的公共交通分段。'}],
 [{title:'浅草 → 隅田川 → 晴空塔',names:['浅草站','雷门','浅草寺','吾妻桥','晴空塔'],places:['Asakusa Station Tokyo Japan','Kaminarimon Tokyo Japan','Senso-ji Tokyo Japan','Azumabashi Bridge Tokyo Japan','Tokyo Skytree Japan'],note:'含3个途经点。排队、拍照与上塔另计；上塔后必须回浅草取行李。'}]
];
function googleDirections(places,mode='walking'){
 if(places.length<2||places.length>5)throw new Error('Google链接须有2–5个地点');
 if(mode==='transit'&&places.length!==2)throw new Error('公共交通链接只能有起终点');
 const params=new URLSearchParams({api:'1',origin:places[0],destination:places[places.length-1],travelmode:mode});
 if(places.length>2)params.set('waypoints',places.slice(1,-1).join('|'));
 const url='https://www.google.com/maps/dir/?'+params.toString();if(url.length>2048)throw new Error('地图链接过长');return url;
}
function nextLegInfo(day,index){const steps=ROUTE_STEPS[day],mode=LEG_MODES[day][index];if(!mode||index>=steps.length-1)return null;const a=steps[index],b=steps[index+1];if(a[3]===b[3])return null;return{url:googleDirections([a[3]+' Japan',b[3]+' Japan'],mode),title:`${a[1]} → ${b[1]}`,label:mode==='walking'?'步行':'公共交通',instruction:a[4]};}
function nextLegButton(day,index){const leg=nextLegInfo(day,index);return leg?`<a class="google-next-leg" href="${leg.url}" target="_blank" rel="noopener noreferrer">Google 前往下一站 · ${leg.label} ↗</a>`:'';}
function googleDayRoutes(day){return `<section class="google-day-routes" aria-label="当天Google地图路线"><div class="google-routes-head"><h3>在 Google 地图里，照着走</h3><button data-copy-day-route="${day}">复制全天地点顺序</button></div><p class="google-routes-intro">步行景点可以串成多站路线；电车、巴士等按段打开。Google默认可能显示“现在出发”，请改成旅行当天日期与时间。地点按名称匹配，请核对店名和地址。</p><div class="walk-route-cards">${WALK_BUNDLES[day].map(b=>`<article><span>步行串点 · ${b.places.length}个地点</span><h4>${b.title}</h4><p>${b.names.join(' → ')}</p><a href="${googleDirections(b.places)}" target="_blank" rel="noopener noreferrer">打开这条多站路线 ↗</a><small>${b.note}</small></article>`).join('')}</div><details class="google-legs"><summary>展开全天分段路线 · 按游览顺序</summary><ol>${ROUTE_STEPS[day].slice(0,-1).map((s,i)=>{const leg=nextLegInfo(day,i);return `<li><b>${i+1} → ${i+2} · ${s[1]} → ${ROUTE_STEPS[day][i+1][1]}</b><p>${s[4]}</p>${leg?`<a href="${leg.url}" target="_blank" rel="noopener noreferrer">Google查${leg.label}路线 ↗</a>`:'<small>同一地点／航班段，不生成地面导航。</small>'}</li>`}).join('')}</ol></details><p class="google-routes-limit">整天包含多种交通，请依次使用分段路线。公共交通不能一次串多个目的地。箱根缆车、船及指定列车不保证被Google推荐，按已订票与运营方信息确认。<a href="https://support.google.com/maps/answer/144339?hl=en" target="_blank" rel="noopener noreferrer">Google规则 ↗</a></p><small class="google-app-hint">已安装Google Maps时，系统可能直接打开App；否则打开网页版。是否唤起App取决于手机与浏览器。</small></section>`}
document.addEventListener('click',async e=>{const copy=e.target.closest('[data-copy-day-route]');if(!copy)return;const day=+copy.dataset.copyDayRoute;const value=ROUTE_DAYS[day].label+' 行程地点顺序\n'+ROUTE_STEPS[day].map((s,i)=>`${i+1}. ${s[1]} · ${s[0]}\n${s[4]}`).join('\n');try{await navigator.clipboard.writeText(value);toast('已复制全天顺序；公共交通仍需按段查路线')}catch{toast('复制失败，可展开下方分段路线查看')}});
