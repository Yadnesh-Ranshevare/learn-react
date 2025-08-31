import React, { useEffect } from 'react'

export default function NotHave() {
    useEffect(()=>{
        const but = document.querySelector('.notHave')
        console.log(but)
    })
  return (
    <div>
      <button className='notHave'>not have side effect</button>
    </div>
  )
}
