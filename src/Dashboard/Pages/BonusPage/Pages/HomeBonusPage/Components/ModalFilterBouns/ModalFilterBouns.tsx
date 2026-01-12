import SectionSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/SectionSelect";
import ModalButtons from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalButtons/ModalButtons";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ModalFilterBouns = ({ open, hiddenModal }) => {
  const { t } = useTranslation('bonus');
  const initialValues = {
    sectionInfo: null,

    titleBouns: "",
  };

  const validationSchema = Yup.object({
    sectionInfo: Yup.object().nullable().required(t('validation.departmentRequired')),

    titleBouns: Yup.string().required(t('validation.bonusTitleRequired')),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      titleBouns: false,
      sectionInfo: false,
    });

    toast.success(t('messages.filterSuccess'));
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
                <Field name="sectionInfo">
                  {({ field }) => (
                    <SectionSelect
                      labelText={t('beneficiaries.department')}
                      placeholder={t('filter.placeholders.bonusTitle')}
                      setFieldValue={setFieldValue}
                      field={field}
                      error={touched.sectionInfo && errors.sectionInfo}
                    />
                  )}
                </Field>
                <InputField
                  isShowLabel={true}
                  label={t('filter.bonusTitle')}
                  name="titleBouns"
                  type="text"
                  placeholder={t('filter.placeholders.bonusTitle')}
                  success
                />

                <DatePickerComponent
                  label={t('filter.periodFrom')}
                  addTextPlaceHolder={t('filter.placeholders.date')}
                />
                <DatePickerComponent
                  label={t('filter.periodTo')}
                  addTextPlaceHolder={t('filter.placeholders.date')}
                />
              </div>

              <div className="main-buttons-modal flex justify-end items-end w-100">
                <ModalButtons
                  hiddenModal={hiddenModal}
                  handleSubmit={handleSubmit}
                  buttonResetText={t('filter.buttons.reset')}
                  buttonSaveText={t('filter.buttons.search')}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalShared>
  );
};

ModalFilterBouns.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired,
};

export default ModalFilterBouns;
