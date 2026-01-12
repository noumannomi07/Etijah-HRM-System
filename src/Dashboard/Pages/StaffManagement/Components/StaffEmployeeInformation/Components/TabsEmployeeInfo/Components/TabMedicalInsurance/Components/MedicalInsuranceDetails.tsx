import MedicalInsuranceIcon from "@/assets/images/staffmanagementpage/iconssteps/medicalinsuranceicon";
import { Loading } from "@/components";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import DetailsInfoDiv from "@/Dashboard/Pages/Orders/Components/ModalsOrder/ModalVacationDetails/DetailsInfoDiv";
import MedicalInsurancePage from "@/Dashboard/Pages/StaffManagement/Components/StaffEmployeeInformation/Components/TabsEmployeeInfo/Components/TabMedicalInsurance/Components/MedicalInsuranceModal";
import { useEmployeeContext } from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/providers/EmployeeProvider";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import DownloadImagePdf from "@/Dashboard/Shared/DownloadImagePdf/DownloadImagePdf";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./MedicalInsuranceDetails.css";
const MedicalInsuranceDetails = () => {
  const { t } = useTranslation("staffManagement");
  const { employee, isPending } = useEmployeeContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const {
    coverage_amount,
    file,
    start_date,
    end_date,
    medical,
    number,
    amount,
    persons,
    category
  } = employee?.insurance ?? {};

  const cardData = [
    {
      titleDetails: t("medicalInsurance.insuranceNumber"),
      textDetails: number
    },
    {
      titleDetails: t("medicalInsurance.insuranceCategory"),
      textDetails: category
    },
    {
      titleDetails: t("medicalInsurance.personsCount"),
      textDetails: persons
    },
    {
      titleDetails: t("medicalInsurance.startDate"),
      textDetails: start_date
    },
    { titleDetails: t("medicalInsurance.endDate"), textDetails: end_date },
    {
      titleDetails: t("medicalInsurance.coverageAmount"),
      textDetails: coverage_amount
    },
    { titleDetails: t("medicalInsurance.amount"), textDetails: amount },
    {
      titleDetails: t("medicalInsurance.hasMedicalInsurance"),
      textDetails: Boolean(medical)
        ? t("medicalInsurance.yes")
        : t("medicalInsurance.no")
    }
  ];

  if (isPending) return <Loading />;
  return (
    <> 
      <div className="airine-tickets-details border-width-content">
        <div className="w-full flex justify-end mb-8">
          <button
            type="button"
            onClick={handleOpen}
            className="btn-main button-green height--50 flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:shadow-md"
          >
            <MedicalInsuranceIcon />
            {t("medicalInsurance.editMedicalInsurance")}
          </button>
        </div>
        {employee?.insurance ? (
          <>
            <HeaderTableInfo titleHeader={t("medicalInsurance.title")} />
            <div className="all-card-tickets-airline grid-cards-2 gap-0  gap-x-4">
              {cardData.map((card, index) => (
                <DetailsInfoDiv
                  key={index}
                  newClassName={""}
                  titleDetails={card.titleDetails}
                  textDetails={String(card.textDetails ?? "-")}
                />
              ))}
              {file && (
                <DownloadImagePdf
                  newClassName={"border p-[15px] rounded-[12px]"}
                  image={file}
                  typeImage={number}
                  timeNow={start_date}
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center items-center h-full">
              <p className="text-center text-gray-500">
                {employee?.insurance
                  ? t("medicalInsurance.noInsurance")
                  : t("medicalInsurance.noInsuranceYet")}
              </p>
            </div>
          </>
        )}
      </div>
      <CustomModal
        newClassModal={""}
        isOpen={open}
        handleOpen={handleOpen}
        titleModal={t("medicalInsurance.editMedicalInsurance")}
        classBodyContent={""}
      >
        <MedicalInsurancePage
          employeeId={employee?.id}
          closeModal={() => setOpen(false)}
        />
      </CustomModal>
    </>
  );
};

export default MedicalInsuranceDetails;
