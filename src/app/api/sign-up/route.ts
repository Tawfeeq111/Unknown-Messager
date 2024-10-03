import connectDB from "@/lib/connectDB";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    try {
        const {username, email, password} = await request.json();
        return Response.json({success: false, message: "User registered."},
            {status: 300}
        )
    } catch (error) {
        console.log("Error registering user!", error);  
        return Response.json({success: false, message: "Failed to register the user."},
            {status: 500}
        )
    }
}
