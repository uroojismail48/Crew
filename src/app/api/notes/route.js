import { Notes } from "../../util/dbs";
import {NextResponse} from "next/server"
import  fs  from "node:fs";
export function GET(){
    const data = Notes;
  return NextResponse.json({data})
}  

 export async function POST(req){
    let { title , description} = await req.json()
    const newNote = {
        id : crypto.randomUUID(),
        title,
        description
    }
    if(!title || !description) {
        return NextResponse.json("NOT Fullfiled")
    }else{
        Notes.push(newNote)
        const updatedNotes  = Notes;
        const updatedData  = JSON.stringify(updatedNotes, null , 2)
  
    fs.writeFileSync(
        "./src/app/util/dbs.js", 
        `export const Notes = ${updatedData}`, "utf-8"
    )
    return NextResponse.json("Successfully Created")
    }    
}