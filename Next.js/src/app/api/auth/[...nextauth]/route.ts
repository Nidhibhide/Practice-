import NextAuth from "next-auth";
import {authOpions} from "./options"

const handler=NextAuth(authOpions);

export {handler as GET , handler as POST}