import React, { useState } from "react";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Field, Form, Formik, FormikHelpers } from "formik";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as Yup from "yup";
import ModalButtons from "../VacationsRequests/ModalFilterData/Components/ModalButtons/ModalButtons";
import ModalShared from "../VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import CheckButtonGroup from "../VacationsRequests/ModalFilterData/Components/CheckButtonGroup/CheckButtonGroup";
import { useTranslation } from "react-i18next";

interface FormValues {
  sectionInfo: { value: string; label: string } | null;
  employee: { value: string; label: string } | null;
  workplace: { value: string; label: string } | null;
}

interface ModalFilterPredecessorRequestsProps {
  open: boolean;
  hiddenModal: () => void;
}

interface FieldProps {
  field: {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
  };
}

const ModalFilterPredecessorRequests: React.FC<ModalFilterPredecessorRequestsProps> = ({ open, hiddenModal }) => {
  const { t } = useTranslation("orders");
  const options = {
    sectionInfo: [
      { value: "قسم1", label: t("filters.section.option1") },
      { value: "قسم2", label: t("filters.section.option2") },
    ],
    employee: [
      { value: "موظف1", label: t("filters.employee.option1") },
      { value: "موظف2", label: t("filters.employee.option2") },
    ],
    workplace: [
      { value: "مكتب1", label: t("filters.workplace.option1") },
      { value: "مكتب2", label: t("filters.workplace.option2") },
    ],
  };

  const initialValues: FormValues = {
    sectionInfo: null,
    employee: null,
    workplace: null,
  };

  const validationSchema = Yup.object({
    sectionInfo: Yup.object().nullable().required(t("validation.sectionRequired")),
    employee: Yup.object().nullable().required(t("validation.employeeRequired")),
    workplace: Yup.object().nullable().required(t("validation.workplaceRequired")),
  });

  const handleSubmit = (values: FormValues, { setTouched, resetForm }: FormikHelpers<FormValues>) => {
    setTouched({
      sectionInfo: true,
      employee: true,
      workplace: true,
    });

    toast.success(t("toasts.requestAddedSuccess"));
    resetForm();

    // HIDE MODAL IF SUCCESS SEND
    hiddenModal();
  };

  const optionsButton = [t("filters.status.all"), t("filters.status.active"), t("filters.status.inactive")];
  const [selectedOption, setSelectedOption] = useState("");

  // CHANGE VALUE
  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };
  return (
    <ModalShared open={open} hiddenModal={hiddenModal} titleModal={t("filters.title")}>
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
                      <SelectBox
                        isShowLabel={true}
                        label={t("filters.section.label")}
                        options={options.sectionInfo}
                        onChange={(option: any) =>
                          setFieldValue("sectionInfo", option)
                        }
                        placeholder={t("common.selectPlaceholder")}
                        isSearchable={false}
                        isMulti={false}
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
                      <SelectBox
                        isShowLabel={true}
                        label={t("filters.employee.label")}
                        options={options.employee}
                        onChange={(option: any) => setFieldValue("employee", option)}
                        placeholder={t("common.selectPlaceholder")}
                        isSearchable={true}
                        isMulti={false}
                        field={field}
                        error={touched.employee && errors.employee}
                      />
                    )}
                  </Field>
                </div>
                {/* ================== END INPUT ONE DETAILS ================== */}{" "}
                {/* ================== START INPUT ONE DETAILS ================== */}
                <div className="input-one-details sm:col-span-1 md:col-span-2">
                  <Field name="workplace">
                    {({ field }: FieldProps) => (
                      <SelectBox
                        isShowLabel={true}
                        label={t("filters.workplace.label")}
                        options={options.workplace}
                        onChange={(option: any) =>
                          setFieldValue("workplace", option)
                        }
                        placeholder={t("common.selectPlaceholder")}
                        isSearchable={false}
                        isMulti={false}
                        field={field}
                        error={touched.workplace && errors.workplace}
                      />
                    )}
                  </Field>
                </div>
                {/* ================== END INPUT ONE DETAILS ================== */}
              </div>

              <div className="main-buttons-info mt-5">
                <h2 className="title text-font-gray mb-2">{t("filters.requestStatus")}</h2>
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
                  buttonResetText={t("modals.filter.reset")}
                  buttonSaveText={t("modals.filter.search")}
                  resetSuccessMessage={t("toasts.filterResetSuccess")}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalShared>
  );
};

ModalFilterPredecessorRequests.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired,
};

export default ModalFilterPredecessorRequests;
