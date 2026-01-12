import MoneyIcon from "@assets/images/sidebaricons/moneyicon.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import TabsAddSalary from "./TabsAddSalaryAdjustments/TabsAddSalary";
import { FullRoutes } from "@/Routes/routes";
import React from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { useTranslation } from "react-i18next";


const AddNewSalaryAdjustments = () => {
    const { t } = useTranslation('salaryAdjustments');
    
    return (
        <>
            <HelmetInfo titlePage={t('addNewTitle')} />

            <header>
                <BreadcrumbsDefault
                    isShowTitleHomePage={false}
                    isShowSlashHome={false}
                    isDashboardRouteHomePage={false}
                    isShowNewLinkPage={true}
                    routeOfNewLinkPage={
                        FullRoutes.Dashboard.SalaryAdjustments.All
                    }
                    iconNewPageText={<img src={MoneyIcon} alt="money" />}
                    textNewPage={t('pageTitle')}
                    isPageDefault={false}
                    defaultPageRoute={false}
                    textDefaultPage={false}
                    isShowTitleTextPage={true}
                    titleTextPage={t('addNewTitle')}
                />
            </header>
            <ButtonBack
                isRouteDashboard={true}
                routeLink="salary-adjustments"
                addNewRoute={false}
                isTextBack={true}
                AddNewTextButton={""}
            />
            <main data-aos="fade-up">
                <ErrorBoundary fallbackRender={({error, resetErrorBoundary}) => (
                    <div>
                        <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
                            <div className="text-red-600 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-semibold text-red-700 mb-2">{t('errorBoundary.title')}</h1>
                            <p className="text-red-600 mb-4 text-center">{error.message}</p>
                            <button 
                                onClick={resetErrorBoundary}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                {t('errorBoundary.retry')}
                            </button>
                        </div>
                    </div>
                )}>
                    <TabsAddSalary />
                </ErrorBoundary>
            </main>
        </>
    );
};

export default AddNewSalaryAdjustments;
