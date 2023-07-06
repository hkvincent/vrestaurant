import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { cookies } from 'next/headers'


const prisma = new PrismaClient();

export async function POST(
    req: Request,
) {
    const body = await req.json();
    const { firstName, lastName, email, phone, city, password } = body;
    console.log({ firstName, lastName, email, phone, city, password });
    const errors: string[] = [];

    const validationSchema = [
        {
            valid: firstName && validator.isLength(firstName, {
                min: 1,
                max: 20,
            }),
            errorMessage: "First name is invalid",
        },
        {
            valid: lastName && validator.isLength(lastName, {
                min: 1,
                max: 20,
            }),
            errorMessage: "Last name is invalid",
        },
        {
            valid: email && validator.isEmail(email),
            errorMessage: "Email is invalid",
        },
        {
            valid: phone && validator.isMobilePhone(phone),
            errorMessage: "Phone number is invalid",
        },
        {
            valid: city && validator.isLength(city, { min: 1 }),
            errorMessage: "City is invalid",
        },
        {
            valid: password && validator.isStrongPassword(password),
            errorMessage: "Password is not strong enough",
        },
    ];


    console.log({ validationSchema });

    validationSchema.forEach((check) => {
        if (!check.valid) {
            errors.push(check.errorMessage);
        }
    });

    if (errors.length) {
        return new Response(JSON.stringify({ errorMessage: errors[0] }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 400,
            });
    }

    const userWithEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (userWithEmail) {
        return new Response(JSON.stringify({ errorMessage: "Email is associated with another account" }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 400,
            });
        // return res
        //     .status(400)
        //     .json({ errorMessage: "Email is associated with another account" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            first_name: firstName,
            last_name: lastName,
            password: hashedPassword,
            city,
            phone,
            email,
        },
    });

    const alg = "HS256";

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({ email: user.email })
        .setProtectedHeader({ alg })
        .setExpirationTime("24h")
        .sign(secret);

    //set-cookies("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

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

    // return res.status(200).json({
    //     firstName: user.first_name,
    //     lastName: user.last_name,
    //     email: user.email,
    //     phone: user.phone,
    //     city: user.city,
    // });
}

export async function GET(requet: Request, response: NextApiResponse) {
    console.log({ requet, response });
    return new Response(JSON.stringify({ message: "Hello World" }));
}