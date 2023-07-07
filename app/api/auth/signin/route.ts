import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { cookies } from 'next/headers'

const prisma = new PrismaClient();

export  async function POST(req: Request,) {
    try {
        const body = await req.json();

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

        if (errors.length > 0) {
            return new Response(JSON.stringify(errors[0]),
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

        if (!user) {
            return new Response(JSON.stringify("Username or Password is incorrect"),
                {
                    headers: { 'Content-Type': 'application/json' },
                    status: 401,
                });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return new Response(JSON.stringify("Username or Password is incorrect"),
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

        return new Response(JSON.stringify({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phone: user.phone,
            city: user.city,
            token
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': `jwt=${token}`,
                'max-age': `${60 * 6 * 24}`
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