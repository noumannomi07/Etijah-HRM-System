import ModalButtons from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalButtons/ModalButtons";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ModalFilterCompanyDocuments = ({ open, hiddenModal }) => {
  const { t } = useTranslation('companyDocuments');
  
  const options = {
    documentType: [
      { value: "type1", label: t('filter.documentType') + " 1" },
      { value: "type2", label: t('filter.documentType') + " 2" },
      { value: "type3", label: t('filter.documentType') + " 3" },
    ],
  };

  const initialValues = {
    documentName: "",
    documentType: null,
  };

  const validationSchema = Yup.object({
    documentName: Yup.string().required(t('validation.documentNameRequired')),

    documentType: Yup.object().nullable().required(t('validation.typeRequired')),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      documentName: false,
      documentType: false,
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
                <InputField
                  isShowLabel={true}
                  label={t('filter.documentName')}
                  name="documentName"
                  type="text"
                  placeholder={t('filter.placeholders.documentName')}
                  success
                />
                <Field name="documentType">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label={t('filter.documentType')}
                      options={options.documentType}
                      onChange={(option) =>
                        setFieldValue("documentType", option)
                      }
                      placeholder={t('filter.placeholders.select')}
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.documentType && errors.documentType}
                    />
                  )}
                </Field>

                <DatePickerComponent
                  label={t('filter.dateAddedFrom')}
                  addTextPlaceHolder={t('filter.placeholders.date')}
                />
                <DatePickerComponent
                  label={t('filter.expiryDate')}
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

ModalFilterCompanyDocuments.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired,
};

export default ModalFilterCompanyDocuments;
