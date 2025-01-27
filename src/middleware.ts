import { NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
    const { userId } = auth();

    // If user is signed in and tries to access home page
    if (userId && req.nextUrl.pathname === "/") {
        return NextResponse.rewrite(new URL("/", req.url));
    }

    // For all other routes, continue normally
    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};