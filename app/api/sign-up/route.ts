import dbconnect from "@/lib/dbConnect";
import UserModel from "@/Model/User";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";

export async function POST(request: Request) {
    await dbconnect();
    try {
        const { username, email, password } = await request.json();
        if (!username || !email || !password) {
            return Response.json({
                message: "All fields required",
                success: false,
                status: 400,
            });
        }
        const existingUserByUsername = await UserModel.findOne({
            username,
            isVerified: true
        });
        if (existingUserByUsername) {
            return Response.json({
                message: "Username already taken",
                success: false
            }, { status: 400 });
        }
        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    message: "User already exists with this email",
                    success: false
                }, { status: 401 });
            }
            else {
                const hashPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        }
        else {
            const hashPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = await new UserModel({
                username: username,
                email,
                password: hashPassword,
                verifyCode: verifyCode,
                isVerified: false,
                verifyCodeExpiry: expiryDate,
                isAcceptingMessages: true,
                messages: []
            });
            await newUser.save();
        }

        // Send verification email 
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message,
            }, { status: 500 });
        }
        return Response.json({
            success: true,
            message: "User registered successfully. Please verify your email"
        }, { status: 201 });
    } catch (error) {
        console.error('Error registering user:', error);
        return Response.json({
            success: false,
            message: "Error registering user"
        }, { status: 500 });
    }
}
 