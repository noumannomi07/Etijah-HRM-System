import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import ModalDetailsViolationsPage from "./ModalsViolationsPage/ModalDetailsViolationsPage";
import ModalFilterViolationsPage from "./ModalsViolationsPage/ModalFilterViolationsPage";
import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";
import { FullRoutes } from "@/Routes/routes";
import theDateObj from "@/Dashboard/DateMonthDays";
import i18next from "i18next";
import { getViolationText, ordinalToNumber } from "@/utils/financial";
import { Violation } from "@/types/Financial";
import { useViolations } from "@/hooks/financial/violations";
import { Loading } from "@/components";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import FormAddNewViolationsManagementPage from "../../add/form";
import { withPermissions } from "@/hoc";

const TableViolationsManagementPage = ({ permissions }: { permissions: any }) => {
  const lang = i18next.language;
  const { t } = useTranslation("violations");
  const { data: tableData, isLoading } = useViolations();
  const [openModalViolations, setOpenModalViolations] = useState(false);
  const toggleOpenModalViolations = () => {
    setOpenModalViolations(!openModalViolations);
  };

  const theadTrContent: string[] = [
    "#",
    t("violationsTable.headers.employee"),
    t("violationsTable.headers.violationType"),
    t("violationsTable.headers.penalty"),
    t("violationsTable.headers.repetitionCount", "Repetition Count"),
    t("violationsTable.headers.violationDate"),
    ""
  ];

  const [open, setOpen] = useState<boolean>(false);
  const [selectedDocument, setSelectedDocument] = useState<Violation | null>(
    null
  );
  const [openModalDetails, setOpenModalDetails] = useState<boolean>(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen((prev) => !prev);
  const handleOpenModalDetails = (document: Violation) => {
    setSelectedDocument(document);
    setOpenModalDetails(true);
  };
  const hiddenOpenModalDetails = () => setOpenModalDetails(false);
  const openDeleteModal = () => setIsModalDeleteOpen(true);
  const closeDeleteModal = () => setIsModalDeleteOpen(false);

  if (isLoading) {
    return <Loading />;
  }

  const tbodyContent = tableData?.map((item) => [
    <div>{item?.id}</div>,

    <div key={item.id} className="flex items-center gap-3 h-16">
    <Link
      to={FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
        { id: item.id }
      )}
      className="flex items-center gap-3"
    >
      <img
        src={item.employee?.image}
        alt="img user"
        loading="lazy"
        className="h-12 w-12 object-cover rounded-md"
      />
      <div className="flex flex-col justify-center gap-1">
        <div className="text-overflow-ellipsis max-w-32 font-medium">
          {item.employee?.name}
        </div>
        <div className="text-sm text-gray-600">
          {item.employee?.jobtitle?.title}
        </div>
        <div className="text-sm text-gray-500">#{item.employee?.code}</div>
      </div>
    </Link>
  </div>,
    <div className="status-primary">{item?.violation_rule?.title}</div>,
    <div>{getViolationText(item)}</div>,
    ordinalToNumber(item.times),
    lang === "ar"
      ? theDateObj.formatDataFunctionAR(item?.created_at)
      : theDateObj.formatDataFunctionEN(item?.created_at),
    <button
      onClick={() => handleOpenModalDetails(item)}
      className="btn-main button-green"
    >
      {t("violationsTable.tooltips.view")}
    </button>
  ]);

  return (
    <>
      <div className="table-employment-requests border-width-content">
        <DataTableTwo
          theadContent={theadTrContent}
          tbodyContent={tbodyContent ? tbodyContent : []}
          withCheckboxes={false}
          isShowContentFilterInfo={true}
          isShowModalButtonFilter={false}
          functionButtonFilter={handleOpen}
          isTrueButtonsModalContentRight={permissions?.create}
          functionButtonModalOne={() => {
            // navigate(
            //     FullRoutes.Dashboard.ViolationsManagement
            //         .AddNewViolationsManagementPage
            // );
            toggleOpenModalViolations();
          }}
          textContentButtonOne={t("violationsTable.actions.addViolation")}
          isTrueButtonTwoModalContent={false}
        />
      </div>
      <ModalDelete
        openModalDelete={isModalDeleteOpen}
        hiddenModalDelete={closeDeleteModal}
        titleModal={t("messages.confirmDelete")}
        textModal={t(
          "messages.confirmDeleteDetails",
          "This action cannot be undone."
        )}
        onDelete={() => {}}
      />
      <ModalFilterViolationsPage open={open} hiddenModal={handleOpen} />
      <ModalDetailsViolationsPage
        hiddenOpenModalDetails={hiddenOpenModalDetails}
        openModalDetails={openModalDetails}
        selectedDocument={selectedDocument}
        handleButtonDelete={() => {
          hiddenOpenModalDetails();
          openDeleteModal();
        }}
        buttonEditPageRoute={
          selectedDocument
            ? FullRoutes.Dashboard.ViolationsManagement.AddNewViolationsManagementPageWithId(
                { id: selectedDocument.id }
              )
            : ""
        }
      />

      <CustomModal
        newClassModal="modal-delete medium-modal modal-shared-style"
        isOpen={openModalViolations}
        handleOpen={toggleOpenModalViolations}
        titleModal=""
        classBodyContent=""
      >
        <FormAddNewViolationsManagementPage onClose={toggleOpenModalViolations} />
      </CustomModal>
    </>
  );
};

export default withPermissions(TableViolationsManagementPage, "violations", {
  isComponent: true,
});
