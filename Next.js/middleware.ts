import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        //allow auth related routes
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        //public 
        if(pathname === '/' )
        {
            return true
        }

        return !!token
      },
    },
  }
);

// return !!token;
// is just a shorthand for:
// if (token) {
//   return true;
// } else {
//   return false;
// }


//here where u want to run middleware
export const config = {
matcher:[
    
]
}