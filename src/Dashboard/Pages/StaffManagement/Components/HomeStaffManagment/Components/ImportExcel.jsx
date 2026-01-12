import React, { useRef, useState } from "react";
import DownloadExcel from "@/assets/icons/download-excel";
import UploadExcel from "@/assets/icons/upload-excel";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import { toast } from "react-toastify";

const ActionCard = ({
  title,
  description,
  buttonText,
  icon,
  onClick,
  isFirst,
  statusMessage,
  isLoading
}) => (
  <div
    className={`flex-1 text-center px-2 sm:px-5 py-4 ${
      !isFirst ? "lg:border-r lg:border-gray-200" : ""
    }`}
  >
    <h2 className="title-top-main text-font-dark mb-4">{title}</h2>
    <p className="text text-font-gray mb-8 md:h-20 max-w-sm mx-auto">
      {description}
    </p>
    <button 
      onClick={onClick} 
      className="btn-main mx-auto"
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="inline-block animate-spin mr-2">⏳</span>
      ) : (
        icon
      )}
      <span>{isLoading ? "جاري التنزيل..." : buttonText}</span>
    </button>
    {statusMessage && (
      <p className="text-green-600 mt-4 text-sm">{statusMessage}</p>
    )}
  </div>
);

const ImportExcel = ({ onClose }) => {
  const fileInputRef = useRef(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const [uploadStats, setUploadStats] = useState(null);

  const handleDownloadClick = async () => {
    setIsDownloading(true);
    try {
      const response = await axiosInstance.get("/employee/template/download", {
        responseType: "blob",
        headers: {
          "Accept-Language": i18next.language,
        },
      });

      // إنشاء رابط تنزيل للملف
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "employee_template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success("تم تنزيل ملف الإكسل بنجاح");
    } catch (error) {
      console.error("خطأ في تنزيل ملف الإكسل:", error);
      toast.error("حدث خطأ أثناء تنزيل ملف الإكسل");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    setUploadStatus("جاري رفع الملف...");
    setErrors([]);
    setShowErrors(false);
    setUploadStats(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axiosInstance.post("/employee/template/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept-Language": i18next.language,
        },
      });

      // التحقق من الريسبونس
      if (response.data.success) {
        setUploadStatus("تم رفع الملف بنجاح!");
        toast.success("تم رفع ملف الإكسل بنجاح");
        
        // إغلاق المودل وتحديث البيانات بعد نجاح الرفع
        setTimeout(() => {
          if (onClose) {
            onClose();
          }
        }, 1500); // انتظار 1.5 ثانية لعرض رسالة النجاح
      } else {
        // عرض الأخطاء إذا وجدت
        if (response.data.errors && response.data.errors.length > 0) {
          setErrors(response.data.errors);
          setUploadStats({
            total_rows: response.data.total_rows,
            successful_count: response.data.successful_count,
            failed_count: response.data.failed_count
          });
          setShowErrors(true);
          setUploadStatus("حدثت أخطاء في الملف");
        } else {
          setUploadStatus("تم رفع الملف بنجاح!");
          toast.success("تم رفع ملف الإكسل بنجاح");
        }
      }
      
      // إعادة تعيين input الملف
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
    } catch (error) {
      console.error("خطأ في رفع ملف الإكسل:", error);
      setUploadStatus("حدث خطأ أثناء رفع الملف");
      toast.error("حدث خطأ أثناء رفع ملف الإكسل");
    }
  };

  const handleFileSelected = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadStatus(`تم اختيار الملف: ${file.name}`);
      // رفع الملف مباشرة بعد اختياره
      handleFileUpload(file);
    }
  };

  return (
    <div className="download-upload-excel">
      <div className="w-full">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelected}
          style={{ display: "none" }}
          accept=".xlsx, .xls, .csv"
        />

        <div className="all-items-download flex flex-col md:flex-row">
          <ActionCard
            isFirst={true}
            title="الخطوة 1. تنزيل نموذج الإكسل"
            description="إما ملء المعلومات يدويًا أو نسخها ولصقها من ملف إكسل الحالي."
            buttonText="تنزيل الإكسل"
            icon={<DownloadExcel />}
            onClick={handleDownloadClick}
            isLoading={isDownloading}
          />

          <ActionCard
            isFirst={false}
            title="الخطوة 2. رفع نموذج إكسل"
            description="هل تم العمل على النموذج؟ حان الوقت لتحميله."
            buttonText="رفع ملف الإكسل"
            icon={<UploadExcel />}
            onClick={handleUploadClick}
            statusMessage={uploadStatus}
          />
        </div>

        {/* مودل عرض الأخطاء */}
        {showErrors && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-red-800">أخطاء في الملف</h3>
              <button 
                onClick={() => setShowErrors(false)}
                className="text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>
            
            {/* إحصائيات الرفع */}
            {uploadStats && (
              <div className="mb-4 p-3 bg-white rounded border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-800">{uploadStats.total_rows}</div>
                    <div className="text-sm text-gray-600">إجمالي الصفوف</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{uploadStats.successful_count}</div>
                    <div className="text-sm text-gray-600">نجح</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-600">{uploadStats.failed_count}</div>
                    <div className="text-sm text-gray-600">فشل</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* قائمة الأخطاء */}
            <div className="max-h-60 overflow-y-auto">
              {errors.map((error, index) => (
                <div key={index} className="mb-2 p-3 bg-white rounded border-l-4 border-red-500">
                  <div className="flex items-start">
                    <span className="text-red-600 font-semibold ml-2">الصف {error.row}:</span>
                    <span className="text-red-700">{error.error}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportExcel;
