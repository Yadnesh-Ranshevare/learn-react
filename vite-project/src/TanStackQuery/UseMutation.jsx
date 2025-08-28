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
    console.log(newData)
    
    await new Promise((resolve) => setTimeout(resolve, 2000))
    data.push({ id: data.length + 1, name: newData })
    return data

}
