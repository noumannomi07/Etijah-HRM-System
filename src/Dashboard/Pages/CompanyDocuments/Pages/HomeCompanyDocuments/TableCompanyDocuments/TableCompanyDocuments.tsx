import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalDetailsCompanyDocuments from "./ModalDetailsCompanyDocuments/ModalDetailsCompanyDocuments";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import ModalFilterCompanyDocuments from "./ModalFilterCompanyDocuments/ModalFilterCompanyDocuments";
import ModalDelete from "@/Dashboard/Shared/ModalDelete/ModalDelete";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import theDateObj from "@/Dashboard/DateMonthDays";
import { toast } from "react-toastify";
import { FullRoutes } from "@/Routes/routes";
import { withPermissions } from "@/hoc";
import { useTranslation } from "react-i18next";

const TableCompanyDocuments = ({ permissions }: { permissions: any }) => {
    const { t } = useTranslation('companyDocuments');
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const [Datass, setData] = useState([]);
    const [loading, setloading] = useState(true);
    const [refetch, setrefetch] = useState(false);
    // ID OF TD TO ROUTE OF TD ID
    const [selectedDocument, setSelectedDocument] = useState(null);

    // SHOW MODAL DETAILS COMPANY DOCUMENTS
    const [openDetailsDocuments, setOpenDetailsDocuments] = useState(false);
    const handleOpenDetailsDocuments = (document) => {
        // setSelectedDocument(document); // ADD ID OF PAGE SELECTED
        setOpenDetailsDocuments(true); // SHOW MODAL
    };
    const hiddenDetailsDocuments = () => setOpenDetailsDocuments(false);

    const refetchFunc = () => {
        setrefetch(Math.random() * 100000000);
    };
    const langgg = i18next.language;

    useEffect(() => {
        axiosInstance
            .get("/file", {
                headers: {
                    "Accept-Language": langgg,
                },
            })
            .then((res) => {
                setData(res.data.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setloading(false);
            });
    }, [refetch, langgg]);
    const handleDeleteItem = () => {
        if (selectedDocument !== null) {
            // FILTER THE DATA TO REMOVE THE ITEMS WITH ID
            axiosInstance
                .delete(`/file/${selectedDocument.id}`, {
                    headers: {
                        "Accept-Language": langgg, // Replace "en" with your desired language code
                    },
                })
                .then((res) => {
                    refetchFunc();
                })
                .catch((error) => {
                    toast.error(t('messages.deleteError'));
                });
        }
    };
    const theadTrContent = [
        t('table.headers.documentName'),
        t('table.headers.documentType'),
        t('table.headers.description'),
        t('table.headers.dateAdded'),
        t('table.headers.actions'),
    ];

    // CONTENT OF ARRAY
    const tbodyContent = Datass.map((item) => [
        item.title,
        <div key={item.id} className="status-primary">
            {item.extension}
        </div>,
        item.content === null ? t('table.noDescription') : item.content,
        langgg == "ar"
            ? theDateObj.formatDataFunctionAR(item.created_at)
            : theDateObj.formatDataFunctionEN(item.created_at),
        <button
            onClick={() => {
                handleOpenDetailsDocuments(item);
                setSelectedDocument(item);
            }} //PASS ITEM ID SELECTED
            className="btn-main button-green"
            key={item.id}
        >
            {t('buttons.view')}
        </button>,
    ]);

    const navigate = useNavigate();

    // MODAL DELETE
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

    const openDeleteModal = () => setIsModalDeleteOpen(true);
    const closeDeleteModal = () => setIsModalDeleteOpen(false);

    return (
        <>
            <ModalDelete
                openModalDelete={isModalDeleteOpen}
                hiddenModalDelete={closeDeleteModal}
                titleModal={t('deleteModal.title')}
                textModal={t('deleteModal.message')}
                onDelete={handleDeleteItem}
            />
            {selectedDocument && ( // SHOW MODAL SLECTED ID
                <ModalDetailsCompanyDocuments
                    openModalDetailsDocuments={openDetailsDocuments}
                    hiddenModalDetailsDocuments={hiddenDetailsDocuments}
                    selectedDocument={selectedDocument}
                    handleButtonDelete={() => {
                        hiddenDetailsDocuments();
                        openDeleteModal();
                    }}
                    buttonEditPageRoute={FullRoutes.Dashboard.CompanyDocuments.AddNewCompanyDocumentsWithId(
                        { id: selectedDocument.id }
                    )}
                />
            )}

            <ModalFilterCompanyDocuments open={open} hiddenModal={handleOpen} />

            <div className="table-employment-requests border-width-content">
                <DataTableTwo
                    theadContent={theadTrContent}
                    tbodyContent={tbodyContent}
                    withCheckboxes={false}
                    isShowContentFilterInfo={true}
                    isShowModalButtonFilter={true}
                    functionButtonFilter={handleOpen}
                    isTrueButtonsModalContentRight={permissions?.create}
                    functionButtonModalOne={() => {
                        navigate(
                            FullRoutes.Dashboard.CompanyDocuments
                                .AddNewCompanyDocuments
                        );
                    }}
                    textContentButtonOne={t('buttons.addNewDocument')}
                    isTrueButtonTwoModalContent={false}
                    newClassButtonTwo={false}
                    functionModalButtonTwo={false}
                    textContetButtonTwo={false}
                />
            </div>
        </>
    );
};

export default withPermissions(TableCompanyDocuments, "company_documents", {
    isComponent: true,
});
