import React from "react";
import TaskDeleteIcon from "@assets/images/sidebaricons/taskdeleteicon.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import Form from "./form";
import { FullRoutes } from "@/Routes/routes";

const Index = () => {
    return (
        <>
            <HelmetInfo titlePage={"إضافة مخالفة جديد"} />

            <header>
                <BreadcrumbsDefault
                    isShowTitleHomePage={false}
                    isShowSlashHome={false}
                    isDashboardRouteHomePage={false}
                    isShowNewLinkPage={true}
                    routeOfNewLinkPage={
                        FullRoutes.Dashboard.ViolationsManagement.All
                    }
                    iconNewPageText={<img src={TaskDeleteIcon} />}
                    textNewPage={"إدارة المخالفات"}
                    isPageDefault={false}
                    isShowTitleTextPage={true}
                    titleTextPage={"إضافة مخالفة جديد"}
                />
            </header>
            <ButtonBack
                isRouteDashboard={true}
                routeLink="violations-management-page"
                addNewRoute={""}
                isTextBack={true}
            />
            <main data-aos="fade-up">
                <Form />
            </main>
        </>
    );
};

export default Index;
