"use client"

import { useEffect, useState } from "react"

function Home() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
        const [all , setAll] = useState([])

  async function Allnotes(){
  const Ano = await fetch("/api/notes")
  const Bno = await Ano.json()
  

setAll(Bno.data)
}

useEffect(()=> {
Allnotes()
},[Allnotes])
  async function createNote() {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    })

    const data = await res.json()
    console.log(data)
  }

 
  return (
    <div className="w-full h-screen flex flex-col justify-center rounded-2xl items-center">
      <div className="w-[50%] h-[50%] bg-white/10 border-4 border-white/20 flex flex-col justify-center items-center">
        <h1 className="text-lg font-bold">ADD A NOTE</h1>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="p-4 border text-center"
        />

        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="p-4 border text-center"
        />
        <button onClick={createNote}>ADD</button>
      </div>
      <div className="w-[%50] h-[50%] ">
      {all.map((a)=>(
        <div className="" key={a.id}>
        <p>Title : {a.title}</p>
               <p>Description : {a.description}</p>
 
        </div>
      ))}
      </div>
    </div>
  )
}

export default Home;