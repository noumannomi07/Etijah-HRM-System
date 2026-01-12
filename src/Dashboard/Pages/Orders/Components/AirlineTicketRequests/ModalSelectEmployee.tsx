import React, { useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import PropTypes from "prop-types";
// import { toast } from "react-toastify";
import * as Yup from "yup";
import ModalShared from "../VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import EmployeeSelect from "../AllSelectsForm/EmployeeSelect";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/utils/axios";
import { useNavigate } from "react-router-dom";
import { FullRoutes } from "@/Routes/routes";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";

interface ModalSelectEmployeeProps {
    open: boolean;
    hiddenModal: () => void;
    handleOpenAddNewAirline:() =>void
}

interface FormValues {
    employee: { value: string; label: string } | null;
}

interface FieldProps {
    field: {
        name: string;
        value: any;
        onChange: (e: React.ChangeEvent<any>) => void;
        onBlur: (e: React.FocusEvent<any>) => void;
    };
}

const ModalSelectEmployee: React.FC<ModalSelectEmployeeProps> = ({
    open,
    hiddenModal,
    handleOpenAddNewAirline
}) => {
    const { t } = useTranslation("orders");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const initialValues: FormValues = {
        employee: null,
    };

    const validationSchema = Yup.object({
        employee: Yup.object()
            .nullable()
            .required(t("validation.employeeRequired")),
    });

    const checkTicketRequest = async (employeeId: string) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post("/ticketrequestscheck", {
                employee_id: employeeId,
            });

            return response.data;
        } catch (error) {
            // toast.error(t("toasts.errorCheckingTicket"));
            return error.response.data;
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (
        values: FormValues,
        {
            setTouched,
            resetForm,
            setFieldValue,
            setFieldError,
        }: FormikHelpers<FormValues>
    ) => {
        setTouched({
            employee: true,
        });

        if (!values.employee) {
            return;
        }

        const checkResult = await checkTicketRequest(values.employee.value);

        console.log(checkResult);

        if (checkResult) {
            if (checkResult.success) {
                // toast.success(t("toasts.requestAddedSuccess"));
                resetForm();
                hiddenModal();
                // navigate(
                //     `${FullRoutes.Dashboard.Orders.AddNewAirlineTicketRequests}?employeeId=${values.employee.value}`
                // );
                handleOpenAddNewAirline()
            } else {
                setFieldError(
                    "employee",
                    checkResult?.message || t("validation.employeeError")
                );
            }
        }
    };

    return (
        <ModalShared open={open} hiddenModal={hiddenModal}>
            <div className="all-content-modal-filter">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={true}
                >
                    {({ handleSubmit, setFieldValue, errors, touched }) => (
                        <Form>
                            <div className="all-forms-grid">
                                <div className="input-one-details">
                                    <Field name="employee">
                                        {({ field }: FieldProps) => (
                                            <EmployeeSelect
                                                setFieldValue={setFieldValue}
                                                field={field}
                                                error={
                                                    errors.employee as string
                                                }
                                                labelText={t("labels.employee")}
                                            />
                                        )}
                                    </Field>
                                </div>
                            </div>

                            <div className="main-buttons-modal flex justify-end items-end w-100 gap-x-2 mt-20">
                                <button
                                    type="button"
                                    className="btn-main w-full sm:w-auto button-transparent hover:bg-redColor01 hover:border-redColor01 height--50"
                                    onClick={hiddenModal}
                                >
                                    {t("buttons.cancel")}
                                </button>
                                <button
                                    disabled={loading}
                                    type="button"
                                    className="btn-main w-full sm:w-auto height--50 ml-2"
                                    onClick={() => handleSubmit()}
                                >
                                    {loading ? (
                                        <SpinnerLoader />
                                    ) : (
                                        t("buttons.submit")
                                    )}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </ModalShared>
    );
};

ModalSelectEmployee.propTypes = {
    open: PropTypes.bool.isRequired,
    hiddenModal: PropTypes.func.isRequired,
};

export default ModalSelectEmployee;
