import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import UsersIcon from "@assets/images/sidebaricons/usersicon.svg";
import UserInformationIcon from "@assets/images/staffmanagementpage/iconssteps/userinformationicon.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StepPersonalInformation from "./Components/StepPersonalInformation";
import "./StepsAddNewEmployee.css";
import { CommonRouteKeys, FullRoutes, RelativeRoutes } from "@/Routes/routes";
import { EmployeeProvider } from "./providers/EmployeeProvider";
import { useTranslation } from "react-i18next";
import { withPermissions } from "@/hoc";

const StepsAddNewEmployee = () => {
  const { t } = useTranslation("staffManagement");
  // STEPS

  const [currentStep, setStep] = useState(0);
  // STEP CONFIGURATION: NAME AND COMPONENT
  const steps = [
    {
      label: t("steps.personalInformation"),
      icon: <img src={UserInformationIcon} alt="personal information" />,
      component: StepPersonalInformation,
    },
    // {
    //   label: t("steps.workInformation"),
    //   icon: <InformationWorkIcon />,
    //   component: StepWorkInformation,
    // },
    // { label: t("steps.documents"), icon:<img src={DocumentsIcon} alt="documents" />, component: StepDocuments },
    // {
    //   label: t("steps.salary"),
    //   icon: <MoneyIcon />,
    //   component: StepSalaryComposition,
    // },
    // {
    //   label: t("steps.airlineTickets"),
    //   icon: <AirplaneIcon />,
    //   component: AirlineTickets,
    // },
    // {
    //   label: t("steps.medicalInsurance"),
    //   icon: <MedicalInsuranceIcon />,
    //   component: MedicalInsurancePage,
    // },

    // { label: t("steps.assets"), icon: <AssetsIcon />, component: StepAssets },
  ];

  const [formData, setFormData] = useState({
    step1Data: null,
    step2Data: null,
    step3Data: null,
    step4Data: null,
    step5Data: null,
    step6Data: null,
  });

  const handleNext = (data) => {
    setFormData({ ...formData, [`step${currentStep}Data`]: data });
    setStep(currentStep + 1);
    // setStep(0);
  };

  const handlePrev = () => {
    setStep(currentStep - 1);
  };

  const navigate = useNavigate();

  const handleStepFourSubmit = (data) => {
    setFormData({ ...formData, step6Data: data });

    setFormData({
      step1Data: null,
      step2Data: null,
      step3Data: null,
      step4Data: null,
      step5Data: null,
      step6Data: null,
    });

    setTimeout(() => {
      setStep(0); // RETURN TO STEP ONE
      navigate(FullRoutes.Dashboard.StaffManagement.All);
      toast.success(t("messages.successAdd"));
    }, 2100);
  };

  return (
    <EmployeeProvider>
      <HelmetInfo titlePage={t("pageTitle.addNewEmployee")} />

      <BreadcrumbsDefault
        isShowTitleHomePage={false}
        isShowSlashHome={false}
        isDashboardRouteHomePage={false}
        isShowNewLinkPage={true}
        routeOfNewLinkPage={FullRoutes.Dashboard.StaffManagement.All}
        iconNewPageText={<img src={UsersIcon} alt="users" />}
        textNewPage={t("pageTitle.staffManagement")}
        isPageDefault={false}
        defaultPageRoute={false}
        isShowTitleTextPage={true}
        titleTextPage={t("pageTitle.addNewEmployee")}
      />

      <ButtonBack
        isRouteDashboard={true}
        routeLink={
          RelativeRoutes.Dashboard.StaffManagement[CommonRouteKeys.Base]
        }
        isTextBack={true}
        AddNewTextButton={""}
      />

      <div className="main-steps-content mt-5 border-width-content">
        <div className="stepper-container">
          <div className="steps item-center-flex flex-wrap border-b pb-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="step">
                <div
                  className={`step-label item-center-flex relative min-w-max ${currentStep === index
                    ? "active-step-link  after:contnet after:bg-primaryColor after:absolute after:w-full after:h-[3px] after:rounded-[50px] after:bottom-[-13px]"
                    : ""
                    }`}
                >
                  <div className="icon-step">{step.icon}</div>{" "}
                  <h2
                    className={`text-font-dark text-[15px] ${currentStep === index ? "text-primary" : ""
                      }`}
                  >
                    {step.label}
                  </h2>
                </div>
                {currentStep === index && <div className="active-border" />}
              </div>
            ))}
          </div>

          <div className="progress-container">
            <div className="progress-line-container">
              <div
                className="progress-line"
                style={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="step-content pt-6 pb-3">
            {React.createElement(steps[currentStep].component, {
              onPrev: handlePrev,
              onNext: handleNext,
              onSubmit: handleStepFourSubmit,
            })}
          </div>
        </div>
      </div>
    </EmployeeProvider>
  );
};

StepsAddNewEmployee.propTypes = {};

export default withPermissions(StepsAddNewEmployee, "employees", {
  isAdd: true,
});
