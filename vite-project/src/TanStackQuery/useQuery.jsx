import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function UseQueryExample() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchRequest
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
  // simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return data
}
