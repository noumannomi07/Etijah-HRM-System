import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FormComponent from "./form";
import { useJobs } from "@/hooks/api";
import { toast } from "react-toastify";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import { FullRoutes } from "@/Routes/routes";
import PinAdsIcon from "@assets/images/sidebaricons/pinadsicon.svg";

const Index = () => {
    const navigate = useNavigate();
    const { t } = useTranslation('recruitmentAds');

    const { createItem, isCreating } = useJobs();

    const handleSubmit = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append("en[title]", values.en?.title);
            formData.append("ar[title]", values.ar?.title);
            formData.append("content", values.content);
            formData.append("location", values.location);
            values.salary && formData.append("salary", values.salary);
            formData.append("type", values.type);
            formData.append("image", values.image);
 
            await createItem(formData);
            toast.success(t('messages.createSuccess'));
            navigate(-1);
        } catch (error) {
            toast.error(error?.message || t('messages.createError'));
        }
    };
    return (
        <>
            <header>
                <BreadcrumbsDefault
                    isShowTitleHomePage={false}
                    isShowSlashHome={false}
                    isDashboardRouteHomePage={false}
                    isShowNewLinkPage={true}
                    routeOfNewLinkPage={FullRoutes.Dashboard.RecruitmentAds.All}
                    iconNewPageText={<img src={PinAdsIcon} alt="pin ads" />}
                    textNewPage={t('breadcrumb.recruitmentAds')}
                    isShowTitleTextPage={true}
                    titleTextPage={t('breadcrumb.addNewAd')}
                />
                <ButtonBack
                    isRouteDashboard={true}
                    routeLink="recruitment-ads-page"
                    addNewRoute={false}
                    isTextBack={true}
                    AddNewTextButton={""}
                />
            </header>
            <main>
                <div className="all-conent-permission mt-5 border-width-content">
                    <FormComponent
                        loading={isCreating}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </main>
        </>
    );
};

export default Index;
