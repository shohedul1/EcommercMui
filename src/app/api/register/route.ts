import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { writeFile } from 'fs/promises';
import connect from '@/lib/mongdb/database';
import User from '@/lib/models/User';

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        // Connect to MongoDB
        await connect();

        // Parse form data from the request
        const data = await req.formData();

        // Extract information from the form
        const username = data.get('username') as string;
        const email = data.get('email') as string;
        const password = data.get('password') as string;
        const file = data.get('profileImage') as File | null;

        if (!username || !email || !password || !file) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Use the /tmp directory for file storage on Vercel
        const profileImagePath = `C:/Users/SNC/Desktop/New folder/my-app/public/uploads/${file.name}`;
        await writeFile(profileImagePath, buffer);

        console.log(`open ${profileImagePath} to see the uploaded files`);

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists!" }, { status: 409 });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await hash(password, saltRounds);

        // Create a new User
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profileImagePath: `/uploads/${file.name}`
        });

        // Save new User
        await newUser.save();

        // Send a success message
        return NextResponse.json({
            user: newUser,
            success: true,
            error: false,
            status: true,
            message: "User registered successfully!",
        });

    } catch (err:any) {
        console.error('Error creating new user:', err);
        return NextResponse.json({ message: "Failed to create new User!", error: err.message }, { status: 500 });
    }
}

