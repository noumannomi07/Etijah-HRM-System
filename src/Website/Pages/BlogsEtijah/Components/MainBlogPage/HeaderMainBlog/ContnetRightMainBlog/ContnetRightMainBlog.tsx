import InputField from "@/Dashboard/Shared/Forms/InputField";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import InfoSection from "@/Website/Shared/BannerLayout/InfoSection";
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ContnetRightMainBlog = () => {
  const { t } = useTranslation('blogs');
  
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('mainPage.subscription.validation.emailInvalid'))
      .required(t('mainPage.subscription.validation.emailRequired')),
  });

  // LOADER BUTTON
  const [loader, setLoader] = useState(false);

  // FUNCTION SEND DATA FORM
  const handleSubmit = async (values, { resetForm }) => {
    setLoader(true); // ADD ACTIVE FOR LOADER
    setTimeout(() => {
      resetForm(); // RESET INPUTS AFTER SEND DATA

      // AFTER 800MS ADD FALSE TO LOADER AND ADD TOAST SUCCESS TO SEND AND HIDDEN MODAL
      setLoader(false);
    }, 1000);
  };

  return (
    <div className="content-right-blog-header">
      <InfoSection
        newClassInfoSection={"info-details-blog-header"}
        title={t('mainPage.header.title')}
        description={t('mainPage.header.description')}
        hideButtonSendRequest={true}
        dataAos="fade-left"
      >
        {/* ==================== START FORMIK ================== */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            {/* ================== START FORM ================ */}
            <div className="all-inputs-form-blog mt-6">
              {/* ================= START INPUT ONE ================= */}
              <div className="input-one-form  w-full lg:w-[70%]">
                <InputField
                  isShowLabel={false}
                  label={""}
                  name="email"
                  type="email"
                  placeholder={t('mainPage.subscription.emailPlaceholder')}
                  success
                />
              </div>
              {/* ================= END INPUT ONE ================= */}
            </div>
            {/* ================= END ALL INPUTS FORM ================= */}

            <div className="button-send-email mt-4">
              <button
                type="submit"
                className="button-transparent bg-whiteColor button-hover-svg p-[13px_30px] button-transparent-danger rounded-full w-full sm:w-auto shadow-none"
              >
                {loader ? (
                  <SpinnerLoader />
                ) : (
                  <>
                    {t('mainPage.subscription.subscribeButton')}
                    <div className=" transform  rotate-[-50deg]">
                      {" "}
                      <FontAwesomeIcon icon={faArrowUpLong} />
                    </div>
                  </>
                )}
              </button>
            </div>
          </Form>
        </Formik>
        {/* ==================== END FORMIK ================== */}
      </InfoSection>
    </div>
  );
};

export default ContnetRightMainBlog;
