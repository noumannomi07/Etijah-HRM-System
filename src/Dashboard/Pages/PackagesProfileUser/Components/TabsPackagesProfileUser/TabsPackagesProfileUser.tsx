import HorizontalTabs from "@/Dashboard/Shared/HorizontalTabs/HorizontalTabs";
import CurrentPackage from "./CurrentPackage";
import AllPackages from "./AllPackages";
import "./TabsPackagesProfileUser.css";
const TabsPackagesProfileUser = () => {
  const tabsData = [
    {
      label: "الباقة الحالية",
      content: <CurrentPackage />
    },
    {
      label: "جميع الباقات",
      content: <AllPackages />
    }
  ];
  return (
    <div className="profile-packages bg-lightGrayColor rounded-[16px] p-[25px_12px] sm:p-[25px] mt-6">
      <HorizontalTabs
        isBgTabButton={true}
        newClassName="mt-5 custom-tab-profile"
        tabsData={tabsData}
      />
    </div>
  );
};

export default TabsPackagesProfileUser;
