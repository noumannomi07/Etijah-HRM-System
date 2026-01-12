import { Employee, ExpenseManage, Project } from "@/Dashboard/Pages/types";
import FileUploader from "@/Dashboard/Shared/FileUploader/FileUploader";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import ControlledSelect from "@/Dashboard/Shared/SelectBox/ControlledSelect";
import { FullRoutes } from "@/Routes/routes";
import { TSelectOption } from "@/types/forms";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonsFormSendCancel from "../../../ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { ExpensesCompenstationSchema } from "../../schema";
import { ExpensesCompenstationType } from "../../types";
import { useCreateExpense } from "@/hooks/orders/expenses";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import { formatDateToYmd } from "@/utils/date";
import { useTranslation } from "react-i18next";

const ExpensesCompenstation: React.FC<{ expense: ExpenseManage }> = ({
    expense,
}) => {
    const { t } = useTranslation("orders");
    const navigate = useNavigate();
    const { mutate: createExpense, isPending } = useCreateExpense({
        onSuccess: () => {
            toast.success(t("toasts.requestAddedSuccess"));
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error.response.data.message);
        },
    });

    const formik = useFormik<ExpensesCompenstationType>({
        initialValues: ExpensesCompenstationSchema.initialValues,
        validationSchema: ExpensesCompenstationSchema.validationSchema,
        onSubmit: (values: ExpensesCompenstationType) => {
            const { type, projectmange_id, ...rest } = values;
            console.log(values);
            createExpense({
                ...rest,
                date: formatDateToYmd(new Date(values.date)),
                has_mile: expense.has_mile,
                // mile_type: "map",
                expense_mangment_id: expense.id,
                tax: values.tax ?? 0,
                has_tax: values.tax > 0 ? 1 : 0,
                ...(projectmange_id && {
                    projectmange_id: values.projectmange_id,
                }),
            });
        },
    });

    const cancelAdd = () => {
        navigate(FullRoutes.Dashboard.Orders.All);
    };
    console.log(formik.errors);

    return (
        <div className="main-form-new">
            <FormikProvider value={formik}>
                <Form>
                    <div className="all-forms-grid grid-cards-2">
                        <div className="input-one-details">
                            <ControlledSelect<ExpensesCompenstationType>
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
                                label={t("labels.employee")}
                                error={formik.errors.employee_id}
                            />
                        </div>
                        <div className="input-one-details">
                            <InputField
                                isShowLabel={true}
                                label={t("expenses.requestedAmount")}
                                name="amount"
                                type="number"
                                placeholder={t("expenses.requestedAmount")}
                                success
                                error={formik.errors.amount}
                            />
                        </div>

                        <div>
                            <DatePickerComponent
                                label={t("labels.date")}
                                addTextPlaceHolder="--/--/--"
                                onDateChange={(date: Date) =>
                                    formik.setFieldValue(
                                        "date",
                                        formatDateToYmd(date)
                                    )
                                }
                            />
                            {formik.errors.date && (
                                <p className="text-red-500">
                                    {formik.errors.date}
                                </p>
                            )}
                        </div>
                        <div className="input-one-details">
                            <ControlledSelect<ExpensesCompenstationType>
                                type="sync"
                                fieldName="projectmange_id"
                                label={t("labels.project")}
                                apiEndpoint="/project-management"
                                customMapping={(data: Array<Project>) =>
                                    data.map(
                                        (project): TSelectOption => ({
                                            label: project.title,
                                            value: project.id,
                                        })
                                    )
                                }
                            />
                        </div>

                        <div className="input-one-details">
                            <InputField
                                isShowLabel={true}
                                label={t("expenses.taxAmount")}
                                name="tax_number"
                                type="number"
                                placeholder={t("expenses.taxAmountOptional")}
                                success
                                error={formik.errors.tax}
                            />
                        </div>

                        <div className="input-one-details">
                            <InputField
                                isShowLabel={true}
                                label={t("expenses.referenceNumber")}
                                name="code"
                                type="number"
                                placeholder={t(
                                    "expenses.referenceNumberOptional"
                                )}
                                success
                                error={formik.errors.code}
                            />
                        </div>

                        <div className="input-one-details">
                            <InputField
                                isShowLabel={true}
                                label={t("labels.description")}
                                name="content"
                                type="text"
                                placeholder={t("labels.descriptionOptional")}
                                success
                                error={
                                    formik.touched.content &&
                                    formik.errors.content
                                }
                            />
                        </div>
                        <FileUploader
                            textLabel={t("labels.attachFile")}
                            name="file"
                        />
                    </div>

                    <ButtonsFormSendCancel
                        cancelAdd={cancelAdd}
                        submitButton={formik.handleSubmit}
                        isSubmittingDisabled={isPending}
                        isSubmitting={isPending}
                    />
                </Form>
            </FormikProvider>
        </div>
    );
};

export default ExpensesCompenstation;
