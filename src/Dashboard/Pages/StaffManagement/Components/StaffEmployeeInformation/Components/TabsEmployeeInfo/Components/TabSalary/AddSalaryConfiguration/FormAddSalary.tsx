import StepSalaryComposition from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/Components/StepSalaryComposition";
import { FullRoutes } from "@/Routes/routes";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const FormAddSalary = () => {
  const { t } = useTranslation("staffManagement");
  const navigate = useNavigate();

  const cancelAdd = () => {
    toast.success(t("messages.cancel"));
    navigate(FullRoutes.Dashboard.StaffManagement.All);
  };

  return (
    <div className="form-add-new-request border-width-content mt-5">
      <h2 className="title-head-form text-font-dark pt-3 mb-3 ">
        {t("salary.addSalaryConfiguration")}
      </h2>
      <StepSalaryComposition onPrev={cancelAdd} />
    </div>
  );
};

export default FormAddSalary;
