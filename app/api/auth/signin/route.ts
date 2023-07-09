import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { cookies } from 'next/headers'

const prisma = new PrismaClient();

export async function POST(req: Request,) {
    try {
        const body = await req.json();
        console.log("POST body: " + body);

        const { email, password } = body;

        const validationSchema = [
            {
                valid: email && validator.isEmail(email),
                errorMessage: "Email is invalid",
            },
            {
                valid: password && validator.isLength(password, { min: 6 }),
                errorMessage: "Password is not strong enough",
            },
        ];

        const errors: string[] = [];

        validationSchema.forEach((check) => {
            if (!check.valid) {
                errors.push(check.errorMessage);
            }
        });

        console.log("errors: " + errors);
        if (errors.length > 0) {
            return new Response(JSON.stringify({ errorMessage: errors[0] }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    status: 400,
                });
        }


        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        console.log("user: " + user);

        if (!user) {
            return new Response(JSON.stringify({ errorMessage: "Email or password is invalid" }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    status: 401,
                });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            console.log("passwordMatch: " + passwordMatch);
            return new Response(JSON.stringify({ errorMessage: "Email or password is invalid" }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    status: 401,
                });
        }



        const alg = "HS256";

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);

        const token = await new jose.SignJWT({ email: user.email })
            .setProtectedHeader({ alg })
            .setExpirationTime("24h")
            .sign(secret);

        const cookieStore = cookies()
        cookieStore.set('jwt', token, { maxAge: 60 * 60 * 24 * 7 })

        return new Response(JSON.stringify({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phone: user.phone,
            city: user.city,
            token
        }), {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 200,
        });
    } catch (e) {
        console.log(e);
        return new Response(JSON.stringify("UNKNOWN ERROR"),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 400,
            });
    }

}