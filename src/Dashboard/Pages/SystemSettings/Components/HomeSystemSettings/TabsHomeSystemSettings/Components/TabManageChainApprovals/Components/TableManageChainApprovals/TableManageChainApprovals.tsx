import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import { useApprovals } from "@/hooks/orders/approvals";
import React, { useState } from "react";
import { useEmployeeSelect } from "@/hooks/employee/mini-for-select/useEmployeeForSelect";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { Employee } from "@/Dashboard/Pages/types";
import axiosInstance from "@/utils/axios";

// MUI components
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
} from "@mui/material";
import { toast } from "react-toastify";

interface ModalState {
    isOpen: boolean;
    section: {
        key: string;
        title: string;
        data: Array<{
            id: number;
            employee: Employee;
            role?: "hr" | "manager";
        }>;
    } | null;
}

const TableManageChainApprovals = ({ permissions }: { permissions: any }) => {
    const {
        data: approvals,
        isPending: isPendingApprovals,
        refetch,
    } = useApprovals();
    const { t } = useTranslation("systemSettings");
    const [modalState, setModalState] = useState<ModalState>({
        isOpen: false,
        section: null,
    });
    const { data: employees, isLoading: isLoadingEmployees } =
        useEmployeeSelect();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const roleOptions = [
        { value: "hr", label: t("approvalChainsManagement.roles.hr") },
        {
            value: "manager",
            label: t("approvalChainsManagement.roles.manager"),
        },
    ];

    const formik = useFormik({
        initialValues: {
            selectedEmployees: [
                ...(modalState?.section?.data?.map((item) =>
                    String(item.employee.id)
                ) || []),
            ] as string[],
            selectedRoles: [ 
                ...(modalState.section?.key == "leave_hr"
                    ? ((approvals as any)?.leave_type && typeof (approvals as any)?.leave_type === 'string')
                        ? (approvals as any).leave_type.split("&")
                        : []
                    : []),
                ...(modalState.section?.key == "vacation_hr"
                    ? ((approvals as any)?.vacation_type && typeof (approvals as any)?.vacation_type === 'string')
                        ? (approvals as any).vacation_type.split("&")
                        : []
                    : []),
            ] as string[],
        },
        validationSchema: Yup.object({
            selectedEmployees: Yup.array().of(Yup.string()),
            selectedRoles: Yup.array().of(
                Yup.string().oneOf(["hr", "manager"])
            ),
        }),
        enableReinitialize: true,
        onSubmit: async (values) => {
            setIsSubmitting(true);
            try {
                if (
                    !values.selectedRoles.length &&
                    (modalState?.section?.key == "vacation_hr" ||
                        modalState?.section?.key == "leave_hr")
                ) {
                    toast.error(t("approvalChainsManagement.selectRoles"));
                    return;
                }
                const sectionKey = modalState.section?.key;
                if (!sectionKey) return;
                const payload: Record<string, any> = {};

                // List of all section keys
                const allSections = [
                    "vacation_hr",
                    "leave_hr",
                    "ticket_hr",
                    "expense_hr",
                    "letter_hr",
                    "advance_hr",
                ];

                // Helper to get employee IDs for a section
                const getEmployeeIds = (section: string) => {
                    if (section === sectionKey) {
                        return values.selectedEmployees;
                    }
                    // Use current approvals data for other sections
                    const sectionData =
                        approvals?.[section as keyof typeof approvals];
                    if (Array.isArray(sectionData)) {
                        return sectionData.map((item: any) =>
                            String(item.employee.id)
                        );
                    }
                    return [];
                };

                // Add all sections' employee IDs
                allSections.forEach((section) => {
                    payload[section] = getEmployeeIds(section);
                });

                // Handle vacation_type and leave_type
                if (sectionKey === "vacation_hr") {
                    payload["vacation_type"] = values.selectedRoles.join("&");
                    payload["leave_type"] = (approvals as any)?.leave || "";
                } else if (sectionKey === "leave_hr") {
                    payload["leave_type"] = values.selectedRoles.join("&");
                    payload["vacation_type"] =
                        (approvals as any)?.vacation || "";
                } else {
                    payload["vacation_type"] =
                        (approvals as any)?.vacation || "";
                    payload["leave_type"] = (approvals as any)?.leave || "";
                }

                // POST as x-www-form-urlencoded
                const formData = new URLSearchParams();
                Object.entries(payload).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        value.forEach((v, i) => {
                            formData.append(`${key}[${i}]`, v);
                        });
                    } else {
                        formData.append(key, value);
                    }
                });
                await axiosInstance.post("/approval", formData, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                });
                formik.resetForm();
                refetch();
                setModalState({ isOpen: false, section: null });
            } catch (error: any) {
                console.log(error);
                toast.error(error.response?.data?.message);
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    const ApprovalTypeToArabic = {
        vacation: t("approvalChainsManagement.vacation"),
        leave: t("approvalChainsManagement.leave"),
        ticket: t("approvalChainsManagement.ticket"),
        expense: t("approvalChainsManagement.expense"),
        letter: t("approvalChainsManagement.letter"),
        advance: t("approvalChainsManagement.advance"),
    };

    const renderAccordions = () => {
        if (!approvals) return null;

        const accordionSections = [
            {
                key: "vacation_hr",
                title: ApprovalTypeToArabic.vacation,
                data: approvals.vacation_hr || [],
            },
            {
                key: "leave_hr",
                title: ApprovalTypeToArabic.leave,
                data: approvals.leave_hr || [],
            },
            {
                key: "ticket_hr",
                title: ApprovalTypeToArabic.ticket,
                data: approvals.ticket_hr || [],
            },
            {
                key: "expense_hr",
                title: ApprovalTypeToArabic.expense,
                data: approvals.expense_hr || [],
            },
            {
                key: "letter_hr",
                title: ApprovalTypeToArabic.letter,
                data: approvals.letter_hr || [],
            },
            {
                key: "advance_hr",
                title: ApprovalTypeToArabic.advance,
                data: approvals.advance_hr || [],
            },
        ];

        return accordionSections.map((section) => (
            <Accordion
                key={section.key}
                style={{
                    boxShadow: "none",
                    border: "1px solid #E0E0E0",
                    margin: "10px 0",
                }}
            >
                <AccordionSummary
                    aria-controls={`${section.key}-content`}
                    id={`${section.key}-header`}
                    className="bg-gray-50 shadow-none flex justify-between"
                >
                    <div className="flex items-center justify-between w-full">
                        <div className="font-semibold text-md">
                            {section.title} - ({section.data.length})
                        </div>
                        {permissions?.update && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setModalState({ isOpen: true, section });
                                    formik.setFieldValue(
                                        "selectedEmployees",
                                        section.data.map((emp) =>
                                            String(emp.employee.id)
                                        )
                                    );
                                    if (
                                        section.key === "vacation_hr" &&
                                        (approvals as any)?.vacation_type
                                    ) {
                                        formik.setFieldValue(
                                            "selectedRoles",
                                            (
                                                (approvals as any)
                                                    .vacation_type as string
                                            ).split("&")
                                        );
                                    } else if (
                                        section.key === "leave_hr" &&
                                        (approvals as any)?.leave_type
                                    ) {
                                        formik.setFieldValue(
                                            "selectedRoles",
                                            (
                                                (approvals as any)
                                                    .leave_type as string
                                            ).split("&")
                                        );
                                    } else {
                                        formik.setFieldValue(
                                            "selectedRoles",
                                            []
                                        );
                                    }
                                }}
                                className="ml-4 btn-main text-base py-2 px-4 flex items-center"
                                style={{ height: "40px" }}
                            >
                                <FontAwesomeIcon
                                    icon={faPencil}
                                    className="mr-2"
                                />
                                {t("approvalChainsManagement.edit")}
                            </button>
                        )}
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        {section.data.length > 0 ? (
                            section.data.map((employee) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={employee.id}
                                    component="div"
                                >
                                    <Card
                                        className="border hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                        style={{
                                            boxShadow: "none",
                                            borderRadius: "8px",
                                            border: "1px solid #e5e7eb",
                                        }}
                                    >
                                        <CardContent className="p-0">
                                            <div className="flex h-[40px] items-center">
                                                <div className="w-12 h-full">
                                                    <Avatar
                                                        src={
                                                            employee.employee
                                                                .image
                                                        }
                                                        alt={
                                                            employee.employee
                                                                .name
                                                        }
                                                        className="w-full h-full rounded-l-[8px] object-cover"
                                                        style={{
                                                            borderTopLeftRadius:
                                                                "8px",
                                                            borderBottomLeftRadius:
                                                                "8px",
                                                        }}
                                                    />
                                                </div>
                                                <div className="flex-1 px-2">
                                                    <div className="flex items-center gap-1">
                                                        <div className="text-gray-900 font-bold text-sm">
                                                            {
                                                                employee
                                                                    .employee
                                                                    .name
                                                            }
                                                        </div>
                                                        <div className="text-gray-600 text-[10px]">
                                                            {
                                                                employee
                                                                    .employee
                                                                    .jobtitle
                                                                    ?.title
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-gray-700 text-[10px]">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-2.5 w-2.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                        <span dir="ltr">
                                                            {
                                                                employee
                                                                    .employee
                                                                    .email
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        ) : (
                            <Grid item xs={12} component="div">
                                <Box className="py-8 text-center text-gray-500">
                                    {t(
                                        "approvalChainsManagement.no_data_for_this_section"
                                    )}
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </AccordionDetails>
            </Accordion>
        ));
    };

    return (
        <>
            <div className="vacations-requests border-width-content">
                <HeaderTableInfo
                    titleHeader={t("approvalChainsManagement.title")}
                    isButtonAll={false}
                    textLink={false}
                    newButtonWithoutText={false}
                    newComponentsHere={false}
                />

                {isPendingApprovals ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
                    </div>
                ) : (
                    <div className="p-2">{renderAccordions()}</div>
                )}
            </div>

            <CustomModal
                newClassModal={
                    "w-full xl:!min-w-[60%] xl:!max-w-[60%] min-h-[500px]"
                }
                isOpen={modalState.isOpen}
                handleOpen={() =>
                    setModalState({ isOpen: false, section: null })
                }
                titleModal={`${t("approvalChainsManagement.edit")} ${
                    modalState.section?.title
                }`}
                classBodyContent={"modal-scroll-auto"}
            >
                <FormikProvider value={formik}>
                    <form
                        onSubmit={formik.handleSubmit}
                        className="p-4 h-[500px] flex flex-col"
                    >
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t(
                                        "approvalChainsManagement.selectEmployees"
                                    )}{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <Select
                                    isMulti
                                    isLoading={isLoadingEmployees}
                                    options={
                                        employees?.map((emp: Employee) => ({
                                            value: String(emp.id),
                                            label: emp.name,
                                        })) || []
                                    }
                                    value={
                                        employees
                                            ?.filter((emp: Employee) =>
                                                formik.values?.selectedEmployees?.includes(
                                                    String(emp.id)
                                                )
                                            )
                                            .map((emp: Employee) => ({
                                                value: String(emp.id),
                                                label: emp.name,
                                            })) || []
                                    }
                                    onChange={(selectedOptions) => {
                                        formik.setFieldValue(
                                            "selectedEmployees",
                                            selectedOptions
                                                ? selectedOptions.map(
                                                      (option) => option.value
                                                  )
                                                : []
                                        );
                                    }}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    placeholder={t(
                                        "approvalChainsManagement.selectEmployeesPlaceholder"
                                    )}
                                    noOptionsMessage={() =>
                                        t("common.noOptions")
                                    }
                                    loadingMessage={() => t("common.loading")}
                                />
                            </div>

                            {(modalState?.section?.key === "vacation_hr" ||
                                modalState?.section?.key === "leave_hr") && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {t(
                                            "approvalChainsManagement.selectRoles"
                                        )}{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <Select
                                        isMulti
                                        options={roleOptions}
                                        value={roleOptions.filter((option) =>
                                            formik.values?.selectedRoles?.includes(
                                                option.value
                                            )
                                        )}
                                        onChange={(selectedOptions) => {
                                            formik.setFieldValue(
                                                "selectedRoles",
                                                selectedOptions
                                                    ? selectedOptions.map(
                                                          (option) =>
                                                              option.value
                                                      )
                                                    : []
                                            );
                                        }}
                                        isOptionDisabled={(option) => {
                                            if (
                                                option.value === "manager" &&
                                                formik.values?.selectedRoles
                                                    ?.length == 0
                                            ) {
                                                return true;
                                            }
                                            return false;
                                        }}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        placeholder={t(
                                            "approvalChainsManagement.selectRolesPlaceholder"
                                        )}
                                        noOptionsMessage={() =>
                                            t("common.noOptions")
                                        }
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-4 mt-auto">
                            <button
                                type="button"
                                onClick={() =>
                                    setModalState({
                                        isOpen: false,
                                        section: null,
                                    })
                                }
                                className="btn-secondary px-4 py-2"
                            >
                                {t("common.cancel")}
                            </button>
                            <button
                                type="submit"
                                className="btn-main px-4 py-2 disabled:opacity-50"
                                disabled={
                                    isSubmitting ||
                                    !formik.values?.selectedEmployees?.length
                                }
                            >
                                {isSubmitting ? (
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                ) : (
                                    t("common.save")
                                )}
                            </button>
                        </div>
                    </form>
                </FormikProvider>
            </CustomModal>
        </>
    );
};

export default TableManageChainApprovals;
