import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import ControlledInput from "@/Dashboard/Shared/Forms/ControlledInput";
import { formatDateToYmd } from "@/utils/date";
import * as Yup from "yup";
import { FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useAttendEmployee } from "@/hooks/attendance/useAttendEmployee";
import { useLeaveEmployee } from "@/hooks/attendance/useLeaveEmployee";
import { useUpdateEmployeeAttendance } from "@/hooks/attendance/useUpdateEmployeeAttendance";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import ControlledSelect from "@/Dashboard/Shared/SelectBox/ControlledSelect";
import { AttendOrLeave } from "../../types";
import { Employee } from "@/Dashboard/Pages/types";
// import TimePickerSelect from "@/Dashboard/Shared/TimePickerSelect";
import TimePickerSelect from "@/Dashboard/Shared/TimePickerSelect/TimePickerSelect";


export type EditAttendanceModalType =
  | "attendance"
  | "leave"
  | "attendance_leave";

type EditAttendanceTime = {
  type: "attendance";
  attendance: string;
  date: string;
  place_id: string;
};

type EditLeaveTime = {
  type: "leave";
  leave: string;
  date: string;
  place_id: string;
};

type EditAttendanceLeaveTime = {
  type: "attendance_leave";
  attendance: string;
  leave: string;
  date: string;
  place_id: string;
};

type ModalEditAttendanceDepartureFormikValues =
  | EditAttendanceTime
  | EditLeaveTime
  | EditAttendanceLeaveTime;

type ModalEditAttendanceDepartureProps = {
  hideModal: () => void;
  open: boolean;
  attendOrLeave: AttendOrLeave;
  employee: Employee;
} & ModalEditAttendanceDepartureFormikValues;

type EmployeeInformationProps = {
  employee: Employee;
  realTime: string;
  overTime: string;
};

const ModalEditAttendanceDeparture = ({
  hideModal,
  open,
  type,
  attendOrLeave,
  employee
}: ModalEditAttendanceDepartureProps) => {
  const [searchParams] = useSearchParams();
  const { mutate: attendEmployee } = useAttendEmployee({
    onSuccess: () => {
      hideModal();
      toast.success("تم تعديل الحضور بنجاح");
    }
  });
  const { mutate: leaveEmployee } = useLeaveEmployee({
    onSuccess: () => {
      hideModal();
      toast.success("تم تعديل الانصراف بنجاح");
    }
  });
  const { mutate: updateAttendance } = useUpdateEmployeeAttendance({
    onSuccess: () => {
      hideModal();
      toast.success("تم تعديل الحضور والانصراف بنجاح");
    }
  });

  const [realTime, setRealTime] = useState<string>("0 hours 0 minutes");
  const [overTime, setOverTime] = useState<string>("0 hours 0 minutes");

  const formatTime = (totalHours: number): string => {
    if (totalHours <= 0) return "0 hours 0 minutes";

    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);

    if (hours === 0 && minutes === 0) return "0 hours 0 minutes";
    if (hours === 0) return `${minutes} minutes`;
    if (minutes === 0) return `${hours} hours`;
    return `${hours} hours ${minutes.toString().padStart(2, "0")} minutes`;
  };

  const calculateTimeDifference = (time1: string, time2: string): number => {
    if (!time1 || !time2) return 0;

    const [hours1, minutes1] = time1.split(":").map(Number);
    const [hours2, minutes2] = time2.split(":").map(Number);

    const date1 = new Date();
    date1.setHours(hours1, minutes1, 0);

    const date2 = new Date();
    date2.setHours(hours2, minutes2, 0);

    // If leave time is before attendance time, assume it's the next day
    if (date2 < date1) {
      date2.setDate(date2.getDate() + 1);
    }

    const diffInMinutes = (date2.getTime() - date1.getTime()) / (1000 * 60);
    return Number((diffInMinutes / 60).toFixed(2)); // Round to 2 decimal places
  };

  const updateRealTime = (attendance: string, leave: string) => {
    const diff = calculateTimeDifference(attendance, leave);
    const overTimeHours = diff > 8 ? diff - 8 : 0;

    setRealTime(formatTime(diff));
    setOverTime(formatTime(overTimeHours));
  };

  const formik = useFormik<ModalEditAttendanceDepartureFormikValues>({
    initialValues: {
      date: formatDateToYmd(
        new Date(new Date().setDate(new Date().getDate() - 1))
      ),
      attendance: attendOrLeave?.attendance?.attend_time ?? "",
      leave: attendOrLeave?.attendance?.leave_time ?? "",
      place_id: String(attendOrLeave?.attendance?.place?.id)
    },
    validationSchema: Yup.object(
      type === "attendance"
        ? {
            date: Yup.string().required("التاريخ مطلوب"),
            attendance: Yup.string().required("الحضور مطلوب")
          }
        : type === "leave"
        ? {
            date: Yup.string().required("التاريخ مطلوب"),
            leave: Yup.string().required("الانصراف مطلوب")
          }
        : {
            date: Yup.string().required("التاريخ مطلوب"),
            attendance: Yup.string().required("الحضور مطلوب"),
            leave: Yup.string().required("الانصراف مطلوب")
          }
    ),
    onSubmit: (values) => {
      if (type === "attendance") {
        const data = {
          employee_id: attendOrLeave.id,
          date: searchParams.get("date") ?? values.date,
          time: values.attendance
        };
        if (values.place_id) data["place_id"] = values.place_id;
        attendEmployee(data);
      }
      if (type === "leave") {
        const data = {
          employee_id: attendOrLeave.id,
          date: searchParams.get("date") ?? values.date,
          time: values.leave
        };
        if (values.place_id) data["place_id"] = values.place_id;
        leaveEmployee(data);
      }
      if (type === "attendance_leave") {
        const data = {
          employee_id: attendOrLeave.id,
          date: searchParams.get("date") ?? values.date,
          attend_time: values.attendance,
          leave_time: values.leave
        };
        if (values.place_id) data["place_id"] = values.place_id;

        console.log("update data", data);

        updateAttendance(data);
      }
    }
  });

  useEffect(() => {
    if (open) {
      const attendance = attendOrLeave?.attendance?.attend_time ?? "";
      const leave = attendOrLeave?.attendance?.leave_time ?? "";
      formik.setFieldValue("attendance", attendance, false);
      formik.setFieldValue("leave", leave, false);
      formik.setFieldValue(
        "place_id",
        String(attendOrLeave?.attendance?.place?.id),
        false
      );
      updateRealTime(attendance, leave);
    } else {
      formik.resetForm();
      setRealTime("0 hours 0 minutes");
      setOverTime("0 hours 0 minutes");
    }
  }, [open, attendOrLeave]);

  console.log("realTime", realTime);
  console.log("employee", employee);

  const modalTitle =
    type === "attendance"
      ? "تعديل بيانات الحضور"
      : type === "leave"
      ? "تعديل بيانات الانصراف"
      : "تعديل بيانات الحضور والانصراف" + " " + employee.name;

  return (
    <ModalShared open={open} hiddenModal={hideModal} titleModal={modalTitle}>
      <EmployeeInformation
        employee={employee}
        realTime={realTime}
        overTime={overTime}
      />

      <div className="all-content-modal-filter">
        <FormikProvider value={formik}>
          <div>
            <div className="all-forms-grid grid-cards-2">
              {type === "attendance_leave" ? (
                <>
                  <div className="input-one-details">
                    <TimePickerSelect
                      textLable="الحضور"
                      onTimeChange={(time) => {
                        formik.setFieldValue("attendance", time);
                        updateRealTime(time, formik.values.leave);
                      }}
                    />
                    {formik.errors.attendance && (
                      <p className="text-red-500 text-sm mt-2">
                        {formik.errors.attendance}
                      </p>
                    )}
                  </div>
                  <div className="input-one-details">
                    <TimePickerSelect
                      textLable="الانصراف"
                      onTimeChange={(time) => {
                        formik.setFieldValue("leave", time);
                        updateRealTime(formik.values.attendance, time);
                      }}
                    />
                    {formik.errors.leave && (
                      <p className="text-red-500 text-sm mt-2">
                        {formik.errors.leave}
                      </p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <ControlledSelect
                      staticOptions={(attendOrLeave?.workplaces ?? []).map(
                        (place) => ({
                          value: String(place.id),
                          label: place.title
                        })
                      )}
                      fieldName="place_id"
                      label="المكان"
                      placeholder="ادخل المكان"
                      type="static"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="input-one-details">
                    <TimePickerSelect
                      textLable={type === "attendance" ? "الحضور" : "الانصراف"}
                      onTimeChange={(time) => {
                        if (type === "attendance") {
                          formik.setFieldValue("attendance", time);
                          updateRealTime(time, formik.values.leave);
                        } else {
                          formik.setFieldValue("leave", time);
                          updateRealTime(formik.values.attendance, time);
                        }
                      }}
                    />
                    {formik.errors[type] && (
                      <p className="text-red-500 text-sm mt-2">
                        {formik.errors[type]}
                      </p>
                    )}
                  </div>
                  <ControlledSelect
                    fieldName="place_id"
                    label="المكان"
                    placeholder="ادخل المكان"
                    type="static"
                    staticOptions={(attendOrLeave?.workplaces ?? []).map(
                      (place) => ({
                        value: String(place.id),
                        label: place.title
                      })
                    )}
                  />
                </>
              )}
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={hideModal}
                className="button-filter-one button-transparent h-[50px] hover:bg-redColor01 hover:border-redColor01"
              >
                الغاء
              </button>
              <button
                type="button"
                onClick={() => formik.handleSubmit()}
                className="button-filter-one button-transparent h-[50px] hover:bg-blue-600"
              >
                حفظ
              </button>
            </div>
          </div>
        </FormikProvider>
      </div>
    </ModalShared>
  );
};

const EmployeeInformation = ({
  employee,
  realTime,
  overTime
}: EmployeeInformationProps) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div dir="rtl" className="mb-4">
      {/* Name and Date Section */}
      <div className="text-center mb-2">
        <div className="flex justify-center mb-4">
          {employee.image ? (
            <img
              src={employee.image}
              alt={employee.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow-sm"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <i className="fas fa-user text-4xl text-gray-400"></i>
            </div>
          )}
        </div>
        <div className="name-user  text-font-gray text-primaryColor text-[20px]  font-[700] leading-tight ">
          {employee.name}
        </div>
        <div className="text-center  flex items-center justify-center gap-1 sm:gap-2 mt-2">
          {employee.jobtitle && (
            <span className="text-[13px] font-[600] sm:text-[15px] text-darkColor">
              {employee.jobtitle || "--"}
            </span>
          )}

          {employee.code && (
            <span className="mx-2 text-[13px] font-[600] sm:text-[15px] text-darkColor">
              |
            </span>
          )}
          {employee.code && (
            <span className="text-[13px] font-[600] sm:text-[15px] text-darkColor">
              #{employee.code}
            </span>
          )}
          {employee.code && (
            <span className="mx-2 text-[13px] font-[600] sm:text-[15px] text-darkColor">
              |
            </span>
          )}
          <div className="text-darkColor text-[13px] font-[600] sm:text-[17px]">
            {formattedDate}
          </div>
        </div>
      </div>
      {/* Job Title and Code */}

      {/* Work Schedule and Location */}
      <div className="border rounded-[13px] p-3 my-4 bg-[#4c6cb20a]">
        <div className="flex justify-between items-center mb-2">
          <span className="font-[600] text-[17px]  text-primaryColor">
            مجدول
          </span>
          <span className="font-[600] text-[13px] text-darkColor text-right">
            توقيت العمل
          </span>
        </div>
        <div className="flex justify-between items-start mb-2">
          <span className="text-base font-bold text-gray-800">
            {employee.worktime?.time_from || "--"} ص -{" "}
            {employee.worktime?.time_to || "--"} م
          </span>
          <span className="text-[13px] font-[600] sm:text-[15px] text-red-700">
            مكتب
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {employee.workplaces && employee.workplaces.length > 0 ? (
            employee.workplaces.map((place: any) => (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-blue-500 hover:text-blue-700"
                title="عرض على الخريطة"
              >
                <span
                  key={place.id}
                  className="inline-flex basis-[100px] flex-grow-1  items-center btn-main hover:bg-redColor01 hover:border-redColor01 transition-all duration-300   !p-[7px_12px] text-[13px] font-medium"
                >
                  {place.title}

                  <i className="fas fa-map-marker-alt h-4 w-4 inline-block text-white "></i>
                </span>
              </a>
            ))
          ) : (
            <span className="text-xs text-gray-500">--</span>
          )}
        </div>
      </div>
      {/* Attendance and Work Info */}
      <div className="border rounded-[13px] p-3 bg-white mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[13px] font-[600] sm:text-[15px] text-primaryColor">
            الحضور والانصراف
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center animate-fade-in">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-sm p-4 transition hover:scale-105 hover:shadow-md duration-300">
            <div className="text-[13px] font-[600] sm:text-[15px] text-darkColor mb-1">
              ساعات العمل
            </div>
            <div className="font-bold text-[16px] text-primaryColor">
              {realTime}
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-sm p-4 transition hover:scale-105 hover:shadow-md duration-300">
            <div className="text-[13px] font-[600] sm:text-[15px] text-darkColor mb-1">
              استراحة
            </div>
            <div className="font-bold text-[16px] text-primaryColor">
              {employee.worktime?.break || "معطل"}
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-sm p-4 transition hover:scale-105 hover:shadow-md duration-300">
            <div className="text-[13px] font-[600] sm:text-[15px] text-darkColor mb-1">
              ساعات إضافية
            </div>
            <div className="font-bold text-[16px] text-primaryColor">
              {overTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditAttendanceDeparture;
