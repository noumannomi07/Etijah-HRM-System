import DetailsInfoDiv from "@/Dashboard/Pages/Orders/Components/ModalsOrder/ModalVacationDetails/DetailsInfoDiv";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import DownloadImagePdf from "@/Dashboard/Shared/DownloadImagePdf/DownloadImagePdf";
import image from "@assets/images/main/01.png";
import PropTypes from "prop-types";
import ModalButtonsEditTrash from "@/Dashboard/Shared/ModalButtonsEditTrash/ModalButtonsEditTrash";
import theDateObj from "@/Dashboard/DateMonthDays";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const ModalDetailsCompanyDocuments = ({
  openModalDetailsDocuments,
  hiddenModalDetailsDocuments,
  handleButtonDelete,
  buttonEditPageRoute,
  selectedDocument,
}) => {
  const { t } = useTranslation('companyDocuments');
  // const detailsArray = [
  //   { title: "إسم المستند", text: "الإسم" },
  //   { title: "النوع", text: "النوع" },
  //   { title: "تاريخ الإضافة", text: "22 ديسمبر 2024" },
  //   { title: "تاريخ إنتهاء الصلاحية", text: "22 ديسمبر 2024" },
  //   {
  //     title: "الوصف",
  //     text: "الوصف",
  //     className: "card-details-documents sm:col-span-1 md:col-span-2"
  //   }
  // ];
  return (
    <CustomModal
      newClassModal={"modal-delete medium-modal"}
      isOpen={openModalDetailsDocuments}
      handleOpen={hiddenModalDetailsDocuments}
      titleModal={t('details.title')}
      classBodyContent={""}
    >
      <div className="all-content-details-documents ">
        <div className="buttons-actions mb-3 flex justify-end">
          <ModalButtonsEditTrash
            openModalDeleteFunction={handleButtonDelete}
            routePageAdd={buttonEditPageRoute}
          />
        </div>
        {/* ====================== START DETAILS CONENT ================= */}
        <div className="details-doucments-content  border-width-content">
          <div className="all-cards-documents grid-cards-2 gap-0 gap-x-4">
            <DetailsInfoDiv
              newClassName={"card-details-documents"}
              titleDetails={t('details.documentName')}
              textDetails={selectedDocument.title}
            />
            <DetailsInfoDiv
              newClassName={"card-details-documents"}
              titleDetails={t('details.type')}
              textDetails={selectedDocument.extension}
            />
            <DetailsInfoDiv
              newClassName={
                "card-details-documents sm:col-span-1 md:col-span-2"
              }
              titleDetails={t('details.description')}
              textDetails={selectedDocument.content}
            />
            <DetailsInfoDiv
              newClassName={"card-details-documents"}
              titleDetails={t('details.dateAdded')}
              textDetails={
                i18next.language == "ar"
                  ? theDateObj.formatDataFunctionAR(selectedDocument.created_at)
                  : theDateObj.formatDataFunctionEN(selectedDocument.created_at)
              }
            />
            <DetailsInfoDiv
              newClassName={"card-details-documents"}
              titleDetails={t('details.department')}
              textDetails={selectedDocument.category.title}
            />
          </div>

          <DownloadImagePdf
            image={selectedDocument.file}
            typeImage={t('details.requestImage')}
            timeNow={"08/06/2024 . 08:00 ص"}
          />
        </div>
        {/* ====================== END DETAILS CONENT ================= */}
      </div>
    </CustomModal>
  );
};

ModalDetailsCompanyDocuments.propTypes = {
  openModalDetailsDocuments: PropTypes.bool.isRequired,
  hiddenModalDetailsDocuments: PropTypes.func.isRequired,
  handleButtonDelete: PropTypes.func.isRequired,
  buttonEditPageRoute: PropTypes.string.isRequired,
  selectedDocument: PropTypes.object.isRequired,
};

export default ModalDetailsCompanyDocuments;
