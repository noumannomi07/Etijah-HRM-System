import React from "react";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { Form, Formik, useField } from "formik";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import * as Yup from "yup";
import "./FormSubmitSubscription.css";
import TextAreaInput from "@/Dashboard/Shared/Forms/TextArea";
import ArrowSendWhite from "@assets/Icons/ArrowSendWhite.svg";
import { useState } from "react";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import SuccessSendModalWeb from "@/Website/Shared/SuccessSendModalWeb/SuccessSendModalWeb";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { useTranslation } from "react-i18next";

// Custom PhoneField component that properly integrates with Formik
const PhoneField = ({ label, name }: { label: string; name: string }) => {
  const [field, meta, helpers] = useField(name);
  const isError = meta.touched && meta.error;

  return (
    <div className={`flex flex-col gap-1 mt-[0.20rem] relative ${isError ? "error" : ""}`}>
      <label htmlFor={name} className="label-text">
        {label}
      </label>
      <PhoneInput
        className={`mt-1 ${isError ? "border-error-input" : ""}`}
        value={field.value}
        onChange={(phone) => helpers.setValue(phone)}
        onBlur={() => helpers.setTouched(true)}
      />
      {meta.touched && meta.error && (
        <div className="error-text">{meta.error}</div>
      )}
    </div>
  );
};

const FormSubmitSubscription = () => {
  const { t, i18n } = useTranslation('subscription');
  
  // Get current language
  const currentLanguage = i18n.language;
  
  // Manual translation for modal elements (fallback)
  const getModalTranslations = () => {
    if (currentLanguage === 'ar') {
      return {
        title: 'تم إرسال بنجاح',
        button: 'حسنا',
        toastMessage: 'تمت المعاملة بنجاح'
      };
    } else {
      return {
        title: 'Sent Successfully',
        button: 'OK',
        toastMessage: 'Operation completed successfully'
      };
    }
  };
  
  const modalTranslations = getModalTranslations();
  
  // SHOW MODAL AFTER SEND DATA FORM
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const showModalSuccess = () => {
    setOpenSuccessModal(true);
  };
  const hideModalSuccess = () => {
    setOpenSuccessModal(false);
  };

  // OPTIONS FOR EMPLOYEES COUNT DROPDOWN
  const employeesCountOptions = t('employeeCountOptions', { returnObjects: true }) as Array<{value: number, label: string}>;

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    office_title: "",
    employees_count: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, t('form.validation.name.tooShort'))
      .max(50, t('form.validation.name.tooLong'))
      .required(t('form.validation.name.required')),

    email: Yup.string()
      .email(t('form.validation.email.invalid'))
      .required(t('form.validation.email.required')),

    phone: Yup.string()
      .required(t('form.validation.phone.required'))
      .min(8, t('form.validation.phone.invalid'))
      .matches(/^\+\d{7,15}$/, t('form.validation.phone.invalid')),

    office_title: Yup.string().required(t('form.validation.officeTitle.required')),

    employees_count: Yup.string().required(t('form.validation.employeesCount.required')),

    // message: Yup.string()
    //   .required(t('form.validation.message.required'))
    //   .min(10, t('form.validation.message.minLength'))
    //   .max(500, t('form.validation.message.maxLength'))
  });

  // LOADER BUTTON
  const [loader, setLoader] = useState(false);

  // FUNCTION SEND DATA FORM
  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoader(true); // ADD ACTIVE FOR LOADER

    try {
      // CONVERT EMPLOYEES_COUNT TO NUMBER FOR API
      const formData = {
        ...values,
        employees_count: parseInt(values.employees_count)
      };

      const response = await axiosInstance.post(
        "https://backend.etijah.sa/website/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.status === 200) {
        showModalSuccess();
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle any errors (network, validation, etc.)
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      // Always stop the loader, whether success or error
      setLoader(false);
    }
  };

  return (
    <>
      <SuccessSendModalWeb
        openSuccessSendModalWeb={openSuccessModal}
        hiddenModalSuccessSendModalWeb={hideModalSuccess}
        titleDetails={t('form.success.title')}
        textDetails={t('form.success.message')}
        modalTitle={modalTranslations.title}
        buttonText={modalTranslations.button}
        toastMessage={modalTranslations.toastMessage}
      >
        <p className="text-title-2 text-font-dark text-[13px] sm:text-[15px] text-primaryColor_02 mb-3">
          {t('form.success.additionalInfo')}
        </p>
      </SuccessSendModalWeb>
      {/* ========== START FORM SUBSRIPTION INFO ================== */}
      <div data-aos="fade-right" className="form-subscription-info form-style">
        {/* ==================== START HEADER FORM ================= */}
        <div className="header-form-top pb-5">
          <h2 className="title-top font-[600] text-[16px] sm:text-[24px]">
            {t('form.header.title')}
          </h2>
          <p className="text-top pt-1 text-[14px] sm:text-[17px] font-[500] text-font-dark">
            {t('form.header.subtitle')}
          </p>
        </div>
        {/* ==================== END HEADER FORM ================= */}

        {/* ==================== START FORMIK ================== */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched, values }) => (
            <Form>
              {/* ================== START FORM ================ */}
              <div className="all-inputs-form  grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col lg:grid lg:grid-cols-2 gap-4">
                {/* ================= START INPUT ONE ================= */}
                <div className="input-one-form col-span-1 sm:col-span-2">
                  <InputField
                    label={t('form.fields.name.label')}
                    name="name"
                    type="text"
                    placeholder={t('form.fields.name.placeholder')}
                    success
                  />
                </div>
                {/* ================= END INPUT ONE ================= */}

                {/* ================= START INPUT ONE ================= */}
                <div className="input-one-form">
                  <InputField
                    label={t('form.fields.email.label')}
                    name="email"
                    type="email"
                    placeholder={t('form.fields.email.placeholder')}
                    success
                  />
                </div>
                {/* ================= END INPUT ONE ================= */}

                {/* ================= START INPUT ONE ================= */}
                <div className="input-one-form">
                  <PhoneField
                    label={t('form.fields.phone.label')}
                    name="phone"
                  />
                </div>
                {/* ================= END INPUT ONE ================= */}

                {/* ================= START INPUT ONE ================= */}
                <div className="input-one-form">
                  <InputField
                    label={t('form.fields.officeTitle.label')}
                    name="office_title"
                    type="text"
                    placeholder={t('form.fields.officeTitle.placeholder')}
                    success
                  />
                </div>
                {/* ================= END INPUT ONE ================= */}

                {/* ================= START INPUT ONE ================= */}
                <div className="input-one-form">
                  <SelectBox
                    label={t('form.fields.employeesCount.label')}
                    name="employees_count"
                    options={employeesCountOptions}
                    placeholder={t('form.fields.employeesCount.placeholder')}
                    isShowLabel={true}
                    onChange={(selectedOption: any) => {
                      if (selectedOption) {
                        setFieldValue("employees_count", selectedOption.value.toString());
                      }
                    }}
                    field={{
                      name: "employees_count",
                      value: values.employees_count ? employeesCountOptions.find(option => option.value.toString() === values.employees_count) : null,
                      onChange: () => {} // This will be handled by the onChange above
                    }}
                    error={errors.employees_count && touched.employees_count ? errors.employees_count : ""}
                    isSearchable={false}
                    isMulti={false}
                  />
                </div>
                {/* ================= END INPUT ONE ================= */}

                {/* ================= START INPUT ONE ================= */}
                <div className="input-one-form col-span-1 sm:col-span-2">
                  <TextAreaInput
                    label={t('form.fields.message.label')}
                    name="message"
                    type="text"
                    placeholder={t('form.fields.message.placeholder')}
                    success
                    required={false}
                    isShowLabel={true}
                    parentClass=""
                  />
                </div>
                {/* ================= END INPUT ONE ================= */}
              </div>
              {/* ================= END ALL INPUTS FORM ================= */}

              <div className="flex justify-end items-end mt-5">
                <button
                  type="submit"
                  className={`btn-blue-01 w-full sm:w-auto`}
                >
                  {loader ? (
                    <SpinnerLoader />
                  ) : (
                    <>
                      {t('form.buttons.submit')}
                      <img src={ArrowSendWhite} />
                    </>
                  )}
                </button>
              </div>
            </Form>
          )}
          {/* ================== END FORM ================ */}
        </Formik>
        {/* ==================== END FORMIK ================== */}
      </div>
      {/* ========== END FORM SUBSRIPTION INFO ================== */}
    </>
  );
};

export default FormSubmitSubscription;
