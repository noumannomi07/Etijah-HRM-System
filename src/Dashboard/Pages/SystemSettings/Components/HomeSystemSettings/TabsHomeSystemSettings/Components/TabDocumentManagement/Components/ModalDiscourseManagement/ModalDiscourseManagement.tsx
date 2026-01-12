import * as Yup from "yup";

import PropTypes from "prop-types";
import TabModalShared from "../../../Shared/TabModalShared/TabModalShared";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { useTranslation } from "react-i18next";

const ModalDocumentManagement = ({ modalOpen, hideModal }) => {
  const { t } = useTranslation("systemSettings");
  
  return (
    <TabModalShared
      open={modalOpen}
      hiddenModal={hideModal}
      initialValues={{ letterName: "" }}
      validationSchema={Yup.object({
        letterName: Yup.string().required(t("documentManagement.validation.documentNameArabicRequired")),
      })}
    >
      {({}) => (
        <>
          <div className="input-one-details w-full">
            <InputField
              isShowLabel={true}
              label={t("documentManagement.filter.documentName")}
              name={"letterName"}
              type={"text"}
              placeholder={t("documentManagement.filter.documentNamePlaceholder")}
              success
            />
          </div>
        </>
      )}
    </TabModalShared>
  );
};
ModalDocumentManagement.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default ModalDocumentManagement;
