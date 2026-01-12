import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

interface UpdatePasswordData {
    current_password: string;
    password: string;
    password_confirmation: string;
}

const updatePassword = async (data: UpdatePasswordData) => {
    const response = await axiosInstance("/update-password", {
        method: "POST",
        data: data,
    });
    return response.data;
};

const PasswordForm = () => {
    const { t } = useTranslation("navbar");
    const [show, setShow] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const { mutate: updatePasswordMutation, isPending } = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            toast.success(
                t("passwordForm.messages.password_update_success")
            );
            formik.resetForm();
            setShow({ current: false, new: false, confirm: false });
        },
        onError: (error: any) => {
            const errorMessage =
                error.response?.data?.message ||
                t("passwordForm.messages.password_update_error");
            toast.error(errorMessage);
        },
    });

    const toggleShow = (field: keyof typeof show) => {
        setShow((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const formik = useFormik({
        initialValues: {
            current_password: "",
            password: "",
            password_confirmation: "",
        },
        validationSchema: Yup.object({
            current_password: Yup.string()
                .required(
                    t("passwordForm.validation.current_password_required")
                )
                .min(
                    6,
                    t("passwordForm.validation.password_min_length")
                ),
            password: Yup.string()
                .min(
                    6,
                    t("passwordForm.validation.password_min_length")
                )
                .required(
                    t("passwordForm.validation.password_required")
                )
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    t("passwordForm.validation.password_requirements")
                )
                .test(
                    "different-from-current",
                    t("passwordForm.validation.password_different"),
                    function (value) {
                        return value !== this.parent.current_password;
                    }
                ),
            password_confirmation: Yup.string()
                .oneOf(
                    [Yup.ref("password")],
                    t("passwordForm.validation.password_mismatch")
                )
                .required(
                    t("passwordForm.validation.confirm_password_required")
                ),
        }),
        onSubmit: (values) => {
            updatePasswordMutation({
                current_password: values.current_password,
                password: values.password,
                password_confirmation: values.password_confirmation,
            });
        },
    });

    const renderInput = (
        name: keyof typeof formik.values,
        label: string,
        showKey: keyof typeof show
    ) => (
        <div className="mb-4 relative">
            <label className="block mb-1 font-medium text-gray-700">
                {label}
            </label>
            <div className="relative">
                <input
                    type={show[showKey] ? "text" : "password"}
                    name={name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values[name]}
                    disabled={isPending}
                    className={`w-full shadow-none !outline-none px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent transition-all ${
                        formik.touched[name] && formik.errors[name]
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300"
                    } ${isPending ? "bg-gray-50 cursor-not-allowed" : ""}`}
                />
                <button
                    type="button"
                    onClick={() => toggleShow(showKey)}
                    disabled={isPending}
                    className="absolute rtl:left-3 top-1/2 transform translate-y-[-50%] ltr:right-3 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {show[showKey] ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                    ) : (
                        <FontAwesomeIcon icon={faEye} />
                    )}
                </button>
            </div>
            {formik.touched[name] && formik.errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                    {formik.errors[name]}
                </p>
            )}
        </div>
    );

    return (
        <div className="">
            <form
                onSubmit={formik.handleSubmit}
                className="max-w-sm mx-auto p-6 bg-white shadow-lg border border-[#ececec] rounded-lg"
            >
                <h2 className="title text-[20px] font-[700] text-center mb-[25px] text-primaryColor">
                    {t("userMenu.securitySettings")}
                </h2>

                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-800 mb-2">
                        {t("passwordForm.password_requirements_title")}
                    </h3>
                    <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                        <li>
                            {t("passwordForm.password_requirement_length")}
                        </li>
                        <li>
                            {t("passwordForm.password_requirement_uppercase")}
                        </li>
                        <li>
                            {t("passwordForm.password_requirement_lowercase")}
                        </li>
                        <li>
                            {t("passwordForm.password_requirement_number")}
                        </li>
                        <li>
                            {t("passwordForm.password_requirement_special")}
                        </li>
                    </ul>
                </div>

                {renderInput(
                    "current_password",
                    t("passwordForm.current_password"),
                    "current"
                )}
                {renderInput(
                    "password",
                    t("passwordForm.password"),
                    "new"
                )}
                {renderInput(
                    "password_confirmation",
                    t("passwordForm.password_confirmation"),
                    "confirm"
                )}

                <button
                    type="submit"
                    disabled={isPending || !formik.isValid || !formik.dirty}
                    className={`w-full !btn-main mt-3 relative ${
                        isPending ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                >
                    {isPending ? (
                        <>
                            <FontAwesomeIcon
                                icon={faSpinner}
                                spin
                                className="ml-2"
                            />
                            {t("passwordForm.updating")}
                        </>
                    ) : (
                        t("passwordForm.save_changes")
                    )}
                </button>
            </form>
        </div>
    );
};

export default PasswordForm;
