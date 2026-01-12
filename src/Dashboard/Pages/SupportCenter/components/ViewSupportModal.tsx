import React from 'react';
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { useTranslation } from 'react-i18next';

interface SupportTicket {
    id: number;
    description: string;
    issue_type: string;
    priority: string;
    status: string;
    tenant_id: string;
    office_id: number;
    file: string | null;
    created_at: string;
    updated_at: string;
}

interface ViewSupportModalProps {
    isOpen: boolean;
    onClose: () => void;
    supportData: SupportTicket | null;
    isLoading?: boolean;
    error?: Error | null;
}

const ViewSupportModal: React.FC<ViewSupportModalProps> = ({ isOpen, onClose, supportData, isLoading = false, error = null }) => {
    const { t } = useTranslation("orders");
    if (!isOpen) return null;

    // Function to get file type icon
    const getFileIcon = (fileName: string) => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        
        switch (extension) {
            case 'pdf':
                return '/fileImages/pdfImage.svg';
            case 'doc':
            case 'docx':
                return '/fileImages/documentImage.svg';
            case 'xls':
            case 'xlsx':
                return '/fileImages/xlImage.svg';
            case 'png':
            case 'jpg':
            case 'jpeg':
                return '/fileImages/pngImage.svg';
            case 'txt':
                return '/fileImages/documentImage.svg';
            default:
                return '/fileImages/documentImage.svg'; // Default document icon
        }
    };

    // Show loading state
    if (isLoading) {
        return (
            <CustomModal
                isOpen={isOpen}
                handleOpen={onClose}
                titleModal={t("supportCenter.ticketDetails")}
            >
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">{t("supportCenter.modal.loadingTicket")}</span>
                </div>
            </CustomModal>
        );
    }

    // Show error state
    if (error) {
        return (
            <CustomModal
                isOpen={isOpen}
                handleOpen={onClose}
                titleModal={t("supportCenter.ticketDetails")}
            >
                <div className="text-center py-8">
                    <div className="text-red-600 mb-4">
                        <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{t("supportCenter.modal.errorLoading")}</h3>
                    <p className="text-gray-600 mb-4">{t("supportCenter.modal.errorMessage")}</p>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                    >
                        {t("supportCenter.modal.close")}
                    </button>
                </div>
            </CustomModal>
        );
    }

    // Show no data state
    if (!supportData) {
        return (
            <CustomModal
                isOpen={isOpen}
                handleOpen={onClose}
                titleModal={t("supportCenter.ticketDetails")}
            >
                <div className="text-center py-8">
                    <p className="text-gray-600">{t("supportCenter.modal.noData")}</p>
                </div>
            </CustomModal>
        );
    }

    const getIssueTypeLabel = (issueType: string) => {
        return t(`supportCenter.issueTypes.${issueType}`, { defaultValue: issueType });
    };

    const getPriorityLabel = (priority: string) => {
        return t(`supportCenter.priorities.${priority}`, { defaultValue: priority });
    };

    const getStatusLabel = (status: string) => {
        return t(`supportCenter.statuses.${status}`, { defaultValue: status });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-GB", {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <CustomModal
            isOpen={isOpen}
            handleOpen={onClose}
            titleModal={t("supportCenter.ticketDetails")}
        >
            <div className="space-y-6">
                {/* Issue Type and Priority Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("supportCenter.form.issueType")}
                        </label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                            {getIssueTypeLabel(supportData.issue_type)}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("supportCenter.form.priority")}
                        </label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                            {getPriorityLabel(supportData.priority)}
                        </div>
                    </div>
                </div>

                {/* Created On and Status Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("supportCenter.modal.createdOn")}
                        </label>
                        <div className="relative">
                            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 flex items-center justify-between">
                                <span>{formatDate(supportData.created_at)}</span>
                                <svg width="26" height="26" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_7_518)">
                                        <g clipPath="url(#clip1_7_518)">
                                            <path d="M3 7.52899C3 5.31985 4.79086 3.52899 7 3.52899H17C19.2091 3.52899 21 5.31985 21 7.52899V18.029C21 20.2381 19.2091 22.029 17 22.029H7C4.79086 22.029 3 20.2381 3 18.029V7.52899Z" stroke="#626262" />
                                            <path d="M3 9.02899H21" stroke="#626262" />
                                            <path d="M8 2.02899V5.02899" stroke="#626262" />
                                            <path d="M16 2.02899V5.02899" stroke="#626262" />
                                            <path d="M12 16.029C12.5523 16.029 13 15.5813 13 15.029C13 14.4767 12.5523 14.029 12 14.029C11.4477 14.029 11 14.4767 11 15.029C11 15.5813 11.4477 16.029 12 16.029Z" fill="#626262" />
                                            <path d="M16 16.029C16.5523 16.029 17 15.5813 17 15.029C17 14.4767 16.5523 14.029 16 14.029C15.4477 14.029 15 14.4767 15 15.029C15 15.5813 15.4477 16.029 16 16.029Z" fill="#626262" />
                                            <path d="M8 16.029C8.55228 16.029 9 15.5813 9 15.029C9 14.4767 8.55228 14.029 8 14.029C7.44772 14.029 7 14.4767 7 15.029C7 15.5813 7.44772 16.029 8 16.029Z" fill="#626262" />
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_7_518">
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.0289917)" />
                                        </clipPath>
                                        <clipPath id="clip1_7_518">
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.0289917)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {t("supportCenter.modal.status")}
                        </label>
                        <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                            {getStatusLabel(supportData.status)}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("supportCenter.form.description")}
                    </label>
                    <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 min-h-[100px]">
                        {supportData.description}
                    </div>
                </div>

                {/* Attached Files */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("supportCenter.modal.attachedFiles")}
                    </label>
                    <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                        {supportData.file ? (
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 flex items-center justify-center">
                                    <img 
                                        src={getFileIcon(supportData.file.split('/').pop() || '')} 
                                        alt="File type" 
                                        className="w-10 h-10"
                                    />
                                </div>
                                <div className="flex items-center space-x-2">
                                    
                                    <a
                                        href={`${supportData.file}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-800 text-sm underline"
                                    >
                                        {t("supportCenter.form.viewFile")}
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <span className="text-sm text-gray-500">{t("supportCenter.form.noFileAttached")}</span>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        {t("supportCenter.modal.close")}
                    </button>
                </div>
            </div>
        </CustomModal>
    );
};

export default ViewSupportModal;
