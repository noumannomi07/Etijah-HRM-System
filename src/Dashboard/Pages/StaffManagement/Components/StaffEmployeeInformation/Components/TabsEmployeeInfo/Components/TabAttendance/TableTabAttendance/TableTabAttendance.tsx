import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import CardTabAttendanceTable from "./CardTabAttendanceTable";
import "./TableTabAttendance.css";
import React, { useRef, useState } from "react";
import { useEmployeeContext } from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/providers/EmployeeProvider";
import { useEmployeeAttendanceContext } from "../EmployeeAttendanceProvider";
import { EAttendanceState } from "@/Dashboard/Pages/AttendanceDeparture/util/determineAttendanceState";
import { determineAttendanceState } from "@/Dashboard/Pages/AttendanceDeparture/util/determineAttendanceState";
import { calculateHoursBetween } from "@/Dashboard/Pages/AttendanceDeparture/util/calculateHoursBetween";
import AttendanceStatusCard from "./AttendanceStatusCard";
import AttendanceCell from "@/Dashboard/Pages/AttendanceDeparture/Components/TableAttendanceDeparture/AttendanceCell";
import LeaveCell from "@/Dashboard/Pages/AttendanceDeparture/Components/TableAttendanceDeparture/LeaveCell";
import { useTranslation } from "react-i18next";
import ActionData from "@/Dashboard/Shared/DataTableInfo/ActionData";
import EditIcon from "@/Dashboard/Shared/DataTableInfo/Icons/EditIcon";
import { useNavigate } from "react-router-dom";
import { EditAttendanceModalType } from "@/Dashboard/Pages/AttendanceDeparture/Components/TableAttendanceDeparture/ModalEditAttendanceDeparture";
import { FullRoutes } from "@/Routes/routes";
import { AttendOrLeave } from "@/Dashboard/Pages/AttendanceDeparture/types";

const TableTabAttendance = () => {
    const { t } = useTranslation("attendance");
    const { t: tStaff } = useTranslation("staffManagement");
    const navigate = useNavigate();
    const { employee, isPending: isPendingEmployee } = useEmployeeContext();
    const { attendance, isPending: isPendingAttendance } =
        useEmployeeAttendanceContext();
    const [modalType, setModalType] =
        useState<EditAttendanceModalType>("attendance");
    const [openEdit, setOpenEdit] = useState(false);
    const attendanceOrLeaveRef = useRef<AttendOrLeave>();

    const handleOpenEdit = () => setOpenEdit(!openEdit);

    const theadTrContent = [
        tStaff("attendance.date"),
        tStaff("attendance.workTime"),
        tStaff("attendance.status"),
        tStaff("attendance.arrivalTime"),
        tStaff("attendance.departureTime"),
        tStaff("attendance.hoursWorked"),
    ];

    const tbodyContent = (attendance?.attendance ?? []).map((item) => {
        const attendStatus = determineAttendanceState(item);
        const workingHours = calculateHoursBetween(
            item.worktime?.time_from,
            item.worktime?.time_to
        );
        const workingTime = calculateHoursBetween(
            item.attend_time,
            item.leave_time ?? undefined
        ).toFixed(1);

        const isAbsent = attendStatus === EAttendanceState.NormalDayAbsent;

        const noWorkTime =
            !item.worktime?.time_from ||
            !item.worktime?.time_to ||
            !item.worktime;

        const actionButtons = noWorkTime
            ? [
                  {
                      label: tStaff("attendance.actions.editEmployeeWorkSchedule"),
                      onClick: () => {
                          if (item.id) {
                              navigate(
                                  FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
                                      { id: item.id }
                                  )
                              );
                          }
                      },
                      icon: <EditIcon />,
                  },
              ]
            : [
                  {
                      label: tStaff("attendance.actions.editAttendanceAndDeparture"),
                      onClick: () => {
                          setModalType("attendance_leave");
                          handleOpenEdit();
                          console.log({ "abdo-item": item });
                          console.log({ "abdo-employee": employee });

                          attendanceOrLeaveRef.current = {
                              ...item,
                              ...employee,
                              employee: employee,
                          };
                      },
                      icon: <EditIcon />,
                      // disabled: !item?.attendance?.attend_time && !item?.attendance?.leave_time
                  },
              ];

        return [
            item.date,
            noWorkTime ? (
                <button
                    key={item.id}
                    className={`btn-no-data !w-[62%] border-gray-500 bg-gray-200 text-gray-500 !left-[45%] !right-auto`}
                >
                    {tStaff("attendance.workDataNotAvailable")}
                </button>
            ) : (
                <CardTabAttendanceTable
                    timeDate={`${item.worktime?.time_from}-${item.worktime?.time_to}`}
                    allTimeDate={t("duration_in_hours", {
                        count: workingHours,
                    })}
                />
            ),
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
                    attendance={item.attendance}
                />
            ),
            noWorkTime || isAbsent ? null : (
                <AttendanceCell attendance={item.attendance} />
            ),
            noWorkTime || isAbsent ? null : (
                <LeaveCell attendance={item.attendance} />
            ),
            noWorkTime || isAbsent || !item?.attendance?.leave_time ? (
                "-"
            ) : (
                <div className="flex flex-col items-center gap-1">
                    <p>
                        {t("duration_in_hours", {
                            count: parseFloat(workingTime.toString()),
                        })}
                    </p>
                    {item?.attendance?.is_overtime &&
                    item?.attendance?.overtime ? (
                        <p className="status-success">
                            {t("duration_in_hours", {
                                count: parseFloat(item?.attendance?.overtime),
                            })}{" "}
                            <span className="text-sm">اضافية </span>
                        </p>
                    ) : null}
                </div>
            ),
            <ActionData key={item.id} menuItems={actionButtons} />,
        ];
    });

    return (
        <div className="all-data-audience pt-6">
            {/* <ModalEditAttendanceDeparture
                attendOrLeave={attendanceOrLeaveRef.current}
                open={openEdit}
                hideModal={handleOpenEdit}
                type={modalType}
                employee={attendanceOrLeaveRef.current}
            /> */}

            <DataTableTwo
                isLoading={isPendingEmployee || isPendingAttendance}
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

export default TableTabAttendance;
