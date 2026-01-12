import axiosInstance from "@/utils/axios";
import CompanyDocumentsSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/CompanyDocumentsSelect";
import EmployeeSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/EmployeeSelect";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import FileUploader from "@/Dashboard/Shared/FileUploader/FileUploader";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { FullRoutes } from "@/Routes/routes";
import { Field, Form, Formik } from "formik";
import i18next from "i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const FormAddNewCompanyDocuments = () => {
  const { t } = useTranslation('companyDocuments');
  const initialValues = {
    ar: {
      title: "",
      content: "",
    },
    en: {
      title: "",
      content: "",
    },
    file: null,
    category_id: null,
    expiry_date: "",
  };

  const validationSchema = Yup.object({
    ar: Yup.object({
      title: Yup.string()
        .required(t('validation.documentNameArabicRequired'))
        .matches(
          /^[\u0621-\u064A\s]+$/,
          t('validation.documentNameArabicPattern')
        ),
      content: Yup.string()
        .required(t('validation.descriptionArabicRequired'))
        .matches(/^[\u0621-\u064A\s]+$/, t('validation.descriptionArabicPattern')),
    }),
    en: Yup.object({
      title: Yup.string()
        .required(t('validation.documentNameEnglishRequired'))
        .matches(
          /^[A-Za-z\s]+$/,
          t('validation.documentNameEnglishPattern')
        ),
      content: Yup.string()
        .required(t('validation.descriptionEnglishRequired'))
        .matches(/^[A-Za-z\s]+$/, t('validation.descriptionEnglishPattern')),
    }),

    file: Yup.mixed().required(t('validation.fileRequired')),
    category_id: Yup.object().nullable().required(t('validation.typeRequired')),
  });

  const handleSubmit = async (values, { setTouched, setSubmitting }) => {
    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("ar[title]", values.ar.title);
      formData.append("ar[content]", values.ar.content);
      formData.append("en[title]", values.en.title);
      formData.append("en[content]", values.en.content);
      formData.append("category_id", values.category_id.value);
      formData.append("expiry_date", values.expiry_date);

      if (values.file && values.file[0]) {
        formData.append("file", values.file[0]);
      }

      const response = await axiosInstance.post("/file", formData, {
        headers: {
          "Accept-Language": i18next.language,
          "Content-Type": "application/pdf",
        },
      });

      if (response.data) {
        toast.success(t('messages.addSuccess'));
        navigate(FullRoutes.Dashboard.CompanyDocuments.All);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.response?.data?.message || t('messages.addError')
      );
    } finally {
      setSubmitting(false);
    }
  };

  const navigate = useNavigate();

  const cancelAdd = () => {
    toast.success(t('messages.cancelSuccess'));
    navigate(FullRoutes.Dashboard.CompanyDocuments.All);
  };

  return (
    <>
      <div className="all-content-modal-filter border-width-content mt-7">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue, errors, touched, isSubmitting }) => (
            <Form>
              <div className="all-forms-grid grid-cards-2">
                <InputField
                  isShowLabel={true}
                  label={t('form.documentNameArabic')}
                  name="ar.title"
                  type="text"
                  placeholder={t('form.placeholders.documentNameArabic')}
                  success
                />
                <InputField
                  isShowLabel={true}
                  label={t('form.documentNameEnglish')}
                  name="en.title"
                  type="text"
                  placeholder={t('form.placeholders.documentNameEnglish')}
                  success
                />
                <div className="sm:col-span-1 md:col-span-2 mt-3">
                  <Field name="category_id">
                    {({ field }) => (
                      <CompanyDocumentsSelect
                        labelText={t('form.documentType')}
                        placeholder={t('form.placeholders.select')}
                        setFieldValue={setFieldValue}
                        field={field}
                        error={touched.category_id && errors.category_id}
                      />
                    )}
                  </Field>
                </div>
                <InputField
                  isShowLabel={true}
                  label={t('form.descriptionArabic')}
                  name="ar.content"
                  type="text"
                  placeholder={t('form.placeholders.descriptionArabic')}
                  success
                />
                <InputField
                  isShowLabel={true}
                  label={t('form.descriptionEnglish')}
                  name="en.content"
                  type="text"
                  placeholder={t('form.placeholders.descriptionEnglish')}
                  success
                />

                <DatePickerComponent
                  label={t('form.expiryDate')}
                  addTextPlaceHolder={t('form.placeholders.date')}
                  name="expiry_date"
                  setFieldValue={setFieldValue}
                  required
                />

                <div className="sm:col-span-1 md:col-span-2">
                  <FileUploader
                    textLabel={t('form.attachFile')}
                    name="file"
                    onFileUpload={(file) => setFieldValue("file", file)}
                    error={touched.file && errors.file}
                  />
                </div>
              </div>
              <ButtonsFormSendCancel
                cancelAdd={cancelAdd}
                submitButton={() => handleSubmit()}
                isSubmitting={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormAddNewCompanyDocuments;
