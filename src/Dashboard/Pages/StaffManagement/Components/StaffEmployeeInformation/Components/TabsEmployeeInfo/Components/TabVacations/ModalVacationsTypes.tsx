import React, { useState } from "react";
import SelectTypeVacation from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/SelectTypeVacation";
import ModalButtons from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalButtons/ModalButtons";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import { Field, Form, Formik, FormikHelpers } from "formik";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { useEmployeeContext } from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/providers/EmployeeProvider";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

interface VacationFormValues {
    vacationmanage_id: Array<{ value: string; label: string }> | null;
}

interface DefaultVacationType {
    id: string;
    title: string;
}

interface ModalVacationsTypesProps {
    open: boolean;
    hiddenModal: () => void;
    onSubmit?: (values: VacationFormValues) => void;
    defaultValues?: DefaultVacationType[];
}

const ModalVacationsTypes: React.FC<ModalVacationsTypesProps> = ({
    open,
    hiddenModal,
    defaultValues,
}) => {
    const { t } = useTranslation("staffManagement");
    const { employee, isPending } = useEmployeeContext();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const initialValues: VacationFormValues = {
        vacationmanage_id:
            defaultValues?.map((item) => ({
                value: item.id,
                label: item?.title,
            })) || null,
    };

    const validationSchema = Yup.object({
        vacationmanage_id: Yup.array()
            .of(
                Yup.object()
                    .shape({
                        value: Yup.string().required(t("vacations.vacationTypeRequired")),
                        label: Yup.string().required(),
                    })
                    .nullable()
            )
            .nullable(),
    });

    const handleSubmit = async (
        values: VacationFormValues,
        { setTouched, resetForm }: FormikHelpers<VacationFormValues>
    ) => {
        if (!employee?.id) {
            toast.error(t("messages.employeeDataNotFound"));
            return;
        }

        try {
            setIsLoading(true);
            setTouched({
                vacationmanage_id: true,
            });

            const vacationIds =
                values.vacationmanage_id?.map((item) => item.value) || [];

            await axiosInstance.post(
                endpoints.employee.manage.vancation.update(employee.id),
                {
                    vacationmanage_id: vacationIds,
                }
            );

            // Revalidate vacation data
            await queryClient.invalidateQueries({
                queryKey: ["employee-vacation-information", `${employee.id}`],
            });

            toast.success(t("vacations.typesUpdatedSuccessfully"));
            resetForm();
            hiddenModal();
        } catch (error) {
            console.error("Error updating vacation types:", error);
            toast.error(t("vacations.errorUpdatingTypes"));
        } finally {
            setIsLoading(false);
        }
    };

    if (isPending) {
        return (
            <ModalShared
                open={open}
                hiddenModal={hiddenModal}
                titleModal={t("vacations.addNewVacation")}
            >
                <div className="flex items-center justify-center p-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            </ModalShared>
        );
    }

    return (
        <ModalShared
            open={open}
            hiddenModal={hiddenModal}
            titleModal={t("vacations.addNewVacation")}
        >
            <div className="all-content-modal-filter">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, setFieldValue, errors, touched }) => (
                        <Form className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <Field name="vacationmanage_id">
                                        {({ field }: { field: any }) => (
                                            <SelectTypeVacation
                                                setFieldValue={setFieldValue}
                                                field={field}
                                                isMulti={true}
                                                error={
                                                    touched.vacationmanage_id
                                                        ? (errors.vacationmanage_id as string)
                                                        : undefined
                                                }
                                            />
                                        )}
                                    </Field>
                                </div>
                            </div>

                            <div className="main-buttons-modal flex justify-end items-end w-100">
                                <ModalButtons
                                    hiddenModal={hiddenModal}
                                    handleSubmit={handleSubmit}
                                    buttonSaveText={t("common.save")}
                                    buttonResetText={t("common.cancel")}
                                    isLoading={isLoading}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </ModalShared>
    );
};

ModalVacationsTypes.propTypes = {
    open: PropTypes.bool.isRequired,
    hiddenModal: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    defaultValues: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }).isRequired
    ),
};

export default ModalVacationsTypes;
