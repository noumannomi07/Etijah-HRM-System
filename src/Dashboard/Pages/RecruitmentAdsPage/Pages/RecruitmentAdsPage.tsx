import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FullRoutes } from "@/Routes/routes";
import { Loading } from "@/components";
import { useTranslation } from "react-i18next";

import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";

// import FormComponent from "./Components/form";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import { useJobs } from "@/hooks/api";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import PinAdsIcon from "@assets/images/sidebaricons/pinadsicon.svg";
import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import FormComponent from "./components/form";
import { withPermissions } from "@/hoc";
import { hasAnyPermission } from "@/utils/global";

const RecruitmentAdsPage = ({ permissions }: { permissions: any }) => {
    console.log({ permissions });
    const navigate = useNavigate();
    const { t } = useTranslation('recruitmentAds');

    const { queryAll, updateItem, deleteItem, isUpdating, isDeleting } =
        useJobs();
    
    const JOB_TYPES = [
        { value: "hybrid", label: t('jobTypes.hybrid') },
        { value: "remote", label: t('jobTypes.remote') },
        { value: "inhouse", label: t('jobTypes.inhouse') },
    ];

    const [modalState, setModalState] = useState({
        delete: false,
        edit: false,
    });

    const [selectedItem, setSelectedItem] = useState(null);

    const toggleModal = useCallback((modalName: string) => {
        setModalState((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await deleteItem(id);
            toast.success(t('messages.deleteSuccess'));
            toggleModal("delete");
        } catch (error) {
            toast.error(t('messages.deleteError'));
        }
    }, [t]);

    const handleUpdate = useCallback(
        async (values) => {
            console.log({ values });
            const payload = {
                ...values,
                type: values.type.value,
            };

            try {
                await updateItem({ id: selectedItem?.id, ...payload });
                toast.success(t('messages.updateSuccess'));
                toggleModal("edit");
            } catch (error) {
                toast.error(t('messages.updateError'));
            }
        },
        [selectedItem, t]
    );

    if (queryAll.isLoading) return <Loading />;

    const TABLE_HEADERS = [
        t('table.headers.arabicName'),
        t('table.headers.englishName'),
        t('table.headers.applicantsCount'),
        t('table.headers.jobType'),
        t('table.headers.createdDate'),
        ...(hasAnyPermission(permissions) ? [t('table.headers.actions')] : []),
    ];
    const renderTableRow = (item) => [
        <div key={`ar-${item.id}`} className="flex justify-center flex-col">
            <span>{item.ar_title}</span>
        </div>,
        <div key={`en-${item.id}`} className="flex justify-center flex-col">
            <span>{item.en_title}</span>
        </div>,
        item.applicants,
        item.type,
        new Date(item.created_at).toLocaleDateString("ar-EG"),
        ...(hasAnyPermission(permissions)
            ? [
                  <div key={item.id}>
                      <ButtonsActionShowEditDelete
                          hideShowFunction
                          functionShow={() => {}}
                          showLinkCopy={true}
                          functionLinkCopy={() => {
                              navigator.clipboard.writeText(item.link || "");
                              toast.success(t('messages.linkCopied'));
                          }}
                          hideEdit={!permissions?.update}
                          hideDelete={!permissions?.delete}
                          functionEdit={() => {
                              setSelectedItem(item);
                              toggleModal("edit");
                          }}
                          functionDelete={() => {
                              setSelectedItem(item);
                              toggleModal("delete");
                          }}
                      />
                  </div>,
              ]
            : []),
    ];

    return (
        <>
            <HelmetInfo titlePage={t('pageTitle')} />
            <header>
                <BreadcrumbsDefault
                    isShowTitleHomePage={false}
                    isShowSlashHome={false}
                    isDashboardRouteHomePage={false}
                    isShowNewLinkPage={true}
                    routeOfNewLinkPage={FullRoutes.Dashboard.RecruitmentAds.All}
                    iconNewPageText={<img src={PinAdsIcon} alt="pin ads" />}
                    textNewPage={t('breadcrumb.recruitmentAds')}
                />
            </header>

            <DeleteModal
                isOpen={modalState.delete}
                toggleModalDelete={() => toggleModal("delete")}
                onDelete={() => handleDelete(selectedItem?.id)}
                isDeleting={isDeleting}
                titleModal={t('deleteModal.title')}
                textModal={t('deleteModal.message')}
                textButtonYes={t('deleteModal.confirmButton')}
            />

            <div className="vacations-requests border-width-content">
                <DataTableTwo
                    theadContent={TABLE_HEADERS}
                    tbodyContent={queryAll.data?.map(renderTableRow) ?? []}
                    isShowContentFilterInfo={true}
                    withCheckboxes={false}
                    isTrueButtonsModalContentRight={permissions?.create}
                    functionButtonModalOne={() => {
                        navigate(
                            FullRoutes.Dashboard.RecruitmentAds.AddNewAdPage
                        );
                    }}
                    textContentButtonOne={t('buttons.addNewAd')}
                    isTrueButtonTwoModalContent={false}
                />
            </div>

            <CustomModal
                isOpen={modalState.edit}
                titleModal={t('form.editAdTitle', { title: selectedItem?.ar_title })}
                handleOpen={() => toggleModal("edit")}
            >
                <FormComponent
                    loading={isUpdating}
                    handleSubmit={handleUpdate}
                    cancel={() => toggleModal("edit")}
                    initialValuesForEdit={{
                        ar: { title: selectedItem?.ar_title },
                        en: { title: selectedItem?.en_title },
                        content: selectedItem?.content,
                        type: JOB_TYPES.find(
                            (type) => type.value === selectedItem?.type
                        ),
                        location: selectedItem?.location,
                        salary: selectedItem?.salary,
                    }}
                />
            </CustomModal>
        </>
    );
};

export default withPermissions(RecruitmentAdsPage, "employees_setting");
