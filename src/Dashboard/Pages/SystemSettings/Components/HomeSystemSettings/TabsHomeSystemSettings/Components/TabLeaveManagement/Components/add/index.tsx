import React from "react";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import BreadCrumbShared from "../../../Shared/BreadCrumbShared/BreadCrumbShared";
import HeaderButtonBack from "../../../Shared/HeaderButtonBack/HeaderButtonBack";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormComponent from "../form";
import { useVacationManagement } from "@/hooks/api/system-settings";
import { useTranslation } from "react-i18next";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("systemSettings");
  const { createItem, isCreating } = useVacationManagement();

  const handleSubmit = async (values: any, { setTouched, resetForm }: any) => {
    setTouched({
      "ar.title": true,
      "en.title": true,
      "ar.content": true,
      "en.content": true,
      days: true,
      can_take_after: true,
      paid: true,
      paid_percent: true,
      days_type: true
    });

    try {
      console.log({ values });
      const payload = {
        ...values,
        days: values.days || 0,
        can_take_after: values.can_take_after || 0,
        paid: values.paid || 0,
        paid_percent: values.paid_percent || 1,
        days_type: values.days_type || ""
      };

     const response = await createItem(payload);

     console.log({ response });

      toast.success(t("leaveManagement.messages.add_leave_success"));


      // navigate(-1);


    } catch (error) {
      toast.error(
        error?.message || t("leaveManagement.messages.add_leave_error")
      );
    }
  };
  return (
    <>
      <HelmetInfo titlePage={t("leaveManagement.title")} />
      <BreadCrumbShared textPage={t("leaveManagement.title")} />
      <HeaderButtonBack />
      <main>
        <div className="all-conent-permission mt-5 border-width-content">
          <FormComponent loading={isCreating} handleSubmit={handleSubmit} />
        </div>
      </main>
    </>
  );
};

export default Index;
