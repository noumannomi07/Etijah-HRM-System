import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import ModalProjectManagementSettings from "../ModalProjectManagementSettings/ModalProjectManagementSettings";
import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";
import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import ToggleSwitchCheck from "@/Dashboard/Shared/ToggleSwitch/ToggleSwitchCheck";
import theDateObj from "@/Dashboard/DateMonthDays";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import i18next from "i18next";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";
import { hasAnyPermission } from "@/utils/global";
import { useTranslation } from "react-i18next";
const TableProjectManagementSettings = ({
  permissions
}: {
  permissions: any;
}) => {
  const { t } = useTranslation("systemSettings");
  // SHOW MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // SHOW MODAL DETAILS WORK
  // const [openDetails, setOpenDetails] = useState(false);
  // const handleDetailsOpen = () => setOpenDetails(!openDetails);

  const theadTrContent = [
    t("projectManagement.tableHeaders.id"),
    t("projectManagement.tableHeaders.projectName"),
    t("projectManagement.tableHeaders.createdAt"),
    t("projectManagement.tableHeaders.status"),
    ...(hasAnyPermission(permissions) ? [""] : [])
  ];

  // تهيئة البيانات كمصفوفة
  const [projectData, setprojectData] = useState([]);
  const [loading, setloading] = useState(true);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openEditproject, setopenEditproject] = useState(false);
  const [refetch, setrefetch] = useState(false);
  const [EditprojectData, setEditprojectData] = useState({});

  const buttonOpenModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };

  const refetchFunc = () => {
    setrefetch(Math.random() * 100000000);
  };

  const deleteItmeproject = (id) => {
    axiosInstance
      .delete(`project-management/${id}`, {
        headers: {
          "Accept-Language": i18next.language
        }
      })
      .then((res) => {
        refetchFunc();
      });
  };

  // init values
  const initialValues = {
    ar: {
      title: EditprojectData.ar_title // Arabic title
    },
    en: {
      title: EditprojectData.en_title // English title
    },
    exchange_rate: EditprojectData.exchange_rate, // Exchange rate
    symbol: EditprojectData.symbol
  };

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      "ar.title": true,
      "en.title": true,
      exchange_rate: true,
      symbol: true
    });

    // Perform API call
    axiosInstance
      .put(`project-management/${EditprojectData.id}`, values, {
        headers: {
          "Accept-Language": i18next.language
        }
      })
      .then((res) => {
        toast.success(t("projectManagement.messages.updateSuccess"));
        setopenEditproject(false);
        resetForm();
        refetchFunc();
      })
      .catch((error) => {
        console.error("Error updating project:", error);
        toast.error(t("projectManagement.messages.updateError"));
      });
  };

  const langgg = i18next.language;

  const navigate = useNavigate();
  const cancelAdd = () => {
    toast.success(t("projectManagement.messages.cancelSuccess"));
    setopenEditproject(false);
  };

  useEffect(() => {
    axiosInstance
      .get("/project-management", {
        headers: {
          "Accept-Language": langgg // Replace "en" with your desired language code
        }
      })
      .then((res) => {
        setprojectData(res.data.data); // تحديث البيانات
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setloading(false); // إخفاء مؤشر التحميل
      });
  }, [refetch]);

  // إذا كانت البيانات قيد التحميل
  if (loading) {
    return <Loading />;
  }

  // CONTENT OF ARRAY
  const tbodyContent = projectData?.map((item) => [
    <div key={`id-${item.id}`}># {item.id}</div>,
    item.ar_title,
    langgg == "ar"
      ? theDateObj.formatDataFunctionAR(item.created_at)
      : theDateObj.formatDataFunctionEN(item.created_at),
    <ToggleSwitchCheck key={`switch-${item.id}`} id={item.id} />,
    ...(hasAnyPermission(permissions)
      ? [
          <div key={`actions-${item.id}`}>
            <ButtonsActionShowEditDelete
              hideShowFunction={true}
              hideEdit={!permissions?.update}
              hideDelete={!permissions?.delete}
              functionEdit={() => {
                setopenEditproject(true);
                setEditprojectData(item);
              }}
              functionDelete={() => {
                buttonOpenModalDelete();
                setEditprojectData(item);
              }}
            />
          </div>
        ]
      : [])
  ]);

  //   OPEN MODAL DELETE

  return (
    <>
      <ModalDelete
        openModalDelete={openModalDelete}
        hiddenModalDelete={buttonOpenModalDelete}
        titleModal={t("projectManagement.deleteModal.title")}
        textModal={t("projectManagement.deleteModal.text")}
        onDelete={() => {
          deleteItmeproject(EditprojectData.id);
        }}
      />

      <ModalProjectManagementSettings modalOpen={open} hideModal={handleOpen} />

      <div className="vacations-requests border-width-content">
        <HeaderTableInfo
          titleHeader={t("tabs.projectManagement")}
          isButtonAll={false}
          routePageInfo={false}
          textLink={false}
          buttonAddNewOrder={false}
          isButtonSystemSettings={permissions?.create}
          functionButtonAddNewOrder={() =>
            navigate(
              FullRoutes.Dashboard.SystemSettings.AddNewProjectManagementSettings
            )
          }
          newButtonWithoutText={false}
          functionButtonNewButton={false}
          textButton={false}
          newComponentsHere={false}
        />
        <DataTableTwo
          theadContent={theadTrContent}
          tbodyContent={tbodyContent}
          withCheckboxes={false}
          isShowContentFilterInfo={true}
          isShowModalButtonFilter={false}
          functionButtonFilter={handleOpen}
          isTrueButtonsModalContentRight={false}
          functionButtonModalOne={false}
          textContentButtonOne={false}
          isTrueButtonTwoModalContent={false}
          newClassButtonTwo={false}
          functionModalButtonTwo={false}
          textContetButtonTwo={false}
        />
      </div>
      <CustomModal
        isOpen={openEditproject}
        titleModal={`${t("projectManagement.editModal.title")}${EditprojectData.ar_title}'`}
        handleOpen={() => {
          setopenEditproject(false);
        }}
      >
        <h1>{EditprojectData.ar_title}</h1>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleSubmit, errors, touched }) => (
            <Form>
              <div className="all-forms-grid grid-cards-2">
                <div className="input-one-details">
                  <InputField
                    isShowLabel={true}
                    label={t("projectManagement.form.projectNameArabic")}
                    name={"ar.title"}
                    type={"text"}
                    placeholder={t("projectManagement.form.projectNameArabicPlaceholder")}
                    success
                    error={touched.ar?.title && errors.ar?.title}
                  />
                </div>
                <div className="input-one-details">
                  <InputField
                    isShowLabel={true}
                    label={t("projectManagement.form.projectNameEnglish")}
                    name={"en.title"}
                    type={"text"}
                    placeholder={t("projectManagement.form.projectNameEnglishPlaceholder")}
                    success
                    error={touched.en?.title && errors.en?.title}
                  />
                </div>
              </div>

              <ButtonsFormSendCancel
                cancelAdd={cancelAdd}
                submitButton={() => handleSubmit()}
              />
            </Form>
          )}
        </Formik>
      </CustomModal>
    </>
  );
};

export default TableProjectManagementSettings;
