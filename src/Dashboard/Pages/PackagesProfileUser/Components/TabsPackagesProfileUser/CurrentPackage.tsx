import DeleteIcon from "@assets/Icons/DeleteIcon.svg";
import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import { dataPackages } from "@/Website/Pages/PackagesPage/Components/HeaderPackages/PackagesCards/DataPackages";
import PackageCardDetails from "@/Website/Pages/PackagesPage/Components/HeaderPackages/PackagesCards/PackageCardDetails";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import axiosInstance from "@/utils/axios";

interface Feature {
  id: number;
  title: string;
}

interface Package {
  id: number;
  title: string;
  content: string;
  image: string | null;
  status: number;
  six_price: string;
  year_price: string;
  employees_count: number;
  created_at: string;
  updated_at: string;
  features: Feature[];
}

interface Subscription {
  id: number;
  start_date: string;
  end_date: string;
  price: number;
  tax: number;
  duration: string;
  employee_count: number | null;
  created_at: string;
}

interface CurrentPackageData {
  package: Package;
  subscription: Subscription;
  dateDiff: number;
  my_employees: number;
  employeesDiff: number;
  package_days: number;
}

const CurrentPackage = () => {
  const [currentPackageData, setCurrentPackageData] = useState<CurrentPackageData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentPackage = async () => {
      try {
        const response = await axiosInstance.get("/current-package")
        setCurrentPackageData(response.data);
      } catch (error) {
        console.error('Error fetching current package:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentPackage();
  }, []);

  //   OPEN MODAL DELETE
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const buttonOpenModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };

  // SET LOADER BUTTON
  const [loader, setLoader] = useState(false);
  const buttonCancelSubscribe = () => {
    setLoader(true);
    setTimeout(() => {
      buttonOpenModalDelete();
      setLoader(false);
    }, 800);
  };

  if (loading) {
    return <SpinnerLoader />;
  }

  return (
    <>
      <ModalDelete
        iconDelete={<img src={DeleteIcon} />}
        openModalDelete={openModalDelete}
        hiddenModalDelete={buttonOpenModalDelete}
        titleModal="إلغاء الإشتراك ؟"
        textModal={
          "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى."
        }
        textButtonYes="نعم , إلغي"
      />
      <div className="current-packages">
        <div className="packages-cards">
          {currentPackageData && (
            <PackageCardDetails
              className={"!bg-white w-full  sm:w-[70%] lg:w-[50%] m-auto"}
              title={currentPackageData.package.title}
              description={currentPackageData.package.content}
              price={currentPackageData.package.year_price}
              features={currentPackageData.package.features.map(feature => feature.title)}
              isBestseller={false}
              hideButtonSubscribe={true}
            >
              {/* ==================== START PROGRESS INFO DETAILS ================== */}

              {/* add employees count  */}
              <div className="employees-count flex items-center justify-between bg-white p-3 rounded-lg mb-6 mt-8 border border-lightColorWhite2"> 
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span className="text-font-dark text-[16px] leading-snug mr-2">الموظفين</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center min-w-[60px]">
                    <span className={`text-[16px] leading-snug block mb-1 ${currentPackageData.package.employees_count > currentPackageData.my_employees ? 'text-green-600' : 'text-red-600'}`}>
                      {currentPackageData.package.employees_count}
                    </span>
                    <span className="text-font-gray text-[14px] leading-snug block">متاح</span>
                  </div>
                  <div className="h-8 w-px bg-lightColorWhite2"></div>
                  <div className="text-center min-w-[60px]">
                    <span className={`text-[16px] leading-snug block mb-1 ${currentPackageData.package.employees_count > currentPackageData.my_employees ? 'text-font-dark' : 'text-red-600'}`}>
                      {currentPackageData.my_employees}
                    </span>
                    <span className="text-font-gray text-[14px] leading-snug block">مستخدم</span>
                  </div>
                </div>
              </div>

              <div className="progress-info w-full mt-2 mb-6">
                <div className="top-content-pro self-stretch w-full mb-2 justify-between items-center inline-flex">
                  <h2 className="text-font-gray  leading-snug">
                    متبقي على تجديد الإشتراك
                  </h2>
                  <p className="text-font-dark text-[16px] leading-snug">
                    {currentPackageData.dateDiff} أيام من {currentPackageData.package_days} يوم
                  </p>
                </div>
                <div className="self-stretch h-[16px]  bg-lightColorWhite2 rounded-[10px] flex-col justify-between  flex">
                  <div 
                    className="grow shrink basis-0 bg-orangeColor rounded-[10px]" 
                    style={{ width: `${(currentPackageData.dateDiff / currentPackageData.package_days) * 100}%` }} 
                  />
                </div>
              </div>
              {/* ==================== END PROGRESS INFO DETAILS ================== */}
              <div
                className="btn-main button-primary height--50"
                // onClick open link whatsapp
                onClick={() => window.open("https://wa.me/966599999999", "_blank")}
              >
                {loader ? <SpinnerLoader /> : " تجديد الاشتراك او ترقية الباقة؟ تواصل معنا"}
              </div>
            </PackageCardDetails>
          )}
        </div>
      </div>
    </>
  );
};

export default CurrentPackage;
