'use client'

import { useEffect, useState } from "react"
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react"

type User = {
    id: number
    name: string
    age: number
    email: string
    city: string
    role: string
    salary: number
    isActive: boolean
    profilePic: string
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
                <h1>All Users</h1>
            </div>
            <div className="w-full flex flex-wrap items-center gap-8 justify-center">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="w-full max-w-sm rounded-xl border border-gray-200  overflow-hidden shadow-sm"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 p-3">
                            <img
                                src={user.profilePic}
                                alt={user.name}
                                className="h-9 w-9 rounded-full object-cover ring-2 ring-pink-500 ring-offset-2"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-semibold capitalize text-gray-400 leading-tight">
                                    {user.name}
                                </p>
                                <p className="text-xs text-gray-500">{user.city}</p>
                            </div>
                            {user.isActive && (
                                <span className="text-[10px] font-medium text-green-500">● Active</span>
                            )}
                        </div>

                        {/* "Post" image */}
                        <img
                            src={user.profilePic.replace("150", "400")}
                            alt={`${user.name} post`}
                            className="w-full aspect-square object-cover"
                        />

                        {/* Action icons */}
                        <div className="flex items-center justify-between px-3 pt-3">
                            <div className="flex items-center gap-4">
                                <Heart className="h-6 w-6 text-gray-200" />
                                <MessageCircle className="h-6 w-6 text-gray-200" />
                                <Send className="h-6 w-6 text-gray-200" />
                            </div>
                            <Bookmark className="h-6 w-6 text-gray-200" />
                        </div>

                        {/* Likes (dummy, salary-based flex 😄) */}
                        <p className="px-3 pt-2 text-sm font-semibold text-gray-600">
                            {Math.floor(user.salary / 100)} likes
                        </p>

                        {/* Caption */}
                        <div className="px-3 pt-1 pb-3">
                            <p className="text-sm text-gray-200">
                                <span className="font-semibold capitalize">{user.name}</span>{" "}
                                <span className="text-gray-700">{user.role} | {user.age} yrs</span>
                            </p>
                            <p className="mt-1 text-sm text-blue-600">
                                {user.skills.map((skill) => `#${skill.replace(/\s+/g, "")}`).join(" ")}
                            </p>
                            <p className="mt-1 text-xs text-gray-400">{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllUsers