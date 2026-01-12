import SectionSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/SectionSelect";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import FileUploader from "@/Dashboard/Shared/FileUploader/FileUploader";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { FullRoutes } from "@/Routes/routes";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const FormInformationEmployee = () => {
  const { t } = useTranslation('employment');
  
  const options = {
    nationality: [
      { value: "egypt", label: t('addCandidate.form.options.nationality.egypt') },
      { value: "usa", label: t('addCandidate.form.options.nationality.usa') },
      { value: "canada", label: t('addCandidate.form.options.nationality.canada') },
    ],
    jobTitle: [
      { value: "manager", label: t('addCandidate.form.options.jobTitle.manager') },
      { value: "developer", label: t('addCandidate.form.options.jobTitle.developer') },
      { value: "designer", label: t('addCandidate.form.options.jobTitle.designer') },
    ],
    maritalStatus: [
      { value: "single", label: t('addCandidate.form.options.maritalStatus.single') },
      { value: "married", label: t('addCandidate.form.options.maritalStatus.married') },
    ],
    typePerson: [
      { value: "male", label: t('addCandidate.form.options.gender.male') },
      { value: "female", label: t('addCandidate.form.options.gender.female') },
    ],
  };

  const initialValues = {
    candidateName: "",
    firstName: "",
    phoneNumber: "",
    email: "",
    sectionInfo: null,
    jobTitle: null,
    maritalStatus: null,
    nationality: null,
    typePerson: null,
  };

  const validationSchema = Yup.object({
    candidateName: Yup.string().required(t('addCandidate.form.validation.candidateNameRequired')),
    firstName: Yup.string().required(t('addCandidate.form.validation.firstNameRequired')),
    phoneNumber: Yup.string()
      .required(t('addCandidate.form.validation.phoneNumberRequired'))
      .matches(/^[0-9]{10}$/, t('addCandidate.form.validation.phoneNumberInvalid')),
    email: Yup.string()
      .required(t('addCandidate.form.validation.emailRequired'))
      .email(t('addCandidate.form.validation.emailInvalid')),
    jobTitle: Yup.object().nullable().required(t('addCandidate.form.validation.jobTitleRequired')),
    maritalStatus: Yup.object().nullable().required(t('addCandidate.form.validation.maritalStatusRequired')),
    nationality: Yup.object().nullable().required(t('addCandidate.form.validation.nationalityRequired')),
    typePerson: Yup.object().nullable().required(t('addCandidate.form.validation.genderRequired')),
    sectionInfo: Yup.object().nullable().required(t('addCandidate.form.validation.sectionRequired')),
  });

  //   SUBMIT FORM
  const handleSubmit = (values, { resetForm }) => {
    toast.success(t('addCandidate.form.messages.addSuccess'));
    resetForm();
  };

  // NAVIGATE CANCEL
  const navigate = useNavigate();

  const cancelAdd = () => {
    toast.success(t('addCandidate.form.messages.cancelSuccess'));
    navigate(FullRoutes.Dashboard.Employment.All);
  };

  //   UPLOAD FILES
  const [cvFile, setCvFile] = useState(null);
  const handleFileUpload = (file) => {
    setCvFile(file);
  };
  return (
    <div className="all-form-info">
      <div className="all-content-modal-filter">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue, errors, touched }) => (
            <Form>
              <div className="all-forms-grid grid-cards-2">
                <InputField
                  isShowLabel={true}
                  label={t('addCandidate.form.candidateName')}
                  name="candidateName"
                  type="text"
                  placeholder={t('addCandidate.form.placeholders.candidateName')}
                  success
                />

                <InputField
                  isShowLabel={true}
                  label={t('addCandidate.form.firstName')}
                  name="firstName"
                  type="text"
                  placeholder={t('addCandidate.form.placeholders.firstName')}
                  success
                />
                <InputField
                  isShowLabel={true}
                  label={t('addCandidate.form.phoneNumber')}
                  name="phoneNumber"
                  type="number"
                  placeholder={t('addCandidate.form.placeholders.phoneNumber')}
                  success
                />
                <InputField
                  isShowLabel={true}
                  label={t('addCandidate.form.email')}
                  name="email"
                  type="email"
                  placeholder={t('addCandidate.form.placeholders.email')}
                  success
                />
                <DatePickerComponent
                  label={t('addCandidate.form.birthDate')}
                  addTextPlaceHolder={t('addCandidate.form.placeholders.date')}
                />
                {/* ================== START INPUT ONE DETAILS ================== */}
                <div className="input-one-details">
                  <Field name="sectionInfo">
                    {({ field }) => (
                      <SectionSelect
                        setFieldValue={setFieldValue}
                        field={field}
                        error={touched.sectionInfo && errors.sectionInfo}
                      />
                    )}
                  </Field>
                </div>
                {/* ================== END INPUT ONE DETAILS ================== */}

                <Field name="jobTitle">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label={t('addCandidate.form.jobTitle')}
                      options={options.jobTitle}
                      onChange={(option) => setFieldValue("jobTitle", option)}
                      placeholder={t('addCandidate.form.placeholders.select')}
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.jobTitle && errors.jobTitle}
                    />
                  )}
                </Field>

                <Field name="maritalStatus">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label={t('addCandidate.form.maritalStatus')}
                      options={options.maritalStatus}
                      onChange={(option) =>
                        setFieldValue("maritalStatus", option)
                      }
                      placeholder={t('addCandidate.form.placeholders.select')}
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.maritalStatus && errors.maritalStatus}
                    />
                  )}
                </Field>

                <Field name="nationality">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label={t('addCandidate.form.nationality')}
                      options={options.nationality}
                      onChange={(option) =>
                        setFieldValue("nationality", option)
                      }
                      placeholder={t('addCandidate.form.placeholders.select')}
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.nationality && errors.nationality}
                    />
                  )}
                </Field>

                <Field name="typePerson">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label={t('addCandidate.form.gender')}
                      options={options.typePerson}
                      onChange={(option) => setFieldValue("typePerson", option)}
                      placeholder={t('addCandidate.form.placeholders.select')}
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.typePerson && errors.typePerson}
                    />
                  )}
                </Field>
              </div>

              <FileUploader
                textLabel={t('addCandidate.form.cvImage')}
                onFileUpload={handleFileUpload}
              />

              <ButtonsFormSendCancel
                cancelAdd={cancelAdd}
                submitButton={() => handleSubmit()}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormInformationEmployee;
