import{config as e,database as a,logger as t,changePanel as i,appdata as n,setStatus as s,pkg as l,popup as c}from"../utils.js";let{Launch:r,AZauth:d}=require("minecraft-java-core"),{shell:o,ipcRenderer:v}=require("electron");class Home{static id="home";async init(e){this.config=e,this.db=new a,this.news(),this.socialLick(),this.instancesSelect(),document.querySelector(".settings-btn").addEventListener("click",e=>i("settings"));let t=await this.db.readData("accounts",(await this.db.readData("configClient")).account_selected);document.querySelector(".player-head").style.background=`url('https://www.iridiumpvp.fr/api/skin-api/avatars/face/${t?.name}')`}async news(){let a=document.querySelector(".news-list"),t=await e.GetNews().then(e=>e).catch(e=>!1);if(t){if(t.length)for(let i of t){let n=this.getdate(i.publish_date),s=document.createElement("div");s.classList.add("news-block"),s.innerHTML=`
                        <div class="news-header">
                            <img class="server-status-icon" src="assets/images/icon.png">
                            <div class="header-text">
                                <div class="title">${i.title}</div>
                            </div>
                            <div class="date">
                                <div class="day">${n.day}</div>
                                <div class="month">${n.month}</div>
                            </div>
                        </div>
                        <div class="news-content">
                            <div class="bbWrapper">
                                <p>${i.content.replace(/\n/g,"</br>")}</p>
                                <p class="news-author">Auteur - <span>${i.author}</span></p>
                            </div>
                        </div>`,a.appendChild(s)}else{let l=document.createElement("div");l.classList.add("news-block"),l.innerHTML=`
                    <div class="news-header">
                        <img class="server-status-icon" src="assets/images/icon.png">
                        <div class="header-text">
                            <div class="title">Aucun news n'ai actuellement disponible.</div>
                        </div>
                        <div class="date">
                            <div class="day">1</div>
                            <div class="month">Janvier</div>
                        </div>
                    </div>
                    <div class="news-content">
                        <div class="bbWrapper">
                            <p>Vous pourrez suivre ici toutes les news relative au serveur.</p>
                        </div>
                    </div>`,a.appendChild(l)}}else{let c=document.createElement("div");c.classList.add("news-block"),c.innerHTML=`
                <div class="news-header">
                        <img class="server-status-icon" src="assets/images/icon.png">
                        <div class="header-text">
                            <div class="title">Error.</div>
                        </div>
                        <div class="date">
                            <div class="day">1</div>
                            <div class="month">Janvier</div>
                        </div>
                    </div>
                    <div class="news-content">
                        <div class="bbWrapper">
                            <p>Impossible de contacter le serveur des news.</br>Merci de v\xe9rifier votre configuration.</p>
                        </div>
                    </div>`,a.appendChild(c)}}async instancesSelect(){let a=await this.db.readData("configClient"),t=await this.db.readData("accounts",a.account_selected),i=await e.getInstanceList(),n=i.find(e=>e.name==a?.instance_selct)?a?.instance_selct:null,l=document.querySelector(".play-instance"),c=document.querySelector(".instance-popup"),r=document.querySelector(".instances-List"),d=document.querySelector(".close-popup");if(document.querySelector(".player-head").style.background=`url('https://www.iridiumpvp.fr/api/skin-api/avatars/face/${t?.name}')`,1===i.length&&(document.querySelector(".instance-select").style.display="none",l.style.paddingRight="0"),!n){let o=i.find(e=>!1==e.whitelistActive),v=await this.db.readData("configClient");v.instance_selct=o.name,n=o.name,await this.db.updateData("configClient",v)}for(let m of i){if(m.whitelistActive){if(m.whitelist.find(e=>e==t?.name)!==t?.name&&m.name==n){let p=i.find(e=>!1==e.whitelistActive),h=await this.db.readData("configClient");h.instance_selct=p.name,n=p.name,s(p.status),await this.db.updateData("configClient",h)}}else console.log(`Initializing version ${m.name}...`);m.name==n&&s(m.status)}c.addEventListener("click",async a=>{let t=await this.db.readData("configClient");if(a.target.classList.contains("instance-elements")){let l=a.target.id,r=document.querySelector(".active-instance");r&&r.classList.toggle("active-instance"),a.target.classList.add("active-instance"),t.instance_selct=l,await this.db.updateData("configClient",t),n=i.filter(e=>e.name==l),c.style.display="none";await s((await e.getInstanceList()).find(e=>e.name==t.instance_selct).status)}}),l.addEventListener("click",async e=>{let a=await this.db.readData("configClient"),t=a.instance_selct,n=await this.db.readData("accounts",a.account_selected);if(e.target.classList.contains("instance-select")){for(let s of(r.innerHTML="",i))s.whitelistActive?s.whitelist.map(e=>{e==n?.name&&(s.name==t?r.innerHTML+=`<div id="${s.name}" class="instance-elements active-instance">${s.name}</div>`:r.innerHTML+=`<div id="${s.name}" class="instance-elements">${s.name}</div>`)}):s.name==t?r.innerHTML+=`<div id="${s.name}" class="instance-elements active-instance">${s.name}</div>`:r.innerHTML+=`<div id="${s.name}" class="instance-elements">${s.name}</div>`;c.style.display="flex"}e.target.classList.contains("instance-select")||this.startGame()}),d.addEventListener("click",()=>c.style.display="none")}async startGame(){let a=new r,i=await this.db.readData("configClient"),s=await e.getInstanceList(),d=await this.db.readData("accounts",i.account_selected),o=s.find(e=>e.name==i.instance_selct),m=document.querySelector(".play-instance"),p=document.querySelector(".info-starting-game"),h=document.querySelector(".info-starting-game-text"),u=document.querySelector(".progress-bar"),g={url:o.url,authenticator:d,timeout:1e4,path:`${await n()}/${"darwin"==process.platform?this.config.dataDirectory:`.${this.config.dataDirectory}`}`,instance:o.name,version:o.loadder.minecraft_version,detached:"close-all"!=i.launcher_config.closeLauncher,downloadFileMultiple:i.launcher_config.download_multi,intelEnabledMac:i.launcher_config.intelEnabledMac,loader:{type:o.loadder.loadder_type,build:o.loadder.loadder_version,enable:"none"!=o.loadder.loadder_type},verify:o.verify,ignored:[...o.ignored],javaPath:i.java_config.java_path,screen:{width:i.game_config.screen_size.width,height:i.game_config.screen_size.height},memory:{min:`${1024*i.java_config.java_memory.min}M`,max:`${1024*i.java_config.java_memory.max}M`}};a.Launch(g),m.style.display="none",p.style.display="block",u.style.display="",v.send("main-window-progress-load"),a.on("extract",e=>{v.send("main-window-progress-load"),console.log(e)}),a.on("progress",(e,a)=>{h.innerHTML=`T\xe9l\xe9chargement ${(e/a*100).toFixed(0)}%`,v.send("main-window-progress",{progress:e,size:a}),u.value=e,u.max=a}),a.on("check",(e,a)=>{h.innerHTML=`V\xe9rification ${(e/a*100).toFixed(0)}%`,v.send("main-window-progress",{progress:e,size:a}),u.value=e,u.max=a}),a.on("estimated",e=>{let a=Math.floor(e/3600),t=Math.floor((e-3600*a)/60);console.log(`${a}h ${t}m ${Math.floor(e-3600*a-60*t)}s`)}),a.on("speed",e=>{console.log(`${(e/1067008).toFixed(2)} Mb/s`)}),a.on("patch",e=>{console.log(e),v.send("main-window-progress-load"),h.innerHTML="Patch en cours..."}),a.on("data",e=>{u.style.display="none","close-launcher"==i.launcher_config.closeLauncher&&v.send("main-window-hide"),new t("Minecraft","#36b030"),v.send("main-window-progress-load"),h.innerHTML="Demarrage en cours...",console.log(e)}),a.on("close",e=>{"close-launcher"==i.launcher_config.closeLauncher&&v.send("main-window-show"),v.send("main-window-progress-reset"),p.style.display="none",m.style.display="flex",h.innerHTML=`V\xe9rification`,new t(l.name,"#7289da"),console.log("Close")}),a.on("error",e=>{new c().openPopup({title:"Erreur",content:e.error,color:"red",options:!0}),"close-launcher"==i.launcher_config.closeLauncher&&v.send("main-window-show"),v.send("main-window-progress-reset"),p.style.display="none",m.style.display="flex",h.innerHTML=`V\xe9rification`,new t(l.name,"#7289da"),console.log(e)})}getdate(e){let a=new Date(e),t=a.getFullYear(),i=a.getMonth()+1,n;return{year:t,month:["janvier","f\xe9vrier","mars","avril","mai","juin","juillet","ao\xfbt","septembre","octobre","novembre","d\xe9cembre"][i-1],day:a.getDate()}}socialLick(){document.querySelectorAll(".social-block").forEach(e=>{e.addEventListener("click",e=>{o.openExternal(e.target.dataset.url)})})}}export default Home;