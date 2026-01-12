import ListViewRectangle from "@assets/images/sidebaricons/listviewrectangle.svg";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import CardsHeaderTasks from "./CardsHeaderTasks";
import TableTasksPage from "./TableTasksPage";
import HorizontalTabs from "@/Dashboard/Shared/HorizontalTabs/HorizontalTabs";
import { FullRoutes } from "@/Routes/routes";
import { useTasks } from "@/hooks/Tasks";
import { Loading } from "@/components";
import { useTranslation } from "react-i18next";

const HomeTasksPage = () => {
    const { t } = useTranslation("tasks");
    const { data: tasks, isLoading, refetch } = useTasks();

    // Example usage of tasks and isLoadingTasks

    const tabsData = [
        {
            label: t("tabs.employeeTasks"),
            content: (
                <div className="mt-3">
                    <CardsHeaderTasks totals={tasks} />
                    <TableTasksPage data={tasks?.all_tasks} refetch={refetch} />
                </div>
            ),
        },
        {
            label: t("tabs.myTasks"),
            content: (
                <div className="mt-3">
                    <CardsHeaderTasks totals={tasks} />
                    <TableTasksPage data={tasks?.my_tasks} refetch={refetch} />
                </div>
            ),
        },
    ];
    return (
        <>
            <HelmetInfo titlePage={t("pageTitle.tasks")} />
            <header>
                <BreadcrumbsDefault
                    isShowTitleHomePage={false}
                    isShowSlashHome={false}
                    isDashboardRouteHomePage={false}
                    isShowNewLinkPage={true}
                    routeOfNewLinkPage={FullRoutes.Dashboard.Tasks.All}
                    iconNewPageText={<img src={ListViewRectangle} alt="tasks" />}
                    textNewPage={t("pageTitle.tasks")}
                    isPageDefault={false}
                    defaultePageRoute={FullRoutes.Dashboard.Tasks.All}
                    textDefaultPage={""}
                    isShowTitleTextPage={false}
                    titleTextPage={""}
                />
            </header>

            <main>
                {isLoading ? (
                    <Loading />
                ) : (
                    <HorizontalTabs
                        newClassName={""}
                        isBgTabButton={true}
                        tabsData={tabsData}
                    />
                )}
            </main>
        </>
    );
};

export default HomeTasksPage;
