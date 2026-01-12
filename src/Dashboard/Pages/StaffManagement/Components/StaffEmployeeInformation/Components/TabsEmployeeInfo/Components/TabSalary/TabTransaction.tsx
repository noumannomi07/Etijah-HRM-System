import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import React from "react";
import { useTranslation } from "react-i18next";
import "./TabSalary.css";
import {
  useDownloadPayslip,
  useEmployeeTransaction
} from "@/hooks/employee/manage/salary/useEmployeeTransaction";
import { Loading } from "@/components";
import { getMonthName } from "@/utils/financial";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import DownloadIconColor from "@assets/Icons/DownloadIconColor.svg";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FullRoutes } from "@/Routes/routes";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const TabTransaction = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("staffManagement");
  const { data, isPending } = useEmployeeTransaction();
  const navigate = useNavigate();

  if (isPending) return <Loading />;

  const theadTrContent = [
    t("salary.transaction.month"),
    t("salary.transaction.year"),
    t("salary.transaction.basicSalary"),
    t("salary.transaction.extra"),
    t("salary.transaction.cut"),
    t("salary.transaction.bonus"),
    t("salary.transaction.netWage"),
    t("salary.transaction.total"),
    t("salary.transaction.downloadPaymentSlip")
  ];

  // const downloadPayslip = async (item: any) => {
  //     try {
  //         const data = {
  //             month: item.month,
  //             year: item.year,
  //             employee_id: id,
  //         };

  //         const { data: response } = await axiosInstance.post('/payroll-pdf', data);

  //         if (response?.file) {
  //             window.open(response.file, '_blank');
  //         }
  //     } catch (error) {

  //         toast.error(t(error.response.data.message));

  //         console.error('Error downloading payslip:', error);
  //     }
  // }

  const downloadPayslip = async (item: any) => {
    try {
      const element = document.createElement("div");
      element.style.position = "fixed";
      element.style.left = "-9999px";
      element.style.top = "0";
      element.style.width = "800px";
      element.style.height = "auto";
      element.style.overflow = "hidden";
      element.style.zIndex = "-1";
      element.style.pointerEvents = "none";
      element.style.visibility = "hidden";

      element.innerHTML = `
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>قسيمة الراتب</title>
                <style>
                  body {
                    direction: rtl;
                    font-family: Arial, Tahoma, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f4f4f4;
                    font-size: 13px;
                    color: #333;
                  }

                  .payslip-container {
                    width: 780px;
                    margin: 20px auto;
                    padding: 25px;
                    background-color: #fff;
                    border: 1px solid #ccc;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    position: relative;
                  }

                  .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #eee;
                  }

                  .logo-placeholder {
                    font-size: 18px;
                    font-weight: bold;
                    color: white;
                    background-color: #005f73;
                    padding: 6px 15px;
                    display: inline-block;
                    min-height: 30px;
                    line-height: 30px;
                  }

                  .creation-date {
                    font-size: 0.85em;
                    color: #555;
                    padding-top: 5px;
                  }

                  .info-section {
                    display: grid;
                    grid-template-columns: 0.9fr 0.9fr 1.2fr;
                    gap: 15px;
                    margin-bottom: 20px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #eee;
                    align-items: start;
                  }

                  .info-section:last-of-type {
                    border-bottom: 1px solid #aaa;
                  }

                  .info-item {
                    display: flex;
                    flex-direction: column;
                  }

                  .info-item .label {
                    font-size: 1.2em 18.72px;
                    color: #555;
                    margin-bottom: 4px;
                    display: flex;
                    align-items: center;
                    font-weight: 600;
                  }

                  .info-item .value {
                    font-size: 1.1em;
                    margin-bottom: 8px;
                    font-weight: 600;
                    color: #535657;
                  }

                  .info-item .value:last-child {
                    margin-bottom: 0;
                    margin-top: 6px;
                  }

                  .icon {
                    display: inline-block;
                    width: 9px;
                    height: 9px;
                    margin-left: 7px;
                    border-radius: 2px;
                  }

                  .icon.purple {
                    background-color: #4c6cb2;
                  }

                  .icon.blue {
                    background-color: #4c6cb2;
                  }

                  .info-item.company-details-column,
                  .info-item.date-column {
                    text-align: right;
                  }

                  .info-item.company-details-column .main-title {
                    font-size: 2.5em;
                    font-weight: bold;
                    color: #4c6cb2;
                    font-weight: 600;
                    margin-bottom: 10px;
                  }

                  .info-item.company-details-column .sub-title {
                    font-size: 1.2em;
                    font-weight: 600;
                    color: #444;
                  }

                  .info-item.date-column .label,
                  .info-item.date-column .value {
                    text-align: right;
                  }

                  .info-item.date-column .label {
                    justify-content: flex-start;
                  }

                  .info-item.date-column .label .icon {
                    margin-left: 9px;
                  }

                  .details-header {
                    display: flex;
                    justify-content: space-between;
                    padding: 8px 2px;
                    margin-bottom: 8px;
                    font-weight: bold;
                    color: #444;
                    border-bottom: 1px solid #ccc;
                    font-size: 1.2em;
                    font-weight: 600;
                  }

                  .currency {
                    text-align: left;
                  }

                  .details-label {
                    text-align: right;
                  }

                  .payslip-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 25px;
                    font-size: 0.95em;
                  }

                  .payslip-table th,
                  .payslip-table td {
                    padding: 7px 5px;
                    text-align: right;
                    border-bottom: 1px solid #f0f0f0;
                    vertical-align: middle;
                    font-size: 13px;
                    font-weight: 600;
                  }

                  .payslip-table td:first-child {
                    text-align: left;
                    width: 130px;
                    font-family: "Courier New", Courier, monospace;
                  }

                  .payslip-table .section-title td {
                    font-weight: bold;
                    color: #4c6cb2;
                    background-color: #4c6cb226;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    font-size: 1.2em;
                    font-weight: 600;
                    text-align: right !important;
                    border-radius: 5px;
                  }

                  .payslip-table .subtotal td {
                    font-weight: bold;
                    border-top: 1px solid #ccc;
                    color: #333;
                  }

                  .payslip-table .net-salary-value {
                    font-weight: bold;
                    font-size: 1.15em;
                    font-weight: 600;
                    color: #4c6cb2;
                    border: 1px solid #4c6cb226;
                    background-color: #4c6cb226;
                    padding: 9px !important;
                    text-align: center !important;
                  }

                  .payslip-table .net-salary-label {
                    font-weight: bold;
                    font-size: 1.1em;
                    font-weight: 600;
                    border: 1px solid #ccc;
                    padding: 9px !important;
                    text-align: center !important;
                  }

                  .signature-section {
                    margin-top: 35px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #eee;
                  }

                  .signature-section .title {
                    font-weight: bold;
                    margin-bottom: 30px;
                    font-size: 0.95em;
                    text-align: right;
                  }

                  .signature-fields {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    text-align: center;
                    color: #555;
                    font-size: 1.2em;
                    font-weight: 700;
                  }

                  .footer-note {
                    text-align: center;
                    font-size: 1.2em;
                    color: #777;
                    margin-top: 20px;
                    padding-top: 10px;
                    font-weight: 600;
                  }

                  .watermark {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 6em;
                    color: rgba(0, 123, 255, 0.08);
                    font-weight: bold;
                    z-index: 0;
                    pointer-events: none;
                    text-align: center;
                    line-height: 1;
                  }

                  .watermark .arabic-logo {
                    display: block;
                  }

                  .signatures-grid .signature-placeholder {
                    font-family: "Brush Script MT", "cursive";
                    font-size: 1.2em;
                    color: #337ab7;
                  }
                </style>
              </head>

              <body>
                <div class="payslip-container">
                  <div class="watermark">
                    <span class="arabic-logo">اتجاه</span>
                    ETIJAH
                  </div>
                  <div class="header">
                    <div class="logo">
                      <img src="/Logo.svg" alt="logo" style="width: 100px; height: auto" />
                    </div>
                    <div class="creation-date">تم إنشاؤه في: ${new Date().toLocaleDateString()}</div>
                  </div>

                  <div class="info-section top-info-section">
                    <div class="info-item company-details-column">
                      <span class="main-title">اتجاه</span>
                      <span class="sub-title">قسيمة الراتب</span>
                    </div>
                    <div class="info-item">
                      <span class="label"><span class="icon purple"></span> اسم الموظف</span>
                      <span class="value">${
                        item.employee?.name || "غير محدد"
                      }</span>
                      <span class="label"><span class="icon purple"></span> المسمى الوظيفي</span>
                      <span class="value">${
                        item.employee?.jobtitle?.title || "غير محدد"
                      }</span>
                    </div>

                    <div class="info-item">
                      <span class="label"><span class="icon purple"></span> هوية الموظف</span>
                      <span class="value">${
                        item.employee_id || id || "غير محدد"
                      }</span>
                      <span class="label"><span class="icon purple"></span> عن الفترة</span>
                      <span class="value">${t(
                        `salary.months.${getMonthName(Number(item.month) ?? 0)}`
                      )} ${item.year}</span>
                    </div>
                  </div>

                  <div class="info-section bottom-info-section">
                    ${
                      item.payment_method
                        ? `
                    <div class="info-item">
                      <span class="label"><span class="icon blue"></span> طريقة الدفع</span>
                      <span class="value">${item.payment_method}</span>
                    </div>
                    `
                        : ""
                    }
                    
                    ${
                      item.job_type
                        ? `
                    <div class="info-item">
                      <span class="label"><span class="icon blue"></span> نوع الوظيفة</span>
                      <span class="value">${item.job_type}</span>
                    </div>
                    `
                        : ""
                    }
                    
                    ${
                      item.hire_date
                        ? `
                    <div class="info-item date-column">
                      <span class="label"><span class="icon blue"></span> تاريخ التعيين</span>
                      <span class="value">${item.hire_date}</span>
                    </div>
                    `
                        : ""
                    }
                  </div>

                  <div class="details-header">
                    <span class="details-label">التفاصيل</span>
                    <span class="currency">العملة SAR</span>
                  </div>

                  <table class="payslip-table" dir="ltr">
                    <tbody>
                      ${
                        item.salary || item.housing || item.transportation
                          ? `
                      <tr class="section-title">
                        <td colspan="2">الراتب الأساسي والبدلات</td>
                      </tr>
                      ${
                        item.salary
                          ? `
                      <tr>
                        <td>${item.salary}</td>
                        <td>الراتب الأساسي</td>
                      </tr>
                      `
                          : ""
                      }
                      ${
                        item.housing
                          ? `
                      <tr>
                        <td>${item.housing}</td>
                        <td>Housing</td>
                      </tr>
                      `
                          : ""
                      }
                      ${
                        item.transportation
                          ? `
                      <tr>
                        <td>${item.transportation}</td>
                        <td>Transportation</td>
                      </tr>
                      `
                          : ""
                      }
                      ${
                        item.total
                          ? `
                      <tr class="subtotal">
                        <td>${item.total}</td>
                        <td>الأجر الإجمالي</td>
                      </tr>
                      `
                          : ""
                      }
                      `
                          : ""
                      }

                      ${
                        item.extra || item.bonus
                          ? `
                      <tr class="section-title">
                        <td colspan="2">التعديلات</td>
                      </tr>
                      ${
                        item.extra
                          ? `
                      <tr>
                        <td>${item.extra}</td>
                        <td>الاضافات</td>
                      </tr>
                      `
                          : ""
                      }
                      ${
                        item.bonus
                          ? `
                      <tr>
                        <td>${item.bonus}</td>
                        <td>المكافآت</td>
                      </tr>
                      `
                          : ""
                      }
                      `
                          : ""
                      }

                      ${
                        item.cut || item.other_deductions
                          ? `
                      <tr class="section-title">
                        <td colspan="2">الخصومات</td>
                      </tr>
                      ${
                        item.cut
                          ? `
                      <tr>
                        <td>${item.cut}</td>
                        <td>الخصومات</td>
                      </tr>
                      `
                          : ""
                      }
                      ${
                        item.other_deductions
                          ? `
                      <tr>
                        <td>${item.other_deductions}</td>
                        <td>خصومات أخرى</td>
                      </tr>
                      `
                          : ""
                      }
                      `
                          : ""
                      }

                      ${
                        item.arrears
                          ? `
                      <tr class="section-title">
                        <td colspan="2">متأخرات</td>
                      </tr>
                      <tr>
                        <td>${item.arrears}</td>
                        <td></td>
                      </tr>
                      `
                          : ""
                      }

                      <tr>
                        <td colspan="2" style="padding: 5px 0; border-bottom: none"></td>
                      </tr>

                      ${
                        item.net_salary
                          ? `
                      <tr>
                        <td class="net-salary-value">${item.net_salary}</td>
                        <td class="net-salary-label">الأجر الصافي</td>
                      </tr>
                      `
                          : ""
                      }
                    </tbody>
                  </table>

                  <div class="signature-section">
                    <div class="title">موقعة من قبل</div>
                    <div class="signature-fields">
                      <span>الاسم</span>
                      <span>العنوان</span>
                      <span>التاريخ</span>
                    </div>
                  </div>

                  <div class="footer-note">
                    تم إصدار هذا الإشعار إلكترونياً ولا يتطلب التوقيع عليه. جميع المعلومات
                    الواردة سرية ومخصصة لاستخدام الشخص المحدد.
                  </div>
                </div>
              </body>
            </html>
        `;

      // Store current body direction to restore later
      const originalDir = document.body.getAttribute('dir');
      const originalLang = document.body.getAttribute('lang');
      
      document.body.appendChild(element);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });

      // Remove element immediately after canvas creation
      document.body.removeChild(element);
      
      // Restore original direction if it was changed
      if (originalDir) {
        document.body.setAttribute('dir', originalDir);
      }
      if (originalLang) {
        document.body.setAttribute('lang', originalLang);
      }

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(
        `payslip_${item.employee_id || id}_${item.month}_${item.year}.pdf`
      );
    } catch (error) {
      toast.error(
        t(error.response?.data?.message || "حدث خطأ أثناء إنشاء قسيمة الراتب")
      );
      console.error("Error generating payslip:", error);
    }
  };

  const tbodyContent = (data ?? []).map((item) => [
    t(`salary.months.${getMonthName(Number(item.month) ?? 0)}`),
    item.year,
    item.salary,
    <div className="text-greenColor01" key={item.id}>
      {item.extra}
    </div>,
    <div className="text-redColor01" key={item.id}>
      {item.cut}
    </div>,
    <div className="text-greenColor01" key={item.id}>
      {item.bonus}
    </div>,
    item.net_salary,
    item.total,
    <div
      className="download-table item-center-flex cursor-pointer text-primaryColor"
      key={item.id}
      onClick={() => {
        downloadPayslip(item);

        if (item.file) {
          window.open(item.file, "_blank");
        }
      }}
    >
      {t("salary.transaction.downloadPaymentSlip")}{" "}
      <img src={DownloadIconColor} alt="download" />
    </div>
  ]);

  return (
    <div className="border-width-content">
      <h2 className="text-xl font-semibold mb-4">
        {t("salary.transaction.title")}
      </h2>
      <HeaderTableInfo
        titleHeader={t("employeeTabs.salary")}
        isButtonAll={false}
        routePageInfo=""
        textLink=""
        buttonAddNewOrder={false}
        functionButtonAddNewOrder={() => {}}
        newButtonWithoutText={false}
        functionButtonNewButton={() => {}}
        textButton=""
        newComponentsHere={
          <div className="all-buttons-header hidden item-center-flex">
            <button
              type="button"
              onClick={() => {
                navigate(
                  FullRoutes.Dashboard.StaffManagement.AddSalaryConfigurationWithId(
                    { id: id! }
                  )
                );
              }}
              className="btn-main height--50"
            >
              {t("salary.addSalaryConfiguration")}{" "}
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        }
      />
      <DataTableTwo
        theadContent={theadTrContent}
        tbodyContent={tbodyContent}
        withCheckboxes={false}
        isShowContentFilterInfo={true}
        isShowModalButtonFilter={false}
        functionButtonFilter={() => {}}
        isTrueButtonsModalContentRight={false}
        functionButtonModalOne={() => {}}
        textContentButtonOne=""
        isTrueButtonTwoModalContent={false}
        newClassButtonTwo=""
        functionModalButtonTwo={() => {}}
        textContetButtonTwo=""
        showDateFilter={false}
        onChangeDateFilter={() => {}}
      />
    </div>
  );
};

export default TabTransaction;
