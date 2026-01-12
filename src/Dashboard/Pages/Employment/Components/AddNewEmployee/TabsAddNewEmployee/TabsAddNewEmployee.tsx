import StarIcon from "@assets/images/sidebaricons/staricon.svg";
import UsersIcon from "@assets/images/sidebaricons/usersicon.svg";
import HorizontalTabs from "@/Dashboard/Shared/HorizontalTabs/HorizontalTabs";
import FormInformationEmployee from "./FormInformationEmployee";
import TabCandidateEvaluation from "./TabCandidateEvaluation";
import { useTranslation } from "react-i18next";

const TabsAddNewEmployee = () => {
  const { t } = useTranslation('employment');
  
  const tabsData = [
    {
      label: (
        <>
          <img src={UsersIcon} alt="users" /> {t('addCandidate.tabs.personalInfo')}
        </>
      ),
      content: <FormInformationEmployee />
    },
    {
      label: (
        <>
          <img src={StarIcon} alt="star" /> {t('addCandidate.tabs.evaluation')}
        </>
      ),
      content: <TabCandidateEvaluation />
    }
  ];
  return <HorizontalTabs newClassName="mt-5" tabsData={tabsData} />;
};

export default TabsAddNewEmployee;
