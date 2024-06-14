import { authOptions } from "@/lib/authOptions/authOptions";
import NextAuth from "next-auth";


export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);