import dbConnect from "@/config/DbConnect";
import User from "@/model/User";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { code, name } = await request.json();

    const existingUserByEmail = await User.findOne({ name });
    if (!existingUserByEmail) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    if (existingUserByEmail.verifyCode != code) {
      return Response.json(
        {
          success: false,
          message: "Invalid Code",
        },
        {
          status: 400,
        }
      );
    }
    if (
      !existingUserByEmail?.expiryVerifyCode ||
      new Date() > existingUserByEmail?.expiryVerifyCode
    ) {
      return Response.json(
        {
          success: false,
          message: "Code is Expired",
        },
        {
          status: 400,
        }
      );
    }
    existingUserByEmail.verifyCode = undefined;
    existingUserByEmail.expiryVerifyCode = undefined;
    existingUserByEmail.isVerified = true;
    await existingUserByEmail.save();
    return Response.json(
      {
        success: true,
        message: "Verification successful.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log("Error verifying user", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying user",
      },
      {
        status: 500,
      }
    );
  }
}
