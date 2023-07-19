import React from 'react';
import { Time, converToReadableTime } from '../../../../utils/ConverToReadableTime';
import { format } from "date-fns";
import { enGB, eo, ru, zhHK } from 'date-fns/locale'
const Header = ({
    image,
    name,
    date,
    partySize,
}: {
    image: string;
    name: string;
    date: string;
    partySize: string;
}) => {
    const [day, time] = date.split("T");
    console.log("day", { day });
    console.log("time", { time });
    console.log("date", { date });
    console.log("new Date(date)", new Date(date), format(new Date(date), "ccc, LLL d"));
    console.log("new Date(day)", new Date(day), format(new Date(day), "ccc, LLL d"));
    return (
        <div>
            <h3 className="font-bold">You're almost done!</h3>
            <div className="mt-5 flex">
                <img src={image} alt="" className="w-32 h-18 rounded" />
                <div className="ml-4">
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <div className="flex mt-3">
                        <p className="mr-6">{format(new Date(day), "ccc, LLL d", {
                            locale: zhHK
                        })}</p>
                        <p className="mr-6">{converToReadableTime(time as Time)}</p>
                        <p className="mr-6">
                            {partySize} {parseInt(partySize) === 1 ? "person" : "people"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;