"use client"
import { partySize as partySizes, times } from "../../../../raw";
import DatePicker from "react-datepicker";
import { useState } from "react";
import useAvailabilities from "../../../../hooks/useAvailabilities";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import "react-datepicker/dist/react-datepicker.css";
import { Time, converToReadableTime } from "../../../../utils/converToReadableTime";

const ReservationCard = ({ openTime, closeTime, slug, }: { openTime: string; closeTime: string; slug: string; }) => {
    const { data, loading, error, fetchAvailabilities } = useAvailabilities();
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [time, setTime] = useState(openTime);
    const [partySize, setPartySize] = useState("2");
    const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

    const handleChangeDate = (date: Date | null) => {
        if (date) {
            setDay(date.toISOString().split("T")[0]);
            return setSelectedDate(date);
        }
        return setSelectedDate(null);
    };

    const handleClick = () => {
        fetchAvailabilities({
            slug,
            day,
            time,
            partySize,
        });
    };

    const filterTimeByRestaurantOpenWindow = () => {
        const timesWithinWindow: typeof times = [];

        let isWithinWindow = false;

        times.forEach((t) => {
            // Convert time strings to Date objects with same day, bacause we only care about time
            const tDate = new Date(`1970-01-01T${t.time}`);
            const openTimeDate = new Date(`1970-01-01T${openTime}`);
            const closeTimeDate = new Date(`1970-01-01T${closeTime}`);
            if (tDate >= openTimeDate) {
                isWithinWindow = true;
            }

            if (isWithinWindow) {
                timesWithinWindow.push(t);
            }

            if (tDate >= closeTimeDate) {
                isWithinWindow = false;
            }
        });

        return timesWithinWindow;
    };

    return (
        <div className="fixed w-[15%] bg-white rounded p-3 shadow">
            <div className="text-center border-b pb-2 font-bold">
                <h4 className="mr-7 text-lg">Make a Reservation</h4>
            </div>
            <div className="my-3 flex flex-col">
                <label htmlFor="">Party size</label>
                <select
                    name=""
                    className="py-3 border-b font-light"
                    id=""
                    value={partySize}
                    onChange={(e) => setPartySize(e.target.value)}
                >
                    {partySizes.map((size, index) => (
                        <option key={index} value={size.value}>{size.label}</option>
                    ))}
                </select>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleChangeDate}
                        className="py-3 borber-b font-light text-reg w-24"
                        dateFormat="MMMM d"
                        wrapperClassName="w-[48%]"
                    />
                </div>
                <div className="flex flex-col w-[48%]">
                    <label htmlFor="">Time</label>
                    <select
                        name=""
                        id=""
                        className="py-3 border-b font-light"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    >
                        {filterTimeByRestaurantOpenWindow().map((time, index) => (
                            <option key={index} value={time.time}>{time.displayTime}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-5">
                <button
                    className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
                    onClick={handleClick}
                    disabled={loading}
                >
                    {loading ? <CircularProgress color="inherit" /> : "Find a Time"}
                </button>
            </div>
            {data && data.length ? (
                <div className="mt-4">
                    <p className="text-reg">Select a Time</p>
                    <div className="flex flex-wrap mt-2">
                        {data.map((time, index) => {
                            return time.available ? (
                                <Link key={index}
                                    href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                                    className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                                >
                                    <p className="text-sm font-bold">
                                        {converToReadableTime(time.time as Time)}
                                    </p>
                                </Link>
                            ) : (
                                <p className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3"></p>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ReservationCard;