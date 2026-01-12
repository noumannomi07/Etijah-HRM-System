import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import FormComponent from "./form";
import { useApplicants, useJobs } from "@/hooks/api";
import { toast } from "react-toastify";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import { FullRoutes } from "@/Routes/routes";
import PinAdsIcon from "@assets/images/sidebaricons/pinadsicon.svg";
import { Loading } from "@/components";
const JOB_TYPES = [
    { value: "hybrid", label: "مزدوج" },
    { value: "remote", label: "عن بعد" },
    { value: "inhouse", label: "من المنزل" },
];
const Index = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { queryAll: jobOptions, isLoading: isLoadingJobOptions } = useJobs();

    const { createItem, isCreating, isUpdating, updateItem, queryOne } =
        useApplicants();

    const { data: dataApplicants = [], isLoading } = queryOne(id ?? "");
    console.log({ dataApplicants });

    const handleSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append("job_id", values.job_id.value);
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("phone", values.phone);
            formData.append("cv", values.cv);
            formData.append("job_title", values.job_title);
            formData.append("job_type", values.job_type.value);
            formData.append("experience", values.experience);
            formData.append("education", values.education);
            formData.append("skills", values.skills);
            formData.append("address", values.address);

            if (id) {
                await updateItem({
                    id,
                    job_id: values.job_id.value,
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    // cv: values.cv,
                    job_title: values.job_title,
                    job_type: values.job_type.value,
                    experience: values.experience,
                    education: values.education,
                    skills: values.skills,
                    address: values.address,
                });
                toast.success("تم تعديل المرشح بنجاح!");
            } else {
                await createItem(formData);
                toast.success("تم إضافة المرشح بنجاح!");
            }
            navigate(-1);
        } catch (error) {
            toast.error(error?.message || "حدث خطأ أثناء إضافة المرشح");
        }
    };

    if ((isLoading && id) || isLoadingJobOptions) {
        return <Loading />;
    }
    return (
        <>
            <header>
                <BreadcrumbsDefault
                    isShowTitleHomePage={false}
                    isShowSlashHome={false}
                    isDashboardRouteHomePage={false}
                    isShowNewLinkPage={true}
                    routeOfNewLinkPage={FullRoutes.Dashboard.Applicants.All}
                    iconNewPageText={<img src={PinAdsIcon} alt="pin ads" />}
                    textNewPage={"المرشحين"}
                    isShowTitleTextPage={true}
                    titleTextPage={id ? "تعديل المرشح" : "إضافة مرشح جديد"}
                />
                <ButtonBack
                    isRouteDashboard={true}
                    routeLink="applicants-page"
                    addNewRoute={false}
                    isTextBack={true}
                    AddNewTextButton={""}
                />
            </header>
            <main>
                <div className="all-conent-permission mt-5 border-width-content">
                    <FormComponent
                        loading={isCreating || isUpdating}
                        handleSubmit={handleSubmit}
                        jobOptions={jobOptions?.data}
                        initialValuesForEdit={
                            id
                                ? {
                                      ...dataApplicants,
                                      job_type: JOB_TYPES.find(
                                          (item) =>
                                              item.value ==
                                              dataApplicants.job_type
                                      ),
                                      job_id: {
                                          value: dataApplicants.job?.id,
                                          label: dataApplicants.job?.title,
                                      },
                                  }
                                : null
                        }
                    />
                </div>
            </main>
        </>
    );
};

export default Index;
