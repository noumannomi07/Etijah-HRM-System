import axiosInstance from "@/utils/axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const TabTwoContent = () => {
    const { t } = useTranslation("staffManagement");
    const { id } = useParams<{ id: string }>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileName, setFileName] = useState("");

    // return <>abdo {id}</>;
    const handleDownloadPdf = async () => {
        if (!fileName.trim()) return;
        
        try {
            const response = await axiosInstance.get(
                `employeesalary/${id}/payslip`,
                {
                    responseType: "blob",
                    headers: {
                        Accept: "application/pdf",
                    },
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `${fileName}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            setIsModalOpen(false);
            setFileName("");
        } catch (error) {
            console.error("PDF download failed:", error);
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-start p-6">
            <div className="w-full h-full bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-end mb-8">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-lg"
                    >
                        {t("downloadPdf")}
                    </button>
                </div>

                {/* Content area - you can add more content here */}
                <div className="w-full h-full">
                    {/* Add your table or other content here */}
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8">
                            <div className="flex flex-col items-end">
                                <h3 className="text-2xl font-semibold mb-6 text-right">اختر اسم الملف</h3>
                                <input
                                    type="text"
                                    value={fileName}
                                    onChange={(e) => setFileName(e.target.value)}
                                    placeholder="ادخل اسم الملف"
                                    className="w-full p-4 border border-gray-300 rounded-lg mb-6 text-right text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    dir="rtl"
                                />
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleDownloadPdf}
                                        disabled={!fileName.trim()}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-lg transition-all duration-200"
                                    >
                                        تحميل
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setFileName("");
                                        }}
                                        className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-lg transition-all duration-200"
                                    >
                                        إلغاء
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TabTwoContent;