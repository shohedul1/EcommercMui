import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { mkdir, writeFile } from "fs/promises";
import { dirname } from "path";
import connect from "../../../lib/mongdb/database";
import User from "../../../lib/models/User";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        /* Connect to MongoDB */
        await connect();

        const data = await req.formData();

        /* Take information from the form */
        const username = data.get('username') as string;
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const file = data.get('profileImage') as File;

        if (!file) {
            return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Ensure directory exists before writing the file
        const profileImagePath = `C:/Users/SNC/Desktop/New folder/my-app/public/uploads/${file.name}`;
        const directory = dirname(profileImagePath);
        await mkdir(directory, { recursive: true }); // Create directories recursively if they don't exist

        // Write file to the specified path
        await writeFile(profileImagePath, buffer);

        console.log(`Uploaded profile image saved at ${profileImagePath}`);

        /* Check if user exists */
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists!" }, { status: 409 });
        }

        /* Hash the password */
        const saltRounds = 10;
        const hashedPassword = await hash(password, saltRounds);

        /* Create a new User */
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profileImagePath: `/uploads/${file.name}`
        });

        /* Save new User */
        await newUser.save();

        /* Send a success message */
        return NextResponse.json({
            message: "User registered successfully!",
            user: newUser,
            success: true
        });

    } catch (err: any) {
        console.error("Error creating new user:", err);
        return NextResponse.json({ message: "Failed to create new User!" + err }, { status: 500 });
    }
}
