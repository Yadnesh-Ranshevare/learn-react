# Content
1. [Introduction](#introduction)
2. [register()](#register)
3. [HandleSubmit()](#handlesubmit)
4. [How to validate the input?](#how-to-validate-the-input)
5. [formState.errors](#formstateerrors)
6. [SetError()](#seterror)
7. [Handling Backend Error](#handling-backend-error)
8. [fromState.isSubmitting](#fromstateissubmitting)
9. [How to add default values?](#how-to-add-default-values)
10. [Integrating Zod for validation](#integrating-zod-for-validation)
# Introduction
React Hook Form is a library that helps you manage forms in React easily. It works with React’s built-in hooks (like useState, useEffect) to handle form state, validation, and submission in a simple and efficient way.


for installation
```bash
npm install react-hook-form
```
Syntax for JSX:
```jsx
const form = useForm()
```
Syntax for TSX:
```tsx
type FormFields = {
    // form data and their types
}


const form = useForm<FormFields>()
```
Here\
`useForm()` is a hook that gives you tools to manage the form

**Three major tool**
| Tools            | Uses                                  |
| ------------------ | -------------------------------------------- |
| `register()`       | Connects input fields to React Hook Form     |
| `handleSubmit()`   | Function to handle form submission           |
| `formState.errors` | Holds error messages for validation          |

**Therefor General Syntax:**
```jsx
const {register, handleSubmit, formState:{errors}} = useForm()
```

[Go To Top](#content)

---

# register()
The register() function is used to connect your input fields to React Hook Form’s system, so it can:

- Track the input’s value

- Handle validation rules

- Collect the final form data

### How to track the input?
```jsx
<input {...register("username")} />
```
Now React Hook Form will:
- Track the `username` input.
- Include `username` in the final form data when submitted.


### Example
```jsx
import React from 'react'
import {useForm} from 'react-hook-form'

export default function Form() {

    const {register, handleSubmit, formState:{errors}} = useForm()

    return (
      <form>
          <input {...register("email")} type="text" placeholder='email' />
          <input {...register("password")} type="password" placeholder='password' />
          <button>submit</button>
      </form>
    )
}
```
[Go To Top](#content)

---


# HandleSubmit()
`handleSubmit` is a higher-order function — it accepts another function as an argument and returns a new function that handles the form submission logic.

**How to use it?**
```jsx
<form onSubmit={handleSubmit(Submit)}>
```
Here `Submit` is a function that contains the logic of form submission

### Example:
```jsx
import React from 'react'
import {useForm} from 'react-hook-form'


export default function Form() {

    const {register, handleSubmit, formState:{errors}} = useForm()

    function submit(data) {
        // ...code
        console.log(data)   // printing the form data
    }
      
  return (
    <form onSubmit={handleSubmit(submit)}>      {/*there is no need to pass the form data register will handle that*/}
        <input {...register("email")} type="text" placeholder='email' />
        <input {...register("password")} type="password" placeholder='password' />
        <button>submit</button>
    </form>
  )
}
```
[Go To Top](#content)

---

# How to validate the input?
to validate the input we can use register:
```jsx
<input 
  {...register("email", { 
    required: true, 
    pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ 
  })} 
/>
```
- `required: true` → Field is required.
- `pattern` → Regex for email format.
- more validations

| Property        | Description                |
| --------------- | -------------------------- |
| `required`      | Field must not be empty    |
| `minLength`     | Minimum text length        |
| `maxLength`     | Maximum text length        |
| `min`           | Minimum number/date        |
| `max`           | Maximum number/date        |
| `pattern`       | Regex validation           |
| `validate`      | Custom validation function |
| `valueAsNumber` | Converts value to number   |
| `valueAsDate`   | Converts value to Date     |
| `setValueAs`    | Custom value transformer   |


### 1. required
Marks a field as required (must not be empty).
```jsx
register("username", { required: true })
```
###    2. minLength
Minimum number of characters.
```jsx
register("password", { minLength: 5 })
```

### 3. maxLength
Maximum number of characters.
```jsx
register("username", { maxLength: 5 })
```
### 4. min
For number inputs: minimum value.
```jsx
register("age", { min: 18})
```
### 5. max
For number inputs: maximum value.
```jsx
register("age", { max:80 })
```
### pattern
Regex pattern matching (useful for emails, passwords, etc.)
```jsx
register("email", { 
  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
})
```

### 7. validate
Custom validation logic using a function.
```jsx
register("confirmPassword", { 
  validate: (value) => value === password   
})
```
You can even provide multiple custom validations:
```jsx
register("username", {
  validate: {
    notAdmin: value => value !== "admin" ,
    noSpaces: value => !value.includes(" ") 
  }
})
```

### 8. valueAsNumber, valueAsDate
Useful for converting input types automatically.
```jsx
register("price", { valueAsNumber: true }) // Converts string to number
```
```jsx
register("dob", { valueAsDate: true }) // Converts string to Date
```

### 9. setValueAs
Custom way to transform input value before validation.
```jsx
register("phone", {
  setValueAs: v => v.trim()
})
```




[Go To Top](#content)

---



# formState.errors
`formState.errors` is an object provided by the `useForm()` hook that holds all the validation errors for each form field.

#### How to use it:
```jsx
const { register, handleSubmit, formState: { errors } } = useForm();
```

if you console.log `formState.errors` you'll get three thing
- `message`: string that contains a message related to the error\
**Note by default it is set to empty string therefor this message field has to be set by a developer during validation**
- `ref`: reference that point towards the field where error occur

- `type`: wht type of validation fail respective by inputted value

#### how to add message during validation
based of what type of validation we have different ways to add message field
1. **`required`: something that accept boolean as a input value** 
```jsx
register("username", { required: "Username is required" })  // "Username is required" is a error message
```
2. **`minLength`, `maxLength`, `min`, `max` and `pattern`: something that accept other than boolean as input**

Example using `pattern`, can use same syntax for all of the above mentioned type of validation
```jsx
register("email", { 
  pattern: {    
    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 
    message: "Invalid email format" 
  } 
})
```

3. **`validate`: something that accept the function as an input**

using OR operator
```jsx
register("confirmPassword", { 
  validate: (value) => value === password || "Passwords do not match"
})
```
using custom function
```jsx
register("email",{
    validate: (value) => {
        if(value.includes("@")) {
          return true
        }
        return "invalid email"
    }
})
```
### Example:
```jsx
import React from 'react'
import {useForm} from 'react-hook-form'


export default function Form() {

    const {register, handleSubmit,formState:{errors}} = useForm()

    function submit(data) { 
        console.log(data)
    }
      
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
        <button>submit</button>
    </form>
  )
}
```

[Go To Top](#content)

---

# setError
`setError` is a function from `useForm()` that lets you manually set validation errors for any field.

### How to use it?
```jsx
const {register, handleSubmit, setError} = useForm()
```

### Syntax
```jsx
setError(name, { type, message, shouldFocus })
```
| Param         | Description                                 |
| ------------- | ------------------------------------------- |
| `name`        | Field name (e.g., `"email"`)                |
| `type`        | Type of error (`"manual"`, `"server"` etc.) |
| `message`     | Custom error message                        |
| `shouldFocus` | If true, input will be focused              |

**Note: if your error is not belongs to any particular form field, then at name instead of field name you can pass 'root'** 

### Example:
```jsx
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (data.username === "admin") {
      setError("username", {    // setting error of unauthorize username
        type: "manual",
        message: "Username 'admin' is not allowed",
      });
    } else {
      console.log("Valid data:", data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username", { 
            required: "Username is required" 
        })} 
      />
      {
        errors.username && <p>{errors.username.message}</p>
      }

      <button type="submit">Submit</button>
    </form>
  );
}
```


[Go To Top](#content)

---
# Handling Backend Error

we use [setError()](#seterror) to handle error which happens at backend

```jsx
import React from 'react'
import {useForm} from 'react-hook-form'

export default function Form() {

    const {register, handleSubmit, setError,formState:{errors}} = useForm()

    async function submit(data) {
        try{
          throw new Error("simulating backend error")
        }catch{
          setError("root",{     // backed error doesn't belong to any form field particularly
            type: "manual",
            message: "something went wrong at backend side"
          })
        }
      }
      
      console.log(errors)
  return (
    <form onSubmit={handleSubmit(submit)}>
        <div>
          <input {...register("email",{ required : true })} type="text" placeholder='email' />
        </div>
        <button>submit</button>
        <div>
          {
            errors.root && <p>{errors.email.message}</p>
          }
        </div>
    </form>
  )
}
```

[Go To Top](#content)

---
# fromState.isSubmitting
formState.isSubmitting is a boolean value provided by the useForm() hook that tells you: Is the form currently being submitted?


#### Why is it useful?
You can use `isSubmitting` to:

- Disable the submit button while the form is submitting

- Show a loading spinner or message

- Prevent multiple submissions

#### How to use it:
```jsx
const { register, handleSubmit, formState: { isSubmitting } } = useForm();
```

#### Example
```jsx
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate API call
    console.log("Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: true })} placeholder="Name" />

      <button type="submit" disabled={isSubmitting}>        {/*disabling the submit button while the form is submitting*/}
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
```
[Go To Top](#content)

---
# How to add default values?
You can set default values for your form fields in React Hook Form using the defaultValues option inside useForm().

### Syntax
```jsx
const { register, handleSubmit } = useForm({
  defaultValues: {
    fieldName1: "value1",
    fieldName2: "value2"
  }
});
```
**Note: fieldName must match with that of those you are gonna use with register**


### Example
```jsx
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "guest",
      age: 25
    }
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} />
      <input type="number" {...register("age")} />

      <button type="submit">Submit</button>
    </form>
  );
}
```
When the form loads:

- username will show "guest"

- age will show 25

[Go To Top](#content)

---
# integrating Zod for validation

Zod is a TypeScript-first schema validation library. It lets you define rules in a clean way and validate your form input based on a schema.

by using zod we don't have to provide the custom validation zod will handel those validation for us

[Click here to learn about Zod](../Zod/readme.md)

### Setup (Installation)
```bash
npm install zod
npm install @hookform/resolvers
```

### How to use zod

1. **Import zod and zodResolver**
```jsx
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
```
2. **define zod schema**
```jsx
const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  age: z.number().min(18, "You must be at least 18"),
});
```

3. use zodResolver to connect zod with react-form-hook
```jsx
const {register, handleSubmit,formState: { errors }} = useForm({resolver: zodResolver(schema)});
```

### Example
```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  age: z.number().min(18, "You must be at least 18"),
});

function MyForm() {
  const {register, handleSubmit,formState: { errors }} = useForm({resolver: zodResolver(schema)});

  const onSubmit = (data) => console.log("Valid Data:", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" />
      {errors.username && <p>{errors.username.message}</p>}

      <input type="number" {...register("age", { valueAsNumber: true })} placeholder="Age" />
      {errors.age && <p>{errors.age.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

[Go To Top](#content)

---



