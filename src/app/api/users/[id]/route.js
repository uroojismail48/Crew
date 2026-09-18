
import {NextResponse} from "next/server"
import { users } from "../../../util/db";

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

    