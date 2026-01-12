import EmployeeSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/EmployeeSelect";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import TextAreaInput from "@/Dashboard/Shared/Forms/TextArea";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import HorizontalTabs from "@/Dashboard/Shared/HorizontalTabs/HorizontalTabs";
import React from "react";
import {
    useBonusManagement,
    useCutManagement,
} from "@/hooks/api/system-settings";
import { FullRoutes } from "@/Routes/routes";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useSalaryadjustment } from "@/hooks/api";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import FileUploader from "@/Dashboard/Shared/FileUploader/FileUploader";
import { useTranslation } from "react-i18next";

interface ApiResponse<T> {
    data: T[];
    // Add other API response properties as needed
}

interface CutItem {
    id: string;
    ar_title: string;
    en_title: string;
}

interface BonusItem {
    id: string;
    ar_title: string;
    en_title: string;
}

interface FormFieldProps {
    field: {
        name: string;
        value: any;
        onChange: (e: any) => void;
        onBlur: () => void;
    };
}

interface FormValues {
    employee_id: string | { value: string; label: string };
    type: "cut" | "bonus";
    cut_id: string | { value: string; label: string };
    bonus_id: string | { value: string; label: string };
    amount: string;
    file: File | null;
}

interface FormErrors {
    employee_id?: string;
    type?: string;
    cut_id?: string;
    bonus_id?: string;
    amount?: string;
    file?: string;
}

interface FormContentProps {
    type: "cut" | "bonus";
    values: FormValues;
    setFieldValue: (field: string, value: any) => void;
    touched: { [key: string]: boolean };
    errors: FormErrors;
}

interface SelectOption {
    value: string;
    label: string;
}

const getErrorMessage = (error: string | undefined): string => {
    return error ? String(error) : "";
};

const TabDiscountSalaryAdjustments = ({
    selectedDocument,
    cancel,
    refetch,
}: {
    selectedDocument: any;
    cancel: () => void;
    refetch: () => void;
}) => {
    const { t, i18n } = useTranslation('salaryAdjustments');
    const selectPlaceholder = i18n.language === 'ar' ? '-إختر-' : '-Select-';
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const month = new Date().getMonth() + 1;

    const year = new Date().getFullYear();

    const { createItem, isCreating, queryAll } = useSalaryadjustment({
        month: month,
        year: year,
    });

    const [isUpdating, setIsUpdating] = useState(false);

    const { data: bonuses = [] } =
        (useBonusManagement().queryAll as ApiResponse<BonusItem>) || {};
    const { data: cuts = [] } =
        (useCutManagement().queryAll as ApiResponse<CutItem>) || {};

    const cancelAdd = () => {
        navigate(FullRoutes.Dashboard.SalaryAdjustments.All);
    };

    const handleSubmit = async (
        values: FormValues,
        { setSubmitting, resetForm }: FormikHelpers<FormValues>
    ) => {
        try {
            const formData = new FormData();

            formData.append(
                "employee_id",
                typeof values.employee_id === "object"
                    ? values.employee_id.value
                    : values.employee_id
            );
            formData.append("type", values.type);

            if (values.type === "cut") {
                formData.append(
                    "cut_id",
                    typeof values.cut_id === "object"
                        ? values.cut_id.value
                        : values.cut_id
                );
            } else {
                formData.append(
                    "bonus_id",
                    typeof values.bonus_id === "object"
                        ? values.bonus_id.value
                        : values.bonus_id
                );
            }

            formData.append("amount", values.amount);

            if (values.file && values.file?.[0]?.file instanceof File) {
                formData.append("file", values.file[0]?.file);
            }

            if (!selectedDocument?.id) {
                await createItem(formData);
                toast.success(t('form.success.add'));
                navigate(FullRoutes.Dashboard.SalaryAdjustments.All);
                navigate(FullRoutes.Dashboard.SalaryAdjustments.All);
            } else {
                setIsUpdating(true);
                formData.append("id", selectedDocument.id);
                await axiosInstance.post(
                    `/salaryadjustment/update/${selectedDocument.id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                setIsUpdating(false);
                toast.success(t('form.success.edit'));
                cancel && cancel();
            }

            refetch();
            resetForm();
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : t('form.error.general');
            toast.error(errorMessage);
            setSubmitting(false);
        }
    };

    const validationSchema = Yup.object().shape({
        employee_id: Yup.mixed().required(t('form.employee.error')),
        type: Yup.string().required(),
        cut_id: Yup.mixed().when("type", {
            is: "cut",
            then: (schema) => schema.required(t('form.cutType.error')),
            otherwise: (schema) => schema.nullable(),
        }),
        bonus_id: Yup.mixed().when("type", {
            is: "bonus",
            then: (schema) => schema.required(t('form.bonusType.error')),
            otherwise: (schema) => schema.nullable(),
        }),
        amount: Yup.number()
            .typeError(t('form.amount.errorInvalid'))
            .required(t('form.amount.errorRequired'))
            .positive(t('form.amount.errorPositive')),
        file: Yup.mixed().nullable(),
    });
    console.log({ selectedDocument });

    const FormContent: React.FC<FormContentProps> = ({
        type,
        values,
        setFieldValue,
        touched,
        errors,
    }) => {
        useEffect(() => {
            if (type === "cut") {
                setFieldValue("bonus_id", "");
            } else {
                setFieldValue("cut_id", "");
            }
        }, [type, setFieldValue]);

        return (
            <div className="all-forms-grid grid-cards-2">
                <Field name="employee_id">
                    {({ field }: FormFieldProps) => (
                        <EmployeeSelect
                            setFieldValue={setFieldValue}
                            field={field}
                            error={
                                touched.employee_id && errors.employee_id
                                    ? String(errors.employee_id)
                                    : ""
                            }
                        />
                    )}
                </Field>

                {type === "cut" ? (
                    <Field name="cut_id">
                        {({ field }: FormFieldProps) => (
                            <SelectBox
                                isShowLabel
                                label={t('form.cutType.label')}
                                options={cuts.map((cut: CutItem) => ({
                                    value: cut.id,
                                    label: i18n.language === 'ar' ? cut.ar_title : cut.en_title,
                                }))}
                                onChange={(option: SelectOption) =>
                                    setFieldValue("cut_id", option)
                                }
                                value={values.cut_id}
                                placeholder={t('form.cutType.placeholder')}
                                field={field}
                                error={getErrorMessage(errors.cut_id)}
                                isSearchable={true}
                                isMulti={false}
                                isClearable={true}
                            />
                        )}
                    </Field>
                ) : (
                    <Field name="bonus_id">
                        {({ field }: FormFieldProps) => (
                            <SelectBox
                                isShowLabel
                                label={t('form.bonusType.label')}
                                options={bonuses.map((bonus: BonusItem) => ({
                                    value: bonus.id,
                                    label: i18n.language === 'ar' ? bonus.ar_title : bonus.en_title,
                                }))}
                                onChange={(option: SelectOption) =>
                                    setFieldValue("bonus_id", option)
                                }
                                value={values.bonus_id}
                                placeholder={t('form.bonusType.placeholder')}
                                field={field}
                                error={getErrorMessage(errors.bonus_id)}
                                isSearchable={true}
                                isMulti={false}
                                isClearable={true}
                            />
                        )}
                    </Field>
                )}

                <InputField
                    isShowLabel
                    label={t('form.amount.label')}
                    name="amount"
                    type="number"
                    placeholder={t('form.amount.placeholder')}
                    min="0"
                    step="0.01"
                />

                <div className="grid grid-cols-2 gap-4  col-span-2">

                    <FileUploader
                        name="file"
                        textLabel={t('form.file.label')}
                        error={errors.file || ""}
                        imagePreview={selectedDocument?.file}
                    />
                </div>

                {/* <CustomFileUploader
                    textLabel="إرفق ملف"
                    name="file"
                    onFileSelect={(file) => {
                        setFieldValue("file", file);
                    }}
                /> */}
                {touched.file && errors.file && (
                    <div className="error-text">{errors.file}</div>
                )}
            </div>
        );
    };

    const renderForm = (type: "cut" | "bonus") => (
        <Formik<FormValues>
            initialValues={{
                employee_id: selectedDocument?.employee_id
                    ? {
                          value: selectedDocument.employee_id,
                          label: selectedDocument.employee_name,
                      }
                    : "",
                type: selectedDocument?.type || "",
                cut_id: selectedDocument?.cut_id
                    ? {
                          value: selectedDocument?.cut_id,
                          label: selectedDocument?.cut_title,
                      }
                    : "",
                bonus_id: selectedDocument?.bonus_id
                    ? {
                          value: selectedDocument?.bonus_id,
                          label: selectedDocument?.bonus_title,
                      }
                    : "",
                amount: selectedDocument?.amount || "",
                file: null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({
                values,
                setFieldValue,
                errors,
                touched,
                handleSubmit,
                resetForm,
            }: FormikProps<FormValues>) => {
                useEffect(() => {
                    if (values.type !== type) {
                        resetForm({
                            values: {
                                ...values,
                                type,
                                cut_id: "",
                                bonus_id: "",
                            },
                        });
                    }
                }, [type, resetForm, values]);

                return (
                    <Form>
                        <FormContent
                            type={type}
                            values={values}
                            setFieldValue={setFieldValue}
                            touched={touched}
                            errors={errors}
                        />
                        <ButtonsFormSendCancel
                            cancelAdd={cancelAdd}
                            submitButton={handleSubmit}
                            isSubmitting={isCreating || isUpdating}
                        />
                    </Form>
                );
            }}
        </Formik>
    );

    const tabsData = [
        {
            label: t('form.tabs.cut'),
            value: "cut",
            content: renderForm("cut"),
        },
        {
            label: t('form.tabs.bonus'),
            value: "bonus",
            content: renderForm("bonus"),
        },
    ];

    return (
        <div className="form-add-new-salary">
            <div className="all-form-task mt-5">
                <HorizontalTabs
                    tabsData={tabsData}
                    newClassName=""
                    isBgTabButton
                    disabledTabs={selectedDocument?.id}
                    activeTabIndex={selectedDocument?.type == "bonus" ? 1 : 0}
                />
            </div>
        </div>
    );
};

export default TabDiscountSalaryAdjustments;
