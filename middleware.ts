import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const bearerToken = request.headers.get("authorization") as string;

    if (!bearerToken) {
        return new NextResponse(
            JSON.stringify({ errorMessage: "Unauthorized request" }),
            { status: 401 }
        );
    }

    const token = bearerToken.split(" ")[1];

    if (!token) {
        return new NextResponse(
            JSON.stringify({ errorMessage: "Unauthorized request" }),
            { status: 401 }
        );
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
        await jose.jwtVerify(token, secret);
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ errorMessage: "Unauthorized request" }),
            { status: 401 }
        );
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/api/auth/verify",
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}