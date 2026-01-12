import { Field, Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import EmployeeSelect from "../../../../AllSelectsForm/EmployeeSelect";
import TextAreaInput from "@/Dashboard/Shared/Forms/TextArea";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import ButtonsFormSendCancel from "../../../../ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import FileUploader from "@/Dashboard/Shared/FileUploader/FileUploader";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import { FullRoutes } from "@/Routes/routes";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { queryClient } from "@/utils/queryClient";

interface FormValues {
    employee_id: any;
    date: string;
    content: string;
    file: any;
}

const TabPayFlightAmount: React.FC = ({ employeeId }) => {
    const { t } = useTranslation("orders");

    const [isLoading, setIsLoading] = useState(false);
    const initialValues: FormValues = {
        employee_id: null,
        date: new Date(),
        content: "",
        file: null,
    };

    const validationSchema = Yup.object({
        employee_id: Yup.object()
            .nullable()
            .required(t("validation.employeeRequired")),
        date: Yup.string().nullable().required(t("validation.dateRequired")),

        content: Yup.string()
            .required(t("validation.required"))
            .min(5, t("validation.minChars", { count: 5 }))
            .max(500, t("validation.maxChars", { count: 500 })),
    });

    const navigate = useNavigate();

    const handleSubmit = (
        values: FormValues,
        { setTouched, resetForm }: FormikHelpers<FormValues>
    ) => {
        setIsLoading(true);
        setTouched({
            employee_id: true,
            date: true,
            content: true,
        });

        const formData = new FormData();
        formData.append("employee_id", values.employee_id.value);
        formData.append("request_type", "ticket_refund");
        formData.append("content", values.content);
        formData.append("date", values.date);
        formData.append("file", values.file[0]["file"]);

        axiosInstance
            .post("/ticketrequests", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept-Language": i18next.language,
                },
            })
            .then((res) => {
                resetForm();
                toast.success(t("toasts.requestAddedSuccess"));
                // validate react query key (airline-tickets)
                queryClient.invalidateQueries({ queryKey: ["airline-tickets"] });
                navigate(-1);
            })
            .catch((error) => {
                toast.error(t("toasts.error"));
                toast.error(error.response.data.message || t("toasts.error"));
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const cancelAdd = () => {
        toast.success(t("toasts.cancelSuccess"));
        navigate(FullRoutes.Dashboard.Orders.All);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleSubmit, setFieldValue, errors, touched }) => (
                    <Form>
                        <div className="all-forms-grid grid-cards-2">
                            <div className="input-one-details">
                                <Field name="employee_id">
                                    {({ field }: { field: any }) => (
                                        <EmployeeSelect
                                            defaultEmployee={employeeId}
                                            isDisabled={true}
                                            setFieldValue={setFieldValue}
                                            field={field}
                                            error={
                                                touched.employee_id &&
                                                errors.employee_id
                                            }
                                        />
                                    )}
                                </Field>
                            </div>

                            {/* ================== END INPUT ONE DETAILS ================== */}
                            <div className="input-one-details">
                                <Field name="date">
                                    {({ field }: { field: any }) => (
                                        <DatePickerComponent
                                            label={t(
                                                "airlineTicket.expenseDate"
                                            )}
                                            addTextPlaceHolder="--/--/--"
                                            onDateChange={(date) =>
                                                setFieldValue("date", date)
                                            }
                                            field={field}
                                            error={touched.date && errors.date}
                                        />
                                    )}
                                </Field>
                            </div>

                            {/* ================== END INPUT ONE DETAILS ================== */}
                            <div className="input-one-details text-area-height">
                                <TextAreaInput
                                    isShowLabel={true}
                                    label={t("labels.notes")}
                                    name="content"
                                    type="text"
                                    placeholder={t("labels.addNotes")}
                                    success
                                    parentClass=""
                                />
                            </div>
                            <FileUploader
                                textLabel={t("labels.attachFile")}
                                name="file"
                                maxFiles={1}
                                error={touched.file && errors.file}
                            />
                        </div>
                        <ButtonsFormSendCancel
                            cancelAdd={cancelAdd}
                            submitButton={() => handleSubmit()}
                            isSubmitting={isLoading}
                            isSubmittingDisabled={isLoading}
                        />
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default TabPayFlightAmount;
