import React from "react";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import { Link } from "react-router-dom";
import {
    FaUserCircle,
    FaCalendarAlt,
    FaInfoCircle,
    FaClock,
    FaMoneyBillWave,
    FaIdCard,
    FaEnvelope,
    FaPhone,
    FaVenusMars,
    FaBirthdayCake,
} from "react-icons/fa";
import i18next from "i18next";
import theDateObj from "@/Dashboard/DateMonthDays";

interface VacationDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: any;
}

const VacationDetailsModal: React.FC<VacationDetailsModalProps> = ({
    isOpen,
    onClose,
    event,
}) => {
    if (!isOpen) return null;
    const langgg = i18next.language;

    // Helper function to format dates
    const formatDate = (dateString: string) => {
        return langgg == "ar"
            ? theDateObj.formatDataFunctionAR(dateString)
            : theDateObj.formatDataFunctionEN(dateString);
    };

    // Helper function to get status display
    const getStatusDisplay = (status: string) => {
        const statusMap: Record<string, { text: string; color: string }> = {
            approved: { text: "موافق عليه", color: "text-green-600" },
            pending: { text: "قيد الانتظار", color: "text-yellow-600" },
            rejected: { text: "مرفوض", color: "text-red-600" },
        };
        return statusMap[status] || { text: status, color: "text-gray-600" };
    };

    const statusDisplay = getStatusDisplay(event?.extendedProps?.status);

    return (
        <ModalShared open={isOpen} hiddenModal={onClose}>
            <div className="all-content-modal-filter p-[12px] bg-white rounded-xl font-sans max-w-4xl mx-auto">
                <div className="space-y-5">
                    {/* العنوان والمسمى الوظيفي */}
                    <div className="border-b border-gray-200 pb-7">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-[20px] font-bold text-gray-900 mb-2 font-sans">
                                    {event?.extendedProps?.employeeName ||
                                        "تفاصيل الإجازة"}
                                </h3>
                                <p className="text-gray-600 text-[15px] font-bold flex items-center gap-2 ">
                                    <FaUserCircle className="text-blue-500" />
                                    {event?.extendedProps?.jobTitle ||
                                        "غير محدد"}
                                </p>
                            </div>
                            <Link
                                to={`/dashboard/staff-management/staff-employee-information/${
                                    event?.extendedProps?.employeeId ||
                                    "default"
                                }?tab=TabVacations`}
                                className="inline-flex items-center gap-2  btn-main py-[10px] transition-colors duration-200 shadow-sm text-lg font-sans"
                            >
                                <FaUserCircle className="text-xl" />
                                <span>عرض الملف الشخصي</span>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1  gap-4">
                        {/* معلومات الموظف */}
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                            <h4 className="text-[17px] font-bold text-primaryColor border-b pb-2">
                                معلومات الموظف
                            </h4>
                            <div className="flex items-center flex-col gap-2 ">
                                <img
                                    src={
                                        event?.extendedProps?.employeeImage ||
                                        "https://backend.etijah.sa/images/default-user.png"
                                    }
                                    alt={event?.extendedProps?.employeeName}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                                />
                                <div>
                                    <p className="font-semibold text-lg">
                                        {event?.extendedProps?.employeeName}
                                    </p>
                                    <p className="text-darkColor  text-[15px] font-bold">
                                        {event?.extendedProps?.jobTitle}
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <FaIdCard className="text-primaryColor" />
                                    <span className=" text-[13px] font-bold text-grayColor">
                                        الرقم الوظيفي:{" "}
                                        {event?.extendedProps?.employeeCode ||
                                            "غير محدد"}
                                    </span>
                                </div>
                                <div className="flex items-center text-sm gap-2">
                                    <FaEnvelope className="text-primaryColor" />
                                    <span className="text-[13px] font-bold text-grayColor">
                                        {event.extendedProps?.employee?.email ||
                                            "غير محدد"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <FaPhone className="text-primaryColor" />
                                    <span className="text-[13px] font-bold text-grayColor">
                                        {event.extendedProps?.employee?.phone ||
                                            "غير محدد"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <FaVenusMars className="text-primaryColor" />
                                    <span className="text-[13px] font-bold text-grayColor">
                                        {event.extendedProps?.employee
                                            ?.gender === "female"
                                            ? "أنثى"
                                            : "ذكر"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <FaBirthdayCake className="text-primaryColor" />
                                    <span className="text-[13px] font-bold text-grayColor">
                                        {event.extendedProps?.employee
                                            ?.birth_date
                                            ? formatDate(
                                                  event.extendedProps?.employee
                                                      ?.birth_date
                                              )
                                            : "غير محدد"}
                                    </span>
                                </div>
                            </div>
                        </div>

                    
                    </div>

                 

                    {/* الملاحظات */}
                    {event?.extendedProps?.note && (
                        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                            <p className="text-base text-darkColor  mb-1 flex items-center gap-2 font-bold">
                                <FaInfoCircle />
                                ملاحظات
                            </p>
                            <p className="font-semibold text-gray-800 text-xl whitespace-pre-wrap font-sans">
                                {event?.extendedProps?.note}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </ModalShared>
    );
};

export default VacationDetailsModal;
