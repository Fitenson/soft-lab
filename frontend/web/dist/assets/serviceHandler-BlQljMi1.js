async function n(e,{onSuccess:t,onError:a}={}){try{const r=await e();return t?.(r),r}catch(r){throw a?.(r),r}}export{n as h};
