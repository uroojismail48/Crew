
import {NextResponse} from "next/server"
import { users } from "../../../util/db";
import  fs  from "node:fs";
export async function GET(_, res){
    const {id} = await res.params;
    const us = users.filter((u) => u.id === Number(id))
    return NextResponse.json({us})
}

//login Function
export async function POST(req , res){
    const {id} = await res.params;
    const {name , email} = await req.json()
        const {name : uName , email:UEmail} = users.find((u) => u.id === Number(id))
    if(uName === name && UEmail=== email){
        return NextResponse.json({result : "LOGGED IN"})

    }else if(!name || !email){
        return NextResponse.json({result: "Missing one of them"})
    }else {
        return NextResponse.json({result: "Invalid fields"})
    }
    }

    //deleting user
    export async function DELETE(req, res){
        const {id} = await res.params
    const userIndex = users.findIndex((m) => m.id === Number(id))
        if(userIndex === -1){
            return NextResponse.json({results : "User Not found"}, {status : 404})
        }
users.splice(userIndex, 1);

const updatedUserArray = users;
const UpdatedData = JSON.stringify(updatedUserArray, null, 2);
fs.writeFileSync(
    "./src/app/util/db.js", `export const users ${UpdatedData}`, "utf-8"
)
return NextResponse.json({results : "deleted Successfully"}, {status : 200})
    }