import EmployeeSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/EmployeeSelect";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { FullRoutes } from "@/Routes/routes";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const FormAddNewSalaryMarches = () => {
  const { t, i18n } = useTranslation('salaryMarches');
  const selectPlaceholder = i18n.language === 'ar' ? '-إختر-' : '-Select-';
  
  const options = {
    JobTitle: [
      { value: "developer", label: "مطور" },
      { value: "designer", label: "مصمم" },
      { value: "manager", label: "مدير" },
    ],
    paymentMethod: [
      { value: "credit_card", label: t('paymentMethods.creditCard') },
      { value: "paypal", label: t('paymentMethods.paypal') },
      { value: "bank_transfer", label: t('paymentMethods.bankTransfer') },
      { value: "cash", label: t('paymentMethods.cash') },
    ],
  };

  const initialValues = {
    employee: null,
    JobTitle: null,
    basicSalary: "",
    paymentMethod: null,
  };

  const validationSchema = Yup.object({
    employee: Yup.object().nullable().required(t('form.employee.error')),
    JobTitle: Yup.object().nullable().required(t('form.jobTitle.error')),
    basicSalary: Yup.string().required(t('form.basicSalary.error')),
    paymentMethod: Yup.object().nullable().required(t('form.paymentMethod.error')),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      employee: false,
      JobTitle: false,
      basicSalary: false,
      paymentMethod: false,
    });

    toast.success(t('form.success'));
    resetForm();
  };

  // NAVIGATE CANCEL
  const navigate = useNavigate();

  const cancelAdd = () => {
    toast.success(t('form.cancelSuccess'));
    navigate(FullRoutes.Dashboard.Tasks.All);
  };

  return (
    <div className="form-add-new-task border-width-content mt-7">
      <h2 className="title text-font-dark">{t('form.addNewTask')}</h2>
      {/* =================== START ALL FORM TASK =================== */}
      <div className="all-form-task mt-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue, errors, touched }) => (
            <Form>
              <div className="all-forms-grid flex flex-col sm:grid md:grid-cols-2 gap-4">
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

                <Field name="JobTitle">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label={t('form.jobTitle.label')}
                      options={options.JobTitle}
                      onChange={(option) => setFieldValue("JobTitle", option)}
                      placeholder={selectPlaceholder}
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.JobTitle && errors.JobTitle}
                    />
                  )}
                </Field>

                <InputField
                  isShowLabel={true}
                  label={t('form.basicSalary.label')}
                  name="basicSalary"
                  type="number"
                  placeholder={t('form.basicSalary.placeholder')}
                  success
                />
                <Field name="paymentMethod">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label={t('form.paymentMethod.label')}
                      options={options.paymentMethod}
                      onChange={(option) =>
                        setFieldValue("paymentMethod", option)
                      }
                      placeholder={selectPlaceholder}
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.paymentMethod && errors.paymentMethod}
                    />
                  )}
                </Field>
              </div>
              <ButtonsFormSendCancel
                cancelAdd={cancelAdd}
                submitButton={() => handleSubmit()}
              />
            </Form>
          )}
        </Formik>
      </div>
      {/* =================== END ALL FORM TASK =================== */}
    </div>
  );
};

export default FormAddNewSalaryMarches;
