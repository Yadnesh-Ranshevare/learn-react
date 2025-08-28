# Content
1. [Introduction](#introduction)
2. [Setup](#setup)
3. [useQuery](#usequery)
4. [useMutation](#usemutation)
5. [invalidateQueries](#invalidatequeries)

---
# Introduction
TanStack Query (previously called React Query) is a data-fetching and state management library.

**It helps you:**
- Fetch data from APIs (like REST or GraphQL).
- Keep the data cached (so you don’t need to re-fetch unnecessarily).
- Handle loading, error, and success states automatically.
- Keep your UI in sync with the server data in real-time.

### Why use it instead of normal fetch() or Axios?

Normally, when fetching data:
1. You write code for loading state.
2. You handle error state.
3. You cache the result manually if needed.
4. You re-fetch if data changes.

**This gets messy and repetitive.**\
**TanStack Query does all of this for you automatically.**


### Frameworks / Libraries Supported by TanStack Query

1. React → (most popular, original version was React Query).
2. SolidJS → via `@tanstack/solid-query`.
3. Vue → via `@tanstack/vue-query`.
4. Svelte → via `@tanstack/svelte-query`.
5. Vanilla JS → can be used without any framework, just plain JavaScript.

[Go To Top](#content)

---
# Setup


### 1. Installation
1. install the actual library
```bash
npm i @tanstack/react-query
```
2. install the devtools to see queries while debugging
```bash
npm i @tanstack/react-query-devtools
```
3. install `ESLint Plugin Query`, recommended to help you catch bugs and inconsistencies while you code
```bash
npm i -D @tanstack/eslint-plugin-query
```
### 2. Wrap your app with QueryClientProvider
```jsx
// main.jsx or index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={new QueryClient()}>
    <App />
  </QueryClientProvider>
)
```
you can wrap any component with the `QueryClientProvider`, but:
- It provides the QueryClient context to all child components.
- Any component inside it can use `useQuery` or `useMutation`.
- Components outside of it won’t have access to React Query.

Therefor Usually, you wrap your whole app in `QueryClientProvider` (at `index.js` or `main.jsx`):
```jsx
<QueryClientProvider client={new QueryClient()}>
  <App />
</QueryClientProvider>
```
This way, every component inside App can use React Query.

[Go To Top](#content)

---
# useQuery

it is Used for:
- Runs a function that fetches data (like from an API).
- Handles loading, error, and success states automatically.
- Caches the data so if you call it again, it won’t always re-fetch.


### Basic Syntax

```jsx
const QueryOutput = useQuery({
    queryKey: ['uniqueKey'],   
    queryFn: async () => {     // accept the function
      // fetch request 
    },
})
```
**Now, `QueryOutput` contains several properties you can use:**
- **`QueryOutput.data`** → the result from your fetch (success case).  
- **`QueryOutput.error`** → the error object if something goes wrong.  
- **`QueryOutput.isLoading`** → `true` when the request is running.  
- **`QueryOutput.isError`** → `true` if the request failed.  
- **`QueryOutput.isSuccess`** → `true` if the request succeeded.  
- **`QueryOutput.refetch`** → function to manually re-run the query.  

**`queryKey`**: it is use to cache the data i.e, data is cache with respect to this key. If the same key come it return the cache data and if new key come it runs the `queryFn` and cache it with respect to this key

### Other properties you can pass with useQuery
```jsx
const QueryOutput = useQuery({
    queryKey: ['uniqueKey'],   
    queryFn: async () => {     
      // fetch request
    },
    enabled: true,             // (optional) auto-run? (default: true)
    staleTime: 1000 * 60,      // (optional) how long data stays fresh
    cacheTime: 1000 * 60 * 5,  // (optional) how long unused cache lives
    refetchOnWindowFocus: true // (optional) refetch when tab refocuses
})
```

### Example
```jsx
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function UseQueryExample() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchRequest       // this can be a api call
  })

  if (isLoading) return <p>Loading users...</p>
  if (isError) return <p>Error: {error.message}</p>

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

const fetchRequest = async () => {
  const data = [
    { id: 1, name: "Leanne Graham" },
    { id: 2, name: "Ervin Howell" },
    { id: 3, name: "Clementine Bauch" }
  ]
  // simulate network delay to mimic api call
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return data
}
```
What happens Here
1. When component mounts → `isLoading = true` → shows `"Loading users..."`.
2. After 2 seconds → fake `data` is returned.
3. Data gets displayed in a list.
4. If something fails → shows `"Error: ..."`



[Go To Top](#content)

---

# useMutation
- [useQuery](#usequery) → used for fetching (GET requests, data retrieval).
- `useMutation` → used for changing data (POST, PUT, PATCH, DELETE).

**In simple words:**\
useMutation helps you send data to the server and handle success/error/loading states easily.

### Basic syntax
```jsx
const mutation = useMutation({
    mutationFn:async()=>{},
    onSuccess: () => console.log("success"),
    onError: () => console.log("error")
})
```
- `mutationFu` accept the async function that can perform your api call
- `onSuccess` is a function that runs if `mutationFn` succeeds
- `onError` is a function that runs if `mutationFn` fails
```jsx
const mutation = useMutation({
    mutationFn:addPost,
    onSuccess: (data) => console.log(data),
    onerror:(error) => console.log(error)
})
```
in `onSuccess` and `onError` you also have the access to data and error object return by `mutationFu` function
```jsx
mutation.mutate()
```
`mutation.mutate()` is use to call this `mutationFu`
```jsx
const mutation = useMutation({
    mutationFn:async({data})=>{
      console.log(data)
    }
})

mutation.mutate({data:"new data"})
```
This is how you can pass the data with `mutationFu`


### list of properties returned by `useMutation`

- **Status booleans**
    - `isIdle` → true before any mutation is fired
    - `isPending` → true while the mutation is running (like isLoading in useQuery)
    - `isSuccess` → true if the mutation finished successfully
    - `isError` → true if the mutation failed
- **Data & Error**
    - `data` → the response returned by `mutationFn`
    - `error` → the error object if it failed


### Example code
```jsx
import { useMutation } from '@tanstack/react-query'
import React from 'react'


const data = [
    { id: 1, name: "Leanne Graham" },
    { id: 2, name: "Ervin Howell" },
    { id: 3, name: "Clementine Bauch" }
]

export default function UseMutationExample() {
    const mutation = useMutation({
        mutationFn:addPost,
        onSuccess: (data) => console.log(data),   
        onerror:(error) => console.log(error)
    })

    if (mutation.isPending) return <p>Loading users...</p>
    if (mutation.isError) return <p>Error: {mutation.error.message}</p>

    return (
        <div>
            <h2>useMutation example</h2>
            <ul>
                {
                    data.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))
                }
            </ul>
            <button onClick={() => mutation.mutate({newData:"add data"})}>add</button>
        </div>
    )
}

async function addPost({newData}) {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    data.push({ id: data.length + 1, name: newData })
    return data
}
```

[Go To Top](#content)

---

### invalidateQueries
- React Query stores fetched data in a cache (keyed by `queryKey`).
- After a mutation (POST/PUT/DELETE), your server data changes.
- But your cache is still stale (old data).
- `invalidateQueries` tells React Query:\
“Hey, this query is outdated. Please refetch it from the server.”

### Basic syntax
You use it with the `queryClient` instance:
```jsx
import { useQueryClient } from '@tanstack/react-query'

const queryClient = useQueryClient()

queryClient.invalidateQueries({ queryKey: ['todos'] })
```
This will refetch all queries that have `['todos']` as their key.


### Example
Imagine you have:
```jsx
const { data, isLoading, isError, error } = useQuery({
  queryKey: ["InvalidateQueriesExample"],
  queryFn: fetchRequest,    // function to fetch the data
})
```
And for adding:
```jsx
const mutation = useMutation({
  mutationFn: addPost,
  onSuccess: () => {
    // refetch fresh data after successful mutation
    queryClient.invalidateQueries({ queryKey: ["InvalidateQueriesExample"] })
  },
})
```
So now when you call:
```jsx
mutation.mutate({ newData: "add data" })
```
**React Query will:**
1. Send POST /api/todos
2. Mark `['InvalidateQueriesExample']` as stale
3. Refetch `['InvalidateQueriesExample']` automatically
4. Update your UI with fresh data


### Complete code
```jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

// initial dummy data
let data = [
  { id: 1, name: "Leanne Graham" },
  { id: 2, name: "Ervin Howell" },
  { id: 3, name: "Clementine Bauch" }
]

export default function InvalidateQueriesExample() {
  const queryClient = useQueryClient()

  //  Fetch users
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["InvalidateQueriesExample"],
    queryFn: fetchRequest,
  })

  //  Mutation for adding a user
  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      // refetch fresh data after successful mutation
      queryClient.invalidateQueries({ queryKey: ["InvalidateQueriesExample"] })
    },
  })

  if (isLoading) return <p>Loading users...</p>
  if (isError) return <p>Error: {error.message}</p>

  if(mutation.isPending) return <p>adding...</p>
  if(mutation.isError) return <p>Error: {mutation.error.message}</p>

  return (
    <div>
      <h2>InvalidateQueries Example (with useMutation)</h2>
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <button onClick={() => mutation.mutate({ newData: "add data" })}>
        add
      </button>

    </div>
  )
}

// 🔹 Fake fetch function (returns fresh copy each time)
const fetchRequest = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)) // simulate delay
  return [...data] // return a new array copy (important!)
}

// 🔹 Fake add function
const addPost = async ({ newData }) => {
  await new Promise((resolve) => setTimeout(resolve, 500)) // simulate delay
  data = [...data, { id: data.length + 1, name: newData }] // immutably add
  return data
}
```


[Go To Top](#content)

---