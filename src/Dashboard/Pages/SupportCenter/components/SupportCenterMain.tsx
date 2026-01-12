import React, { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { Loading } from "@/components";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/utils/axios";

// Issue type mapping utility
const getIssueTypeLabel = (issueType: string, t: any) => {
    return t(`supportCenter.issueTypes.${issueType}`, { defaultValue: issueType });
};

// Priority mapping utility
const getPriorityLabel = (priority: string, t: any) => {
    return t(`supportCenter.priorities.${priority}`, { defaultValue: priority });
};

// Status mapping utility
const getStatusLabel = (status: string, t: any) => {
    return t(`supportCenter.statuses.${status}`, { defaultValue: status });
};

import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import DeleteModal from "@/Dashboard/Shared/DeleteModal/DeleteModal";
import { useSupports } from "@/hooks/api";
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault";
import ButtonsActionShowEditDelete from "@/Dashboard/Shared/DataTableInfo/ActionsButtons/ButtonsActionShowEditDelete";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import FormComponent from "./form";
import ViewSupportModal from "./ViewSupportModal";
import { hasAnyPermission } from "@/utils/global";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";



const SupportCenterMain = ({ permissions }: { permissions: any }) => {
    console.log({ permissions });
    const { t, i18n } = useTranslation("orders");

    const { queryAll, queryOne, deleteItem, isDeleting, createItem, isCreating } = useSupports();
    const [modalState, setModalState] = useState({
        delete: false,
        addNew: false,
        view: false,
    });

    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [viewItemId, setViewItemId] = useState<string | null>(null);
    const [isViewLoading, setIsViewLoading] = useState(false);
    const [viewItemData, setViewItemData] = useState<any>(null);
    const [viewError, setViewError] = useState<Error | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleModal = useCallback((modalName: keyof typeof modalState) => {
        setModalState((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
    }, []);

    // Comprehensive search function
    const searchSupportTickets = useCallback((tickets: any[], searchTerm: string) => {
        if (!searchTerm.trim()) return tickets;
        
        const lowerSearchTerm = searchTerm.toLowerCase();
        
        return tickets.filter((ticket) => {
            // Format dates for search (both English and Arabic)
            const locale = i18n.language === 'ar' ? 'ar-SA' : 'en-GB';
            const formattedCreatedDate = ticket.created_at ? 
                new Date(ticket.created_at).toLocaleDateString(locale, {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                }) : '';
            
            const formattedUpdatedDate = ticket.updated_at ? 
                new Date(ticket.updated_at).toLocaleDateString(locale, {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                }) : '';

            // Search in all relevant fields
            const searchableFields = [
                ticket.id?.toString() || '',
                ticket.issue_type || '',
                ticket.status || '',
                ticket.priority || '',
                ticket.description || '',
                ticket.created_at || '',
                ticket.updated_at || '',
                ticket.tenant_id || '',
                ticket.office_id?.toString() || '',
                ticket.file || '',
                // Add formatted dates for search
                formattedCreatedDate,
                formattedUpdatedDate,
                // Add translated labels for better search
                getIssueTypeLabel(ticket.issue_type, t),
                getPriorityLabel(ticket.priority, t),
                getStatusLabel(ticket.status, t),
            ];
            
            // Check if any field contains the search term
            return searchableFields.some(field => 
                field.toLowerCase().includes(lowerSearchTerm)
            );
        });
    }, [t, i18n.language]);

    // Handle search input change
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleDelete = useCallback(async (id: string) => {
        try {
            await deleteItem(id);
            toast.success(t("supportCenter.messages.ticketDeleted"));
            toggleModal("delete");
        } catch (error) {
            toast.error(t("supportCenter.messages.errorDeleting"));
        }
    }, []);

    const handleAddNew = useCallback(
        async (values: any) => {
            console.log({ values });

            // Create FormData for multipart/form-data submission
            const formData = new FormData();
            formData.append('description', values.description);
            formData.append('issue_type', values.issueType);
            formData.append('priority', values.priority);

            // Add file if provided
            if (values.file) {
                formData.append('file', values.file);
            }

            try {
                await createItem(formData);
                toast.success(t("supportCenter.messages.ticketCreated"));
                toggleModal("addNew");
            } catch (error) {
                console.error("Error creating support ticket:", error);
                toast.error(t("supportCenter.messages.errorCreating"));
            }
        },
        [createItem, toggleModal]
    );

    const handleViewItem = useCallback(async (item: any) => {
        try {
            // Set loading state and clear previous data
            setIsViewLoading(true);
            setViewItemData(null);
            setViewError(null);
            setViewItemId(item.id);
            toggleModal("view");

            // Fetch the support ticket data using axios
            const response = await axiosInstance.get(`/get-support/${item.id}`);
            setViewItemData(response.data.support || response.data);
            setIsViewLoading(false);
        } catch (error) {
            console.error("Error viewing support ticket:", error);
            setViewError(error as Error);
            setIsViewLoading(false);
            toast.error(t("supportCenter.messages.errorViewing"));
        }
    }, [toggleModal]);

    const handleCloseView = useCallback(() => {
        setViewItemId(null);
        setIsViewLoading(false);
        setViewItemData(null);
        setViewError(null);
        toggleModal("view");
    }, [toggleModal]);


    if (queryAll.isLoading) return <Loading />;

    const TABLE_HEADERS = [
        t("supportCenter.tableHeaders.ticketId"),
        t("supportCenter.tableHeaders.issueType"),
        t("supportCenter.tableHeaders.status"),
        t("supportCenter.tableHeaders.priority"),
        t("supportCenter.tableHeaders.createdDate"),
        ...(hasAnyPermission(permissions) ? [t("supportCenter.tableHeaders.actions")] : []),
    ];
    const renderTableRow = (item: any): (string | React.ReactElement)[] => [
        <div key={`ticket-${item.id}`} className="flex justify-center flex-col">
            <span className="font-mono text-sm">#{item.id}</span>
        </div>,
        <div key={`issue-${item.id}`} className="flex justify-center flex-col">
            <div>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {getIssueTypeLabel(item.issue_type, t)}
                </span>
            </div>
        </div>,
        <div key={`status-${item.id}`} className="flex justify-center flex-col">
            <div>
                <span className={`px-4 py-2 rounded-full text-xs ${item.status === 'open' ? 'bg-green-100 text-green-800' :
                    item.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        item.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                    }`}>
                    {t(`supportCenter.statuses.${item.status}`, { defaultValue: item.status })}
                </span>
            </div>
        </div>,
        <div key={`priority-${item.id}`} className="flex justify-center flex-col">
        <div>
                <span className={`px-4 py-2 rounded-full text-xs ${item.priority === 'high' ? 'bg-red-100 text-red-800' :
                item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                }`}>
                {t(`supportCenter.priorities.${item.priority}`, { defaultValue: item.priority })}
            </span>
        </div>
        </div>,

        <div key={`date-${item.id}`} className="flex justify-center flex-col">
            <span className="text-sm">{new Date(item.created_at).toLocaleDateString("en-GB", {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            })}</span>
        </div>,
        ...(hasAnyPermission(permissions)
            ? [
                <div key={item.id} className="flex justify-center">
                    <ButtonsActionShowEditDelete
                        hideShowFunction={false}
                        functionShow={() => handleViewItem(item)}
                        showLinkCopy={false}
                        functionLinkCopy={() => { }}
                        hideEdit={true}
                        functionEdit={() => { }}
                        hideDelete={!permissions?.delete}
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
        <div>


            <BreadcrumbsDefault
                isShowTitleHomePage={false}
                isShowSlashHome={false}
                isDashboardRouteHomePage={false}
                isShowNewLinkPage={true}
                routeOfNewLinkPage=""
                // routeOfNewLinkPage={FullRoutes.Dashboard.RecruitmentAds.All}
                iconNewPageText={
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 11.424C17 11.078 17 10.905 17.052 10.751C17.203 10.303 17.602 10.13 18.002 9.94799C18.45 9.74299 18.674 9.64099 18.897 9.62299C19.149 9.60299 19.402 9.65699 19.618 9.77799C19.904 9.93799 20.104 10.244 20.308 10.492C21.251 11.638 21.723 12.211 21.895 12.842C22.035 13.352 22.035 13.886 21.895 14.395C21.644 15.317 20.849 16.089 20.26 16.805C19.959 17.17 19.808 17.353 19.618 17.46C19.3983 17.5818 19.1474 17.6358 18.897 17.615C18.674 17.597 18.45 17.495 18.001 17.29C17.601 17.108 17.203 16.935 17.052 16.487C17 16.333 17 16.16 17 15.814V11.424ZM7.00003 11.424C7.00003 10.988 6.98803 10.597 6.63603 10.291C6.50803 10.18 6.33803 10.103 5.99903 9.94799C5.55003 9.74399 5.32603 9.64099 5.10303 9.62299C4.43603 9.56899 4.07703 10.025 3.69303 10.493C2.74903 11.638 2.27703 12.211 2.10403 12.843C1.96483 13.3513 1.96483 13.8877 2.10403 14.396C2.35603 15.317 3.15203 16.09 3.74003 16.805C4.11103 17.255 4.46603 17.666 5.10303 17.615C5.32603 17.597 5.55003 17.495 5.99903 17.29C6.33903 17.136 6.50803 17.058 6.63603 16.947C6.98803 16.641 7.00003 16.25 7.00003 15.815V11.424Z" stroke="#767D8B" strokeWidth="1.5"/>
                        <path d="M5.00006 9.61899C5.00006 6.30499 8.13406 3.61899 12.0001 3.61899C15.8661 3.61899 19.0001 6.30499 19.0001 9.61899" stroke="#767D8B" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
                        <path d="M19 17.619V18.419C19 20.186 17.21 21.619 15 21.619H13" stroke="#767D8B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                }
                textNewPage={t("supportCenter.title")}
            />

            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("supportCenter.title")}
                    routePageInfo="false"
                    textLink="false"
                    buttonAddNewOrder={true}
                    functionButtonAddNewOrder={() => {
                        toggleModal("addNew");
                    }}
                    newButtonWithoutText={false}
                    functionButtonNewButton={() => { }}
                    textButton=""
                    newComponentsHere={false}
                    customButtonText={t("supportCenter.newRequest")}
                />
                <DataTableTwo
                    theadContent={TABLE_HEADERS}
                    tbodyContent={(() => {
                        const supports = Array.isArray((queryAll.data as any)?.supports) ? (queryAll.data as any).supports : [];
                        const filteredSupports = searchSupportTickets(supports, searchTerm);
                        return filteredSupports.map(renderTableRow).filter(Boolean);
                    })()}
                    isShowContentFilterInfo={true}
                    withCheckboxes={false}
                    isShowModalButtonFilter={false}
                    functionButtonFilter={() => { }}
                    isTrueButtonsModalContentRight={false}
                    textContentButtonOne="إضافة طلب جديد"
                    functionButtonModalOne={() => {
                        toggleModal("addNew");
                    }}
                    isTrueButtonTwoModalContent={false}
                    newClassButtonTwo=""
                    functionModalButtonTwo={() => { }}
                    showDateFilter={false}
                    onChangeDateFilter={() => { }}
                    textContetButtonTwo=""
                    onSearchChange={handleSearchChange}
                    showButtonImportExcel={false}
                />
            </div>

            {/* Add New Support Ticket Modal */}
            <CustomModal
                isOpen={modalState.addNew}
                handleOpen={() => toggleModal("addNew")}
                titleModal={t("supportCenter.newTicket")}
            >
                <FormComponent
                    onSubmit={handleAddNew}
                    onCancel={() => toggleModal("addNew")}
                    isLoading={isCreating}
                />
            </CustomModal>

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={modalState.delete}
                toggleModalDelete={() => toggleModal("delete")}
                titleModal={t("supportCenter.deleteModal.title")}
                textModal={t("supportCenter.deleteModal.message")}
                onDelete={() => handleDelete(selectedItem?.id)}
                isDeleting={isDeleting}
            />

            {/* View Support Ticket Modal */}
            <ViewSupportModal
                isOpen={modalState.view}
                onClose={handleCloseView}
                supportData={viewItemData}
                isLoading={isViewLoading}
                error={viewError}
            />

        </div>
    )
}

export default SupportCenterMain
