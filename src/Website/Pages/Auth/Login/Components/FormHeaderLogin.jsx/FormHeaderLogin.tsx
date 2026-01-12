import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import ArrowSendWhite from "@assets/Icons/ArrowSendWhite.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import HeaderLogin from "../HeaderLogin/HeaderLogin";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import audio from "@assets/WELCOME.mp3";
import { useNavigate } from "react-router-dom";
import { FullRoutes } from "@/Routes/routes";
import React from "react";
import { LAST_VISITED_PAGE_KEY } from "@/utils/axios";
import axios from "axios";
import { useUser } from "@/contexts";
import { useTranslation } from "react-i18next";

const FormHeaderLogin = ({
    onForgotPassword,
    onBack,
}: {
    onForgotPassword: () => void;
    onBack: () => void;
}) => {
    const { t } = useTranslation('login');
    const { fetchUserProfile } = useUser();
    const initialValues = {
        email: "",
        password: "",
        rememberMe: false,
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('form.validation.email.invalid'))
            .required(t('form.validation.email.required')),
        password: Yup.string()
            .min(8, t('form.validation.password.tooShort'))
            .max(30, t('form.validation.password.tooLong'))
            .required(t('form.validation.password.required')),
    });

    // LOADER BUTTON
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const soundEffect = useRef<HTMLAudioElement>(null);

    const handleSubmit = async (values: any, { resetForm }: any) => {
        setLoader(true);

        try {
            const response = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/login",
                values
            );
            const data = await response.data;

            if (data.access_token) {
                soundEffect.current?.play();

                // Set cookie expiration based on remember me choice
                const cookieOptions = values.rememberMe
                    ? { expires: 30 }
                    : { expires: 7 };
                Cookies.set("access_token", data.access_token, cookieOptions);
                Cookies.set("userState", "1", cookieOptions);

                await fetchUserProfile();
                // Clear any existing roles cache and let the dashboard layout fetch fresh roles

                const lastVisitedPage = Cookies.get(LAST_VISITED_PAGE_KEY);

                // if (data.domain) {
                //     window.location.href = `https://${data.domain}/dashboard`;
                // }

                // بعد نجاح تسجيل الدخول:
                // logEvent(analytics, "user_login_success");
                toast.success(t('messages.loginSuccess'));

                if (lastVisitedPage) {
                    navigate(lastVisitedPage);
                    Cookies.remove(LAST_VISITED_PAGE_KEY);
                } else {
                    navigate(FullRoutes.Dashboard.Home);
                }
            } else {
                console.error("Invalid login response:", data);
                setLoader(false);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.error || t('messages.loginError'));
            setLoader(false);
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const togglePasswordVisibility = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // Handle Enter key to submit the form
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const form = e.currentTarget.closest("form");
            if (form) {
                const submitButton = form.querySelector(
                    'button[type="submit"]'
                ) as HTMLButtonElement;
                submitButton?.click();
            }
        }
    };

    return (
        <>
            <HeaderLogin
                onBack={onBack}
                title={t('form.header.title')}
                text={t('form.header.description')}
            />
            <audio ref={soundEffect} src={audio}></audio>
            <div className="form-subscription-info">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, values, handleChange }) => (
                        <Form onKeyDown={handleKeyDown}>
                            <div className="all-inputs-form grid grid-cols-1 gap-4">
                                <div className="input-one-form">
                                    <InputField
                                        isShowLabel={true}
                                        label={t('form.fields.email.label')}
                                        name="email"
                                        type="email"
                                        placeholder={t('form.fields.email.placeholder')}
                                        success
                                    />
                                </div>
                                <div className="input-one-form">
                                    <div
                                        className={`input-pass relative ${errors.password && touched.password
                                                ? "input-error"
                                                : ""
                                            }`}
                                    >
                                        <InputField
                                            isShowLabel={true}
                                            label={t('form.fields.password.label')}
                                            name="password"
                                            placeholder={t('form.fields.password.placeholder')}
                                            success
                                            value={password}
                                            onChange={handlePasswordChange}
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                        />

                                        <button
                                            className="icon-eye-button"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <FontAwesomeIcon
                                                    icon={faEyeSlash}
                                                />
                                            ) : (
                                                <FontAwesomeIcon icon={faEye} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="rememberMe"
                                        name="rememberMe"
                                        checked={values.rememberMe}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-primaryColor_02 focus:ring-primaryColor_02 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="rememberMe"
                                        className="mr-2 text-font-dark text-[15px]"
                                    >
                                        {t('form.fields.rememberMe')}
                                    </label>
                                </div>
                                <p
                                    onClick={onForgotPassword}
                                    className="link-route text-font-dark text-primaryColor_02 text-[15px] cursor-pointer"
                                >
                                    {t('form.links.forgotPassword')}
                                </p>
                            </div>
                            <button type="submit" className="btn-blue-01 w-full">
                                {loader ? (
                                    <div className="flex justify-center">
                                        <SpinnerLoader />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <span>{t('form.buttons.login')}</span>
                                        <div className="icon-arrow-button">
                                            <img src={ArrowSendWhite} />
                                        </div>
                                    </div>
                                )}
                            </button>

                            {/* <div className="mt-6">
                                <button
                                    type="submit"
                                    className="btn-blue-01 w-full"
                                >
                                    {loader ? (
                                        <SpinnerLoader />
                                    ) : (
                                        <>
                                            تسجيل الدخول
                                            <div className="icon-arrow-button">
                                                <img src={ArrowSendWhite} />
                                            </div>
                                        </>
                                    )}
                                </button>
                            </div> */}
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
};

FormHeaderLogin.propTypes = {
    onForgotPassword: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};
export default FormHeaderLogin;
