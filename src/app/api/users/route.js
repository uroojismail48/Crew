import  fs  from "node:fs";
import { users } from "../../util/db";
import {NextResponse} from "next/server"

export function GET(){
const data = users;
return NextResponse.json({data}, {status : 200})
}

//create user function
export async function POST(req , res){
    let {id , name,age ,email,city,role, salary} = await req.json()
    if(!id || !name || !age || !email || !city || !role || !salary){
            return NextResponse.json({result : "Required not Fullfilled"})
        }else {
            users.push({id , name, age, email, city  , role, salary})
            const UpdatedUserArray = users;
            const UpdatedData = JSON.stringify(UpdatedUserArray, null , 2)
fs.WriteFileSync(
    "./app/util/db.js",
    `export const users = ${UpdatedData}`, "utf-8"
 
)
   return NextResponse.json({result : "Added Successfully"})
        }
} 