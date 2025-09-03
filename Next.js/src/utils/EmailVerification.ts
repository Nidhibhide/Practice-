import resend from "@/config/resendConfig";
import emailVerification from "../../templates/emailVerification";
import { ApiResponse } from "./ApiResponse";

export async function sendVerificationEmail(
  email: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verification code",
      react: emailVerification(email, verifyCode),
    });
    return {
      success: true,
      message: "Verification email send successfully",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Eroor sending verification email", error);
    return {
      success: false,
      message: "Failed to send verification email",
      statusCode: 500,
    };
  }
}
