'use client'


import { useEffect, useState } from "react"

type User = {
    name: string,
    id : number
}

function Profile() {

const [users, setUsers] = useState<User[]>([])
async function FetchUsers(){
    const res = await fetch('/api/users')
    const data = await res.json()
setUsers(data.data)
console.log(users);

}
useEffect(() => {
    FetchUsers()
}, [])
    return (
    <div>
        <div className="text-2xl font-bold  pl-10">
            <h1>Profiles</h1>
        </div>

   <div className="w-full h-40 flex py-4 px-4 gap-10  ">
            {users.map((user) => (
            <div key={user.id}  className="h-auto w-30
            
            flex justify-center items-center flex-col text-center">

            <div className="h-25 w-25 border-5 rounded-full">

            </div>
           <p>{user.name}</p>
        </div>
   
        ))}
          </div>
    </div>
  )
}

export default Profile;