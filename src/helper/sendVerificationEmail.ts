import { resend } from "../lib/resend";
import React from 'react';
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifycode: string
): Promise<ApiResponse> {


    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: "Mystery Message | Verification Code",
            react: React.createElement(VerificationEmail, { username, otp: verifycode })
        });
        return { success: true, message: 'Verification email sent successfully' }
    } catch (error) {
        console.error('Error sending verification email:', error);
        return { success: false, message: 'Failed to send verification email' }
    }
}