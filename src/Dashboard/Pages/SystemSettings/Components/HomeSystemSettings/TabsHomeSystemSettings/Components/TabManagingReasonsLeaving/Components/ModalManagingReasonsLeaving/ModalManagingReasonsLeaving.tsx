import React from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import PropTypes from "prop-types";
import TabModalShared from "../../../Shared/TabModalShared/TabModalShared";
import InputField from "@/Dashboard/Shared/Forms/InputField";

interface ModalManagingReasonsLeavingProps {
  modalOpen: boolean;
  hideModal: () => void;
}

const ModalManagingReasonsLeaving = ({ modalOpen, hideModal }: ModalManagingReasonsLeavingProps) => {
  const { t } = useTranslation("systemSettings");

  return (
    <TabModalShared
      open={modalOpen}
      hiddenModal={hideModal}
      initialValues={{ reason: "" }}
      validationSchema={Yup.object({
        reason: Yup.string().required(t("managingReasonsLeaving.modal.reasonRequired"))
      })}
      hideButtonsCheked={false}
    >
      {({}) => (
        <>
          <div className="input-one-details w-full">
            <InputField
              isShowLabel={true}
              label={t("managingReasonsLeaving.modal.reasonLabel")}
              name={"reason"}
              type={"text"}
              placeholder={t("managingReasonsLeaving.modal.reasonPlaceholder")}
              success
            />
          </div>
        </>
      )}
    </TabModalShared>
  );
};
ModalManagingReasonsLeaving.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired
};

export default ModalManagingReasonsLeaving;
