
import Work from "@/lib/models/Work";
import connect from "@/lib/mongdb/database";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        // Connect to the database
        await connect();

        // Parse the request body as JSON
        const { creator, category, title, description, price, photos } = await req.json();

        // Validate the required fields
        if (!creator || !category || !title || !description || !price || !photos) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Create a new Work document
        const newWork = new Work({
            creator,
            category,
            title,
            description,
            price,
            workPhotoPaths: photos, // Assuming photos are URLs
        });

        // Save the document to the database
        const savedWork = await newWork.save();

        // Return the saved document as a response
        return NextResponse.json({
            success:true,
            error: false,
            status:true,
            message:"User post success full"
        });

    } catch (error) {
        console.error("Error creating work:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};
