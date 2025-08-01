function loadJQuery(t){var e;void 0===window.jQuery?((e=document.createElement("script")).src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",e.onload=function(){window.$=window.jQuery.noConflict(),t()},e.onerror=function(){console.error("Failed to load jQuery")},document.head.appendChild(e)):t()}function handleSetupCustomEvent(){var o="/admin/apps/"+ot_feature_settings.app_name,t=ot_feature_settings?.app_root_url||"https://apps.omegatheme.com/shopify/facebook-multi-pixels",e=t+"/images/custom-event/menuIcon-black.png",n=t+"/images/custom-event/qaIcon-black.png",i=t+"/images/custom-event/shareIcon-black.png",s=t+"/images/custom-event/shareIcon-white.png",l=t+"/images/custom-event/tickIcon-blue.png",t=($("body").append(`<style>
    .text-tutorial{
        vertical-align: middle;
        color: #6D7175;
        opacity: 1
    }
    .text-tutorial:hover{
        opacity: 0.6
    }
    #tutorial:hover{
        opacity: 0.6
    }
    .ot-title-card{
        background: #e6e5e5;
        padding: 10px 10px
    }
    #ot_close_button{
        background: #e6e5e5;
        border-radius: 24px; width: 126px;
        height: 28px; border: unset; color: #fff;
        position: absolute;
        right: 25px; font-size: 14px; font-weight: 550; cursor: pointer;
        pointer-events:none;
        color: #727272
    }
    #ot_track_button{
    width: 170px;
    margin-top: 10px;
    height: 32px;
    background: #FFFFFF;
    border: 1px solid #6D7175;
    box-sizing: border-box;
    border-radius: 4px;
    font-weight: 600;
    font-weight: 550;
    font-size: 14px;
    line-height: 5px;
    cursor: pointer;
    }
    #ot_track_button:hover{
    opacity:0.6
    }
    #ot_close_button:hover{
    opacity:0.6
    }
    .otfooterQA{
    font-size: 13px; font-weight: 500; margin-top: 15px;
        justify-content: end;
        display: flex; cursor: pointer
    }
    #ot_fb_modal{
    position: fixed;
    z-index: 1000;
    left: 10px;
    top: 10px;
    width: 450px;
    height: auto;
    overflow: auto;
    background: #FFFFFF;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    }
    #ot_fb_modal_notification{
    position: fixed;
    z-index: 1000;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 10px;
    width: 650px;
    height: auto;
    background: #FFFFFF;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    padding: 20px;
    text-align:center
    }
    #ot_fb_backDrop{
    position: fixed;
    z-index : -1;
    display : block;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0);
    animation: Polaris-Backdrop__fade--in .2s 1 forwards;
    opacity: 1;
    }
    #otIconShare {
    width: 10px;
    height: 13px;
    margin-right: 5px;
    display: inline-block;
    }

    .notification-title{
    color:#1877F2
    }

    .ot-close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 32px;
    height: 32px;
    opacity: 0.3;
    font-size: 1px;
    }
    .ot-close:hover {
    opacity: 1;
    }
    .ot-close:before, .ot-close:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 24px;
    width: 2px;
    background-color: #333;
    }
    .ot-close:before {
    transform: rotate(45deg);
    }
    .ot-close:after {
    transform: rotate(-45deg);
    }
    </style> `),$("body").append(`<div class="event_content"
    ></div>
    <div id="ot_fb_modal_notification">
    <a class="ot-close" id="ot-close">.</a>
    <p class = "notification-title"><b>Click the middle of the highlighted button to set up your event</b></p>
    <p class = "notification-title">(scroll down to see buttons)</p>
    </div>`),$(".event_content").append(`
    <div class="backdrop" id ="ot_fb_backDrop"></div>
    <div title="Basic dialog" id="ot_fb_modal">
        <div class = "ot-title-card">
            <img src = "${e}" style="width: 10px;
                height: 13px;
                margin-right: 5px;">
            </img>
            <b style="font-size:15px;line-height: 15px;">Custom Event Setup</b>
            <button id="ot_close_button"><img id="otIconShare" src="${i}">Finish Setup</button>
        </div>
        <div style="padding: 0 20px 20px">
        <div style="margin-top: 15px; font-size: 15px;">
            <b>Tracking button</b>
        </div>
        <div id="event_button_field" style="margin-top: 10px">
            <p id="ot_no_button_text" style="color : #828282; font-size: 15px;">No button chosen</p>
        </div>
        <div>
        <button id="ot_track_button">+ Track New Button</button>
    </div>
        <div class = "otfooterQA"><a id="tutorial" href = "https://omegatheme-contact.gitbook.io/omega-multi-facebook-pixels/integration/custom-events" target="_blank"><img src="${n}" style="width: 13px;
        margin-right: 2px;display: inline-block;vertical-align: middle
        "><span class = "text-tutorial">Tutorial</span></a></div>
        </div>

    `),document.querySelector("#ot-fb__backdrop-loading-custom-event"));t&&(t.style.display="none",console.log("Hide loading event builder!"));const a=document.getElementById("ot_fb_modal");e=document.getElementById("ot-close");const r=document.getElementById("ot_fb_modal_notification"),c=document.getElementById("otIconShare"),d=document.getElementById("ot_close_button"),p=document.getElementById("ot_fb_backDrop");n=document.getElementById("ot_track_button");const u=document.querySelectorAll("a:not(#tutorial):not(#ot-close), button:not(#ot_track_button):not(#ot_close_button)");var g,b,m,y,x;document.getElementById("ot_no_button_text");const _=JSON.stringify({});let f=_;function h(t){(t=t||window.event).preventDefault(),y=t.clientX,x=t.clientY,document.onmouseup=k,document.onmousemove=v}function v(t){(t=t||window.event).preventDefault(),b=y-t.clientX,m=x-t.clientY,y=t.clientX,x=t.clientY,g.style.top=g.offsetTop-m+"px",g.style.left=g.offsetLeft-b+"px"}function k(){document.onmouseup=null,document.onmousemove=null}g=a,x=y=m=b=0,document.getElementById(g.id)?document.getElementById(g.id).onmousedown=h:g.onmousedown=h,d.onclick=async()=>{var t=window.location.search,t=new URLSearchParams(t),e=t.get("cta"),t=t.get("custom");ot_endPointUrl;p.style.display="none",a.style.display="none",f=encodeURIComponent(f),w(u),window.open(`https://${Shopify.shop}${o}?redirect-action=custom-events&otStoreLanguage=en&cta=${e}&custom=${t}&button_fires=`+f,"_self")},e.onclick=()=>{r.style.display="none"},n.onclick=()=>{$("#ot_no_button_text").replaceWith(`<p id="ot_no_button_text" style="color : #828282; font-size: 15px;
    ">No button chosen</p>`),d.style.backgroundColor="#e6e5e5",d.style.boxShadow="none",d.style.pointerEvents="none",d.style.color="#727272",c.setAttribute("src",i),"undefined"!=typeof OMGRFQConfigs&&(OMGRFQConfigs.stopPropagation=!0),u.forEach(n=>{$(n).unbind("click"),n.style.border="2px #1877F2 solid",n.style.cursor="pointer",n.style.boxShadow="0px 0px 6px #1877F2",n.style.opacity=1,n.style.backgroundImage="unset",n.style.backgroundRepeat="unset",n.style.backgroundPosition="unset",p.style.zIndex=-1,p.style.backgroundColor="rgba(0, 0, 0, 0.4)",p.style.position="fixed",p.style.display="block",n.style.zIndex=400,f=_,$(n).off("click");$(n).on("click",function(t){t.stopPropagation(),t.preventDefault(),console.log("Class of dom click: ",t.target.classList.value),console.log("ID of dom click: ",t.target.id),d.style.backgroundColor="#1877F2",d.style.boxShadow="0px 8px 15px rgba(0, 0, 0, 0.1)",d.style.pointerEvents="auto",d.style.color="white",c.setAttribute("src",s),n.style.pointerEvents="unset",n.style.border="2px red solid",n.style.backgroundImage=`url(${l})`,n.style.backgroundRepeat="no-repeat",n.style.backgroundPosition="top right",n.style.backgroundSize="1em",p.style.zIndex=600,p.style.backgroundColor="rgba(0, 0, 0, 0)",p.style.position="fixed",p.style.top=0,p.style.right=0,p.style.bottom=0,p.style.left=0,p.style.display="block",n.classList.add("event_selected"),listEventTemp=document.querySelectorAll("a:not(.tutorial):not(.event_selected), button:not(#ot_track_button):not(#ot_close_button):not(.event_selected)"),w(listEventTemp),n.classList.remove("event_selected");var e=n.textContent?.trim().length?n.textContent?.trim().replace(/\s+/g,"_"):n.getAttribute("aria-label")?.trim().replace(/ /g,""),o=t.target.textContent?.trim().length?t.target.textContent?.trim().replace(/\s+/g," "):"",t=(t.target.classList.value.trim().length?"."+t.target.classList.value.trim().replace(/\s+/g,"."):"")+(t.target.id.trim().length?"#"+t.target.id.trim():"");return f=JSON.stringify({button_fires_by_text:o,button_fires_by_class_id:t,button_fires_label:e}),console.log("button_fires",JSON.parse(f)),$("#ot_no_button_text").replaceWith(`<p id="ot_no_button_text"><img src="${l}" style="
        height: 17px;
        margin-right: 5px;     display: inline-block;     vertical-align: middle;
        "><span style="vertical-align: middle;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        width: 350px;
        white-space: nowrap;
    ">${e}</span></p>`),!1})})};const w=t=>{t.forEach(t=>{t.style.border="unset",t.style.boxShadow="unset",t.style.cursor="unset",t.style.opacity="unset",t.style.backgroundImage="unset",t.style.backgroundRepeat="unset",t.style.backgroundPosition="unset"})}}function includeSetUpEventPage(){var t=sessionStorage.getItem("OT_FACEBOOK_EVENT_SETUP"),e=ot_getUrlParam("otCustomEvent");"show"!=t&&"1"!=e||(sessionStorage.setItem("OT_FACEBOOK_EVENT_SETUP","show"),handleSetupCustomEvent())}loadJQuery(includeSetUpEventPage);