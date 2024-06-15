import Work from "@/lib/mongdb/Work"
import connect from "@/lib/mongdb/database"
import { NextRequest } from "next/server"

interface Params {
    category: string;
}

// all user data get and and category data all data get
export const GET = async (req: NextRequest, { params }: { params: Params }) => {
    try {
        await connect()

        const { category } = params

        let workList

        if (category !== "All") {
            workList = await Work.find({ category }).populate("creator")
        } else {
            workList = await Work.find().populate("creator")
        }
        return new Response(JSON.stringify(workList), { status: 200 })
    } catch (err) {
        console.log(err)
        return new Response("Failed to fetch Work List", { status: 500 })
    }
}