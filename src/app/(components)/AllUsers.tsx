'use client'

import { useEffect, useState } from "react"

type User = {
    id: number
    name: string
    age: number
    email: string
    city: string
    role: string
    salary: number
    isActive: boolean
    skills: string[]
}

function AllUsers() {
    const [users, setUsers] = useState<User[]>([])

    async function FetchUsers() {
        const res = await fetch('/api/users')
        const data = await res.json()
        setUsers(data.data)
    }

    useEffect(() => {
        FetchUsers()
    }, [])

    return (
        <div className="h-full w-full p-6">
            <div className="w-full h-10 font-bold text-2xl mb-6">
                <h1>Feed</h1>
            </div>
            <div className="w-full p-2 h-full flex flex-wrap gap-6 justify-center">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="group relative flex flex-col justify-between w-100 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
              
                        <span
                            className={`absolute top-4 right-4 h-2.5 w-2.5 rounded-full ${
                                user.isActive ? "bg-green-500" : "bg-gray-300"
                            }`}
                            title={user.isActive ? "Active" : "Inactive"}
                        />

                     
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-base font-semibold text-gray-900 capitalize leading-tight">
                                    {user.name}
                                </h1>
                                <p className="text-xs text-gray-500">{user.role}</p>
                            </div>
                        </div>

                  
                        <div className="mt-4 space-y-1 text-xs text-gray-500">
                            <p className="capitalize">📍 {user.city} · {user.age} yrs</p>
                            <p className="truncate">✉️ {user.email}</p>
                            <p className="font-medium text-gray-700">
                                Rs {user.salary.toLocaleString()}/mo
                            </p>
                        </div>

                
                        <div className="mt-4 flex flex-wrap gap-1.5">
                            {user.skills.slice(0, 4).map((skill) => (
                                <span
                                    key={skill}
                                    className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-600"
                                >
                                    {skill}
                                </span>
                            ))}
                            {user.skills.length > 4 && (
                                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-400">
                                    +{user.skills.length - 4}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllUsers