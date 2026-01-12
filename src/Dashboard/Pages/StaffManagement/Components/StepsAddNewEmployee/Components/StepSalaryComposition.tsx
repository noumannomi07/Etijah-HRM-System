import plusicon from "@assets/images/iconspages/plusicon.svg";
import { FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import ButtonsSteps from "../ButtonsSteps/ButtonsSteps";
import ControlledInput from "@/Dashboard/Shared/Forms/ControlledInput";
import ControlledSelect from "@/Dashboard/Shared/SelectBox/ControlledSelect";
import { useAllowances } from "@/hooks/settings/allowance";
import { useBanks } from "@/hooks/settings/bank";
import salarySchema, { StepSalaryCompositionForm } from "../schema/salary";
import { FieldArray } from "formik";
import { useEmployeeSalary } from "@/hooks/employee/manage/salary/useEmployeeSalary";
import { useUpdateEmployeeSalary } from "@/hooks/employee/manage/salary/useUpdateEmployeeSalary";
import { Loading } from "@/components";
import { useParams, useNavigate } from "react-router-dom";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface StepSalaryCompositionProps {
  onNext?: () => void;
  onPrev: () => void;
}

const StepSalaryComposition: React.FC<StepSalaryCompositionProps> = ({ onPrev }) => {
  const { t } = useTranslation("staffManagement");
  const lang = i18next.language;
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: employeeSalary, isPending: employeeSalaryPending } = useEmployeeSalary();
  const { mutate: updateSalary, isPending: isUpdating } = useUpdateEmployeeSalary(id!, {
    onSuccess: () => {
      navigate(FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
        { id: id! }
      ));
    }
  });

  const { data: allowances, isPending: allowancesPending } = useAllowances();
  const { data: banks, isPending: banksPending } = useBanks();

  const formik = useFormik<StepSalaryCompositionForm>({
    initialValues: salarySchema.initialValues,
    validationSchema: salarySchema.validationSchema,
    onSubmit: async (values) => {
      updateSalary(values);
    },
  });

  useEffect(() => {
   
    if (employeeSalary) {
      formik.setFieldValue("salary", employeeSalary.salary);
      formik.setFieldValue("salaryextra", employeeSalary.salaryextra.map(salaryExtra => ({
        id: salaryExtra.allowance.id,
        amount: salaryExtra.amount
      })));
      formik.setFieldValue("payment_method", employeeSalary.payment_method);
      formik.setFieldValue("iban", employeeSalary.iban);
      formik.setFieldValue("account_user_name", employeeSalary.account_user_name);
      formik.setFieldValue("bank_id", employeeSalary.bank?.id || 0);
      formik.setFieldValue("gosi_employee_percent", employeeSalary.gosi_employee_percent);
      formik.setFieldValue("gosi_office_percent", employeeSalary.gosi_office_percent);
      
    } 
  }, [employeeSalary]);

  const payment_method = formik.values.payment_method;

  if (employeeSalaryPending || allowancesPending || banksPending) {
    return <Loading />;
  }


  const employeeAmount = () => {
    const baseSalary = formik.values.salary || 0;
    const extraAmounts = (formik.values.salaryextra || []).reduce((sum, extra) => sum + (extra.amount || 0), 0);
    const totalSalary = Number(baseSalary) + Number(extraAmounts);
    const percent = formik.values.gosi_employee_percent || 0;
    const result = totalSalary * (percent / 100);
    
    return parseFloat(result.toFixed(2));
  }

  const officeAmount = () => {
    const baseSalary = formik.values.salary || 0;
    const extraAmounts = (formik.values.salaryextra || []).reduce((sum, extra) => sum + (extra.amount || 0), 0);
    const totalSalary = Number(baseSalary) + Number(extraAmounts);
    
    const percent = formik.values.gosi_office_percent || 0;

    const result = totalSalary * (percent / 100);
    
    return parseFloat(result.toFixed(2));
  }

  return (
    <div className="all-form-steps">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className={`form-one-step sm:col-span-1 md:col-span-2`}>
            <ControlledInput
              label={t("salary.salaryForm.basicSalary")}
              fieldName="salary"
              type="text"
              placeholder={t("salary.salaryForm.basicSalaryPlaceholder")}
            />
            {formik.touched.salary && formik.errors.salary && (
              <div className="error-text">{formik.errors.salary}</div>
            )}
          </div>

          <FieldArray
            name="salaryextra"
            render={arrayHelpers => {
              const selectedAllowanceIds = formik.values.salaryextra.map(item => item.id);
              const availableAllowances = allowances?.filter(
                allowance => !selectedAllowanceIds.includes(allowance.id)
              );

              return (
                <div>
                  <button
                    className="plusiconstyle mt-4"
                    onClick={() => arrayHelpers.push({ id: 0, amount: 0 })}
                    type="button"
                  >
                    {availableAllowances && availableAllowances.length > 0 && (
                      <>
                        <img src={plusicon} alt="" /> {t("salary.salaryForm.addAllowances")}
                      </>
                    )}
                  </button>
                  <div className="main-form-content grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formik.values.salaryextra.map((item, index) => (
                      <React.Fragment key={index}>
                        <div className="form-one-step">
                          <ControlledSelect
                            label={t("salary.salaryForm.allowance")}
                            type="sync"
                            apiEndpoint="/allowance-mangments"
                            fieldName={`salaryextra[${index}].id`}
                            value={item.id}
                            placeholder={t("salary.salaryForm.selectPlaceholder")}
                            options={allowances
                              ?.filter(allowance => {
                                // Include the option if:
                                // 1. It's the currently selected value for this field, OR
                                // 2. It's not selected in any other field
                                return allowance.id === item.id ||
                                  !formik.values.salaryextra.some(
                                    (extra, i) => i !== index && extra.id === allowance.id
                                  );
                              })
                              .map(allowance => ({
                                value: allowance.id,
                                label: lang === "ar" ? allowance.ar_title : allowance.title
                              })) ?? []
                            }
                          />
                          {formik.getFieldMeta(`salaryextra[${index}].id`).touched &&
                            formik.getFieldMeta(`salaryextra[${index}].id`).error && (
                              <div className="error-text">
                                {formik.getFieldMeta(`salaryextra[${index}].id`).error}
                              </div>
                            )}
                        </div>
                        <div className="form-one-step">
                          <div className="flex justify-end items-end gap-2">
                            <ControlledInput
                              label={t("salary.salaryForm.value")}
                              value={item.amount.toString()}
                              fieldName={`salaryextra[${index}].amount`}
                              type="number"
                              placeholder={t("salary.salaryForm.valuePlaceholder")}
                              containerClassName="w-full"
                            />
                            {formik.values.salaryextra.length > 1 && (
                              <button
                                type="button"
                                className="text-red-500 p-2"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                ✕
                              </button>
                            )}
                          </div>
                          {formik.getFieldMeta(`salaryextra[${index}].amount`).touched &&
                            formik.getFieldMeta(`salaryextra[${index}].amount`).error && (
                              <div className="error-text">
                                {formik.getFieldMeta(`salaryextra[${index}].amount`).error}
                              </div>
                            )}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              );
            }}
          />

          <h2 className="title text-font-dark mt-4">{t("salary.salaryForm.paymentMethod")}</h2>
          <div className="main-form-content grid grid-cols-1 md:grid-cols-2  gap-4">
            <div>
              <ControlledSelect
                label={t("salary.salaryForm.selectPaymentMethod")}
                fieldName="payment_method"
                type="static"
                staticOptions={[
                  { value: "bank", label: t("salary.salaryForm.paymentMethods.bank") },
                  { value: "check", label: t("salary.salaryForm.paymentMethods.check") },
                  { value: "cash", label: t("salary.salaryForm.paymentMethods.cash") },
                ]}
                placeholder={t("salary.salaryForm.selectPlaceholder")}
              />
            </div>
            {payment_method === "bank" && (
              <>
                <ControlledSelect
                  label={t("salary.salaryForm.selectBank")}
                  fieldName="bank_id"
                  type="static"
                  staticOptions={banks?.map(bank => ({
                    value: bank.id,
                    label: lang === "ar" ? bank.ar_title : bank.en_title
                  })) ?? []}
                />
                <div>
                  <ControlledInput<StepSalaryCompositionForm>
                    label={t("salary.salaryForm.ibanNumber")}
                    fieldName="iban"
                    type="text"
                    placeholder="--"
                  />
                  {formik.errors.iban && (
                    <div className="error-text">{formik.errors.iban}</div>
                  )}
                </div>
 
                <div>
                  <ControlledInput<StepSalaryCompositionForm>
                    label={t("salary.salaryForm.accountHolderName")}
                    fieldName="account_user_name"
                    type="text"
                    placeholder="--"
                  />
                  {formik.errors.account_user_name && (
                    <div className="error-text">{formik.errors.account_user_name}</div>
                  )}
                </div>
              </>
            )}
          </div>

          <h2 className="title text-font-dark mt-4">{t("salary.salaryForm.socialInsurance")}</h2>

          <div className="main-form-content grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-one-step">
              <ControlledInput
                label={t("salary.salaryForm.employeeInsurancePercent")}
                fieldName="gosi_employee_percent"
                type="number"
                placeholder={t("salary.salaryForm.employeeInsurancePercentPlaceholder")}
              />
              {formik.touched.gosi_employee_percent && formik.errors.gosi_employee_percent && (
                <div className="error-text">{formik.errors.gosi_employee_percent}</div>
              )}

              <p className="mt-2"> 
                {t("salary.salaryForm.employeeInsuranceAmount")}
               <span className="text-font-dark"> {employeeAmount()} {t("salary.salaryForm.sar")} </span> 
                </p>

            </div>

            <div className="form-one-step">
              <ControlledInput
                label={t("salary.salaryForm.companyInsurancePercent")}
                fieldName="gosi_office_percent"
                type="number"
                placeholder={t("salary.salaryForm.companyInsurancePercentPlaceholder")}
              />
              {formik.touched.gosi_office_percent && formik.errors.gosi_office_percent && (
                <div className="error-text">{formik.errors.gosi_office_percent}</div>
              )}

              <p className="mt-2"> 
                {t("salary.salaryForm.companyInsuranceAmount")}
               <span className="text-font-dark"> {officeAmount()} {t("salary.salaryForm.sar")} </span> 
                </p>
            </div>
          </div>


          <ButtonsSteps
            isShowPrevButton={false}
            functionPrev={onPrev}
            isNextText={false}
            disabled={isUpdating}
            isNextDisabled={isUpdating}
            functionNext={formik.handleSubmit}
            isLoading={isUpdating}
          />
        </form>
      </FormikProvider>
    </div>
  );
};


export default StepSalaryComposition;
