import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { Field, Form, Formik, FormikHelpers } from "formik";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import EmployeeSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/EmployeeSelect";
import ControlledSelect from "@/Dashboard/Shared/SelectBox/ControlledSelect";
import i18next from "i18next";
import axiosInstance from "@/utils/axios";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import { toast } from "react-toastify";
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";
import React from "react";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";

interface FormValues {
  employee: { value: number; label: string } | null;
  reason: number | null;
  date?: string | null;
  add_vacations?: boolean;
}

interface ModalEndServiceCalculatorProps {
  open: boolean;
  hiddenModal: () => void;
  fromEmployee?: {
    employee?: {
      id: number;
      name: string;
    };
    id?: number;
  };
}

interface EndServiceResponse {
  reward: number;
  message?: string;
  years?: number;
  remaining_months?: number;
  remaining_days?: number;
  left_vacations?: {
    total_amount: number;
    allVacations?: Array<{
      real_days: number;
      taken_days: number;
      left_days: number;
      paid: number;
      paid_percent: number;
      amount: number;
    }>;
  };
}

interface ReasonItem {
  ar: string;
  en: string;
}

const ModalEndServiceCalculator: React.FC<ModalEndServiceCalculatorProps> = ({ 
  open, 
  hiddenModal, 
  fromEmployee 
}) => {
  const { t } = useTranslation("staffManagement");
  const langgg = i18next.language;
  const [isLoading, setIsLoading] = useState(false);
  const [salary, setSalary] = useState<number | null>(null);
  const [response, setResponse] = useState<EndServiceResponse | null>(null);
  const [showAllFields, setShowAllFields] = useState(false);
  const [sentData, setSentData] = useState<{ employee_id: number; reason: number;add_vacations : boolean; date: string | null  } | null>(null);

  const initialValues: FormValues = {
    employee: fromEmployee?.employee?.id
      ? {
          value: fromEmployee.employee.id,
          label: fromEmployee.employee.name
        }
      : null,
    reason: null,
      date: null,
    add_vacations: false
  };


 const employeeId = fromEmployee?.id || fromEmployee?.employee?.id;

 
  const validationSchema = Yup.object({
    // employee: Yup.mixed().nullable().required(t("validation.required")),
    reason: Yup.mixed().nullable().required(t("validation.required")),
    date: Yup.string().nullable(),
    add_vacations: Yup.boolean().nullable(),
    ...(showAllFields && {
      // salary: Yup.number()
      //   .required(t("validation.required"))
      //   .min(1, t("validation.minSalary")),
      // year: Yup.number()
      //   .required(t("validation.required"))
      //   .min(1, t("validation.minyear"))
      //   .max(5, t("validation.maxyear")),
      // months: Yup.number()
      //   .required(t("validation.required"))
      //   .min(1, t("validation.minmonth"))
      //   .max(12, t("validation.maxmonth")),
      // days: Yup.number()
      //   .required(t("validation.required"))
      //   .min(1, t("validation.mindays"))
      //   .max(31, t("validation.maxdays"))
    })
  });

  const handleSubmit = async (
    values: FormValues, 
    { setTouched }: FormikHelpers<FormValues>
  ) => {
    setTouched({
      reason: true
    });

    try {
      setIsLoading(true);
      setSalary(null);
      setResponse(null);
      
      const formData = new FormData();
      formData.append("employee_id", (employeeId || "").toString());
      formData.append("reason", values.reason?.toString() || "");
      if (values.date) {
        formData.append("date", values.date);
      }
      if (values.add_vacations) {
        formData.append("add_vacations", "true");
      }
      const response = await axiosInstance.post<EndServiceResponse>("/end-service", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (values.employee && values.reason) {
        setSentData({
          employee_id: employeeId || 0,
          reason: values.reason,
          add_vacations: values.add_vacations || false,
          date: values.date || null
        });
      }

      setSalary(response.data.reward || 0);
      setResponse(response.data);
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        toast.error(axiosError.response?.data?.message || t("validation.error"));
      } else {
        toast.error(t("validation.error"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitSave = async (data: { employee_id: number; reason: number; add_vacations: boolean; date: string | null }) => {
    if (!data) return;
    try {
      setIsLoading(true);
      const response = await axiosInstance.post<{ message: string }>(
        "/employee-end-service/save",
        data
      );
      toast.success(response.data.message || t("validation.success"));
      hiddenModal();
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        toast.error(axiosError.response?.data?.message || t("validation.error"));
      } else {
        toast.error(t("validation.error"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setSalary(null);
  }, [open]);

  return (
    <>
      <CustomModal
        newClassModal={""}
        isOpen={open}
        handleOpen={hiddenModal}
        titleModal={t("salary.endOfServiceCalculator")}
        classBodyContent={""}
      >
        <div className="all-content-modal-filter">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit: formikSubmit, setFieldValue, errors, touched, values }) => (
              <Form onSubmit={formikSubmit}>





                {/* {!fromEmployee?.employee?.id && (
                  <div className="flex items-center mb-4 gap-2">
                    <input
                      type="checkbox"
                      id="showAllFields"
                      checked={showAllFields}
                      onChange={(e) => setShowAllFields(e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="showAllFields">
                      {t("salary.SelectEmployeeOrAddData")}
                    </label>
                  </div>
                )} */}

                {/* <div className="all-forms-grid grid-cards-2"> */}
                  {/* {!showAllFields && (
                    <div>
                      <Field name="employee">
                        {({ field }: FieldProps) => (
                          <EmployeeSelect
                            isDisabled={fromEmployee?.employee?.id}
                            setFieldValue={setFieldValue}
                            field={field}
                            error={touched.employee && errors.employee}
                          />
                        )}
                      </Field>
                    </div>
                  )} */}

                  {/* {showAllFields && (
                    <div className={`input-one-details `}>
                      <InputField
                        isShowLabel={true}
                        label={t("salary.salary")}
                        name="salary"
                        type="number"
                        placeholder={t("salary.salary")}
                        success
                        error={touched.salary && errors.salary}
                      />
                    </div>
                  )}
                  <div className="input-one-details ">
                    <InputField
                      isShowLabel={true}
                      label={t("salary.year")}
                      name="year"
                      type="number"
                      placeholder={t("salary.year")}
                      success
                      error={touched.year && errors.year}
                    />
                  </div>
                  <div className="input-one-details ">
                    <InputField
                      isShowLabel={true}
                      label={t("salary.month")}
                      name="months"
                      type="number"
                      placeholder={t("salary.months")}
                      success
                      error={touched.months && errors.months}
                    />
                  </div>
                  <div className="input-one-details ">
                    <InputField
                      isShowLabel={true}
                      label={t("salary.days")}
                      name="days"
                      type="number"
                      placeholder={t("salary.days")}
                      success
                      error={touched.days && errors.days}
                    />
                  </div>
                </div> */}

                <ControlledSelect
                  type="sync"
                  fieldName="reason"
                  label={t("salary.reason")}
                  apiEndpoint="/end-service-reasons"
                  customMapping={(data: ReasonItem[]) => {
                    return data.map((item: ReasonItem, index: number) => ({
                      value: index,
                      label: langgg === "ar" ? item.ar : item.en
                    }));
                  }}
                />

                <div className="input-one-details w-full mt-4">
                  {/* <label className="block mb-1 text-font-gray" htmlFor="date">{t("salary.date") + ` (${t("اختياري")})`}</label> */}
                  <DatePickerComponent
                    label={t("salary.departureDate") + ` (${t("اختياري")})`}
                    onDateChange={(date) => setFieldValue("date", date)}
                    placeholder={t("salary.date")}
                    initialDate={new Date()}
                    className="input-form"
                    error={touched.date && errors.date ? errors.date : undefined}
                  />
                </div>

                {salary !== null && (
                  <div className="mt-8 content-details-calc bg-lightColorWhite border rounded-[12px] p-[25px_15px] text-center item-center-flex flex-col ">
                    <div className="info-top-content">
                      <h2 className="title text-font-gray">
                        {t("salary.endOfServiceAmount")}
                      </h2>
                      <div className="number-money text-font-dark flex items-center justify-center gap-1">
                        {salary}
                        <span className="ml-1"><Saudiriyal/></span>
                      </div>

                      

                      <h2 className="title text-font-gray">
                        رصيد الاجازات المتبقية
                      </h2>
                      <div className="number-money text-font-dark flex items-center justify-center gap-1">
                        
                        {Number(response?.left_vacations?.total_amount || 0).toFixed(2)}

                        <span className="ml-1"><Saudiriyal/></span>
                      </div>

                      <h2 className="title text-font-gray mt-4">
                        مدة الخدمة
                      </h2>
                      <div className="number-money text-font-dark flex items-center justify-center gap-1">
                        {response?.years || 0} سنة و {response?.remaining_months || 0} شهر و {response?.remaining_days || 0} يوم
                      </div>

                    </div>
                  </div>
                )}

                <div className="main-buttons-modal flex justify-end items-end w-full mt-4 gap-4">
                  <button
                    type="submit"
                    className="btn-main button-transparent "
                    disabled={isLoading}
                  >
                    {isLoading ? <SpinnerLoader /> : t("salary.calculate")}
                  </button>

                  {salary !== null && (
                    <button
                      type="button"
                      onClick={() => handleSubmitSave({
                        employee_id: employeeId || 0,
                        reason: values.reason ?? 0,
                        add_vacations: false,
                        date: values.date || null
                      })}
                      className="btn-main button-green"
                      disabled={isLoading}
                    >
                      {t("salary.endEmployeeService")}
                    </button>
                  )}

                  {salary !== null && (
                    <button
                      type="button"
                      onClick={() => handleSubmitSave({
                        employee_id: employeeId || 0,
                        reason: values.reason ?? 0,
                        add_vacations: true,
                        date: values.date || null
                      })}
                      className="btn-main button-danger"
                      disabled={isLoading}
                    >
                      {t("salary.endEmployeeServiceWithVacation")}
                    </button>
                  )}

                  
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </CustomModal>
    </>
  );
};

ModalEndServiceCalculator.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired
};

export default ModalEndServiceCalculator;
