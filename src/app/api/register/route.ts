import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { writeFile } from "fs/promises";
import connect from "../../../lib/mongdb/database";
import User from "../../../lib/models/User";

export async function POST(req: NextRequest) {
    try {
        // Connect to MongoDB
        await connect();

        // Parse form data
        const formData = await req.formData();
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const profileImage = formData.get("profileImage") as File;

        // Check if file was uploaded
        if (!profileImage) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "No file uploaded",
                status: 400,
            });
        }

        // Read file contents
        const fileBuffer = await profileImage.arrayBuffer();
        const buffer = Buffer.from(fileBuffer);

        // Define the path where the file will be saved
        const profileImagePath = `C:/Users/SNC/Desktop/New folder/my-app/public/uploads/${profileImage.name}`;

        // Write file to disk
        await writeFile(profileImagePath, buffer);

        console.log(`Uploaded file: ${profileImagePath}`);

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                success: false,
                error: true,
                message: "User already exists",
                status: 409,
            });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await hash(password, saltRounds);

        // Create a new User
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profileImagePath: `/uploads/${profileImage.name}`,
        });

        // Save new User
        await newUser.save();

        // Send success response
        return NextResponse.json({
            success: true,
            error: false,
            message: "User registered successfully",
            user: newUser,
            status: 200,
        });

    } catch (err) {
        console.error("Error in user registration:", err);
        return NextResponse.json({
            success: false,
            error: true,
            message: "Failed to create new User!",
            status: 500,
        });
    }
}
