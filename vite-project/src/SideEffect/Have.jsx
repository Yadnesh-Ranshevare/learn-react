import React from 'react'

export default function Have() {
    document.title = "side effect"
    const but = document.querySelector('.have')
    console.log(but)
  return (
    <div>
      <button className='have' onClick={()=>console.log("clicked")}> have side effect</button>
    </div>
  )
}
