import { PrismaClient, Table } from "@prisma/client";
import { NextApiResponse } from "next";
import { times } from "../../raw";

const prisma = new PrismaClient();

export const findAvailabileTables = async ({
    time,
    day,
    restaurant,
}: {
    time: string;
    day: string;
    restaurant: {
        tables: Table[];
        open_time: string;
        close_time: string;
    };
}) => {
    const searchTimes = times.find((t) => {
        return t.time === time;
    })?.searchTimes;

    if (!searchTimes) {
        return null;
    }

    const bookings = await prisma.booking.findMany({
        where: {
            booking_time: {
                gte: new Date(`${day}T${searchTimes[0]}`),
                lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
            },
        },
        select: {
            number_of_people: true,
            booking_time: true,
            tables: true,
        },
    });

    const bookedTablesObj: { [key: string]: { [key: number]: true } } = {};

    bookings.forEach((booking) => {
        bookedTablesObj[booking.booking_time.toISOString()] =
            booking.tables.reduce((obj, table) => {
                return {
                    ...obj,
                    [table.table_id]: true,
                };
            }, {});
    });

    const tables = restaurant.tables;

    const searchTimesWithTables = searchTimes.map((searchTime) => {
        return {
            date: new Date(`${day}T${searchTime}`),
            time: searchTime,
            tables,
        };
    });

    searchTimesWithTables.forEach((t,i,a) => {
        t.tables = t.tables.filter((table) => {
            if (bookedTablesObj[t.date.toISOString()]) {
                if (bookedTablesObj[t.date.toISOString()][table.id]) return false;
            }
            return true;
        });
    });

    return searchTimesWithTables;
};