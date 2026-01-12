import EmployeeSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/EmployeeSelect";
import ModalButtons from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalButtons/ModalButtons";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ModalFilterViolationsPage = ({ open, hiddenModal }) => {
  const initialValues = {
    employee: null,
  };

  const validationSchema = Yup.object({
    employee: Yup.object().nullable().required("هذا الحقل مطلوب"),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      employee: true,
    });

    toast.success("تم إضافة الطلب بنجاح!");
    resetForm();

    // HIDE MODAL IF SUCCESS SEND
    hiddenModal();
  };

  return (
    <ModalShared open={open} hiddenModal={hiddenModal}>
      <div className="all-content-modal-filter">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue, errors, touched }) => (
            <Form>
              <div className="all-forms-grid grid-cards-2">
                {/* ================== START INPUT ONE DETAILS ================== */}
                <div className="input-one-details">
                  <Field name="employee">
                    {({ field }) => (
                      <EmployeeSelect
                        setFieldValue={setFieldValue}
                        field={field}
                        error={touched.employee && errors.employee}
                      />
                    )}
                  </Field>
                </div>
                {/* ================== END INPUT ONE DETAILS ================== */}

                <DatePickerComponent
                  label="التاريخ"
                  addTextPlaceHolder="--/--/--"
                />
              </div>

              <div className="main-buttons-modal flex justify-end items-end w-100">
                <ModalButtons
                  hiddenModal={hiddenModal}
                  handleSubmit={handleSubmit}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalShared>
  );
};

ModalFilterViolationsPage.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired,
};

export default ModalFilterViolationsPage;
