import * as Yup from "yup";

import PropTypes from "prop-types";
import TabModalShared from "../../../Shared/TabModalShared/TabModalShared";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { useTranslation } from "react-i18next";

const ModalBankManagement = ({ modalOpen, hideModal }) => {
  const { t } = useTranslation("systemSettings");
  
  return (
    <TabModalShared
      open={modalOpen}
      hiddenModal={hideModal}
      initialValues={{ bankName: "" }}
      validationSchema={Yup.object({
        bankName: Yup.string().required(t("bankManagement.validation.bankNameArabicRequired"))
      })}
    >
      {({}) => (
        <>
          <div className="input-one-details w-full">
            <InputField
              isShowLabel={true}
              label={t("bankManagement.filter.bankName")}
              name={"bankName"}
              type={"text"}
              placeholder={t("bankManagement.filter.bankNamePlaceholder")}
              success
            />
          </div>
        </>
      )}
    </TabModalShared>
  );
};
ModalBankManagement.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired
};

export default ModalBankManagement;
