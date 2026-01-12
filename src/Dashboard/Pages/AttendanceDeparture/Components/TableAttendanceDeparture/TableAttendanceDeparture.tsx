import CardTabAttendanceTable from "@/Dashboard/Pages/StaffManagement/Components/StaffEmployeeInformation/Components/TabsEmployeeInfo/Components/TabAttendance/TableTabAttendance/CardTabAttendanceTable";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { useAttendanceInformation } from "@/hooks/attendance/useAttendance";
import { formatDateToYmd } from "@/utils/date";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { calculateHoursBetween } from "../../util/calculateHoursBetween";
import { determineAttendanceState, EAttendanceState } from "../../util/determineAttendanceState";
import AttendanceStatusCard from "../AttendanceStatusCard";
import AttendanceCell from "./AttendanceCell";
import LeaveCell from "./LeaveCell";
import ModalFilterAttendanceDeparture from "./ModalFilterAttendanceDeparture";
import "./TableAttendanceDeparture.css";
import ActionData from "@/Dashboard/Shared/DataTableInfo/ActionData";
import EditIcon from "@/Dashboard/Shared/DataTableInfo/Icons/EditIcon";
import ModalEditAttendanceDeparture, { EditAttendanceModalType } from "./ModalEditAttendanceDeparture";
import { FullRoutes } from "@/Routes/routes";
import { AttendOrLeave } from "../../types";

const TableAttendanceDeparture = () => {
  const { t } = useTranslation('attendance');
  const [modalType, setModalType] = useState<EditAttendanceModalType>('attendance');
  const navigate = useNavigate();

  const attendanceOrLeaveRef = useRef<AttendOrLeave>();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpen = () => setOpen((_prev) => !_prev);
  const handleOpenEdit = () => setOpenEdit(!openEdit);

  const { data: attendance, isPending } = useAttendanceInformation();
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeDateFilter = (date: Date | string) => {
    setSearchParams((_prev) => {
      _prev.set("date", date.toString())
      return _prev
    });
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((_prev) => {
      _prev.set("search", e.target.value)
      return _prev
    });
  };

  useEffect(() => {
    const _date = searchParams.get("date");
    if (!_date) {
      setSearchParams({ date: formatDateToYmd(new Date()) });
    }
  }, []);

  const theadTrContent = [
    "الموظف",
    "مواعيد العمل",
    "الحالة",
    "موعد الحضور",
    "موعد الإنصراف",
    "ساعات العمل",
    ""
  ]; 

    const tbodyContent = (attendance ?? []).map((item) => {
    const employeeId = item.id;
    const isAbsent = determineAttendanceState(item.attendance) === EAttendanceState.NormalDayAbsent;
    const workingHours = calculateHoursBetween(item.worktime?.time_from, item.worktime?.time_to);
    const workingTime = calculateHoursBetween(item.attendance?.attend_time, item.attendance?.leave_time ?? undefined).toFixed(1);

    const noWorkTime = !item.worktime?.time_from || !item.worktime?.time_to || !item.worktime;

    const actionButtons = noWorkTime
      ? [{
        label: "تعديل مواعيدة عمل الموظف",
        onClick: () => {
          if (item.id) {
            navigate(FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId({ id: item.id }))
          }
        },
        icon: <EditIcon />,
      }] : [
        // {
        //   label: "تسجيل الحضور",
        //   onClick: () => {
        //     setModalType("attendance");
        //     handleOpenEdit()
        //     attendanceOrLeaveRef.current = item
        //   },
        //   icon: <EditIcon />,
        //   disabled: item.attendance?.attend_time
        // },
        // {
        //   label: "تسجيل الانصراف",
        //   onClick: () => {
        //     setModalType("leave");
        //     handleOpenEdit()
        //     attendanceOrLeaveRef.current = item
        //   },
        //   icon: <EditIcon />,
        //   disabled: item.attendance?.leave_time
        // },
        {
          label: "تعديل الحضور و الانصراف",
          onClick: () => {
            setModalType("attendance_leave");
            handleOpenEdit()
            attendanceOrLeaveRef.current = item
          },
          icon: <EditIcon />,
         // disabled: !item?.attendance?.attend_time && !item?.attendance?.leave_time
        }
      ]

    return [
      <div key={item.id} className="flex items-center gap-3 h-16">
        <Link to={FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId({ id: item.id })} className="flex items-center gap-3">
          <img 
            src={item.image} 
            alt="img user" 
            loading="lazy" 
            className="h-12 w-12 object-cover rounded-md"
          />
          <div className="flex flex-col justify-center gap-1">
            <div className="text-overflow-ellipsis max-w-32 font-medium">{item.name}</div>
            <div className="text-sm text-gray-600">{item.jobtitle}</div>
            <div className="text-sm text-gray-500">#{item.code}</div>
          </div>
        </Link>
      </div>
      ,
      noWorkTime
        ? <button key={item.id} className={`btn-no-data !w-[62%] border-gray-500 bg-gray-200 text-gray-500 !left-[45%] !right-auto`}>لا يوجد بيانات عمل للموظف</button>
        : <CardTabAttendanceTable
          timeDate={
            `${item.worktime?.time_from}-${item.worktime?.time_to}`}
          allTimeDate={
            t('duration_in_hours', {
              count: workingHours
            })
          }
        />,

      noWorkTime
        ? <button key={item.id} className={`btn-no-data !w-[62%] border-gray-500 bg-gray-200 text-gray-500 !left-[45%] !right-auto`}>لا يوجد بيانات عمل للموظف</button>
        : 
        
        <AttendanceStatusCard key={item.id} attendance={item.attendance} />
        
        ,
      noWorkTime || isAbsent ? null :
        <AttendanceCell attendance={item.attendance} />
        
        ,
      noWorkTime || isAbsent
        ? null
        : <LeaveCell attendance={item.attendance} />,
      (noWorkTime || isAbsent || !item?.attendance?.leave_time) ? "-" :
        <div className="flex flex-col items-center gap-1">
          <p>
            {
              t('duration_in_hours', {
                count: parseFloat(workingTime.toString())
              })}
          </p>
          {(item?.attendance?.is_overtime && item?.attendance?.overtime) ?
            <p className="status-success">
              {
                t('duration_in_hours', {
                  count: parseFloat(item?.attendance?.overtime)
                })
              }
              {" "}
              <span className="text-sm">اضافية </span>
            </p> : null
          }
        </div>,
      <ActionData key={item.id} menuItems={actionButtons} />
    ];
  });

  
  return (
    <>
      <ModalFilterAttendanceDeparture open={open} hiddenModal={handleOpen} />
      <ModalEditAttendanceDeparture attendOrLeave={attendanceOrLeaveRef.current} open={openEdit} hideModal={handleOpenEdit} type={modalType} employee={attendanceOrLeaveRef.current} />
      <div
        data-aos="fade-up"
        className="all-data-audience all-data-audience-page pt-6"
      >
        <DataTableTwo
          isLoading={isPending}
          theadContent={theadTrContent}
          tbodyContent={tbodyContent}
          onSearchChange={onSearchChange}
          showDateFilter={true}
          onChangeDateFilter={onChangeDateFilter}
          withCheckboxes={false}
          isShowContentFilterInfo={true}
          isShowModalButtonFilter={true}
          functionButtonFilter={handleOpen}
          isTrueButtonsModalContentRight={false}
          isTrueButtonTwoModalContent={false}
        />
      </div>
    </>
  );
};

export default TableAttendanceDeparture;
