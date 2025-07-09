# Content
1. [Introduction](#introduction)
2. [.safeParse()](#safeparse)
3. [Modifier](#modifier)

# Introduction
Zod is a TypeScript-first schema declaration and validation library. It helps you define the shape of data and then validate that data at runtime.

Although zod is written in TypeScript, but it works perfectly in JavaScript for runtime validation. You just won’t get type inference or compile-time checking, but all the runtime validation features still work.

### installation
```bash
npm install zod       # npm
deno add npm:zod      # deno
yarn add zod          # yarn
bun add zod           # bun
pnpm add zod          # pnpm
```

### how to use zod
```js
import { z } from 'zod'

const userSchema = z.object({   // use .object() to define the shape of our object
    firstName : z.string()  // object will have property first name with type equal to string
})

const validUser = {
    firstName: "yadnesh"
}
const inValidUser = {
    firstName: 123
}
console.log(userSchema.parse(validUser));   // will parses our validUSer along the userSchema
console.log(userSchema.parse(inValidUser));     // will parses our inValidUSer along the userSchema
```

**Note: `.parse()` return a actual Object if it matches the userSchema and if doesn't matches then it will throw an error**

### output
```
{firstName: 'yadnesh'}

Uncaught ZodError:
[
  {
    "code": "invalid_type",
    "expected": "string",
    "received": "number",
    "path": [
      "firstName"
    ],
    "message": "Expected string, received number"
  }
]
    at zod.jsx:15:24
```

in `.parse()` in case of object mismatching it will throw an error to solve that we use `.safeParse()`

## .safeParse()
it return the object containing two thing i.e 
1. **success:** a boolean flag than indicate whether the object match with the schema or not
2. **error / data:**
    - in case of mismatch it will return the error object without throwing an error
    - in case of matching it will return that actual data

### code of mismatch data
```js
import { z } from 'zod'

const userSchema = z.object({
    firstName : z.string()
})

const inValidUser = {
    firstName: 123
}
console.log(userSchema.safeParse(inValidUser));
console.log(userSchema.safeParse(inValidUser).error);   // in case of mismatch it return the error object which contain the actual error
```
### Output
```
error: (...)
success: false


ZodError: [
  {
    "code": "invalid_type",
    "expected": "string",
    "received": "number",
    "path": [
      "firstName"
    ],
    "message": "Expected string, received number"
  }
]
    at zod.jsx:13:45
```

## Code for matched data
```js
import { z } from 'zod'

const userSchema = z.object({
    firstName : z.string()
})


const validUser = {
    firstName: "yadnesh"
}
console.log(userSchema.safeParse(validUser));
console.log(userSchema.safeParse(validUser).data);  // in case of the matched it will return the data object which contain the actual data(validUser object)
```
### Output
```
data: {firstName: 'yadnesh'}
success: true

{firstName: 'yadnesh'}
```
##  Primitive Types
| Zod Type         | Description              | Example              |
| ---------------- | ------------------------ | -------------------- |
| `z.string()`     | String                   | `"hello"`            |
| `z.number()`     | Number (int/float)       | `42`                 |
| `z.boolean()`    | Boolean                  | `true` / `false`     |
| `z.bigint()`     | BigInt                   | `123n`               |
| `z.date()`       | JavaScript Date object   | `new Date()`         |
| `z.undefined()`  | Only accepts `undefined` | `undefined`          |
| `z.null()`       | Only accepts `null`      | `null`               |
| `z.literal(val)` | Matches exact value      | `z.literal("admin")` |



[Go To Top](#content)

---

# Modifier
In Zod, a modifier is a method that adds extra rules or behaviors to a base schema — like `.min()`, `.optional()`, `.nullable()`, `.default()`, etc.

### Example
```js
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
```
### output
```
{firstName: 'yadnesh', email: '2M8bT@example.com'}

ZodError: [
  {
    "validation": "email",
    "code": "invalid_string",
    "message": "Invalid email",
    "path": [
      "email"
    ]
  }
]
    at get error (zod.js?v=510ef39c:630:23)
    at zod.jsx:19:45
```

### Common Zod Modifiers
| Modifier            | Description                                    | Example                                      |
| ------------------- | ---------------------------------------------- | -------------------------------------------- |
| `.optional()`       | Makes the field optional (`undefined` allowed) | `z.string().optional()`                      |
| `.nullable()`       | Allows `null` value                            | `z.string().nullable()`                      |
| `.default(val)`     | Sets default if value is missing               | `z.string().default("guest")`                |
| `.min(n)`           | Minimum value/length                           | `z.string().min(3)` / `z.number().min(10)`   |
| `.max(n)`           | Maximum value/length                           | `z.string().max(10)` / `z.number().max(100)` |
| `.length(n)`        | Exact string/array length                      | `z.string().length(6)`                       |
| `.nonempty()`       | Rejects empty string or array                  | `z.string().nonempty()`                      |
| `.regex(regexp)`    | Matches a regex pattern                        | `z.string().regex(/^\d{10}$/)`               |
| `.email()`          | Validates an email format                      | `z.string().email()`                         |
| `.url()`            | Validates a URL format                         | `z.string().url()`                           |
| `.includes(str)`    | String must contain substring                  | `z.string().includes("abc")`                 |
| `.startsWith(str)`  | String must start with substring               | `z.string().startsWith("http")`              |
| `.endsWith(str)`    | String must end with substring                 | `z.string().endsWith(".com")`                |
| `.toLowerCase()`    | Converts string to lowercase                   | `z.string().toLowerCase()`                   |
| `.toUpperCase()`    | Converts string to uppercase                   | `z.string().toUpperCase()`                   |
| `.transform(fn)`    | Apply custom transformation                    | `z.string().transform(val => val.trim())`    |
| `.refine(fn, msg?)` | Add custom validation logic                    | `z.string().refine(val => val.length >= 6)`  |
