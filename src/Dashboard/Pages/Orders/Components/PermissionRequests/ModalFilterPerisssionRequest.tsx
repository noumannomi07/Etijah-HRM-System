import React from "react";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import { Field, Form, Formik, FormikHelpers } from "formik";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ModalCheckedButton from "../VacationsRequests/ModalFilterData/Components/ModalCheckedButton/ModalCheckedButton";
import ModalButtons from "../VacationsRequests/ModalFilterData/Components/ModalButtons/ModalButtons";
import SectionSelect from "../AllSelectsForm/SectionSelect";
import EmployeeSelect from "../AllSelectsForm/EmployeeSelect";
import WorkplaceSelect from "../AllSelectsForm/WorkplaceSelect";
import LeaveTypeSelect from "../AllSelectsForm/LeaveTypeSelect";
import ModalShared from "../VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import { useTranslation } from "react-i18next";

interface ModalFilterPerisssionRequestProps {
  open: boolean;
  hiddenModal: () => void;
}

interface FormValues {
  sectionInfo: { value: string; label: string } | null;
  employee: { value: string; label: string } | null;
  workplace: { value: string; label: string } | null;
  leaveType: { value: string; label: string } | null;
}

interface FieldProps {
  field: {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
  };
}

const ModalFilterPerisssionRequest: React.FC<ModalFilterPerisssionRequestProps> = ({ open, hiddenModal }) => {
  const { t } = useTranslation("orders");

  const initialValues: FormValues = {
    sectionInfo: null,
    employee: null,
    workplace: null,
    leaveType: null,
  };

  const validationSchema = Yup.object({
    sectionInfo: Yup.object().nullable().required(t("validation.sectionRequired")),
    employee: Yup.object().nullable().required(t("validation.employeeRequired")),
    workplace: Yup.object().nullable().required(t("validation.workplaceRequired")),
    leaveType: Yup.object().nullable().required(t("validation.permissionTypeRequired")),
  });

  const handleSubmit = (values: FormValues, { setTouched, resetForm }: FormikHelpers<FormValues>) => {
    setTouched({
      sectionInfo: true,
      employee: true,
      workplace: true,
      leaveType: true,
    });

    toast.success(t("toasts.requestAddedSuccess"));
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
                    {({ field }: FieldProps) => (
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
                    {({ field }: FieldProps) => (
                      <EmployeeSelect
                        setFieldValue={setFieldValue}
                        field={field}
                        error={touched.employee && errors.employee}
                      />
                    )}
                  </Field>
                </div>
                {/* ================== END INPUT ONE DETAILS ================== */}{" "}
                {/* ================== START INPUT ONE DETAILS ================== */}
                <div className="input-one-details">
                  <Field name="workplace">
                    {({ field }: FieldProps) => (
                      <WorkplaceSelect
                        setFieldValue={setFieldValue}
                        field={field}
                        error={touched.workplace && errors.workplace}
                      />
                    )}
                  </Field>
                </div>
                {/* ================== END INPUT ONE DETAILS ================== */}
                {/* ================== START INPUT ONE DETAILS ================== */}
                <div className="input-one-details">
                  <Field name="leaveType">
                    {({ field }: FieldProps) => (
                      <LeaveTypeSelect
                        setFieldValue={setFieldValue}
                        field={field}
                        error={touched.leaveType && errors.leaveType}
                      />
                    )}
                  </Field>
                </div>
                {/* ================== END INPUT ONE DETAILS ================== */}
              </div>

              <div className="mt-3">
                <DatePickerComponent
                  label={t("filters.date")}
                  addTextPlaceHolder="--/--/--"
                />
              </div>

              <ModalCheckedButton />
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

ModalFilterPerisssionRequest.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired,
};

export default ModalFilterPerisssionRequest;
