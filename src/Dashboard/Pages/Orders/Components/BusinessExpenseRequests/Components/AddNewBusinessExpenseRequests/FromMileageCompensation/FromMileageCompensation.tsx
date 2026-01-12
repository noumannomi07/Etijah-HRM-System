import { Employee, ExpenseManage, Project } from "@/Dashboard/Pages/types";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import ControlledSelect from "@/Dashboard/Shared/SelectBox/ControlledSelect";
import { FullRoutes } from "@/Routes/routes";
import { TSelectOption } from "@/types/forms";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonsFormSendCancel from "../../../../ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { MileageCompensationSchema } from "../../../schema";
import {
    MileageCompensationType,
    MileageCompensationTypes,
} from "../../../types";
import TabsFormMileage from "./TabsFormMileage/TabsFormMileage";
import { useCreateExpense } from "@/hooks/orders/expenses";
import { formatDateToYmd } from "@/utils/date";
import Switch from "@mui/material/Switch";
import { useTranslation } from "react-i18next";

const FromMileageCompensation: React.FC<{ expense: ExpenseManage }> = ({
    expense,
}) => {
    const { t } = useTranslation("orders");
    const navigate = useNavigate();
    const { mutate: createExpense } = useCreateExpense({
        onSuccess: () => {
            toast.success(t("toasts.requestAddedSuccess"));
        },
    });
    const [formType, setFormType] =
        useState<MileageCompensationTypes>("oneWay");

    const formik = useFormik<MileageCompensationType>({
        initialValues: MileageCompensationSchema.initialValues,
        validationSchema: MileageCompensationSchema.validationSchema,
        onSubmit: (values: MileageCompensationType) => {
            const { type, projectmange_id, ...rest } = values;
            createExpense({
                ...rest,
                date: formatDateToYmd(new Date(values.date)),
                has_mile: expense.has_mile,
                expense_mangment_id: expense.id,
                type: formType,
                ...(projectmange_id && {
                    projectmange_id: values.projectmange_id,
                }),
            });
        },
    });

    const cancelAdd = () => {
        toast.success(t("toasts.cancelSuccess"));
        navigate(FullRoutes.Dashboard.Orders.All);
    };

    return (
        <div className="main-form-new">
            <FormikProvider value={formik}>
                <Form>
                    <div className="all-forms-grid grid-cards-2">
                        <div className="input-one-details">
                            <ControlledSelect<MileageCompensationType>
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
                        </div>
                        {/* <div className="input-one-details">
                            <div className="flex items-center">
                                <span className="me-4">
                                    {t("expenses.oneWayTrip")}
                                </span>
                                <Switch
                                    checked={formType === "twoWay"}
                                    onChange={() =>
                                        setFormType((prev) =>
                                            prev === "oneWay"
                                                ? "twoWay"
                                                : "oneWay"
                                        )
                                    }
                                />
                                <span className="ms-4">
                                    {t("expenses.roundTrip")}
                                </span>
                            </div>
                        </div>

                        <ControlledSelect<MileageCompensationType>
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
                        /> */}

                        {/* <div className="input-one-details">
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
                        </div> */}

                    </div>

                        <TabsFormMileage type={formType} />
                    <div className="mt-5">
                        <ButtonsFormSendCancel
                            handleCancelForm={cancelAdd}
                            isLoadingSubmit={false}
                        />
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};

export default FromMileageCompensation;
