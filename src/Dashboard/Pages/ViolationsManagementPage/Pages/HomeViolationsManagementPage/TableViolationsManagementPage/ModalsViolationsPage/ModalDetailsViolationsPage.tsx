import React from "react";
import male from "@assets/images/homeimages/users/male.png";
import DetailsInfoDiv from "@/Dashboard/Pages/Orders/Components/ModalsOrder/ModalVacationDetails/DetailsInfoDiv";
import NotDataFound from "@/Dashboard/Shared/NotDataFound/NotDataFound";
import DownloadIconWhite from "@assets/Icons/DownloadIconWhite.svg";
import ModalButtonsEditTrash from "@/Dashboard/Shared/ModalButtonsEditTrash/ModalButtonsEditTrash";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import i18next from "i18next";
import theDateObj from "@/Dashboard/DateMonthDays";
import { getViolationText } from "@/utils/financial";
import { Violation } from "@/types/Financial";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface ModalDetailsViolationsPageProps {
    openModalDetails: boolean;
    hiddenOpenModalDetails: () => void;
    selectedDocument: Violation | null;
    handleButtonDelete: () => void;
    buttonEditPageRoute: string;
}

const ModalDetailsViolationsPage: React.FC<ModalDetailsViolationsPageProps> = ({
    openModalDetails,
    hiddenOpenModalDetails,
    selectedDocument,
    handleButtonDelete,
    buttonEditPageRoute
}) => {
    const lang = i18next.language;

    const detailsArray: { title: string; text?: string; className?: string }[] = [
        {
            title: "نوع المخالفة",
            text: selectedDocument?.violation_rule?.title || "غير متوفر"
        },
        {
            title: "الجزاء",
            text: selectedDocument ? getViolationText(selectedDocument) : "غير متوفر"
        },
        {
            title: "مرات التكرار",
            text: selectedDocument?.value || "غير متوفر"
        },
        {
            title: "تاريخ المخالفة",
            text:
                selectedDocument?.created_at &&
                (lang === "ar"
                    ? theDateObj.formatDataFunctionAR(selectedDocument?.created_at)
                    : theDateObj.formatDataFunctionEN(selectedDocument?.created_at))
        }
    ];

    const generateViolationPDF = async () => {
        if (!selectedDocument) return;

        try {
            const element = document.createElement("div");
            element.style.position = "absolute";
            element.style.left = "-9999px";
            element.style.width = "800px";

            element.innerHTML = `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>إشعار خصم - Deduction Notice</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        background-color: #f4f4f4;
        direction: ltr;
      }

      .deduction-notice {
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 30px;
        max-width: 800px;
        margin: 20px auto;
        position: relative;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 1px solid #eee;
        padding-bottom: 15px;
        margin-bottom: 20px;
      }

      .contact-info {
        font-size: 0.9em;
        font-weight: 500;
        color: #5a5d61;
        text-align: left;
      }

      .logo {
        text-align: right;
      }

      .title {
        text-align: center;
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 25px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }

      .title span[lang="ar"] {
        margin-left: 10px;
      }

      .details-grid,
      .deduction-info-grid,
      .signatures-grid {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr;
        gap: 10px 20px;
        margin-bottom: 20px;
        font-size: 0.95em;
        font-weight: 600;
      }

      .details-grid div:nth-child(3n + 1),
      .deduction-info-grid div:nth-child(3n + 1),
      .signatures-grid div:nth-child(3n + 1) {
        text-align: left;
        font-weight: normal;
        color: #727781;
        font-weight: 600;
      }

      .details-grid div:nth-child(3n + 2),
      .deduction-info-grid div:nth-child(3n + 2),
      .signatures-grid div:nth-child(3n + 2) {
        text-align: center;
        font-weight: bold;
        color: #000;
      }

      .details-grid div:nth-child(3n),
      .deduction-info-grid div:nth-child(3n),
      .signatures-grid div:nth-child(3n) {
        text-align: right;
        font-weight: normal;
        color: #727781;
        direction: rtl;
        font-weight: 600;
      }

      .violation-reason {
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
      }

      .violation-reason p {
        margin: 5px 0;
      }

      .violation-reason .english-text {
        color: #555;
        text-align: center;
        line-height: 1.8;
        font-weight: 600;
      }
      .violation-reason .arabic-text {
        color: #fe4d4f;
        font-size: 17px;
        text-align: center;
        font-weight: 600;
        direction: rtl;
      }
      .text-red-color {
        color: #fe4d4f !important;
      }

      .consequence-statement {
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
      }

      .consequence-statement p {
        margin: 5px 0;
      }

      .consequence-statement .arabic-text {
        text-align: center;
        direction: rtl;
        font-size: 17px;
        color: #333;
        font-weight: 600;
        line-height: 1.8;
      }

      .consequence-statement .english-text {
        text-align: center;
        color: #555;
        font-size: 17px !important;
        font-size: 0.9em;
        font-weight: 600;
        line-height: 1.8;
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

      .signatures-grid .date-value {
        font-weight: bold;
      }

      @media (max-width: 768px) {
        .details-grid,
        .deduction-info-grid,
        .signatures-grid {
          grid-template-columns: 1fr;
        }

        .details-grid div,
        .deduction-info-grid div,
        .signatures-grid div {
          text-align: left !important;
          direction: ltr !important;
        }

        .details-grid div:nth-child(3n + 2),
        .deduction-info-grid div:nth-child(3n + 2) {
          margin-bottom: 0;
        }
        .signatures-grid div:nth-child(6n + 2),
        .signatures-grid div:nth-child(6n + 5) {
          margin-bottom: 10px;
        }

        .watermark {
          font-size: 4em;
        }
      }
    </style>
  </head>
          <body>
            <div class="deduction-notice">
              <div class="watermark">
                <span class="arabic-logo">اتجاه</span>
                ETIJAH
              </div>

              <div class="header">
                <div class="contact-info" style="display: flex; flex-direction: column; gap: 10px">
                  <span> (0966)565 65 65 65</span>
                  <span>1/1/2024 5:30PM</span>
                  <span> Eijtah@info.com</span>
                </div>
                <div class="logo">
                  <img src="/Logo.svg" alt="logo" style="width: 100px; height: auto" />
                </div>
              </div>

              <div class="title">
                Deduction Notice <span lang="ar" dir="rtl">إشعار خصم</span>
              </div>

              <div class="details-grid">
                <div>Employee Name:</div>
                <div style="text-align: center">${selectedDocument.employee?.name || "غير معروف"
                }</div>
                <div lang="ar">اسم الموظف:</div>

                <div>Employee Number:</div>
                <div style="text-align: center">${selectedDocument.employee?.id || "غير متوفر"
                }</div>
                <div lang="ar">الرقم الوظيفي:</div>

                <div>Job Title:</div>
                <div style="text-align: center">${selectedDocument.employee?.job_title || "غير متوفر"
                }</div>
                <div lang="ar">المسمى الوظيفي:</div>

                <div>Nationality:</div>
                <div style="text-align: center">${selectedDocument.employee?.nationality || "غير متوفر"
                }</div>
                <div lang="ar">الجنسية:</div>

                <div>Violation#:</div>
                <div style="text-align: center">${selectedDocument.value || "غير متوفر"
                }</div>
                <div lang="ar">مخالفة رقم:</div>
              </div>

            <div class="violation-reason">
        <p class="arabic-text">
          التأخر عن مواعيد الحضور للعمل حتي (١٥) دقيقة دون إذن أو عذر مقبول إذا
          لم يترتب على ذلك تعطيل عمال آخرين.
        </p>
        <p class="english-text text-red-color">
          Being late for work up to 15 minutes without permission or valid
          reason if the delay did not cause disruption to other employees.
        </p>
      </div>

      <div class="consequence-statement">
        <p class="arabic-text">
          نظرا للمخالفة التي إرتكبتوها ومالمشار لها أعلاه .. وبناء على لائحة
          تنظيم العمل وماجاء في نظام العمل سيصدر بحقك م يلي :
        </p>
        <p class="english-text">
          Due to the above mentioned Violation and in accordance with the
          workplace regulation and labour law, we will issue to you:
        </p>
      </div>

              <div class="deduction-info-grid">
              <div>Type of violation</div>
                <div>${selectedDocument?.violation_rule?.title || "غير متوفر"
                }</div>
                <div lang="ar">نوع المخالفة</div>

                    <div>sanction</div>
                <div>${selectedDocument
                    ? getViolationText(selectedDocument)
                    : "غير متوفر"
                }</div>
                <div lang="ar">الجزاء</div>

                 <div>Repetition times</div>
                <div>${selectedDocument?.value || "غير متوفر"}</div>
                <div lang="ar">مرات التكرار</div>



                  <div>Date of violation</div>
                <div>${selectedDocument?.created_at &&
                (lang === "ar"
                    ? theDateObj.formatDataFunctionAR(
                        selectedDocument?.created_at
                    )
                    : theDateObj.formatDataFunctionEN(
                        selectedDocument?.created_at
                    ))
                }</div>
                <div lang="ar">تاريخ المخالفة
</div>
                <div>Deduction:</div>
                <div>${selectedDocument.deduction_percentage || 0}%</div>
                <div lang="ar">خصم:</div>

                <div>Total Deduction:</div>
                <div>${selectedDocument.deduction_amount || 0} SAR</div>
                <div lang="ar">مبلغ الخصم:</div>

                <div>Number of hours of delay</div>
                <div>${selectedDocument.hours_delay || 0} Hours</div>
                <div lang="ar">عدد ساعات التأخير</div>


  
              </div>
            </div>
          </body>
        </html>
      `;

            document.body.appendChild(element);

            await new Promise((resolve) => setTimeout(resolve, 500));

            const canvas = await html2canvas(element, {
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true
            });

            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save(
                `violation_${selectedDocument.employee?.name || "violation"}.pdf`
            );

            document.body.removeChild(element);
        } catch (error) {
            toast.error("حدث خطأ أثناء إنشاء ملف PDF");
            console.error("Error generating PDF:", error);
        }
    };

    return (
        <CustomModal
            newClassModal="modal-delete medium-modal"
            isOpen={openModalDetails}
            handleOpen={hiddenOpenModalDetails}
            titleModal="تفاصيل المخالفة"
            classBodyContent=""
        >
            <div className="all-content-details-documents">
                <div className="buttons-actions mb-3 flex-between">
                    <div className="user-details item-center-flex">
                        <img
                            src={selectedDocument?.employee?.image || male}
                            alt="user"
                            className="w-[45px] h-[45px] object-cover rounded-full"
                            loading="lazy"
                        />
                        <h2 className="title text-font-dark text-[15px]">
                            {selectedDocument?.employee?.name || "غير معروف"}
                        </h2>
                    </div>
                    <ModalButtonsEditTrash
                        openModalDeleteFunction={handleButtonDelete}
                        routePageAdd={buttonEditPageRoute}
                        showEdit={false}
                    />
                </div>
                <div className="main-modal-details-violation width-full">
                    {selectedDocument ? (
                        <div className="grid-cards-2 gap-0 gap-x-4">
                            {detailsArray.map((detail, index) => (
                                <div key={index} className={detail.className || ""}>
                                    <DetailsInfoDiv
                                        newClassName=""
                                        titleDetails={detail.title}
                                        textDetails={detail.text || "غير متوفر"}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <NotDataFound />
                    )}
                </div>
                <div className="flex justify-end items-end mt-3">
                    <button
                        onClick={generateViolationPDF}
                        className="btn-main button-green w-full sm:w-auto"
                    >
                        <img src={DownloadIconWhite} alt="download" /> طباعة التقرير
                    </button>
                </div>
            </div>
        </CustomModal>
    );
};

export default ModalDetailsViolationsPage;
