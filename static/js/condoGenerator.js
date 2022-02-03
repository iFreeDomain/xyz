(()=>{const condoGenerator=document.getElementById("condoRequester")
const submitBtn=condoGenerator.getElementsByTagName("button")[0]
const{robloxUsername,maxPlayerCount,map:mapSelect}=condoGenerator.elements
condoGenerator.addEventListener('submit',async(event)=>{submitBtn.disabled=true
event.preventDefault()
generatePrivateCondo(requestData).then((placeId)=>window.location.href=getGameLink(placeId)).catch((err)=>swal.fire({title:"Error while generating private condo",text:err.message,icon:"error"}))
swal.fire({title:"CondoRequester",text:"Your private condo is being generated...",allowOutsideClick:false,allowEscapeKey:false,allowEnterKey:false,showConfirmButton:false})
swal.showLoading()})
getCondoMaps().then((maps)=>{maps.forEach((map,id)=>{const option=document.createElement("option")
option.value=id
if(map.emoji)option.text=`[${map.emoji}] `;option.text+=map.name
mapSelect.appendChild(option)})
submitBtn.disabled=false})})()
