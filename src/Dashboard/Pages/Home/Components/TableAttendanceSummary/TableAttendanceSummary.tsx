import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import { HomePageData } from "@/Dashboard/Pages/Home/types";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import {
    determineAttendanceState,
    EAttendanceState,
} from "@/Dashboard/Pages/AttendanceDeparture/util/determineAttendanceState";
import { calculateHoursBetween } from "@/Dashboard/Pages/AttendanceDeparture/util/calculateHoursBetween";
import { FullRoutes } from "@/Routes/routes";
import CardTabAttendanceTable from "@/Dashboard/Pages/StaffManagement/Components/StaffEmployeeInformation/Components/TabsEmployeeInfo/Components/TabAttendance/TableTabAttendance/CardTabAttendanceTable";
import AttendanceStatusCard from "@/Dashboard/Pages/AttendanceDeparture/Components/AttendanceStatusCard";
import AttendanceCell from "@/Dashboard/Pages/AttendanceDeparture/Components/TableAttendanceDeparture/AttendanceCell";
import LeaveCell from "@/Dashboard/Pages/AttendanceDeparture/Components/TableAttendanceDeparture/LeaveCell";

const TableAttendanceSummary = ({
    today_attendance,
}: Partial<Pick<HomePageData, "today_attendance">>) => {
    const { t } = useTranslation("home");

    const theadTrContent = [
        t("dashboard.tables.columns.employee"),
        // t("dashboard.tables.columns.workTime"),
        t("dashboard.tables.columns.attendanceStatus"),
        t("dashboard.tables.columns.attendanceTime"),
        t("dashboard.tables.columns.departureTime"),
        // t("dashboard.tables.columns.workingHours"),
    ];

    console.log({ today_attendance });

    const tbodyContent = (today_attendance ?? []).map((item) => {
        const isAbsent =
            determineAttendanceState(item) ===
            EAttendanceState.NormalDayAbsent;
        const workingHours = calculateHoursBetween(
            item.worktime?.time_from,
            item.worktime?.time_to
        );
        const workingTime = calculateHoursBetween(
            item?.attend_time,
            item?.leave_time ?? undefined
        ).toFixed(1);

        const noWorkTime =
            !item.worktime?.time_from ||
            !item.worktime?.time_to ||
            !item.worktime;
        return [
            <div key={item.id} className="flex items-center gap-3 h-16">
                <Link
                    to={FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
                        { id: item?.employee_id?.id }
                    )}
                    className="flex items-center gap-3"
                >
                    <img
                        src={item?.employee_id?.image}
                        alt="img user"
                        loading="lazy"
                        className="h-12 w-12 object-cover rounded-md"
                    />
                    <div className="flex flex-col justify-center gap-1">
                        <div className="text-overflow-ellipsis max-w-32 font-medium">
                            {item?.employee_id?.name}
                        </div>
                        <div className="text-sm text-gray-600">
                            {item?.employee_id?.jobtitle.title}
                        </div>
                        <div className="text-sm text-gray-500">
                            #{item?.employee_id?.code}
                        </div>
                    </div>
                </Link>
            </div>,
            // noWorkTime ? (
            //     <button
            //         key={item.id}
            //         className={`btn-no-data !w-[62%] border-gray-500 bg-gray-200 text-gray-500 !left-[45%] !right-auto`}
            //     >
            //         لا يوجد بيانات عمل للموظف
            //     </button>
            // ) : (
            //     <CardTabAttendanceTable
            //         timeDate={`${item.worktime?.time_from}-${item.worktime?.time_to}`}
            //         allTimeDate={t("duration_in_hours", {
            //             count: workingHours,
            //         })}
            //     />
            // ),
            noWorkTime ? (
                <button
                    key={item.id}
                    className={`btn-no-data !w-[62%] border-gray-500 bg-gray-200 text-gray-500 !left-[45%] !right-auto`}
                >
                    لا يوجد بيانات عمل للموظف
                </button>
            ) : (
                <AttendanceStatusCard
                    key={item.id}
                    attendance={item}
                    fromHome={true}
                />
            ),
            noWorkTime || isAbsent ? null : (
                <AttendanceCell attendance={item} />
            ),
            noWorkTime || isAbsent ? null : (
                <LeaveCell attendance={item} />
            ),
            // noWorkTime || isAbsent || !item?.leave_time ? (
            //     "-"
            // ) : (
            //     <div className="flex flex-col items-center gap-1">
            //         <p>
            //             {t("duration_in_hours", {
            //                 count: parseFloat(workingTime.toString()),
            //             })}
            //         </p>
            //         {item?.is_overtime &&
            //         item?.overtime ? (
            //             <p className="status-success">
            //                 {t("duration_in_hours", {
            //                     count: parseFloat(item?.overtime),
            //                 })}{" "}
            //                 <span className="text-sm">اضافية </span>
            //             </p>
            //         ) : null}
            //     </div>
            // ),
        ];
    });

    return (
        <div
            data-aos="fade-left"
            className="home-table-content mt-4 border-width-content"
        >
            <HeaderTableInfo
                titleHeader={t("dashboard.tables.todayAttendanceSummary")}
                isButtonAll={true}
                routePageInfo={"/"}
                textLink={t("dashboard.tables.all")}
                buttonAddNewOrder={false}
                newButtonWithoutText={false}
                newComponentsHere={false}
            />
            <DataTableTwo
                theadContent={theadTrContent}
                tbodyContent={tbodyContent}
                withCheckboxes={false}
                isShowContentFilterInfo={true}
                isShowModalButtonFilter={false}
                isTrueButtonsModalContentRight={false}
                isTrueButtonTwoModalContent={false}
            />
        </div>
    );
};

export default TableAttendanceSummary;
