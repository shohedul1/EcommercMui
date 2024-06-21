import User from "@/lib/models/User";
import Work from "@/lib/models/Work";
import connect from "@/lib/mongdb/database";
import { NextRequest } from "next/server";

interface Params {
    id: string;
}


export const GET = async (req: NextRequest, { params }: { params: Params }) => {
    try {
        await connect();

        const user = await User.findById(params.id);
        const workList = await Work.find({ creator: params.id }).populate("creator");

        user.works = workList;
        await user.save();
        return new Response(JSON.stringify({ user: user, workList: workList }), { status: 200 });
    } catch (err) {
        return new Response("Failed to fetch work list by user", { status: 500 })
    }
}