import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export async function GET(req: Request) {
    const body = await req.json();

    const bearerToken = body.headers["authorization"] as string;
    const token = bearerToken.split(" ")[1];

    const payload = jwt.decode(token) as { email: string };

    if (!payload.email) {
        return new Response(JSON.stringify("Unauthorized request"),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 401,
            });
    }



    return new Response(JSON.stringify("Username or Password is incorrect"),
        {
            headers: { 'Content-Type': 'application/json' },
            status: 401,
        });
}