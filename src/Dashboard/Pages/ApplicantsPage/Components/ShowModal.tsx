import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import React from "react";

interface ShowModalProps {
    isOpen: boolean;
    toggleModalShow: () => void;
    onUpdateStatus: (status: string) => void;
    isUpdating: boolean;
    selectedItemStatus: string;
}

const ShowModal: React.FC<ShowModalProps> = ({
    isOpen,
    toggleModalShow,
    onUpdateStatus,
    isUpdating,
    selectedItemStatus,
}) => {
    return (
        <CustomModal
            newClassModal={`modal-delete small-modal`}
            isOpen={isOpen}
            handleOpen={toggleModalShow}
            titleModal={"تعديل الحالة"}
            classBodyContent=""
            aria-labelledby="show-modal-title"
            aria-describedby="show-modal-description"
        >
            <div className="content-delete-modal p-6">
                <h2
                    id="show-modal-title"
                    className="title text-font-dark text-lg sm:text-xl font-semibold mb-2"
                >
                    تعديل الحالة
                </h2>
                <p
                    id="show-modal-description"
                    className="text text-font-gray text-base mb-6 leading-relaxed"
                >
                    هل أنت متأكد من رغبتك في تعديل الحالة ؟
                </p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <button
                        disabled={isUpdating || selectedItemStatus === "accepted"}
                        onClick={() => onUpdateStatus("accepted")}
                        className="flex flex-col items-center justify-center p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-green-100"
                    >
                        <div className="w-6 h-6 mb-2 rounded-full bg-green-200 flex items-center justify-center">
                            <span className="text-green-700 font-bold">✓</span>
                        </div>
                        <span className="text-sm font-medium">مقبول</span>
                    </button>
                    <button
                        disabled={isUpdating || selectedItemStatus === "rejected"}
                        onClick={() => onUpdateStatus("rejected")}
                        className="flex flex-col items-center justify-center p-4 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-red-100"
                    >
                        <div className="w-6 h-6 mb-2 rounded-full bg-red-200 flex items-center justify-center">
                            <span className="text-red-700 font-bold">✕</span>
                        </div>
                        <span className="text-sm font-medium">مرفوض</span>
                    </button>
                    <button
                        disabled={isUpdating || selectedItemStatus === "pending"}
                        onClick={() => onUpdateStatus("pending")}
                        className="flex flex-col items-center justify-center p-4 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-yellow-100"
                    >
                        <div className="w-6 h-6 mb-2 rounded-full bg-yellow-200 flex items-center justify-center">
                            <span className="text-yellow-700 font-bold">⏳</span>
                        </div>
                        <span className="text-sm font-medium">قيد المعاينة</span>
                    </button>
                    <button
                        disabled={isUpdating || selectedItemStatus === "on_hold"}
                        onClick={() => onUpdateStatus("on_hold")}
                        className="flex flex-col items-center justify-center p-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-100"
                    >
                        <div className="w-6 h-6 mb-2 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-700 font-bold">⏸</span>
                        </div>
                        <span className="text-sm font-medium">إحتياط</span>
                    </button>
                </div>

                <div className="flex items-center justify-end gap-3 w-full pt-4 border-t border-gray-100">
                    <button
                        onClick={toggleModalShow}
                        className="px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isUpdating}
                        aria-label="Cancel deletion"
                    >
                        لا , رجوع
                    </button>
                </div>
            </div>
        </CustomModal>
    );
};

export default React.memo(ShowModal);
