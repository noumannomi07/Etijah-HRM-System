import { AdvanceFormData } from "@/Dashboard/Pages/Orders/types/Advance";
import { Employee } from "@/Dashboard/Pages/types";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import FileUploader from "@/Dashboard/Shared/FileUploader/FileUploader";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import TextAreaInput from "@/Dashboard/Shared/Forms/TextArea";
import ControlledSelect from "@/Dashboard/Shared/SelectBox/ControlledSelect";
import { FullRoutes } from "@/Routes/routes";
import { TSelectOption } from "@/types/forms";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonsFormSendCancel from "../../../ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import {
    createAdvanceSchema,
    editAdvanceSchema,
    initialValues,
} from "./schema";
import { ExtFile } from "@files-ui/react";
import { useTranslation } from "react-i18next";
import { useAdvances } from "@/hooks/api";
import { Loading } from "@/components";
import axiosInstance from "@/utils/axios";

const FormAddNewPredecessorRequests: React.FC = ({ id, cancel,isDisabledEmployee }) => {
    const { t } = useTranslation("orders");
    const navigate = useNavigate();
    const {
        queryOne,
        queryAll,
        createItem,
        isCreating,
    } = useAdvances();
    const [isUpdating, setIsUpdate] = useState(false);
    const { data, isLoading, refetch } = queryOne(id || "");

    const getInitialValues = () => {
        if (!data) {
            return initialValues;
        }

        return {
            employee_id: data?.employee?.id,
            advance_manage_id: data?.advance_manage?.id,
            start_date: data?.start_date || "",
            amount: data?.amount || 0,
            note: data?.note || "",
            file: [],
        };
    };

    const handleSubmit = async (values: AdvanceFormData) => {
        try {
            const formData = new FormData();
            formData.append("employee_id", values.employee_id.toString());
            formData.append(
                "advance_manage_id",
                values.advance_manage_id.toString()
            );
            formData.append("start_date", values.start_date);
            formData.append("amount", values.amount.toString());
            formData.append("note", values.note);

            if (
                values.file &&
                Array.isArray(values.file) &&
                values.file.length > 0
            ) {
                const file = values.file[0] as ExtFile;
                if (file.file) {
                    formData.append("file", file.file);
                }
            }

            if (id) {
                setIsUpdate(true);
                await axiosInstance.post(`updateadvance/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                queryAll.refetch();
                refetch();
                setIsUpdate(false);
            } else {
                await createItem(formData);
            }
            toast.success(t("toasts.requestAddedSuccess"));
            formik.resetForm();
            if (cancel) {
                cancel();
            } else {
                navigate(-1);
            }
        } catch (error) {
            toast.error(t("toasts.requestAddedError"));
            setIsUpdate(false);
        }
    };

    const formik = useFormik<AdvanceFormData>({
        initialValues: getInitialValues(),
     validationSchema: id ? editAdvanceSchema(t) : createAdvanceSchema(t),
        onSubmit: handleSubmit,
        enableReinitialize: true,
    });

    const cancelAdd = () => {
        toast.success(t("toasts.cancelSuccess"));
        if (cancel) {
            cancel();
        } else {
            navigate(-1);
        }
    };

    if (id && isLoading) {
        return <Loading />;
    }

    return (
        <div
            data-aos="fade-up"
            className="form-add-new-request border-width-content mt-5"
        >
            <h2 className="title-head-form text-font-dark py-3">
                {t("common.newRequest")}
            </h2>
            <div className="main-form-new ">
                <FormikProvider value={formik}>
                    <Form>
                        <div className="all-forms-grid grid-cards-2">
                            <div className="input-one-details">
                                <ControlledSelect<AdvanceFormData>
                                    type="sync"
                                    apiEndpoint="/employee"
                                    fieldName="employee_id"
                                    isDisabled={isDisabledEmployee}
                                    label={t("labels.employee")}
                                    customMapping={(data: Array<Employee>) =>
                                        data.map(
                                            (employee): TSelectOption => ({
                                                label: `${employee.first_name} ${employee.last_name}`,
                                                value: employee.id,
                                            })
                                        )
                                    }
                                />
                            </div>

                            <div className="input-one-details">
                                <ControlledSelect<AdvanceFormData>
                                    type="sync"
                                    apiEndpoint="/advancemanage"
                                    fieldName="advance_manage_id"
                                    label={t("advances.purpose")}
                                />
                            </div>
                            <div className="input-one-details">
                                <InputField
                                    isShowLabel={true}
                                    label={t("advances.requestedAmount")}
                                    name="amount"
                                    type="number"
                                    placeholder={t("advances.requestedAmount")}
                                    success
                                />
                            </div>
                            <div className="input-one-details">
                                <DatePickerComponent
                                key={formik.values.start_date}
                                    label={t("labels.start_date")}
                                    value={formik.values.start_date}
                                    onDateChange={(date: string) => {
                                        formik.setFieldValue(
                                            "start_date",
                                            date
                                        );
                                    }}
                                    error={
                                        formik.touched.start_date &&
                                        formik.errors.start_date
                                            ? String(formik.errors.start_date)
                                            : ""
                                    }
                                    isDefault={!formik.values.start_date}
                                />
                                {formik.errors.start_date && (
                                    <p className="text-red-500">
                                        {formik.errors.start_date}
                                    </p>
                                )}
                            </div>
                            <div className="input-one-details text-area-height">
                                <TextAreaInput
                                    isShowLabel={true}
                                    label={t("labels.notes")}
                                    name="note"
                                    type="text"
                                    placeholder={t("labels.addNotes")}
                                    success
                                    parentClass=""
                                />
                            </div>
                            <FileUploader
                                name="file"
                                textLabel={t("labels.attachFile")}
                                error={formik.errors.file}
                                imagePreview={data?.file}
                            />
                        </div>
                        <ButtonsFormSendCancel
                            cancelAdd={cancelAdd}
                            submitButton={() => formik.handleSubmit()}
                            isSubmitting={isCreating || isUpdating}
                            isSubmittingDisabled={isCreating || isUpdating}
                        />
                    </Form>
                </FormikProvider>
            </div>
        </div>
    );
};

export default FormAddNewPredecessorRequests;
