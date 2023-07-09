import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const headers = req.headers;
    console.log({ headers });

    const bearerToken = headers.get("authorization") as string;

    if (!bearerToken) {
        return new Response(JSON.stringify("Unauthorized request"),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 401,
            });
    }

    console.log({ bearerToken });

    const token = bearerToken.split(" ")[1];

    const payload = jwt.decode(token) as { email: string };

    if (!payload.email) {
        return new Response(JSON.stringify("Unauthorized request"),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 401,
            });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: payload.email,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            city: true,
            phone: true,
        },
    });

    console.log({ user });

    if (!user) {
        return new Response(JSON.stringify("Unauthorized request"),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 401,
            });
    }

    return new Response(JSON.stringify(user),
        {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });

}