
import { NextRequest, NextResponse } from "next/server.js";
import connect from '@/lib/mongdb/database';
import Work from '@/lib/models/Work';

interface Params {
    id: string;
}
//get 
export const GET = async (req: NextRequest, { params }: { params: Params }) => {
    try {
        await connect();

        const work = await Work.findById(params.id).populate("creator");

        if (!work) return new Response("The Work Not Found", { status: 404 });

        return new Response(JSON.stringify(work), { status: 200 });
    } catch (err) {
        console.error("Error fetching the Work:", err);
        return new Response("Internal Server Error", { status: 500 });
    }
};

//data delete
export const DELETE = async (req: NextRequest, { params }: { params: Params }) => {
    try {
        await connect();
        await Work.findByIdAndDelete(params.id);

        return new Response("Successfully deleted the Work", { status: 200 });
    } catch (err) {
        console.error("Error deleting the Work:", err);
        return new Response("Error deleting the Work", { status: 500 });
    }
};


// PATCH handler
export async function PATCH(request: NextRequest, { params }: { params: Params }) {
    await connect();
    const id = params.id;

    try {
        const formData = await request.formData();
        const updates = {
            creator: formData.get("creator"),
            category: formData.get("category"),
            title: formData.get("title"),
            description: formData.get("description"),
            price: formData.get("price"),
            workPhotoPaths: JSON.parse(formData.get("photos") as string) // Parse JSON here
        };

        // Use findByIdAndUpdate to get the updated document
        const work = await Work.findByIdAndUpdate(id, updates, { new: true });

        if (!work) {
            return NextResponse.json({
                status: false,
                success: false,
                message: "Work not found"
            });
        }

        return NextResponse.json({
            work,
            status: false,
            success: true,
            message: "Work update here!"
        });
    } catch (error) {
        console.error("Error updating work:", error);
        return NextResponse.json({ message: "PATCH error", status: 500 });
    }
}









