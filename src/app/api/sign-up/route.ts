import connectDB from "@/lib/connectDB";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json();

        const userWithTheSameUserName = await UserModel.findOne({ username, isVerified: true })

        if (userWithTheSameUserName) {
            return Response.json({ success: false, message: "Username is already taken" },
                { status: 400 }
            )
        };

        const userWithTheSameEmail = await UserModel.findOne({ email });

        const hashedPass = await bcrypt.hash(password, 10)
        const verifyCode = Math.floor(Math.random() * 9000).toString();
        const verifyCodeExpiry = new Date(Date.now());
        verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);

        if (userWithTheSameEmail) {
            if (userWithTheSameEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "User already exists with this email"
                }, { status: 400 })
            } else {
                userWithTheSameEmail.password = hashedPass;
                userWithTheSameEmail.verifyCode = verifyCode;
                userWithTheSameEmail.verifyCodeExpiry = verifyCodeExpiry;
                await userWithTheSameEmail.save();
            }

        } else {
            const newUser = new UserModel({
                username,
                email,
                password: hashedPass,
                verifyCode,
                verifyCodeExpiry,
                isVerified: false,
                isAcceptingMessages: true,
                messages: []
            })

            await newUser.save();
        }

        const emailRes = await sendVerificationEmail(email, username, verifyCode);

        if (!emailRes.success) {
            return Response.json({ success: false, message: emailRes.message },
                { status: 500 }
            )
        }
        return Response.json({
            success: true,
            message: "User registered successfully. Please verify your email"
        },
            { status: 500 }
        )

    } catch (error) {
        console.log("Error registering user!", error);
        return Response.json({ success: false, message: "Failed to register the user." },
            { status: 500 }
        )
    }
}
