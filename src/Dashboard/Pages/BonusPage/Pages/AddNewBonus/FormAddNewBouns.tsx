import endpoints from "@/api/endpoints";
import SectionSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/SectionSelect";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { TaskFormData } from "@/Dashboard/Pages/TasksPage/types";
import { Employee } from "@/Dashboard/Pages/types";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import ControlledSelect from "@/Dashboard/Shared/SelectBox/ControlledSelect";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import TimePickerSelect from "@/Dashboard/Shared/TimePickerSelect/TimePickerSelect";
import { FullRoutes } from "@/Routes/routes";
import { TSelectOption } from "@/types/forms";
import axiosInstance from "@/utils/axios";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import React from "react";
import EmployeeSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/EmployeeSelect";
import { useTranslation } from "react-i18next";

interface FormValues {
  title: string;
  category_id: number | null;
  rate: number;
  quarters: any;
  amount: number;
  beneficiaries: TSelectOption | null;
  category?: TSelectOption | null;
  employees: TSelectOption[];
}

const FormAddNewBouns = () => {
  const { t } = useTranslation('bonus');
  
  const options = {
    quarters: [
      { value: "1", label: t('quarters.first') },
      { value: "2", label: t('quarters.second') },
      { value: "3", label: t('quarters.third') },
      { value: "4", label: t('quarters.fourth') },
    ],
    beneficiaries: [
      { value: "category", label: t('beneficiaries.department') },
      { value: "employees", label: t('beneficiaries.employees') },
    ],
  };

  const [beneficiaries, setBeneficiaries] = useState<TSelectOption>(options.beneficiaries[0]);

  const initialValues: FormValues = {
    title: "",
    category_id: null,
    rate: 0,
    quarters: null,
    amount: 0,
    beneficiaries: null,
    employees: [],
  };

  const [selectedEmployees, setSelectedEmployees] = useState<TSelectOption[]>([]);

  const validationSchema = Yup.object({
    title: Yup.string().required(t('validation.bonusTitleRequired')),
    category_id: Yup.object().nullable().when("beneficiaries", {
      is: (val: TSelectOption) => val?.value === "category",
      then: (schema) => schema.required(t('validation.departmentRequired')),
      otherwise: (schema) => schema.notRequired(),
    }),
    rate: Yup.number().required(t('validation.achievementRateRequired')),
    quarters: Yup.array()
      .min(1, t('validation.quartersRequired'))
      .required(t('validation.quartersRequired')),
    amount: Yup.string().required(t('validation.dueAmountRequired')),
    beneficiaries: Yup.object().nullable().required(t('validation.beneficiaryRequired')),
    employees: Yup.array().when("beneficiaries", {
      is: (val: TSelectOption) => val?.value === "employees",
      then: (schema) => schema.min(1, t('validation.employeesRequired')),
    }),
  });

  const handleSubmit = (values: FormValues, { setTouched, resetForm }: any) => {
    setTouched({
      title: false,
      category_id: false,
      rate: false,
      quarters: null,
      amount: false,
      beneficiaries: false,
      employees: false,
    });

 
    const data = {
      ...values,
      employees: values.employees.map((employee) => employee.value),
      quarters: values.quarters.map((quarter: any) => quarter.value),
      category_id: values.category_id?.value,
    };

    axiosInstance.post(endpoints.rewards.create, data)
      .then((res) => {

        resetForm();

        toast.success(t('messages.addSuccess'));

        navigate(FullRoutes.Dashboard.Bonus.All);
        
      })
      .catch((error) => {
        console.error("Error adding bonus:", error);
        toast.error(t('messages.addError'));
      })
      ;
  };

  // NAVIGATE CANCEL
  const navigate = useNavigate();

  const cancelAdd = () => {
    toast.success(t('messages.cancelSuccess'));
    navigate(FullRoutes.Dashboard.CompanyDocuments.All);
  };

  return (
    <div className="all-content-bouns-add border-width-content mt-5">
      <h2 className="title text-font-dark mb-3">{t('form.addNewBonus')}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, errors, touched, values }) => (
          <Form>
            <div className="all-forms-grid flex flex-col sm:grid md:grid-cols-2 gap-4">

            <div className="sm:col-span-2 md:col-span-2">
              <InputField
                isShowLabel={true}
                label={t('form.bonusTitle')}
                name="title"
                type="text"
                placeholder={t('form.placeholders.bonusTitle')}
                success
              />

              </div>

              <div className="sm:col-span-1 md:col-span-1">
                <Field name="beneficiaries">
                  {({ field }: any) => (
                    <SelectBox
                      isShowLabel={true}
                      label={t('form.beneficiary')}
                      options={options.beneficiaries}
                      onChange={(option: TSelectOption) => {
                        setFieldValue("beneficiaries", option);
                        setBeneficiaries(option);
                        if (option.value === "employees") {
                          setFieldValue("employees", []);
                        }
                      }}
                      placeholder={t('form.placeholders.select')}
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.beneficiaries && errors.beneficiaries}
                    />
                  )}
                </Field>
              </div>

              {beneficiaries?.value === "category" && (

                <div className="sm:col-span-1 md:col-span-1">
                  <Field name="category_id">
                    {({ field }: any) => (
                      <SectionSelect
                        labelText={t('beneficiaries.department')}
                        placeholder={t('form.placeholders.select')}
                        setFieldValue={setFieldValue}
                        field={field}
                        error={touched.category_id && errors.category_id}
                      />
                    )}
                  </Field>
                </div>
              )}

              {beneficiaries?.value === "employees" && (
                <div className="sm:col-span-1 md:col-span-1">

                   
               <Field name="employees">
                    {({ field }: any) => (
                      <EmployeeSelect
                        setFieldValue={(name, value) => setFieldValue(name, value?.id)}
                        field={field}
                        error={touched.employees && errors.employees}
                        labelText={t('form.employees')}
                        isMulti={true}
                      />
                    )}
                  </Field>

             
                </div>
              )}

              <div className="sm:col-span-1 md:col-span-2">
                <Field name="quarters">
                  {({ field }: any) => (
                    <SelectBox
                      isShowLabel={true}
                      label={t('form.quarter')}
                      options={options.quarters}
                      onChange={(option: TSelectOption) =>
                        setFieldValue("quarters", option)
                      }
                      placeholder={t('form.placeholders.select')}
                      isSearchable={false}
                      isMulti={true}
                      field={field}
                      error={touched.quarters && errors.quarters}
                    />
                  )}
                </Field>
              </div>

              <InputField
                isShowLabel={true}
                label={t('form.achievementRate')}
                name="rate"
                type="number"
                placeholder={t('form.placeholders.achievementRate')}
                success
              />

              <InputField
                isShowLabel={true}
                label={t('form.dueAmount')}
                name="amount"
                type="number"
                placeholder={t('form.placeholders.dueAmount')}
                success
              />

 
            </div>

            <ButtonsFormSendCancel
              cancelAdd={cancelAdd}
              submitButton={() => handleSubmit()}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormAddNewBouns;
