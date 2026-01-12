import React, { useEffect } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useState, useRef } from "react";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import ArrowSendWhite from "@assets/Icons/ArrowSendWhite.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import HeaderLogin from "../HeaderLogin/HeaderLogin";
import PropTypes from "prop-types";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";
import "./../OtpForm/OtpForm.css";
import { useTranslation } from "react-i18next";

interface FormForgetPasswordProps {
  showOtp: () => void;
  onBack: () => void;
}

interface EmailFormValues {
  email: string;
}

interface OTPFormValues {
  "otp-0": string;
  "otp-1": string;
  "otp-2": string;
  "otp-3": string;
}

interface PasswordFormValues {
  password: string;
  confirmPassword: string;
}

const FormForgetPassword: React.FC<FormForgetPasswordProps> = ({ onBack }) => {
  const { t } = useTranslation('login');
  const [step, setStep] = useState(1); // 1: Email step, 2: OTP step, 3: Password step
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Email validation schema
  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('form.validation.email.invalid'))
      .required(t('form.validation.email.required'))
  });

  // Password validation schema
  const passwordValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, t('form.validation.password.tooShort'))
      .max(30, t('form.validation.password.tooLong'))
      .required(t('form.validation.password.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t('form.validation.confirmPassword.mismatch'))
      .required(t('form.validation.confirmPassword.required'))
  });

  // OTP validation schema
  const otpValidationSchema = Yup.object().shape({
    "otp-0": Yup.string().required(t('form.validation.otp.required')),
    "otp-1": Yup.string().required(t('form.validation.otp.required')),
    "otp-2": Yup.string().required(t('form.validation.otp.required')),
    "otp-3": Yup.string().required(t('form.validation.otp.required'))
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        focusInput(0);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleEmailSubmit = async (
    values: EmailFormValues,
    { resetForm }: FormikHelpers<EmailFormValues>
  ) => {
    setLoader(true);
    try {
      setEmail(values.email);
      await axiosInstance.post("/otp", { email: values.email });
      setStep(2);

      setLoader(false);
      toast.success(t('forgotPassword.messages.otpSent'));
    } catch (error) {
      setLoader(false);
      toast.error(
        (error as any)?.response?.data?.message ||
          t('forgotPassword.messages.otpError')
      );
    }
  };

  const handleOtpSubmit = async (
    values: OTPFormValues,
    { resetForm }: FormikHelpers<OTPFormValues>
  ) => {
    setLoader(true);
    try {
      // Combine OTP digits
      const otpValue = Object.keys(values)
        .filter((key) => key.startsWith("otp-"))
        .map((key) => values[key as keyof OTPFormValues])
        .join("");

      if (otpValue.length !== 4) {
        toast.error(t('form.validation.otp.incomplete'));
        setLoader(false);
        return;
      }

      await axiosInstance.post("/checkotp", { email, otp: otpValue });
      setLoader(false);
      setStep(3);
      setOtp(otpValue);

      toast.success(t('forgotPassword.messages.otpVerified'));
    } catch (error) {
      setLoader(false);
      toast.error(
        (error as any)?.response?.data?.message ||
          t('forgotPassword.messages.verifyError')
      );
    }
  };

  const handlePasswordSubmit = async (
    values: PasswordFormValues,
    { resetForm }: FormikHelpers<PasswordFormValues>
  ) => {
    setLoader(true);
    try {
      await axiosInstance.post("/updatepassword", {
        email,
        password: values.password,
        otp,
        password_confirmation: values.confirmPassword
      });
      setLoader(false);
      toast.success(t('forgotPassword.messages.passwordUpdated'));
      onBack();
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message ||
          t('forgotPassword.messages.updateError')
      );
      setLoader(false);
    }
  };

  const focusInput = (index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  };

  const handleOtpInputChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    const inputValue = e.target.value;
    const fieldName = `otp-${index}` as keyof OTPFormValues;

    if (/^[0-9]$/.test(inputValue) || inputValue === "") {
      setFieldValue(fieldName, inputValue);
      if (inputValue.length === 1 && index < 3) {
        setTimeout(() => {
          focusInput(index + 1);
        }, 0);
      }
    } else if (inputValue.length > 1 && /^[0-9]+$/.test(inputValue)) {
      // HANDLE PASTE OF MULTIPLE DIGITS
      const digitsToPaste = inputValue.slice(0, 4 - index).split("");
      digitsToPaste.forEach((digit, i) => {
        const currentFieldIndex = index + i;
        if (currentFieldIndex < 4) {
          setFieldValue(
            `otp-${currentFieldIndex}` as keyof OTPFormValues,
            digit
          );
        }
      });

      if (digitsToPaste.length > 0) {
        const nextFocusIndex = Math.min(3, index + digitsToPaste.length - 1);
        if (index + digitsToPaste.length - 1 < 3) {
          setTimeout(() => focusInput(nextFocusIndex + 1), 0);
        } else {
          setTimeout(() => focusInput(nextFocusIndex), 0);
        }
      }
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
    values: OTPFormValues
  ) => {
    const fieldName = `otp-${index}` as keyof OTPFormValues;

    if (e.key === "Backspace") {
      if (values[fieldName] === "" && index > 0) {
        e.preventDefault();
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      if (index > 0) {
        e.preventDefault();
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowRight") {
      if (index < 3) {
        e.preventDefault();
        focusInput(index + 1);
      }
    } else if (
      e.key.length === 1 &&
      !/^[0-9]$/.test(e.key) &&
      !e.ctrlKey &&
      !e.metaKey &&
      e.altKey === false
    ) {
      e.preventDefault();
    }
  };

  return (
    <>
      <HeaderLogin
        onBack={onBack}
        title={
          step === 1
            ? t('forgotPassword.steps.reset.title')
            : step === 2
            ? t('forgotPassword.steps.verify.title')
            : t('forgotPassword.steps.change.title')
        }
        text={
          step === 1
            ? t('forgotPassword.steps.reset.description')
            : step === 2
            ? t('forgotPassword.steps.verify.description')
            : t('forgotPassword.steps.change.description')
        }
      />

      <div className="form-subscription-info">
        {step === 1 ? (
          <Formik<EmailFormValues>
            initialValues={{ email: "" }}
            validationSchema={emailValidationSchema}
            onSubmit={handleEmailSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="all-inputs-form grid grid-cols-1 gap-4">
                  <InputField
                    isShowLabel={true}
                    label={t('form.fields.email.label')}
                    name="email"
                    placeholder={t('form.fields.email.placeholder')}
                    success
                    type="email"
                    error={touched.email && errors.email}
                  />
                </div>

                <div className="all-link-route flex justify-end items-end pt-4 cursor-pointer">
                  <p
                    onClick={onBack}
                    className="link-route text-font-dark text-primaryColor_02 text-[15px]"
                  >
                    {t('form.links.backToLogin')}
                  </p>
                </div>

                <div className="flex justify-end items-end mt-6">
                  <button type="submit" className="btn-blue-01 w-full">
                    {loader ? (
                      <SpinnerLoader />
                    ) : (
                      <>
                        {t('form.buttons.send')}
                        <div className="icon-arrow-button">
                          <img src={ArrowSendWhite} alt="send" />
                        </div>
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : step === 2 ? (
          <Formik<OTPFormValues>
            initialValues={{
              "otp-0": "",
              "otp-1": "",
              "otp-2": "",
              "otp-3": ""
            }}
            validationSchema={otpValidationSchema}
            onSubmit={handleOtpSubmit}
            enableReinitialize
          >
            {({ errors, touched, values, setFieldValue, resetForm }) => (
              <Form className="info-otp-form">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.fields.email.label')}
                  </label>
                  <div className="p-2 bg-gray-100 rounded-md">{email}</div>
                </div>

                <div className="all-inputs-form grid grid-cols-1 gap-4 otp-form">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('form.validation.otp.required')}
                  </label>
                  <div
                    className="all-input-otp flex-items-center gap-3"
                    dir="ltr"
                  >
                    {[0, 1, 2, 3].map((index) => {
                      const fieldName = `otp-${index}` as keyof OTPFormValues;
                      return (
                        <div key={index} className="relative">
                          <input
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            pattern="[0-9]*"
                            name={fieldName}
                            className="form-control focus:shadow-none focus:outline-none text-center"
                            maxLength={1}
                            value={values[fieldName] || ""}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleOtpInputChange(index, e, setFieldValue);
                            }}
                            onKeyDown={(
                              e: React.KeyboardEvent<HTMLInputElement>
                            ) => handleOtpKeyDown(index, e, values)}
                            ref={(el) => {
                              if (el) {
                                inputRefs.current[index] = el;
                              }
                            }}
                            onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
                              e.target.select()
                            }
                          />
                          {touched[fieldName] && errors[fieldName] && (
                            <div className="absolute -bottom-5 text-red-500 text-[10px] text-center mx-auto">
                              {errors[fieldName]}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="all-link-route flex justify-between items-end pt-4 cursor-pointer">
                  <p
                    onClick={() => {
                      setStep(1);
                      resetForm();
                    }}
                    className="link-route text-font-dark text-primaryColor_02 text-[15px]"
                  >
                    {t('form.links.editEmail')}
                  </p>
                  <p
                    onClick={() => {
                      resetForm();
                      handleEmailSubmit(
                        { email: email },
                        { resetForm: () => {} }
                      ).then(() => {});
                    }}
                    className="link-route text-font-dark text-primaryColor_02 text-[15px]"
                  >
                    {t('form.links.resendOtp')}
                  </p>
                </div>

                <div className="flex justify-end items-end mt-6">
                  <button type="submit" className="btn-blue-01 w-full">
                    {loader ? (
                      <SpinnerLoader />
                    ) : (
                      <>
                        {t('form.buttons.verify')}
                        <div className="icon-arrow-button">
                          <img src={ArrowSendWhite} alt="send" />
                        </div>
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        ) : (
          <Formik<PasswordFormValues>
            initialValues={{
              password: "",
              confirmPassword: ""
            }}
            validationSchema={passwordValidationSchema}
            onSubmit={handlePasswordSubmit}
          >
            {({ errors, touched, values, handleChange, handleBlur }) => (
              <Form>
                <div className="all-inputs-form grid grid-cols-1 gap-4">
                  <div className="input-one-form">
                    <div
                      className={`input-pass relative ${
                        errors.password && touched.password ? "input-error" : ""
                      }`}
                    >
                      <InputField
                        isShowLabel={true}
                        label={t('form.fields.password.label')}
                        name="password"
                        placeholder={t('form.fields.password.placeholder')}
                        success
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={showPassword ? "text" : "password"}
                        error={touched.password && errors.password}
                      />
                      <button
                        type="button"
                        className="icon-eye-button"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault();
                          setShowPassword(!showPassword);
                        }}
                      >
                        {showPassword ? (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon icon={faEye} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="input-one-form">
                    <div
                      className={`input-pass relative ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "input-error"
                          : ""
                      }`}
                    >
                      <InputField
                        isShowLabel={true}
                        label={t('form.fields.confirmPassword.label')}
                        name="confirmPassword"
                        placeholder={t('form.fields.confirmPassword.placeholder')}
                        success
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={showConfirmPassword ? "text" : "password"}
                        error={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                      <button
                        type="button"
                        className="icon-eye-button"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault();
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                      >
                        {showConfirmPassword ? (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon icon={faEye} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="all-link-route flex justify-between items-end pt-4 cursor-pointer">
                  <p
                    onClick={() => {
                      setStep(2);
                    }}
                    className="link-route text-font-dark text-primaryColor_02 text-[15px]"
                  >
                    {t('form.links.backToVerify')}
                  </p>
                  <p
                    onClick={onBack}
                    className="link-route text-font-dark text-primaryColor_02 text-[15px]"
                  >
                    {t('form.links.backToLogin')}
                  </p>
                </div>

                <div className="flex justify-end items-end mt-6">
                  <button type="submit" className="btn-blue-01 w-full">
                    {loader ? (
                      <SpinnerLoader />
                    ) : (
                      <>
                        {t('form.buttons.changePassword')}
                        <div className="icon-arrow-button">
                          <img src={ArrowSendWhite} alt="send" />
                        </div>
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
};

FormForgetPassword.propTypes = {
  onBack: PropTypes.func.isRequired,
  showOtp: PropTypes.func.isRequired
};

export default FormForgetPassword;
