import EmployeeSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/EmployeeSelect";
import SectionSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/SectionSelect";
import WorkplaceSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/WorkplaceSelect";
import CheckButtonGroup from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/CheckButtonGroup/CheckButtonGroup";
import ModalButtons from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalButtons/ModalButtons";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ModalFilterSalaryAdjustments = ({ open, hiddenModal }) => {
  const { t, i18n } = useTranslation('salaryAdjustments');
  const selectPlaceholder = i18n.language === 'ar' ? '-إختر-' : '-Select-';
  
  const initialValues = {
    sectionInfo: null,
    employee: null,
    workplace: null,
  };

  const validationSchema = Yup.object({
    sectionInfo: Yup.object().nullable().required(t('validation.sectionRequired')),
    employee: Yup.object().nullable().required(t('validation.employeeRequired')),
    workplace: Yup.object().nullable().required(t('validation.workplaceRequired')),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      sectionInfo: true,
      employee: true,
      workplace: true,
    });

    toast.success(t('modal.filter.success'));
    resetForm();

    // HIDE MODAL IF SUCCESS SEND
    hiddenModal();
  };

  const optionsButton = [t('modal.filter.all'), t('modal.filter.active'), t('modal.filter.inactive')];
  const [selectedOption, setSelectedOption] = useState("");

  // CHANGE VALUE
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <ModalShared open={open} hiddenModal={hiddenModal} titleModal={t('modal.filter.title')}>
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
                      labelText={t('modal.filter.section')}
                      placeholder={selectPlaceholder}
                      setFieldValue={setFieldValue}
                      field={field}
                      error={touched.sectionInfo && errors.sectionInfo}
                    />
                  )}
                </Field>
                {/* ================== START INPUT ONE DETAILS ================== */}
                <div className="input-one-details">
                  <Field name="employee">
                    {({ field }) => (
                      <EmployeeSelect
                        labelText={t('modal.filter.employee')}
                        placeholder={selectPlaceholder}
                        setFieldValue={setFieldValue}
                        field={field}
                        error={touched.employee && errors.employee}
                      />
                    )}
                  </Field>
                </div>
                {/* ================== END INPUT ONE DETAILS ================== */}
                {/* ================== START INPUT ONE DETAILS ================== */}
                <div className="input-one-details sm:col-span-1 md:col-span-2">
                  <Field name="workplace">
                    {({ field }) => (
                      <WorkplaceSelect
                        labelText={t('modal.filter.workplace')}
                        placeholder={selectPlaceholder}
                        setFieldValue={setFieldValue}
                        field={field}
                        error={touched.workplace && errors.workplace}
                      />
                    )}
                  </Field>
                </div>
                {/* ================== END INPUT ONE DETAILS ================== */}
              </div>

              <div className="main-buttons-info mt-5">
                <h2 className="title text-font-gray mb-2">{t('modal.filter.employeeStatus')}</h2>

                <CheckButtonGroup
                  options={optionsButton}
                  selected={selectedOption}
                  onChange={handleOptionChange}
                />
              </div>

              <div className="main-buttons-modal flex justify-end items-end w-100">
                <ModalButtons
                  hiddenModal={hiddenModal}
                  handleSubmit={handleSubmit}
                  buttonResetText={t('modal.filter.resetButton')}
                  buttonSaveText={t('modal.filter.searchButton')}
                  resetSuccessMessage={t('modal.filter.resetSuccess')}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalShared>
  );
};

ModalFilterSalaryAdjustments.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired,
};

export default ModalFilterSalaryAdjustments;
