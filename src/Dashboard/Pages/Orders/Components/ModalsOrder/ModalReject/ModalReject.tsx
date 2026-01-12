import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import FormField from "@/Dashboard/Shared/Forms/FormFiled";
import TextAreaInput from "@/Dashboard/Shared/Forms/TextArea";
import SuccessSend from "@/Dashboard/Shared/SuccessSend/SuccessSend";
import PropTypes from "prop-types";
import { useState } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import React from "react";

interface ModalRejectProps {
  openModalReject: boolean;
  hiddenModalReject: () => void;
}

const ModalReject: React.FC<ModalRejectProps> = ({ openModalReject, hiddenModalReject }) => {
  const { t } = useTranslation("orders");

  // MODAL SUCCESS FUNCTION
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const openModalSuccessFunction = () => {
    setOpenModalSuccess(true);
    hiddenModalReject();
  };

  const hideModalSuccess = () => {
    setOpenModalSuccess(false);
  };

  // VALIDATION
  const validationSchema = Yup.object().shape({
    textAreaCommentReject: Yup.string()
      .required(t("validation.fieldRequired"))
      .min(5, t("validation.minCharsComment", { count: 5 }))
      .max(500, t("validation.maxCharsComment", { count: 500 })),
  });

  const initialValues = {
    textAreaComment: "",
  };

  const handleSubmit = (values: any, { resetForm }: any) => {
    resetForm();
  };
  return (
    <>
      <SuccessSend
        openSuccess={openModalSuccess}
        hiddenModalSuccess={hideModalSuccess}
        textTitleTop={t("modals.reject.success")}
        textInfoModal={t("modals.reject.successMessage")}
      />
      <CustomModal
        newClassModal={"modal-send-reject medium-modal"}
        isOpen={openModalReject}
        handleOpen={hiddenModalReject}
        titleModal={t("modals.reject.title")}
        classBodyContent={""}
      >
        <div className="all-send-comments">
          <FormField
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <TextAreaInput
              isShowLabel={true}
              label={t("modals.reject.label")}
              name="textAreaCommentReject"
              type="text"
              placeholder={t("modals.reject.placeholder")}
              success
            />

            <div className="flex justify-end mt-5">
              <button
                onClick={openModalSuccessFunction}
                type="submit"
                className="btn-main height--50"
              >
                {t("buttons.send")}
              </button>
            </div>
          </FormField>
        </div>
      </CustomModal>
    </>
  );
};
ModalReject.propTypes = {
  openModalReject: PropTypes.bool.isRequired,
  hiddenModalReject: PropTypes.func.isRequired,
};
export default ModalReject;
