import * as Yup from "yup";

import PropTypes from "prop-types";
import TabModalShared from "../../../Shared/TabModalShared/TabModalShared";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import React from "react";
import { useTranslation } from "react-i18next";

const ModalManageDiscounts = ({ modalOpen, hideModal, section }) => {
    const { t } = useTranslation("systemSettings");
  return section === 1 ? (
    <TabModalShared
      open={modalOpen}
      hiddenModal={hideModal}
      initialValues={{ nameOpponent: "" }}
      validationSchema={Yup.object({
        nameOpponent: Yup.string().required(t("discountsManagement.addition_name_required")),
      })}
    >
      {({ }) => (
        <>
          <div className="input-one-details w-full">
            <InputField
              isShowLabel={true}
              label={t("discountsManagement.addition_name")}
              name={"nameOpponent"}
              type={"text"}
              placeholder={t("discountsManagement.addition_name")}
              success
            />
          </div>
        </>
      )}
    </TabModalShared>
  ) : (
    <TabModalShared
      open={modalOpen}
      hiddenModal={hideModal}
      initialValues={{ nameOpponent: "" }}
      validationSchema={Yup.object({
        nameOpponent: Yup.string().required(t("discountsManagement.discount_name_required")),
      })}
    >
      {({ }) => (
        <>
          <div className="input-one-details w-full">
            <InputField
              isShowLabel={true}
              label={t("discountsManagement.discount_name")}
              name={"nameOpponent"}
              type={"text"}
              placeholder={t("discountsManagement.discount_name")}
              success
            />
          </div>
        </>
      )}
    </TabModalShared>
  );
};
ModalManageDiscounts.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default ModalManageDiscounts;
