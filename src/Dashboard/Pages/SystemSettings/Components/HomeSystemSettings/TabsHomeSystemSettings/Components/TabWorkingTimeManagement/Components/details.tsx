import React from "react";
import { Table } from "flowbite-react";

const formatTo12Hour = (time: string) => {
    if (!time) return "غير متاح";
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "م" : "ص";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

function Details({ selectedItem, daysOfWeekKSA }) {
    return (
        <div className="overflow-x-auto">
            <Table striped hoverable>
                <Table.Head className="text-center">
                    <Table.HeadCell>فترة العمل</Table.HeadCell>
                    <Table.HeadCell>بداية الوقت</Table.HeadCell>
                    <Table.HeadCell>نهاية الوقت</Table.HeadCell>
                    <Table.HeadCell>أيام الإجازة</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    <Table.Row className="text-center">
                        <Table.Cell>
                            {selectedItem?.period === "night"
                                ? "مسائي"
                                : "صباحي"}
                        </Table.Cell>
                        <Table.Cell>
                            {formatTo12Hour(selectedItem?.time_from)}
                        </Table.Cell>
                        <Table.Cell>
                            {formatTo12Hour(selectedItem?.time_to)}
                        </Table.Cell>
                        <Table.Cell>
                            <div className="flex flex-wrap justify-center">
                                {selectedItem?.vacation_days?.map(
                                    (day: string, i: number) => (
                                        <span
                                            key={i}
                                            className="px-1 font-semibold"
                                        >
                                            {daysOfWeekKSA[+day]}
                                        </span>
                                    )
                                )}
                            </div>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}

export default Details;
