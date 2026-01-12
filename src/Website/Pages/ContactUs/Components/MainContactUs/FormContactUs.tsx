import InputField from "@/Dashboard/Shared/Forms/InputField";
import { Form, Formik } from "formik";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import * as Yup from "yup";
import { useState } from "react";
import TextAreaInput from "@/Dashboard/Shared/Forms/TextArea";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import ArrowSendWhite from "@assets/Icons/ArrowSendWhite.svg";
import SuccessSendModalWeb from "@/Website/Shared/SuccessSendModalWeb/SuccessSendModalWeb";
import { useTranslation } from "react-i18next";

const FormContactUs = () => {
  const { t } = useTranslation('contactUs');
  
  // SHOW MODAL AFTER SEND DATA FORM
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const showModalSuccess = () => {
    setOpenSuccessModal(true);
  };
  const hideModalSuccess = () => {
    setOpenSuccessModal(false);
  };

  const initialValues = {
    name: "",
    email: "",
    phone: "",
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
      .matches(/^\+?\d{10,11}$/, t('form.validation.phone.invalid')),

    message: Yup.string()
      .required(t('form.validation.message.required'))
      .test(
        "min-words",
        t('form.validation.message.minWords'),
        (value) => {
          return value && value.trim().split(/\s+/).length >= 3;
        }
      ),
  });

  // LOADER BUTTON
  const [loader, setLoader] = useState(false);

  // FUNCTION SEND DATA FORM
  const handleSubmit = async (values, { resetForm }) => {
    setLoader(true); // ADD ACTIVE FOR LOADER
    setTimeout(() => {
      resetForm(); // RESET INPUTS AFTER SEND DATA
      showModalSuccess();
      // AFTER 800MS ADD FALSE TO LOADER AND ADD TOAST SUCCESS TO SEND AND HIDDEN MODAL
      setLoader(false);
    }, 1000);
  };

  return (
    <>
      <SuccessSendModalWeb
        openSuccessSendModalWeb={openSuccessModal}
        hiddenModalSuccessSendModalWeb={hideModalSuccess}
        titleDetails={t('form.success.title')}
        textDetails={t('form.success.message')}
      />
      {/* ========== START FORM SUBSRIPTION INFO ================== */}
      <div
        data-aos="fade-right"
        className="form-subscription-info form-style border"
      >
        {/* ==================== START FORMIK ================== */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched, values }) => (
            <Form>
              {/* ================== START FORM ================ */}
              <div className="all-inputs-form  flex flex-col gap-4 w-full">
                {/* ================= START INPUT ONE ================= */}
                <div className="input-one-form">
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
                  <label htmlFor="phone" className="label-text">
                    {t('form.fields.phone.label')}
                  </label>
                  <PhoneInput
                    className={`mt-1 ${
                      errors.phone && touched.phone ? "border-error-input" : ""
                    }`}
                    defaultCountry="sa"
                    value={values.phone}
                    onChange={(phone) => setFieldValue("phone", phone)}
                  />
                  {errors.phone && touched.phone ? (
                    <div className="error-text">{errors.phone}</div>
                  ) : null}
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
                  <TextAreaInput
                    label={t('form.fields.message.label')}
                    name="message"
                    type="text"
                    placeholder={t('form.fields.message.placeholder')}
                    success
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
                      <div className="icon-arrow-button">
                        <img src={ArrowSendWhite} />
                      </div>
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

export default FormContactUs;
