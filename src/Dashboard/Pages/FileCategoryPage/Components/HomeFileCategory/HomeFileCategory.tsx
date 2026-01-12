import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import { FullRoutes } from "@/Routes/routes";
import GridIcon2 from "@assets/images/sidebaricons/gridicon2.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import TableFileCategory from "./TableFileCategory/TableFileCategory";
import { useTranslation } from "react-i18next";

const HomeFileCategory = () => {
    const { t } = useTranslation('fileCategory');
    return (
        <>
            <HelmetInfo titlePage={t('title')} />
            <header>
                <BreadcrumbsDefault
                    isShowTitleHomePage={true}
                    isShowSlashHome={true}
                    isDashboardRouteHomePage={false}
                    isShowNewLinkPage={true}
                    routeOfNewLinkPage={FullRoutes.Dashboard.FileCategory.All}
                    iconNewPageText={<img src={GridIcon2} alt="grid" />}
                    textNewPage={"مستندات الموظفين"}
                    isPageDefault={false}
                    defaultPageRoute={false}
                    textDefaultPage={false}
                    isShowTitleTextPage={false}
                    titleTextPage={false}
                />
            </header>

            <main data-aos="fade-up">
                <TableFileCategory />
            </main>
        </>
    );
};

export default HomeFileCategory;
