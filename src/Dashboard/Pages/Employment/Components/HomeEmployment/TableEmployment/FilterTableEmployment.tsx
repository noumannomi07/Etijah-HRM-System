import ModalButtons from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalButtons/ModalButtons";
import ModalCheckedButton from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalCheckedButton/ModalCheckedButton";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const FilterTableEmployment = ({ open, hiddenModal }) => {
  const { t } = useTranslation('employment');
  
  const options = {
    nationality: [
      { value: "egypt", label: t('addCandidate.form.options.nationality.egypt') },
      { value: "usa", label: t('addCandidate.form.options.nationality.usa') },
      { value: "canada", label: t('addCandidate.form.options.nationality.canada') },
    ],
    typePerson: [
      { value: "male", label: t('addCandidate.form.options.gender.male') },
      { value: "female", label: t('addCandidate.form.options.gender.female') },
    ],
    candidate: [
      { value: "applicant1", label: t('filter.candidates.candidate1') },
      { value: "applicant2", label: t('filter.candidates.candidate2') },
      { value: "applicant3", label: t('filter.candidates.candidate3') },
    ],
  };

  const initialValues = {
    candidate: null,
    email: "",
    nationality: null,
    typePerson: null,
  };

  const validationSchema = Yup.object({
    candidate: Yup.object().required(t('filter.validation.candidateRequired')),
    email: Yup.string()
      .email(t('filter.validation.emailInvalid'))
      .required(t('filter.validation.emailRequired')),
    nationality: Yup.object().required(t('filter.validation.nationalityRequired')),
    typePerson: Yup.object().required(t('filter.validation.genderRequired')),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      candidate: false,
      email: false,
      nationality: false,
      typePerson: false,
    });

    toast.success(t('filter.messages.filterSuccess'));
    resetForm();

    // HIDE MODAL IF SUCCESS SEND
    hiddenModal();
  };

  return (
    <ModalShared open={open} hiddenModal={hiddenModal} titleModal={t('filter.title')}>
      <div className="all-content-modal-filter">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue, errors, touched }) => (
            <Form>
              <div className="all-forms-grid grid-cards-2">
                <Field name="candidate">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label={t('filter.candidate')}
                      options={options.candidate}
                      onChange={(option) => setFieldValue("candidate", option)}
                      placeholder={t('filter.placeholders.select')}
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.candidate && errors.candidate}
                    />
                  )}
                </Field>
                <InputField
                  isShowLabel={true}
                  label={t('filter.email')}
                  name="email"
                  type="email"
                  placeholder={t('filter.placeholders.email')}
                  success
                />
                <Field name="nationality">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label={t('filter.nationality')}
                      options={options.nationality}
                      onChange={(option) =>
                        setFieldValue("nationality", option)
                      }
                      placeholder={t('filter.placeholders.select')}
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
                      label={t('filter.gender')}
                      options={options.typePerson}
                      onChange={(option) => setFieldValue("typePerson", option)}
                      placeholder={t('filter.placeholders.select')}
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.typePerson && errors.typePerson}
                    />
                  )}
                </Field>

                <DatePickerComponent
                  label={t('filter.dateFrom')}
                  addTextPlaceHolder={t('filter.placeholders.date')}
                />
                <DatePickerComponent
                  label={t('filter.dateTo')}
                  addTextPlaceHolder={t('filter.placeholders.date')}
                />
              </div>
              <ModalCheckedButton />

              <div className="main-buttons-modal flex justify-end items-end w-100">
                <ModalButtons
                  hiddenModal={hiddenModal}
                  handleSubmit={handleSubmit}
                  buttonResetText={t('filter.buttons.reset')}
                  buttonSaveText={t('filter.buttons.search')}
                  resetSuccessMessage={t('filter.messages.resetSuccess')}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalShared>
  );
};

FilterTableEmployment.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired,
};

export default FilterTableEmployment;
