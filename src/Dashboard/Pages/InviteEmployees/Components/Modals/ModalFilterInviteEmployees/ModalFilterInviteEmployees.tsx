import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import SectionSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/SectionSelect";
import EmployeeSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/EmployeeSelect";
import ModalButtons from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalButtons/ModalButtons";

const ModalFilterInviteEmployees = ({ open, hiddenModal }) => {
  const initialValues = {
    sectionInfo: null,
    employee: null,
  };

  const validationSchema = Yup.object({
    sectionInfo: Yup.object().nullable().required("يجب اختيار قسم"),
    employee: Yup.object().nullable().required("يجب اختيار موظف"),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      sectionInfo: true,
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
                {/* ================== END INPUT ONE DETAILS ================== */}{" "}
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

ModalFilterInviteEmployees.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired,
};

export default ModalFilterInviteEmployees;
