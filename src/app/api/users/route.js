import  fs  from "node:fs";
import { users } from "../../util/db";
import {NextResponse} from "next/server"

export function GET(){
const data = users;
return NextResponse.json({data}, {status : 200})
}

//create user function 
export async function POST(req , res){
    let {id , name,email,} = await req.json()
    if(!id || !name || !email ){
            return NextResponse.json({result : "Requirements not Fullfilled"})
        }else {
            users.push({id,name,email})
            const UpdatedUserArray = users;
            const UpdatedData = JSON.stringify(UpdatedUserArray, null , 2)
fs.writeFileSync(
    "./src/app/util/db.js",
    `export const users = ${UpdatedData}`, "utf-8"
 
)
   return NextResponse.json({result : "Added Successfully"})
        }
} 

//updating users
export async function PUT(req){
 let {id , name,email,} = await req.json()
 const userindex = users.findIndex((m) => m.id === Number(id))

 if(userindex === -1){
return NextResponse.json({result : "NOT FOUND"}, {stutus : 404})
 }   

 if(name){
    users[userindex].name = name
 }

 if(email){
    users[userindex].email = email
 }

 const UpdatedUserArray = users;
 const UpdatedData = JSON.stringify(UpdatedUserArray, null , 2)
 fs.writeFileSync(
    "./src/app/util/db.js",
    `export const users = ${UpdatedData}`, "utf-8"
 
)
   return NextResponse.json({result : "Updated Successfully"})
}