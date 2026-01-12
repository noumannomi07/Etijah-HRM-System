import ModalButtons from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalButtons/ModalButtons";
import TabButtonModalCheck from "../TabButtonModalCheck/TabButtonModalCheck";
import { Form, Formik } from "formik";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import { toast } from "react-toastify";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const TabModalShared = ({
  open,
  hiddenModal,
  initialValues = {},
  validationSchema = Yup.object({}),
  hideButtonsCheked,
  children,
}) => {
  const { t } = useTranslation("systemSettings");
  
  const handleSubmit = (values, { resetForm }) => {
    toast.success(t("messages.successAdd"));
    resetForm();

    // HIDE MODAL IF SUCCESS SEND
    hiddenModal();
  };

  return (
    <ModalShared 
      open={open} 
      hiddenModal={hiddenModal}
      titleModal={t("documentManagement.filter.title")}
    >
      <div className="all-content-modal-filter">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue, errors, touched }) => (
            <Form>
              <div className="all-forms-modal">
                {children && children({ setFieldValue, errors, touched })}
              </div>

              {!hideButtonsCheked && <TabButtonModalCheck />}
              <div className="main-buttons-modal flex justify-end items-end w-100">
                <ModalButtons
                  hiddenModal={hiddenModal}
                  handleSubmit={handleSubmit}
                  buttonResetText={t("documentManagement.filter.buttons.reset")}
                  buttonSaveText={t("documentManagement.filter.buttons.search")}
                  resetSuccessMessage={t("documentManagement.filter.messages.resetSuccess")}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalShared>
  );
};
TabModalShared.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  validationSchema: PropTypes.object,
  hideButtonsCheked: PropTypes.bool.isRequired,
  children: PropTypes.func.isRequired,
};

export default TabModalShared;
