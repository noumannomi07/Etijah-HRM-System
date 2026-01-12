import React from "react";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import { Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import LeaveTypeSelect from "../../AllSelectsForm/LeaveTypeSelect";
import EmployeeSelect from "../../AllSelectsForm/EmployeeSelect";
import ButtonsFormSendCancel from "../../ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { useTranslation } from "react-i18next";
import TimePickerSelect from "@/Dashboard/Shared/TimePickerSelect/TimePickerSelect";
import { useLeaveRequests } from "@/hooks/api";
import { format } from "date-fns";
import { Loading } from "@/components";

interface FormValues {
  leavemange_id: { value: string; label: string } | null;
  employee_id: { value: string; label: string } | null;
  date: Date;
  time: string;
}

interface FieldProps {
  field: {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
  };
}

const FormComponent: React.FC<{ id?: string | null; cancel?: () => void; isDisabledEmployee?: boolean }> = ({ id = null, cancel, isDisabledEmployee }) => {
  const { t } = useTranslation("orders");
  const { queryOne, createItem, isCreating, updateItem, isUpdating } =
    useLeaveRequests();
  const { data, isLoading } = id ? queryOne(id) : { data: null, isLoading: false };

  // Transform API data to form initial values
  const getInitialValues = () => {
    if (!data) {
      return {
        leavemange_id: null,
        employee_id: null,
        date: new Date(),
        time: ""
      };
    }

    return {
      leavemange_id: data?.leavemange
        ? {
            value: data?.leavemange?.id,
            label: data?.leavemange?.title
          }
        : null,
      employee_id: data?.employee
        ? {
            value: data?.employee?.id,
            label: data?.employee?.name
          }
        : null,
      date: data?.date || new Date(),
      time: data?.time || ""
    };
  };

  const validationSchema = Yup.object({
    leavemange_id: Yup.object()
      .nullable()
      .required(t("validation.sectionRequired")),
    employee_id: Yup.object()
      .nullable()
      .required(t("validation.employeeRequired")),
    date: Yup.string().required(t("validation.dateRequired")),
    time: Yup.string().required(t("validation.timeRequired"))
  });

  const onSubmit = async (values: FormValues) => {
    const data = {
      leavemange_id: values.leavemange_id?.value,
      employee_id: values.employee_id?.value,
      date: format(values.date || new Date(), "yyyy-MM-dd"),
      time: values.time
    };

    try {
      if (id) {
        await updateItem({ id, ...data });
      } else {
        await createItem(data);
      }
      toast.success(t("toasts.requestAddedSuccess"));
      if (cancel) {
        cancel();
      } else {
        navigate(-1);
      }
    } catch (error: any) {
      toast.error(error?.message || "حدث خطأ أثناء إضافة الإذن");
    }
  };

  // NAVIGATE CANCEL
  const navigate = useNavigate();

  const cancelAdd = () => {
    if (cancel) {
      cancel();
    } else {
      navigate(-1);
    }
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="form-add-new-request border-width-content mt-5">
      <h2 className="title-head-form text-font-dark pt-3 mb-3">
        {t("requestTypes.permissionRequests")}
      </h2>
      {/* ================= START MAIN FORM NEW ================ */}
      <div className="main-form-new ">
        <Formik
          initialValues={getInitialValues()}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {({ handleSubmit, setFieldValue, errors, touched }) => {
            return (
              <Form>
                <div className="all-forms-grid grid-cards-2">

          {/* ================== START INPUT ONE DETAILS ================== */}
                  <div className="input-one-details">
                    <Field name="employee_id">
                      {({ field }: FieldProps) => (
                        <EmployeeSelect
                          setFieldValue={setFieldValue}
                          field={field}
                          isDisabled={isDisabledEmployee}
                          error={touched.employee_id && errors.employee_id ? String(errors.employee_id) : ""}
                        />
                      )}
                    </Field>
                  </div>
                  {/* ================== END INPUT ONE DETAILS ================== */}
                  {/* ================== START INPUT ONE DETAILS ================== */}
                  <div className="input-one-details">
                    <Field name="leavemange_id">
                      {({ field }: FieldProps) => (
                        <LeaveTypeSelect
                          setFieldValue={setFieldValue}
                          field={field}
                          error={touched.leavemange_id && errors.leavemange_id ? String(errors.leavemange_id) : undefined}
                        />
                      )}
                    </Field>
                  </div>
                  {/* ================== END INPUT ONE DETAILS ================== */}
           

                  {/* ================== START INPUT FOUR DETAILS ================== */}
                  <div className="input-one-details">
                    <DatePickerComponent
                      label={t("permissionRequests.details.day")}
                      addTextPlaceHolder="--/--/--"
                      onDateChange={(date) => setFieldValue("date", date)}
                    />
                  </div>
                  {/* ================== START INPUT FOUR DETAILS ================== */}
                  <div className="input-one-details">
                    <TimePickerSelect
                      textLable={t("forms.selects.timing")}
                      onTimeChange={(time) => setFieldValue("time", time)}
                    />
                    {errors.time && (
                      <p className="text-red-500">{String(errors.time)}</p>
                    )}
                  </div>
                  {/* ================== END INPUT FOUR DETAILS ================== */}
                </div>
                <ButtonsFormSendCancel
                  cancelAdd={cancelAdd}
                  submitButton={handleSubmit}
                  isSubmittingDisabled={isCreating || isUpdating}
                  isSubmitting={isCreating || isUpdating}
                />
              </Form>
            );
          }}
        </Formik>
      </div>
      {/* ================= END MAIN FORM NEW ================ */}
    </div>
  );
};

export default FormComponent;
