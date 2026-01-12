import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';


interface FormData {
    issueType: string;
    priority: string;
    description: string;
    file: File | null;
}

interface FormComponentProps {
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const FormComponent: React.FC<FormComponentProps> = ({ onSubmit, onCancel, isLoading = false }) => {
    const { t } = useTranslation("orders");
    const { handleSubmit, formState: { errors }, register, setValue } = useForm<FormData>({
        defaultValues: {
            issueType: '',
            priority: '',
            description: '',
            file: null
        }
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    const issueTypeOptions = [
        { value: 'payroll_salary', label: t("supportCenter.issueTypes.payroll_salary") },
        { value: 'leave_attendance', label: t("supportCenter.issueTypes.leave_attendance") },
        { value: 'performance_appraisals', label: t("supportCenter.issueTypes.performance_appraisals") },
        { value: 'recruitment_onboarding', label: t("supportCenter.issueTypes.recruitment_onboarding") },
        { value: 'training_development', label: t("supportCenter.issueTypes.training_development") },
        { value: 'expense_claims', label: t("supportCenter.issueTypes.expense_claims") },
        { value: 'policy_compliance', label: t("supportCenter.issueTypes.policy_compliance") },
        { value: 'employee_data', label: t("supportCenter.issueTypes.employee_data") },
        { value: 'other_general', label: t("supportCenter.issueTypes.other_general") }
    ];

    const priorityOptions = [
        { value: 'high', label: t("supportCenter.priorities.high") },
        { value: 'medium', label: t("supportCenter.priorities.medium") },
        { value: 'low', label: t("supportCenter.priorities.low") }
    ];

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        
        if (file) {
            // Check file type
            const allowedTypes = [
                'image/jpeg',
                'image/jpg', 
                'image/png',
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain'
            ];
            
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'txt'];
            
            if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension || '')) {
                toast.error(t("supportCenter.messages.invalidFileType"));
                event.target.value = ''; // Clear the input
                return;
            }
        }
        
        setSelectedFile(file);
        setValue('file', file);
    };

    const removeFile = () => {
        setSelectedFile(null);
        setValue('file', null);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
        
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0]; // Only take the first file
            
            // Check file type for drag and drop
            const allowedTypes = [
                'image/jpeg',
                'image/jpg', 
                'image/png',
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'text/plain'
            ];
            
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'txt'];
            
            if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension || '')) {
                toast.error(t("supportCenter.messages.invalidFileType"));
                return;
            }
            
            setSelectedFile(file);
            setValue('file', file);
        }
    };

    const handleFormSubmit = (data: FormData) => {
        if (!data.issueType) {
            toast.error(t("supportCenter.messages.selectIssueType"));
            return;
        }
        if (!data.priority) {
            toast.error(t("supportCenter.messages.selectPriority"));
            return;
        }
        if (!data.description.trim()) {
            toast.error(t("supportCenter.messages.enterDescription"));
            return;
        }

        onSubmit(data);
    };

    return (
        <div className="bg-white rounded-lg">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="p-1 space-y-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Issue Type Dropdown */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-1">
                            {t("supportCenter.form.issueType")}
                        </label>
                        <div className="relative">
                            <select
                                {...register('issueType', {
                                    required: 'Issue type is required',
                                    validate: (value) => value !== '' || 'Please select an issue type'
                                })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D6CB0] focus:border-[#4D6CB0] appearance-none bg-white text-gray-700"
                            >
                                <option value="">{t("supportCenter.form.selectPlaceholder")}</option>
                                {issueTypeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                       
                        </div>
                        {errors.issueType && (
                            <p className="mt-2 text-sm text-red-600">{errors.issueType.message}</p>
                        )}
                    </div>

                    {/* Priority Dropdown */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-1">
                            {t("supportCenter.form.priority")}
                        </label>
                        <div className="relative">
                            <select
                                {...register('priority', {
                                    required: 'Priority is required',
                                    validate: (value) => value !== '' || 'Please select a priority'
                                })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D6CB0] focus:border-[#4D6CB0] appearance-none bg-white text-gray-700"
                            >
                                <option value="">{t("supportCenter.form.selectPlaceholder")}</option>
                                {priorityOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {/* <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div> */}
                        </div>
                        {errors.priority && (
                            <p className="mt-2 text-sm text-red-600">{errors.priority.message}</p>
                        )}
                    </div>
                </div>

                {/* Description Text Area */}
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1 mt-3">
                        {t("supportCenter.form.description")}
                    </label>
                    <textarea
                        {...register('description', {
                            required: 'Description is required',
                            minLength: {
                                value: 10,
                                message: 'Description must be at least 10 characters'
                            }
                        })}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D6CB0] focus:border-[#4D6CB0] resize-none text-gray-700"
                        placeholder={t("supportCenter.form.descriptionPlaceholder")}
                    />
                    {errors.description && (
                        <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
                    )}
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1 mt-3">
                        {t("supportCenter.form.attachFile")}
                    </label>
                    
                    {/* File Upload Area - Only show when no file is selected */}
                    {!selectedFile && (
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors relative"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                        >
                            <div className="flex flex-col items-center">
                                <svg width="34" height="33" viewBox="0 0 34 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25 0.528992H9C4.58172 0.528992 1 4.11071 1 8.52899V24.529C1 28.9473 4.58172 32.529 9 32.529H25C29.4183 32.529 33 28.9473 33 24.529V8.52899C33 4.11071 29.4183 0.528992 25 0.528992Z" fill="#4C6CB2" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.4697 9.99866C12.1768 10.2916 12.1768 10.7664 12.4697 11.0593C12.7626 11.3522 13.2374 11.3522 13.5303 11.0593L16.25 8.33966V20.529C16.25 20.9432 16.5858 21.279 17 21.279C17.4142 21.279 17.75 20.9432 17.75 20.529V8.33964L20.4697 11.0593C20.7626 11.3522 21.2374 11.3522 21.5303 11.0593C21.8232 10.7664 21.8232 10.2916 21.5303 9.99866L17.5303 5.99866C17.3896 5.85801 17.1989 5.77899 17 5.77899C16.801 5.77899 16.6103 5.85801 16.4696 5.99866L12.4697 9.99866ZM11.3398 13.9981C11.5989 13.6749 11.5469 13.2029 11.2237 12.9438C10.9005 12.6848 10.4285 12.7367 10.1694 13.0599C8.96871 14.5578 8.25 16.4605 8.25 18.529C8.25 23.3615 12.1675 27.279 17 27.279C21.8325 27.279 25.75 23.3615 25.75 18.529C25.75 16.4605 25.0313 14.5578 23.8306 13.0599C23.5715 12.7367 23.0995 12.6848 22.7763 12.9438C22.4531 13.2029 22.4011 13.6749 22.6602 13.9981C23.6553 15.2395 24.25 16.8138 24.25 18.529C24.25 22.5331 21.0041 25.779 17 25.779C12.9959 25.779 9.75 22.5331 9.75 18.529C9.75 16.8138 10.3447 15.2395 11.3398 13.9981Z" fill="white" />
                                </svg>

                                <p className="text-gray-600 mb-2">
                                    {t("supportCenter.form.dragDropText")} <span className="text-[#4D6CB0] cursor-pointer hover:underline">{t("supportCenter.form.selectText")}</span>
                                </p>
                                <p className="text-sm text-gray-500">
                                    {t("supportCenter.form.availableFormats")}
                                </p>
                            </div>
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.txt"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                    )}

                    {/* Selected File Display - Only show when file is selected */}
                    {selectedFile && (
                        <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-3">{t("supportCenter.form.selectedFile")}</h4>
                            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 border">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 flex items-center justify-center">
                                        <img 
                                            src={getFileIcon(selectedFile.name)} 
                                            alt="File type" 
                                            className="w-10 h-10"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                                        <p className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={removeFile}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 pt-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
{t("supportCenter.form.cancel")}
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-6 py-3 text-white rounded-lg font-medium transition-colors flex items-center justify-center ${
                            isLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-[#4D6CB0] hover:bg-[#3A5A8A]'
                        }`}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {t("supportCenter.form.submitting")}
                            </>
                        ) : (
                            t("supportCenter.form.submit")
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormComponent;
