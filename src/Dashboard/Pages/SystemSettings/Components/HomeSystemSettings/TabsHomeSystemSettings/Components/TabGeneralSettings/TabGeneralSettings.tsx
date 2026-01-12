import TrashIcon from "@/Dashboard/Shared/DataTableInfo/Icons/TrashIcon";
import LogoSvg from "@assets/images/logo/logo.svg";
import EditIcon from "@/Dashboard/Shared/DataTableInfo/Icons/EditIcon";
import "./TabGeneralSettings.css";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import React from "react";
import { useGeneralSettings } from "@/hooks/api/system-settings";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { useBanks } from "@/hooks/settings/bank";
import ControlledSelect from "@/Dashboard/Shared/SelectBox/ControlledSelect";

interface GeneralSettings {
    data: {
        title: string;
        image: string;
        phone: string;
        email: string;
        address: string;
        iban: string;
        bank_id: string | null;
        account_number: string;
    };
}

interface FormValues {
    title: string;
    image: string | File;
    phone: string;
    email: string;
    address: string;
    iban: string;
    bank_id: string | null;
    account_number: string;
}

const TabGeneralSettings = ({ permissions }: { permissions: any }) => {
    const { t } = useTranslation("systemSettings");
    const formikRef = useRef<FormikProps<FormValues>>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { queryAll, createItem, isCreating } = useGeneralSettings();
    const { data: banks } = useBanks();

    const generalSettings = queryAll?.data as GeneralSettings | undefined;

    const initialValues: FormValues = {
        title: generalSettings?.data?.title ?? "",
        image: generalSettings?.data?.image ?? "",
        phone: generalSettings?.data?.phone ?? "",
        email: generalSettings?.data?.email ?? "",
        address: generalSettings?.data?.address ?? "",
        iban: generalSettings?.data?.iban ?? "",
        bank_id: generalSettings?.data?.bank_id ?? null,
        account_number: generalSettings?.data?.account_number ?? "",
    };

    const validationSchema = Yup.object({
        title: Yup.string().required(t("generalSettings.requiredTitle")),
        phone: Yup.string()
            .matches(/^[0-9]+$/, t("generalSettings.phoneInvalid"))
            .required(t("generalSettings.requiredPhone")),
        email: Yup.string()
            .email(t("generalSettings.emailInvalid"))
            .required(t("generalSettings.requiredEmail")),
        address: Yup.string().required(t("generalSettings.requiredAddress")),
    });

    const handleSubmit = async (
        values: FormValues,
        { setTouched }: FormikHelpers<FormValues>
    ) => {
        try {
            setIsSubmitting(true);
            setTouched({
                title: true,
                phone: true,
                email: true,
                address: true,
                image: true,
                iban: true,
                bank_id: true,
                account_number: true,
            });

            const formData = new FormData();

            // Append all form fields to FormData
            Object.entries(values).forEach(([key, value]) => {
                if (value instanceof File) {
                    formData.append(key, value);
                } else if (typeof value === "string") {
                    // Send all string values including empty ones
                    formData.append(key, value);
                } else if (value !== undefined && value !== null) {
                    // Send other non-null values
                    formData.append(key, String(value));
                } else {
                    // Send null/undefined as empty string
                    formData.append(key, "");
                }
            });

            const response = await createItem(formData);

            if (response.status === 200) {
                toast.success(t("generalSettings.successMessage"));
                // Refresh the form with new data
                await queryAll.refetch();
            } else {
                throw new Error(
                    response.data?.message || t("generalSettings.errorMessage")
                );
            }
        } catch (error: any) {
            toast.error(error?.message || t("generalSettings.errorMessage"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="tab-general-settings border-width-content">
            <div className="header-tap-general flex-between flex-wrap">
                <h2 className="title text-font-dark">
                    {t("tabs.generalSettings")}
                </h2>
                {permissions?.update && (
                    <button
                        type="submit"
                        onClick={() => formikRef.current?.submitForm()}
                        className="btn-main"
                        disabled={isSubmitting || isCreating}
                    >
                        {isSubmitting || isCreating
                            ? t("generalSettings.saving")
                            : t("generalSettings.save")}
                    </button>
                )}
            </div>

            <Formik<FormValues>
                innerRef={formikRef}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({
                    setFieldValue,
                    errors,
                    touched,
                    values,
                }) => (
                    <Form>
                        <div className="upload-image-content mt-3 mb-4">
                            <h2 className="title text-font-dark text-[16px] mb-3">
                                {t("generalSettings.companyLogo")}
                            </h2>
                            <div className="all-image-upload-info flex-between flex-wrap items-center">
                                <div className="image-uploded w-[120px] h-[100px] border p-3 rounded-[10px]">
                                    <img
                                        src={
                                            values.image instanceof File
                                                ? URL.createObjectURL(
                                                      values.image
                                                  )
                                                : values.image || LogoSvg
                                        }
                                        alt={t("generalSettings.companyLogo")}
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                    />
                                </div>

                                <div className="buttons-actions item-center-flex">
                                    {permissions?.delete && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFieldValue("image", "")
                                            }
                                            className="p-[10px_14px] button-transparent button-transparent-danger button-hover-svg"
                                            disabled={
                                                isSubmitting || isCreating
                                            }
                                        >
                                            <TrashIcon />
                                        </button>
                                    )}
                                    {permissions?.update && (
                                        <label
                                            className={`p-[10px_14px] button-transparent button-hover-svg cursor-pointer ${
                                                isSubmitting || isCreating
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                        >
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0];
                                                    if (file) {
                                                        // Validate file size (max 2MB)
                                                        if (
                                                            file.size >
                                                            2 * 1024 * 1024
                                                        ) {
                                                            toast.error(
                                                                t(
                                                                    "generalSettings.imageSizeError"
                                                                )
                                                            );
                                                            return;
                                                        }
                                                        // Validate file type
                                                        if (
                                                            !file.type.startsWith(
                                                                "image/"
                                                            )
                                                        ) {
                                                            toast.error(
                                                                t(
                                                                    "generalSettings.imageTypeError"
                                                                )
                                                            );
                                                            return;
                                                        }
                                                        setFieldValue(
                                                            "image",
                                                            file
                                                        );
                                                    }
                                                }}
                                                disabled={
                                                    isSubmitting || isCreating
                                                }
                                            />
                                            <EditIcon />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="form-general">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="input-one-details">
                                    <InputField
                                        isShowLabel={true}
                                        label={t("generalSettings.companyName")}
                                        name="title"
                                        type="text"
                                        value={values.title}
                                        placeholder={t(
                                            "generalSettings.companyName"
                                        )}
                                        success
                                        error={touched.title && errors.title}
                                    />
                                </div>

                                <div className="input-one-details">
                                    <InputField
                                        isShowLabel={true}
                                        label={t("generalSettings.phone")}
                                        name="phone"
                                        type="tel"
                                        value={values.phone}
                                        placeholder={t("generalSettings.phone")}
                                        success
                                        error={touched.phone && errors.phone}
                                    />
                                </div>

                                <div className="input-one-details">
                                    <InputField
                                        isShowLabel={true}
                                        label={t("generalSettings.email")}
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        placeholder={t("generalSettings.email")}
                                        success
                                        error={touched.email && errors.email}
                                    />
                                </div>

                                <div className="input-one-details">
                                    <InputField
                                        isShowLabel={true}
                                        label={t("generalSettings.address")}
                                        name="address"
                                        type="text"
                                        value={values.address}
                                        placeholder={t(
                                            "generalSettings.address"
                                        )}
                                        success
                                        error={
                                            touched.address && errors.address
                                        }
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <h1 className="text-font-dark text-[16px]">
                                        {t("generalSettings.Bank Information")}
                                    </h1>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="input-one-details">
                                            <ControlledSelect
                                                label="اختر البنك"
                                                fieldName="bank_id"
                                                type="static"
                                                placeholder="-إختر-"
                                                isClearable={true}
                                                staticOptions={
                                                    banks?.map((bank) => ({
                                                        value: bank.id,
                                                        label: bank.ar_title,
                                                    })) ?? []
                                                }
                                            />
                                        </div>
                                        <div className="input-one-details">
                                            <InputField
                                                isShowLabel={true}
                                                label={t(
                                                    "generalSettings.iban"
                                                )}
                                                name="iban"
                                                type="text"
                                                value={values.iban}
                                                placeholder={t(
                                                    "generalSettings.iban"
                                                )}
                                                success
                                                error={
                                                    touched.iban && errors.iban
                                                }
                                            />
                                        </div>
                                        <div className="input-one-details">
                                            <InputField
                                                isShowLabel={true}
                                                label={t(
                                                    "generalSettings.account_number"
                                                )}
                                                name="account_number"
                                                type="text"
                                                value={values.account_number}
                                                placeholder={t(
                                                    "generalSettings.account_number"
                                                )}
                                                success
                                                error={
                                                    touched.account_number &&
                                                    errors.account_number
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default TabGeneralSettings;
