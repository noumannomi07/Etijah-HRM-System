import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";

import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";

// import FormComponent from "./Components/form";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import { useApplicants } from "@/hooks/api";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import PinAdsIcon from "@assets/images/sidebaricons/pinadsicon.svg";
import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import HeaderCardEmployment from "../Components/HeaderCardEmployment/HeaderCardEmployment";
import FilterTableEmployment from "../Components/FilterTableEmployment";
import axiosInstance from "@/utils/axios";
import ShowModal from "../Components/ShowModal";

const TABLE_HEADERS = [
    "الاسم",
    "البريد الإلكتروني",
    "الهاتف",
    "الوظيفة",
    "نوع الوظيفة",
    "الخبرة",
    "التعليم",
    "الإجراءات",
];

const ApplicantsPage = () => {
    const navigate = useNavigate();

    const { queryAll, deleteItem, isDeleting } = useApplicants();

    const [isUpdating, setIsUpdating] = useState(false);
    const [modalState, setModalState] = useState({
        delete: false,
        show: false,
        filter: false,
    });
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleModal = useCallback((modalName: string) => {
        setModalState((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await deleteItem(id);
            toast.success("تم الحذف بنجاح");
            toggleModal("delete");
        } catch (error) {
            toast.error("حدث خطأ أثناء الحذف");
        }
    }, []);
    const handleUpdateStatus = useCallback(
        async (status: string) => {
            setIsUpdating(true);
            try {
                await axiosInstance.post(`/job-applicants/status`, {
                    request_id: selectedItem?.id,
                    status,
                });
                toast.success("تم التحديث بنجاح");
                toggleModal("show");
                queryAll.refetch();
            } catch (error) {
                toast.error("حدث خطأ أثناء التحديث");
            } finally {
                setIsUpdating(false);
            }
        },
        [selectedItem?.id]
    );

    if (queryAll.isLoading) return <Loading />;

    const renderTableRow = (item) => [
        <div key={`name-${item.id}`} className="flex justify-center flex-col">
            <span>{item.name}</span>
        </div>,
        <div key={`email-${item.id}`} className="flex justify-center flex-col">
            <span>{item.email}</span>
        </div>,
        <div key={`phone-${item.id}`} className="flex justify-center flex-col">
            <span>{item.phone}</span>
        </div>,
        <div key={`job-${item.id}`} className="flex justify-center flex-col">
            <span>{item.job_title}</span>
        </div>,
        <div
            key={`job-type-${item.id}`}
            className="flex justify-center flex-col"
        >
            <span>{item.job_type}</span>
        </div>,
        <div
            key={`experience-${item.id}`}
            className="flex justify-center flex-col"
        >
            <span>{item.experience}</span>
        </div>,
        <div
            key={`education-${item.id}`}
            className="flex justify-center flex-col"
        >
            <span>{item.education}</span>
        </div>,
        <div key={item.id}>
            <ButtonsActionShowEditDelete
                hideEdit={false}
                hideDelete={false}
                functionEdit={() => {
                    navigate(
                        FullRoutes.Dashboard.Applicants.AddNewApplicantWithId({
                            id: item.id,
                        })
                    );
                }}
                functionDelete={() => {
                    setSelectedItem(item);
                    toggleModal("delete");
                }}
                functionShow={() => {
                    setSelectedItem(item);
                    toggleModal("show");
                }}
            />
        </div>,
    ];

    console.log({ queryAll: queryAll });

    return (
        <>
            <HelmetInfo titlePage={"إعلانات التوظيف"} />
            <header>
                <BreadcrumbsDefault
                    isShowTitleHomePage={false}
                    isShowSlashHome={false}
                    isDashboardRouteHomePage={false}
                    isShowNewLinkPage={true}
                    routeOfNewLinkPage={FullRoutes.Dashboard.RecruitmentAds.All}
                    iconNewPageText={<img src={PinAdsIcon} alt="pin ads" />}
                    textNewPage={"إعلانات التوظيف"}
                />
            </header>

            <FilterTableEmployment
                open={modalState.filter}
                hiddenModal={() => toggleModal("filter")}
            />

            <DeleteModal
                isOpen={modalState.delete}
                toggleModalDelete={() => toggleModal("delete")}
                onDelete={() => handleDelete(selectedItem?.id)}
                isDeleting={isDeleting}
            />

            <ShowModal
                isOpen={modalState.show}
                toggleModalShow={() => toggleModal("show")}
                onUpdateStatus={(status: string) => handleUpdateStatus(status)}
                isUpdating={isUpdating}
                selectedItemStatus={selectedItem?.status}
            />
            <HeaderCardEmployment totals={queryAll.data} />
            <div className="vacations-requests border-width-content mt-4">
                <DataTableTwo
                    theadContent={TABLE_HEADERS}
                    tbodyContent={
                        queryAll.data?.applicants?.map(renderTableRow) ?? []
                    }
                    isShowContentFilterInfo={true}
                    withCheckboxes={false}
                    isTrueButtonsModalContentRight={true}
                    functionButtonModalOne={() => {
                        navigate(
                            FullRoutes.Dashboard.Applicants.AddNewApplicant
                        );
                    }}
                    textContentButtonOne={"إضافة مرشح جديد"}
                    isTrueButtonTwoModalContent={false}
                    isShowModalButtonFilter={true}
                    functionButtonFilter={() => {
                        toggleModal("filter");
                    }}
                />
            </div>
        </>
    );
};

export default React.memo(ApplicantsPage);
