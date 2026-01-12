import React from "react";
import UserSingle from "@/assets/images/staffmanagementpage/user-single";
import EmployeeInfoData from "./Components/EmployeeInfoData";
import HorizontalTabs from "@/Dashboard/Shared/HorizontalTabs/HorizontalTabs";
import StarIcon from "@assets/images/sidebaricons/staricon.svg";
import RateEmployeeInfo from "./Components/RateEmployeeInfo";
import { useTranslation } from "react-i18next";
import DocumentEmployeeInfo from "./Components/DocumentEmployeeInfo";
import JobEmployeeInfo from "./Components/JobEmployeeInfo";
const TabEmployeeInfo = ({ dataApplicants, refetch }: { dataApplicants: any, refetch: any }) => {
    const { t } = useTranslation('employment');
    const tabsData = [
        {
            label: (
                <>
                 <UserSingle /> {t('candidateFile.tabs.personalInfo')}
                </>
            ),
            content: <EmployeeInfoData dataApplicants={dataApplicants} />,
        },

        {
          label: (
            <>
              <img src={StarIcon} alt="star" /> {t('candidateFile.tabs.professionalInfo')}
            </>
          ),
          content: <JobEmployeeInfo dataApplicants={dataApplicants} />
        },
        {
            label: (
                <>
                    <img src={StarIcon} alt="star" /> {t('candidateFile.tabs.rate')}
                </>
            ),
            content: <RateEmployeeInfo dataApplicants={dataApplicants} refetch={refetch} />,
        },
    ];
    return (
        <div className="all-employment-tabs mt-7">
            <HorizontalTabs tabsData={tabsData} />
        </div>
    );
};

export default TabEmployeeInfo;
