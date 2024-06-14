import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/lib/mongdb/database";
import User from "@/lib/models/User";

export const POST = async (req: NextRequest) => {
    const { username, email, password, profileImage } = await req.json();

    if (!profileImage) {
        return NextResponse.json({
            success: false,
            error: true,
            message: "Upload profile image"
        });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (profileImage.size > maxSize) {
        return NextResponse.json({
            success: false,
            error: true,
            message: "Profile image 5MB too large"
        });
    }

    await connect();

    const isExisting = await User.findOne({ email });

    if (isExisting) {
        return NextResponse.json({
            success: false,
            error: true,
            message: "User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    if (!hashedPassword) {
        return NextResponse.json({
            success: false,
            error: true,
            message: "Password hashing failed"
        });
    }

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        profileImagePath: profileImage
    });

    try {
        await newUser.save();
        return NextResponse.json({
            success: true,
            error: false,
            message: "User created successfully"
        });
    } catch (err:any) {
        return NextResponse.json({
            message: err.message,
            status: 500,
        });
    }
};
