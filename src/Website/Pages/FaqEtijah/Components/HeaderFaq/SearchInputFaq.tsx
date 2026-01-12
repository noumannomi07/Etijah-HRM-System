import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import SearchIcon from "@assets/Icons/SearchIcon.svg";
import { useTranslation } from "react-i18next";

const SearchInputFaq = ({ search, handleSearch }: { search: string, handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  const { t } = useTranslation('faq');
  
  const initialValues = {
    search: "",
  };

  const validationSchema = Yup.object().shape({
    search: Yup.string()
      // .required("هذا الحقل مطلوب")
      // .min(2, "يجب أن يكون على الأقل حروفين"),
  });

  // FUNCTION SEND DATA FORM
  const handleSubmit = async (_values: any) => {};

  return (
    <>
      {/* ========== START FORM SUBSRIPTION INFO ================== */}
      <div className="form-search-info w-full mt-3">
        {/* ==================== START FORMIK ================== */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              {/* ================== START FORM ================ */}
              <div className="all-inputs-form">
                {/* ================= START INPUT TWO ================= */}
                <div className="input-one-form w-full">
                  <div
                    className={`input-search-content relative w-full md:w-[70%] lg:w-[50%] m-auto  ${
                      errors.search && touched.search ? "input-error" : ""
                    }`}
                  >
                    <InputField
                      label=""
                      name="search"
                      placeholder={t('search.placeholder')}
                      success
                      type={"text"}
                      value={search}
                      onChange={handleSearch}
                    />
                    <button type="submit" className="icon-search-button">
                      <img src={SearchIcon} alt="search" />
                    </button>
                  </div>
                </div>
                {/* ================= END INPUT TWO ================= */}
              </div>
              {/* ================= END ALL INPUTS FORM ================= */}
            </Form>
          )}
        </Formik>
        {/* ==================== END FORMIK ================== */}
      </div>
      {/* ========== END FORM SUBSRIPTION INFO ================== */}
    </>
  );
};

export default SearchInputFaq;
