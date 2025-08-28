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
