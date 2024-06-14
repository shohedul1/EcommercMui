import { NextAuthOptions, Session, Profile, Account } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import connect from "../mongdb/database";
import User from "../models/User";

// Extend the Profile type to include the picture property
interface ExtendedProfile extends Profile {
    picture?: string;
}

// Define the ProfileImagePath interface
interface ProfileImagePath {
    id: string;
    url: string;
}

// Extend the Session type to include id and profileImagePath in user
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            profileImagePath?: ProfileImagePath | null; // Add profileImagePath property
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),

        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    console.log("Missing credentials");
                    throw new Error("Invalid Email or Password");
                }

                await connect();

                /* Check if the user exists */
                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    console.log("User not found");
                    throw new Error("Invalid Email or Password");
                }

                /* Compare password */
                const isMatch: boolean = await compare(credentials.password, user.password);

                if (!isMatch) {
                    console.log("Password mismatch");
                    throw new Error("Invalid Email or Password");
                }

                console.log("User authorized", user);

                return user;
            },
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET!,

    callbacks: {
        async session({ session }: { session: Session }) {
            if (session.user?.email) {
                const sessionUser = await User.findOne({ email: session.user.email });

                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                    session.user = { ...session.user, ...sessionUser.toObject() };
                }
            }

            return session;
        },

        async signIn({ account, profile }: any) {
            if (account?.provider === "google" && profile) {
                try {
                    await connect();

                    console.log("Google Profile:", profile); // Log the profile object

                    /* Check if the user exists */
                    let existingUser = await User.findOne({ email: profile.email });

                    if (!existingUser) {
                        existingUser = await User.create({
                            email: profile.email,
                            username: profile.name || '',
                            profileImagePath: profile.picture || '',
                            works: [],
                        });
                    }

                    console.log("User signed in", existingUser);
                    return true;
                } catch (err: any) {
                    console.log("Error checking if user exists: ", err.message);
                    return false;
                }
            }

            console.log("Account provider is not Google");
            return true;
        },
    },
};

export default authOptions;
