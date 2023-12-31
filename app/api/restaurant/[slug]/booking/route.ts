import { PrismaClient } from "@prisma/client";
import { findAvailabileTables } from "../../../../../services/retaurant/findAvailableTables";
import { NextRequest } from "next/server";


const prisma = new PrismaClient();

export async function GET(
    req: NextRequest,
) {
    console.log(req.nextUrl.searchParams);

    const params = Object.fromEntries(req.nextUrl.searchParams);
    const { slug, day, time, partySize } = params;

    console.log({ day, time, partySize, slug });
    if (!day || !time || !partySize) {
        return new Response(JSON.stringify({ errorMessage: "Invalid data provided" }), {
            headers: { "Content-Type": "application/json" },
            status: 400,
        });
    }

    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug,
        },
        select: {
            tables: true,
            open_time: true,
            close_time: true,
        },
    });

    console.log({ restaurant });
    if (!restaurant) {
        return new Response(JSON.stringify({
            errorMessage: "Invalid data provided",
        }), {
            headers: { "Content-Type": "application/json" },
            status: 400,
        });
    }

    const searchTimesWithTables = await findAvailabileTables({
        day,
        time,
        restaurant,
    });

    if (!searchTimesWithTables) {
        return new Response(JSON.stringify({
            errorMessage: "Invalid data provided",
        }), {
            headers: { "Content-Type": "application/json" },
            status: 400,
        });
    }

    const availabilities = searchTimesWithTables
        .map((t) => {
            const sumSeats = t.tables.reduce((sum, table) => {
                return sum + table.seats;
            }, 0);

            return {
                time: t.time,
                available: sumSeats >= parseInt(partySize),
            };
        })
        .filter((availability) => {
            const timeIsAfterOpeningHour =
                new Date(`${day}T${availability.time}`) >=
                new Date(`${day}T${restaurant.open_time}`);
            const timeIsBeforeClosingHour =
                new Date(`${day}T${availability.time}`) <=
                new Date(`${day}T${restaurant.close_time}`);

            return timeIsAfterOpeningHour && timeIsBeforeClosingHour;
        });

    return new Response(JSON.stringify(availabilities), {
        headers: { "Content-Type": "application/json" },
        status: 200,
    });

}

// http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-02-03&time=15:00:00.000Z&partySize=8