import React from 'react'
import { z } from 'zod'

const userSchema = z.object({
    firstName : z.string(),
    email : z.string().email(),
})


const validUser = {
    firstName: "yadnesh",
    email: "2M8bT@example.com"
}
const inValidUser = {
    firstName: "yadnesh",
    email: "yadnesh.com"
}
console.log(userSchema.safeParse(validUser).data);
console.log(userSchema.safeParse(inValidUser).error);

export default function Zod() {
  return (
    <div>
      Zod example
    </div>
  )
}
