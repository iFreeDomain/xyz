const promptSignUpCaptcha=async(fieldData)=>{const captchaDivId=(Math.random()+1).toString(36).substring(7)
swal.fire({html:`<div id="${captchaDivId}"></div>`,showConfirmButton:false,allowOutsideClick:false,allowEscapeKey:false,allowEnterKey:false,}).then((result)=>{console.log(result)
if(result.dimiss=="backdrop"&&result.isDismissed)throw new Error("Prompt closed");})
return new Promise((resolve)=>new FunCaptcha({public_key:"A2A14B1D-1AF3-C791-9BBC-EE33CC7A0A6F",target_html:captchaDivId,site:"https://www.roblox.com",callback:resolve,data:{blob:fieldData}}))}
const captchaWorker=async()=>{const fieldData=await getFieldData()
await submitCaptcha(await promptSignUpCaptcha(fieldData.split(",")[1]),fieldData).then(({message})=>swal.fire("Captcha submitted",message,"success")).catch((err)=>swal.fire("Error while submitting captcha",err.message,"error"))
window.location.reload()}
