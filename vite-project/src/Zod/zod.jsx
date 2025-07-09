import React, { useState } from 'react'
import { z } from 'zod'

const userSchema = z.object({
    firstName : z.string().min(3),
    email : z.string().email(),
})

export default function Zod() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [result, setResult] = useState("click the submit button")

  const hadnleSubmit = (e) => {
    e.preventDefault()
    const validUser = userSchema.safeParse({ firstName: name, email: email })
    if(validUser.success) {
      setResult("success")
      console.log(validUser.data)
    }
    if(!validUser.success) {
      setResult(validUser.error?.errors[0].message)
    }
    console.log(validUser.error?.issues)
    console.log(validUser.error?.errors)
  }
  return (
    <div>
      <input type="text" placeholder='name' value={name} onChange={e => setName(e.target.value)} />
      <input type="text" placeholder='email' value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={hadnleSubmit}>submit</button>
      <p>{result}</p>
    </div>
  )
}
