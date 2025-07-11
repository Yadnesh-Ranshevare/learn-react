import React from 'react'
import {useForm} from 'react-hook-form'


export default function Form() {

    const {register, handleSubmit, setError,formState:{errors, isSubmitting}} = useForm({defaultValues:{email:"abc@gmail"}})

    async function submit(data) {
        try{
          await new Promise((resolve) => setTimeout(resolve, 2000))
          throw new Error("simulating backend error")
          console.log(data)
        }catch{
          setError("email",{
            type: "manual",
            message: "something went wrong"
          })
        }
      }
      
      console.log(errors)
  return (
    <form onSubmit={handleSubmit(submit)}>
        <div>
          <input {...register("email",{
            required : true,
            validate: (value) => {
              if(value.includes("@")) {
                return true
              }
              return "invalid email"
            }
            })} type="text" placeholder='email' 
          />
          <div>
            {
              errors.email && <p>{errors.email.message}</p>
            }
          </div>
        </div>
        <button disabled={isSubmitting}>
          {
            isSubmitting ? "loading" : "submit"
          }
        </button>
    </form>
  )
}
