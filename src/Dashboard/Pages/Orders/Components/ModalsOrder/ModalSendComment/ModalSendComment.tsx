import React from "react";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import FormField from "@/Dashboard/Shared/Forms/FormFiled";
import TextAreaInput from "@/Dashboard/Shared/Forms/TextArea";
import SuccessSend from "@/Dashboard/Shared/SuccessSend/SuccessSend";
import PropTypes from "prop-types";
import { useState } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

interface ModalSendCommentProps {
  openModalSendComment: boolean;
  hiddenModalSendComment: () => void;
}

const ModalSendComment: React.FC<ModalSendCommentProps> = ({ openModalSendComment, hiddenModalSendComment }) => {
  const { t } = useTranslation("orders");

  // MODAL SUCCESS FUNCTION
  const [openModalSuccess, setOpenModalSuccess] = useState(false);
  const openModalSuccessFunction = () => {
    setOpenModalSuccess(true);
    hiddenModalSendComment();
  };

  const hideModalSuccess = () => {
    setOpenModalSuccess(false);
  };

  // VALIDATION
  const validationSchema = Yup.object().shape({
    textAreaComment: Yup.string()
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
        newClassModal="small-modal"
        openSuccess={openModalSuccess}
        hiddenModalSuccess={hideModalSuccess}
        textTitleTop={t("modals.comment.success")}
        textInfoModal={t("modals.comment.successMessage")}
      />
      <CustomModal
        newClassModal={"modal-send-comment medium-modal"}
        isOpen={openModalSendComment}
        handleOpen={hiddenModalSendComment}
        titleModal={t("modals.comment.title")}
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
              label={t("modals.comment.label")}
              name="textAreaComment"
              type="text"
              placeholder={t("modals.comment.placeholder")}
              success
              parentClass=""
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
ModalSendComment.propTypes = {
  openModalSendComment: PropTypes.bool.isRequired,
  hiddenModalSendComment: PropTypes.func.isRequired,
};
export default ModalSendComment;
