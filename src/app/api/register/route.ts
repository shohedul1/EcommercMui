import connect from "@/lib/mongdb/database"
import { writeFile } from "fs/promises"
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import User from "../../../lib/models/User";

export const POST = async (req: NextRequest) => {
    const path = require("path")
    const currentWorkingDirectory = process.cwd()

    try {
        await connect()

        const data = await req.formData()
        const username = data.get('username') as string;
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const file = data.get('profileImage') as File;

        if (!file) {
            return new Response(JSON.stringify({ message: "No file uploaded" }), { status: 400 });
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const postPhotoPath = path.join(
            currentWorkingDirectory,
            "public",
            "uploads",
            file.name
        )

        await writeFile(postPhotoPath, buffer)

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ message: "User already exists!" }), { status: 409 });
        }

        /* Hash the password */
        const saltRounds = 10;
        const hashedPassword = await hash(password, saltRounds);

        /* Create a new User */
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profileImagePath: `/uploads/${file.name}` // Store relative path in the database
        });

        await newUser.save();

        /* Send a success message */
        return new Response(JSON.stringify({
            message: "User registered successfully!",
            user: newUser,
            success: true,
            error: false,
            status: true,
        }),);

    } catch (err) {
        console.error(err)
        return new Response(JSON.stringify({ message: "Failed to create a new post" }), { status: 500 })
    }
}
