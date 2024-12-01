import { useCallback, useEffect, useState } from "react"

function PasswordGenrator({name,age}) {
  const [length,setLEngth] = useState(6)
  const [numAllow,setNumAllow] = useState(false)
  const [syAllow, aetSyAllow] = useState(false)
  const [password,setPassword] = useState("") 
  const generatePass = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllow == true){
      str += "0987654321"
    }
    if(syAllow == true){
      str += ")(*&^%$#@!"
    }
    for(let i = 1;i<length;i++){
      let idx = Math.floor(Math.random()*str.length)
      pass += str.charAt(idx)
    }
    console.log(pass)
    //setPassword(pass)
  },[length,numAllow,syAllow])
 // useEffect(()=>{generatePass()},[length,numAllow,syAllow,generatePass])
  return (
    <div className="container">
      <div className="pass">
        <input type="text" value={password}/>
        <button>copy</button>
      </div>
      <div className="input">
        <div className="len">
          <input type="range" min={6} max={20} value={length} onChange={(e)=>{setLEngth(e.target.value)}} />
          <p>length {length}</p>
        </div>
        <div className="num">
          <input type="checkbox" defaultChecked =  {numAllow} onChange={()=>{ setNumAllow((prev) => !prev)}}/>
          <p>numbers</p>
        </div>
        <div className="symbol" defaultChecked={syAllow} onChange={()=>{aetSyAllow((prev) => !prev)}}>
          <input type="checkbox" />
          <p>symbol</p>
        </div>
        <div className="refresh" onClick={generatePass}>
        <button>refresh</button>
      </div>
      </div>
      

    </div>
  )
}

export default PasswordGenrator 
