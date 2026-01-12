import React from 'react';
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { Field, Form, Formik, FieldProps } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import img from "@assets/images/homeimages/users/female.png";
import Select, { OptionProps, GroupBase, components } from "react-select";
import PropTypes from "prop-types";
import { useEmployeeSelect } from "@/hooks/employee/mini-for-select/useEmployeeForSelect";
import { useTranslation } from "react-i18next";

interface EmployeeOption {
  value: string;
  label: string;
  name: string;
  titleJob: string;
  image: string;
}

interface CustomSingleValueProps {
  data: EmployeeOption;
}

const customSingleValue: React.FC<CustomSingleValueProps> = ({ data }) => (
  <div className="custom-single-value flex items-center gap-2">
    <div className="flex items-center gap-3">
      <img
        src={data.image}
        alt={data.name}
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          marginRight: "10px",
        }}
        loading="lazy"
      />
      {data.name}
    </div>
    <div className="title-job">{data.titleJob}</div>
  </div>
);

const customOption = (props: OptionProps<EmployeeOption, false, GroupBase<EmployeeOption>>) => {
  const { data, innerRef, innerProps } = props;
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-3">
        <img
          src={data.image}
          alt={data.label}
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
          loading="lazy"
        />
        {data.name}
      </div>
      <div className="title-job">{data.titleJob}</div>
    </components.Option>
  );
};

interface ModalAddDirectManagerProps {
  openModalAddDirectManager: boolean;
  hiddenModalAddDirectManager: () => void;
  onAssignEmployee: (employee: EmployeeOption) => void;
}

const ModalAddDirectManager: React.FC<ModalAddDirectManagerProps> = ({
  openModalAddDirectManager,
  hiddenModalAddDirectManager,
  onAssignEmployee,
}) => {
  const { t } = useTranslation('organizationalStructure');
  const { data: employees = [], isLoading, error } = useEmployeeSelect();

  // Show loading state or error if needed
  if (isLoading) {
    return (
      <CustomModal
        newClassModal={"medium-modal modal-organization"}
        isOpen={openModalAddDirectManager}
        handleOpen={hiddenModalAddDirectManager}
        titleModal={t('modal.assignManager')}
        classBodyContent={""}
      >
        <div className="text-center">{t('modal.loading')}</div>
      </CustomModal>
    );
  }

  if (error) {
    return (
      <CustomModal
        newClassModal={"medium-modal modal-organization"}
        isOpen={openModalAddDirectManager}
        handleOpen={hiddenModalAddDirectManager}
        titleModal={t('modal.assignManager')}
        classBodyContent={""}
      >
        <div className="text-center text-red-500">{t('modal.errorLoadingData')}</div>
      </CustomModal>
    );
  }

  const options: EmployeeOption[] = employees || [];

  const initialValues = {
    employee: null as EmployeeOption | null,
  };

  const validationSchema = Yup.object({
    employee: Yup.object().nullable().required(t('validation.employeeRequired')),
  });

  const handleSubmit = (values: typeof initialValues, { setTouched, resetForm }: { setTouched: (touched: { [key: string]: boolean }) => void; resetForm: () => void }) => {
    
    setTouched({ employee: true });

    if (!values.employee) {
      return;
    }

    onAssignEmployee(values.employee);
 
 
    hiddenModalAddDirectManager();
   
  };

  return (
    <CustomModal
      newClassModal={"medium-modal modal-organization"}
      isOpen={openModalAddDirectManager}
      handleOpen={hiddenModalAddDirectManager}
      titleModal={t('modal.assignManager')}
      classBodyContent={""}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, errors, touched }) => (
          <Form>
            <div className="mb-4">
              <label htmlFor="employee" className="block mb-2">
                {t('modal.employee')}
              </label>

              <Field name="employee">
                {({ field }: FieldProps) => (
                  <Select<EmployeeOption>
                    options={options}
                    className={`main-select-box mt-1 ${
                      touched.employee
                        ? errors.employee
                          ? "active-red-border"
                          : "active-green-border"
                        : ""
                    }`}
                    getOptionLabel={(option: EmployeeOption) => option.name}
                    getOptionValue={(option: EmployeeOption) => option.value}
                    onChange={(option: EmployeeOption | null) => setFieldValue("employee", option)}
                    components={{
                      SingleValue: customSingleValue,
                      Option: customOption,
                    }}
                    placeholder={t('form.placeholders.select')}
                    isSearchable={false}
                  />
                )}
              </Field>

              {touched.employee && errors.employee ? (
                <div className="error-text">{errors.employee}</div>
              ) : null}
            </div>

            <button
              type="button"
              className="w-full sm:w-auto btn-main height--50 mt-4"
              onClick={() => handleSubmit()}
            >
              {t('buttons.assignDirectManager')}
            </button>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

ModalAddDirectManager.propTypes = {
  openModalAddDirectManager: PropTypes.bool.isRequired,
  hiddenModalAddDirectManager: PropTypes.func.isRequired,
  onAssignEmployee: PropTypes.func.isRequired,
};

export default ModalAddDirectManager;
