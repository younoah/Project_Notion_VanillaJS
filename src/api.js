export const API_END_POINT='https://kdt.roto.codes/documents'

export const request=async (url,options={})=>{
  try{
    const res=await fetch(`${API_END_POINT}${url}`,{
      ...options,
      headers:{
        'Content-type':'application/json',
        'x-username':'roto'
      }
    })
    if(res.ok){
      const json=await res.json()
      return json
    }
  }catch(e){
    alert(e.message)
  }
}