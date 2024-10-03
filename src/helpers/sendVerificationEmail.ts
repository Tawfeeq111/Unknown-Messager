import { resend } from "@/lib/render"; 
import VerificationEmail from "@/components/verficationEmail";

export async function sendVerificationEmail(
    email: string, 
    username: string,
    verifyCode: string
){
    try {
        await resend.emails.send({
            from: '<onboarding@resend.dev',
            to: email,
            subject: 'Unknown-Messager | Verification code',
            react: VerificationEmail({ username, otp: verifyCode })
        });
        return {success: true, message: "Verification email sent."}
    } catch (error) {
        console.log("Error sending verification email - ", error);
        return {success: false, message: "Failed to send verification email."}
    }
}