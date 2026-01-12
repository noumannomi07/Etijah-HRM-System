import React, { useState } from "react";
import StepWorkInformation from "./Components/StepWorkInformation";
import StepPersonalInformation from "./Components/StepPersonalInformation";
import UserInformationIcon from "@assets/images/staffmanagementpage/iconssteps/userinformationicon.svg";
import InformationWorkIcon from "@assets/images/staffmanagementpage/iconssteps/informationworkicon.tsx";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import UsersIcon from "@assets/images/sidebaricons/usersicon.svg";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import "./StepsAddNewEmployee.css";
import { CommonRouteKeys, FullRoutes, RelativeRoutes } from "@/Routes/routes";
import { EmployeeProvider } from "./providers/EmployeeProvider";
import { WorkdataProvider } from "./providers/WorkdataProvider";
import { useTranslation } from "react-i18next";
import { withPermissions } from "@/hoc";

const StepsAddNewDataEmployee = () => {
    const { t } = useTranslation("staffManagement");
    const [currentStep, setStep] = useState(0);

    const steps = [
        {
            label: t("steps.personalInformation"),
            icon: <img src={UserInformationIcon} alt="personal information" />,
            component: StepPersonalInformation,
        },
        {
            label: t("steps.workInformation"),
            icon: <InformationWorkIcon />,
            component: StepWorkInformation,
        },
    ];
 
    const handleStepClick = (index) => {
        setStep(index);
    };

    return (
        <EmployeeProvider>
            <WorkdataProvider>
                <HelmetInfo titlePage={t("pageTitle.employeeInformation")} />

                <BreadcrumbsDefault
                    isShowTitleHomePage={false}
                    isShowSlashHome={false}
                    isDashboardRouteHomePage={false}
                    isShowNewLinkPage={true}
                    routeOfNewLinkPage={
                        FullRoutes.Dashboard.StaffManagement.All
                    }
                    iconNewPageText={<img src={UsersIcon} alt="users" />}
                    textNewPage={t("pageTitle.staffManagement")}
                    isPageDefault={false}
                    defaultPageRoute={false}
                    textDefaultPage={false}
                    isShowTitleTextPage={true}
                    titleTextPage={t("pageTitle.employeeInformation")}
                />

                <ButtonBack
                    isRouteDashboard={true}
                    routeLink={
                        RelativeRoutes.Dashboard.StaffManagement[
                            CommonRouteKeys.Base
                        ]
                    }
                    addNewRoute={false}
                    isTextBack={true}
                    AddNewTextButton={""}
                />

                <div className="main-steps-content mt-5 border-width-content">
                    <div className="stepper-container">
                        <div className="steps item-center-flex flex-wrap border-b pb-3 gap-8">
                            {steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="step"
                                    onClick={() => handleStepClick(index)}
                                    style={{ cursor: "pointer" }} 
                                >
                                    <div
                                        className={`step-label item-center-flex relative min-w-max ${
                                            currentStep === index
                                                ? "active-step-link after:contnet after:bg-primaryColor after:absolute after:w-full after:h-[3px] after:rounded-[50px] after:bottom-[-13px]"
                                                : ""
                                        }`}
                                    >
                                        <div className="icon-step">
                                            {step.icon}
                                        </div>
                                        <h2
                                            className={`text-font-dark text-[15px] ${
                                                currentStep === index
                                                    ? "text-primary"
                                                    : ""
                                            }`}
                                        >
                                            {step.label}
                                        </h2>
                                    </div>
                                    {currentStep === index && (
                                        <div className="active-border" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="progress-container">
                            <div className="progress-line-container">
                                <div
                                    className="progress-line"
                                    style={{
                                        width: `${
                                            (currentStep / (steps.length - 1)) *
                                            100
                                        }%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="step-content pt-6 pb-3">
                            {React.createElement(steps[currentStep].component)}
                        </div>
                    </div>
                </div>
            </WorkdataProvider>
        </EmployeeProvider>
    );
};

StepsAddNewDataEmployee.propTypes = {};

export default withPermissions(StepsAddNewDataEmployee, "employees", {
    isEdit: true,
});
