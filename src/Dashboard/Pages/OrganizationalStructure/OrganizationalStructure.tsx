import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import HomeOrganizationalStructure from "./Components/HomeOrganizationalStructure/HomeOrganizationalStructure";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import { withPermissions } from "@/hoc";
import { useTranslation } from "react-i18next";

const OrganizationalStructure = () => {
    const { t } = useTranslation('organizationalStructure');
    
    return (
        <>
            <HelmetInfo titlePage={t('pageTitle')} />

            <div className="pageSingle">
                {/* <SideBarOutLayout /> */}

                <header>
                    <BreadcrumbsDefault
                        isShowTitleHomePage={true}
                        isShowSlashHome={false}
                        isDashboardRouteHomePage={true}
                        isShowNewLinkPage={false}
                        routeOfNewLinkPage={false}
                        iconNewPageText={false}
                        textNewPage={false}
                        isPageDefault={false}
                        defaultPageRoute={false}
                        textDefaultPage={true}
                        isShowTitleTextPage={true}
                        titleTextPage={t('breadcrumb.organizationalStructure')}
                    />

                    <ButtonBack
                        isRouteDashboard={true}
                        routeLink="home-dashboard"
                        addNewRoute={false}
                        isTextBack={true}
                        AddNewTextButton={""}
                    />
                </header>

                <main data-aos="fade-up">
                    <HomeOrganizationalStructure />
                </main>
            </div>
        </>
    );
};

export default withPermissions(
    OrganizationalStructure,
    "organizational_structure"
);
