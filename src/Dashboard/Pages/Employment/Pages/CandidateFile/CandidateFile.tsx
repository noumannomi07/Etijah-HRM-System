import UserAdd from "@assets/images/sidebaricons/useradd.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import TabEmployeeInfo from "./TabEmployeeInfo/TabEmployeeInfo";
import HeaderCandidateInfo from "./HeaderEmploymentInfo/HeaderCandidateInfo";
// import SideBarOutLayout from "@/Dashboard/Components/SidebarMenu/SideBarOutLayout";
import { FullRoutes } from "@/Routes/routes";
import { useParams } from "react-router-dom";
import { useApplicants } from "@/hooks/api";
import { Loading } from "@/components";
import React from "react";
import { useTranslation } from "react-i18next";

const CandidateFile = () => {
    const { t } = useTranslation('employment');
    const { id } = useParams();
    console.log(id);
    const { queryOne } = useApplicants();
    const {
        data: dataApplicants = [],
        isLoading,
        refetch,
    } = queryOne(id ?? "");

    return (
        <>
            <HelmetInfo titlePage={t('breadcrumb.candidateFile')} />
            <div className="pageSingle">
                {/* <SideBarOutLayout /> */}

                <header>
                    <BreadcrumbsDefault
                        isShowTitleHomePage={true}
                        isShowSlashHome={true}
                        isDashboardRouteHomePage={true}
                        isShowNewLinkPage={true}
                        routeOfNewLinkPage={FullRoutes.Dashboard.Employment.All}
                        iconNewPageText={<img src={UserAdd} alt="add user" />}
                        textNewPage={t('breadcrumb.employment')}
                        isPageDefault={false}
                        defaultPageRoute={false}
                        textDefaultPage={true}
                        isShowTitleTextPage={true}
                        titleTextPage={t('breadcrumb.candidateFile')}
                    />
                </header>

                <main>
                    <ButtonBack
                        isRouteDashboard={true}
                        routeLink="employment-page"
                        addNewRoute={false}
                        isTextBack={true}
                        AddNewTextButton={""}
                    />
                    <div
                        data-aos="fade-up"
                        className="all-main-candidate border-width-content mt-7"
                    >
                        {isLoading ? (
                            <Loading />
                        ) : (
                            <>
                                <HeaderCandidateInfo
                                    dataApplicants={dataApplicants}
                                    refetch={refetch}
                                />
                                <TabEmployeeInfo
                                    refetch={refetch}
                                    dataApplicants={dataApplicants}
                                />
                            </>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
};

export default CandidateFile;
