let currentPlaceId=0
const uploadMessage=document.getElementById("uploadMessage")
const playButton=document.getElementById("playButton")
const isPhone=/(android)/i.test(navigator.userAgent)||(/iPad|iPhone|iPod/.test(navigator.platform)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1))&&!window.MSStream
const storageKey="autoupload_app_data"
const getSavedData=()=>JSON.parse(localStorage.getItem(storageKey)||"{}")
const setSavedData=(newData)=>localStorage.setItem(storageKey,JSON.stringify(Object.assign(getSavedData(),newData)))
function sendNotification(placeId){if(!("Notification"in window)||Notification.permission!="granted"||!getSavedData().notify)return;const gamelink=getGameLink(placeId)
const notif=new Notification("New condo posted!",{body:gamelink,icon:`https://www.roblox.com/asset-thumbnail/image?assetId=${placeId}&width=420&height=420&format=png`})
notif.onclick=(event)=>{event.preventDefault();window.open(gamelink,"_blank")}}
const condoCheck=(sendNotif=false)=>fetch(`/latestupload.json?cache=${Date.now()}`,{headers:{pragma:"no-cache","cache-control":"no-cache"}}).then((response)=>response.json()).then((json)=>{uploadMessage.innerHTML=json.success?"Condo has been found!":json.message
if(currentPlaceId!=json.placeId){playButton.href=!isPhone?getGameLink(json.placeId):`robloxmobile://placeID=${json.placeId}`
if(json.placeId&&sendNotif)sendNotification(json.placeId);}
currentPlaceId=json.placeId
playButton.hidden=!currentPlaceId})
setInterval(()=>condoCheck(true),10000)
condoCheck()
if("Notification"in window&&Notification.permission=="default"&&getSavedData().notify!=false){setTimeout(()=>swal.fire({title:"Auto Uploads",text:"Do you want to receive notifications when a new condo gets uploaded?",icon:"question",showDenyButton:true,confirmButtonText:'Sure',denyButtonText:'I HATE CONDOS',}).then((result)=>{if(result.isConfirmed){Notification.requestPermission().then((permission)=>{if(permission!="granted")return;new Notification("CondoGames.XYZ",{body:"You will now receive notifications when a new condo gets uploaded!"})
setSavedData({notify:true})})}else if(result.isDenied){setSavedData({notify:false})}}),10000)}