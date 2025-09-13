import dbConnect from "@/config/DbConnect";
import { getServerSession, User } from "next-auth";
import { authOpions } from "../auth/[...nextauth]/options";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOpions);
    const user: User = session?.user as User;
    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "Not Authenticated",
        },
        { status: 401 }
      );
    }
    return user;
  } catch (err) {}
}
