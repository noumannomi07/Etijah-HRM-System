import React, { useCallback, useEffect } from "react";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { FullRoutes } from "@/Routes/routes";
import { Form, FormikProvider, useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import {
    useCheckViolationStatus,
    useCreateViolation,
} from "@/hooks/financial/violations";
import ControlledSelect from "@/Dashboard/Shared/SelectBox/ControlledSelect";
import { TSelectOption } from "@/types/forms";
import { Employee } from "@/Dashboard/Pages/types";
import { ViolationFormValues, ViolationRule } from "@/types/Financial";
import { getViolationTextForCheck } from "@/utils/financial";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import { useTranslation } from "react-i18next";
const FormAddNewViolationsManagementPage: React.FC<{ onClose?: () => void }> = ({ onClose }) => {

    const navigate = useNavigate();

    const { t } = useTranslation("violations");

    const { searchParams } = new URL(window.location.href);

    const employee_id = searchParams.get('employee_id');
 
    const { mutate: createViolation, isPending } = useCreateViolation();

    const {
        mutate: checkStatus,
        isPending: isCheckViolationStatus,
        data: checkResult,
    } = useCheckViolationStatus();

    // Initial form values
    const initialValues: ViolationFormValues = {
        employee_id: employee_id ? Number(employee_id) : null,
        violation_rule_id: null,
    };

 
    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        employee_id: Yup.number().required(t("validation.employeeRequired")),
        violation_rule_id: Yup.number().required(t("validation.violationTypeRequired")),
    });

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values: ViolationFormValues) => {
            createViolation(
                {
                    violation_rule_id: Number(values?.violation_rule_id),
                    employee_id: Number(values?.employee_id),
                },
                {
                    onSuccess: () => {
                        toast.success(t("messages.successAdd"));
                        formik.resetForm();
                    },
                }
            );
        },
    });

    // Navigate back on cancel
    const cancelAdd = useCallback(() => {
        formik.resetForm();
        if (onClose) {
            onClose();
        } else {
            navigate(FullRoutes.Dashboard.ViolationsManagement.All);
        }
    }, [navigate, onClose]);

    useEffect(() => {
        if (formik.values.employee_id && formik.values.violation_rule_id) {
            checkStatus({
                employee_id: Number(formik.values.employee_id),
                violation_rule_id: Number(formik.values.violation_rule_id),
            });
        }
    }, [formik.values.employee_id, formik.values.violation_rule_id]);

    const handleSubmitWithPenalty = () => {
        createViolation(
            {
                violation_rule_id: Number(formik.values?.violation_rule_id),
                employee_id: Number(formik.values?.employee_id),
                apply_action: 1 // تطبيق الغرامة مباشرة
            },
            {
                onSuccess: () => {
                    toast.success(t("messages.successAdd"));
                    formik.resetForm();
                    
                    if (onClose) {
                        onClose();
                    }
                },
            }
        );
    };

    const handleSubmitWithoutPenalty = () => {
        createViolation(
            {
                violation_rule_id: Number(formik.values?.violation_rule_id),
                employee_id: Number(formik.values?.employee_id),
                apply_action: 0 // عدم تطبيق الغرامة
            },
            {
                onSuccess: () => {
                    toast.success(t("messages.successAdd"));
                    formik.resetForm();
                    if (onClose) {
                        onClose();
                    }
                },
            }
        );
    };

    return (
        <div className="form-add-new-task border-width-content mt-7">
            <h2 className="title text-font-dark">{t("addViolation.title")}</h2>

            <div className="all-form-task mt-5">
                <FormikProvider value={formik}>
                    <Form>
                        <div className="all-forms-grid grid-cards-2">
                            {/* Employee Select */}
                            <div className="form-one-step">
        
                                {employee_id ? (
                                <ControlledSelect<ViolationFormValues>
                                    type="sync"
                                    apiEndpoint="/employee"
                                    customMapping={(data: Array<Employee>) =>
                                        data.map(
                                            (employee): TSelectOption => ({
                                                label: `${employee.name}`,
                                                value: employee.id,
                                            })
                                        )
                                    }
                                    fieldName="employee_id"
                                    label={t("addViolation.employee")}
                                    defaultValue={employee_id ? Number(employee_id) : undefined}
                                    isDisabled={true}
                                />

                                ) : (
                                    <ControlledSelect<ViolationFormValues>
                                    type="sync"
                                    apiEndpoint="/employee"
                                    customMapping={(data: Array<Employee>) =>
                                        data.map(
                                            (employee): TSelectOption => ({
                                                label: `${employee.first_name} ${employee.last_name}`,
                                                value: employee.id,
                                            })
                                        )
                                    }
                                    fieldName="employee_id"
                                    label={t("addViolation.employee")}
                                />
                                )}

 
                            </div>
                            <div className="form-one-step">
                                <ControlledSelect<ViolationFormValues>
                                    type="sync"
                                    apiEndpoint="/violation/rules"
                                    customMapping={(
                                        data: Array<ViolationRule>
                                    ) =>
                                        data.map(
                                            (violations): TSelectOption => ({
                                                label: violations.title,
                                                value: violations.id,
                                            })
                                        )
                                    }
                                    fieldName="violation_rule_id"
                                    label={t("addViolation.violationType")}
                                />
                            </div>
                            {isCheckViolationStatus ? (
                                <SpinnerLoader />
                            ) : (
                                <p className="text-red-500">
                                    {checkResult &&
                                        getViolationTextForCheck(checkResult)}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4 justify-end mt-4">
                            <button
                                type="button"
                                onClick={cancelAdd}
                                className="w-full sm:w-auto button-transparent hover:bg-redColor01 hover:border-redColor01 height--50"
                            >
                                {t("common.cancel")}
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmitWithoutPenalty}
                                disabled={isPending || !formik.isValid}
                                className="w-full sm:w-auto btn-main height--50 disabled:opacity-75"
                            >
                                {t("common.save")}
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmitWithPenalty}
                                disabled={isPending || !formik.isValid}
                                className="w-full sm:w-auto btn-main height--50 disabled:opacity-75"
                            >
                                {t("common.saveWithPenalty")}
                            </button>
                        </div>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    );
};

export default FormAddNewViolationsManagementPage;
