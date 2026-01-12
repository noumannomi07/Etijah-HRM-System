import * as Yup from "yup";

import PropTypes from "prop-types";
import TabModalShared from "../../../Shared/TabModalShared/TabModalShared";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { useTranslation } from "react-i18next";

const ModalManagingEvaluationCriteria = ({ modalOpen, hideModal }) => {
  const { t } = useTranslation("systemSettings");
  
  return (
    <TabModalShared
      open={modalOpen}
      hiddenModal={hideModal}
      initialValues={{ standardName: "" }}
      validationSchema={Yup.object({
        standardName: Yup.string().required(t("performanceEvaluationManagement.validation.criteriaNameArabicRequired"))
      })}
    >
      {({}) => (
        <>
          <div className="input-one-details w-full">
            <InputField
              isShowLabel={true}
              label={t("performanceEvaluationManagement.form.criteriaNameArabic")}
              name={"standardName"}
              type={"text"}
              placeholder={t("performanceEvaluationManagement.form.criteriaNameArabicPlaceholder")}
              success
            />
          </div>
        </>
      )}
    </TabModalShared>
  );
};
ModalManagingEvaluationCriteria.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired
};

export default ModalManagingEvaluationCriteria;
