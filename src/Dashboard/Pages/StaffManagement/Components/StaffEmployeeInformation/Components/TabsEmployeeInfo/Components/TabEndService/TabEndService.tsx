import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEmployeeContext } from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/providers/EmployeeProvider";
import ModalEndServiceCalculator from "../TabSalary/ModalsSalary/ModalEndServiceCalculator";
import CalculatorIcon from "@assets/Icons/CalculatorIcon.svg";
import { Loading } from "@/components";
import { Link } from "react-router-dom";
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";

const TabEndService = () => {
    const { employee, isPending } = useEmployeeContext();
    const { t, i18n } = useTranslation("violations");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const isRTL = i18n.language === 'ar';

    if (isPending) return <Loading />;

    const formatCurrency = (amount: string) => {
        return new Intl.NumberFormat(i18n.language === 'ar' ? 'ar-SA' : 'en-US', {
            style: 'currency',
            currency: 'SAR'
        }).format(parseFloat(amount));
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(
            i18n.language === 'ar' ? 'ar-SA' : 'en-US',
            {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
        );
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 min-h-[300px]">
            <ModalEndServiceCalculator
                open={open}
                hiddenModal={handleOpen}
                fromEmployee={employee}
            /> 
            {!employee.endservice ? (
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                    <div className="w-full flex justify-end mb-8">
                        <button
                            type="button"
                            onClick={handleOpen}
                            className="btn-main button-green height--50 flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:shadow-md"
                        >
                            {t("endService.endOfServiceCalculator")}
                            <img src={CalculatorIcon} alt="calculator" className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                            {t("endService.title")}
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {t("endService.description")}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 rounded-lg">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">
                                    {isRTL ? "معلومات إنهاء الخدمة" : "End of Service Information"}
                                </h2>
                                <p className="text-primary-light">
                                    {isRTL ? "تاريخ إنهاء الخدمة" : "End of Service Date"}: {formatDate(employee?.endservice_reward?.created_at)}
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-sm opacity-90">
                                    {isRTL ? "رقم الطلب" : "Request ID"}: #{employee?.endservice_reward?.id}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column - Financial Information */}
                        <div className="space-y-6">
                            {/* Financial Summary Card */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-primary mb-4 border-b border-gray-100 pb-2">
                                    {isRTL ? "الملخص المالي" : "Financial Summary"}
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-gray-600">
                                            {isRTL ? "مبلغ إنهاء الخدمة" : "End of Service Amount"}
                                        </span>
                                        <span className="font-semibold text-lg text-primary flex items-center gap-2">
                                            {Number(employee?.endservice_reward?.amount).toFixed(2)}
                                            
                                             <Saudiriyal />
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-gray-600">
                                            {isRTL ? "مبلغ الإجازات" : "Vacations Amount"}
                                        </span>
                                        <span className="font-semibold text-lg text-gray-700 flex items-center gap-2">
                                            {Number(employee?.endservice_reward?.vacations_amount).toFixed(2)} <Saudiriyal />
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-3 bg-gray-50 rounded-lg px-4">
                                        <span className="text-gray-800 font-semibold">
                                            {isRTL ? "إجمالي المبلغ" : "Total Amount"}
                                        </span>
                                        <span className="font-bold text-xl text-primary flex items-center gap-2">
                                            {Number(employee?.endservice_reward?.total_amount).toFixed(2)} <Saudiriyal />
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Service Duration Card */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-primary mb-4 border-b border-gray-100 pb-2">
                                    {isRTL ? "مدة الخدمة" : "Service Duration"}
                                </h3>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {employee?.endservice_reward?.years}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {isRTL ? "سنوات" : "Years"}
                                        </div>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-green-600">
                                            {employee?.endservice_reward?.months}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {isRTL ? "أشهر" : "Months"}
                                        </div>
                                    </div>
                                    <div className="bg-orange-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-orange-600">
                                            {employee?.endservice_reward?.days}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {isRTL ? "أيام" : "Days"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Details */}
                        <div className="space-y-6">
                            {/* Reason Card */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-primary mb-4 border-b border-gray-100 pb-2">
                                    {isRTL ? "سبب إنهاء الخدمة" : "End of Service Reason"}
                                </h3>
                                <div className="space-y-4">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-sm text-gray-500 mb-2">
                                            {isRTL ? "باللغة العربية" : "In Arabic"}
                                        </div>
                                        <div className="text-gray-800 text-lg leading-relaxed" dir="rtl">
                                            {employee?.endservice_reward?.reason ? JSON.parse(employee?.endservice_reward?.reason)?.ar : "لا يوجد سبب"}
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-sm text-gray-500 mb-2">
                                            {isRTL ? "In English" : "باللغة الإنجليزية"}
                                        </div>
                                        <div className="text-gray-800 text-lg leading-relaxed" dir="ltr">
                                            {JSON.parse(employee?.endservice_reward?.reason)?.en}
                                        </div>
                                    </div>
                                    {/* <div className="mt-4 p-3 bg-primary-light rounded-lg">
                                        <span className="text-sm font-medium text-primary">
                                            {isRTL ? "نوع إنهاء الخدمة" : "Service End Type"}: 
                                        </span>
                                        <span className="ml-2 text-sm text-gray-700 capitalize">
                                            {employee?.endservice_reward?.type}
                                        </span>
                                    </div> */}
                                </div>
                            </div>

                            {/* Status Information */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-primary mb-4 border-b border-gray-100 pb-2">
                                    {isRTL ? "معلومات الحالة" : "Status Information"}
                                </h3>
                                <div className="space-y-3">
                                    {/* <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">
                                            {isRTL ? "حالة الطلب" : "Request Status"}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            employee?.endservice_reward?.applied 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {employee?.endservice_reward?.applied 
                                                ? (isRTL ? "مطبق" : "Applied") 
                                                : (isRTL ? "قيد المعالجة" : "Pending")}
                                        </span>
                                    </div> */}
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">
                                            {isRTL ? "تم إنهاؤه بواسطة" : "Ended By"}
                                        </span>
                                        <Link to={`/dashboard/staff-management/staff-employee-information/${employee?.endservice_reward?.endedBy?.id}`} className="font-medium text-gray-800">    
                                             {employee?.endservice_reward?.endedBy?.first_name} {employee?.endservice_reward?.endedBy?.last_name}
                                        </Link>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">
                                            {isRTL ? "تاريخ الإنشاء" : "Created Date"}
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            {formatDate(employee?.endservice_reward?.created_at)}
                                        </span>
                                    </div>
                                    {/* <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-600">
                                            {isRTL ? "آخر تحديث" : "Last Updated"}
                                        </span>
                                        <span className="font-medium text-gray-800">
                                            {formatDate(employee?.endservice_reward?.updated_at)}
                                        </span>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TabEndService;
