import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import TextAreaInput from "@/Dashboard/Shared/Forms/TextArea";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import TimePickerSelect from "@/Dashboard/Shared/TimePickerSelect/TimePickerSelect";
import { useCreateTask } from "@/hooks/Tasks";
import { Form, FormikProvider, useFormik } from "formik";

import { toast } from "react-toastify";
import { initialValues, getValidationSchema } from "./schema";
import { TaskFormData } from "../../types";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import { useUpdateTask } from "@/hooks/Tasks/useUpdateTask";
import { useEmployeeSelect } from "@/hooks/employee/mini-for-select/useEmployeeForSelect";
interface FormAddNewTaskProps {
  selectedTasks?: any;
  buttonOpen: () => void;
  refetch: () => void;
  employee_id?: string;
}

// const FormAddNewTask = ({ selectedTasks: TaskData, buttonOpen, refetch })
const FormAddNewTask: React.FC<FormAddNewTaskProps> = ({
  selectedTasks: TaskData,
  buttonOpen,
  refetch,
  employee_id
}) => {
  const { t } = useTranslation('tasks');
  // const [searchParams] = useSearchParams();
  const { data: employeeData, isLoading: isEmployeeLoading } =
    useEmployeeSelect();
  // const employee_id = searchParams.get("employee_id");

  const { mutate: createTask, isPending } = useCreateTask({
    onSuccess: () => {
      toast.success(t('toasts.createSuccess'));
      buttonOpen();
      refetch();
    },
    onError: () => {
      toast.error(t('toasts.createError'));
    }
  });
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask({
    onSuccess: () => {
      toast.success(t('toasts.updateSuccess'));
      buttonOpen();
      refetch();
    },
    onError: () => {
      toast.error(t('toasts.updateError'));
    }
  });

  const options = {
    prioritySelect: [
      { value: "high", label: t('priority.high') },
      { value: "medium", label: t('priority.medium') },
      { value: "low", label: t('priority.low') }
    ]
  };

  const cancelAdd = () => {
    toast.success(t('toasts.cancelSuccess'));
    buttonOpen();
  };

  const formik = useFormik<TaskFormData>({
    initialValues: {
      ...initialValues
    },

    validationSchema: getValidationSchema(),
    onSubmit: (values: any) => {
      if (TaskData?.id) {
        updateTask({
          id: TaskData.id,
          TaskData: {
            ...values,
            priority: values.priority?.value,
            employees: values.employees.map((employee: any) => employee.value)
          }
        });
      } else {
        console.log({ values });

        createTask({
          ...values,
          priority: values.priority?.value,
          employees: values.employees.map((employee: any) => employee.value)
        });
      }
    }
  });

  useEffect(() => {
    if (TaskData) {
      formik.setValues({
        title: TaskData.title,
        content: TaskData.content,
        start_date: TaskData.start_date,
        end_date: TaskData.end_date,
        // date-fns
        start_time: TaskData.start_time.slice(0, 5),
        end_time: TaskData.end_time.slice(0, 5),
        priority: options.prioritySelect.find(
          (o) => o.value === TaskData.priority
        ) || { value: "low", label: t('priority.low') },
        employees: TaskData.employees.map((employee: any) => {
          return {
            ...employee,
            label: employee.name,
            value: employee.id
          };
        })
      });
    } else if (employee_id) {
      formik.setFieldValue("employees", [parseInt(employee_id)]);
    }
  }, [TaskData, employee_id]);

  return (
    <>
      <FormikProvider value={formik}>
        <Form>
          <div className="all-forms-grid flex flex-col sm:grid md:grid-cols-2 gap-4">
            {/* Employees (Supports Multiple) */}
            <div className="input-one-details col-span-2">
              <SelectBox
                isLoading={isEmployeeLoading}
                isShowLabel={true}
                label={t('form.employees')}
                options={employeeData?.map((employee: any) => ({
                  value: employee.id,
                  label: employee.name
                }))}
                onChange={(option: any) =>
                  formik.setFieldValue("employees", option || [])
                }
                placeholder={t('form.placeholders.select')}
                isSearchable={false}
                isMulti={true}
                field={{
                  ...formik.getFieldProps("employees"),
                  onChange: (option: any) => {
                    formik.setFieldValue(
                      "employees",
                      option?.target.value || null
                    );
                  }
                }}
                error={
                  formik.touched.employees
                    ? formik.errors.employees || null
                    : undefined
                }
              />
            </div>

            {/* Task Title */}
            <InputField
              isShowLabel={true}
              label={t('form.taskName')}
              name="title"
              type="text"
              placeholder={t('form.placeholders.taskName')}
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && formik.errors.title}
            />

            {/* Priority Select */}
            <SelectBox
              isShowLabel={true}
              label={t('form.priority')}
              options={options.prioritySelect}
              onChange={(option: any) =>
                formik.setFieldValue("priority", option || null)
              }
              placeholder={t('form.placeholders.select')}
              isSearchable={false}
              isMulti={false}
              field={{
                ...formik.getFieldProps("priority"),
                onChange: (option: any) =>
                  formik.setFieldValue("priority", option?.target.value || null)
              }}
              error={
                formik.touched.priority
                  ? formik.errors.priority || null
                  : undefined
              }
            />
            {/* <div></div> */}

            <div>
              <DatePickerComponent
                label={t('form.startDate')}
                addTextPlaceHolder={t('form.placeholders.date')}
                onDateChange={(date) =>
                  formik.setFieldValue("start_date", date)
                }
              />
              {formik.touched.start_date && formik.errors.start_date && (
                <div className="error-text">{formik.errors.start_date}</div>
              )}
            </div>
            {/* End Date */}
            <div>
              <DatePickerComponent
                label={t('form.endDate')}
                addTextPlaceHolder={t('form.placeholders.date')}
                onDateChange={(date) => formik.setFieldValue("end_date", date)}
                minDate={new Date(formik.values.start_date)}
              />
              {formik.touched.end_date && formik.errors.end_date && (
                <div className="error-text">{formik.errors.end_date}</div>
              )}
            </div>

            {/* Start Time */}
            <div>
              <TimePickerSelect
                onTimeChange={(time) =>
                  formik.setFieldValue("start_time", time)
                }
                textLable={t('form.startTime')}
                valueInit={formik.values.start_time}
              />
              {formik.touched.start_time && formik.errors.start_time && (
                <div className="error-text">{formik.errors.start_time}</div>
              )}
            </div>

            {/* End Time */}
            <div>
              <TimePickerSelect
                onTimeChange={(time) => formik.setFieldValue("end_time", time)}
                textLable={t('form.endTime')}
                valueInit={formik.values.end_time}
              />
              {formik.touched.end_time && formik.errors.end_time && (
                <div className="error-text">{formik.errors.end_time}</div>
              )}
            </div>
            {/* Task Content */}
            <TextAreaInput
              parentClass={"col-span-2"}
              isShowLabel={true}
              label={t('form.taskDetails')}
              name="content"
              placeholder={t('form.placeholders.taskDetails')}
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.touched.content && formik.errors.content}
              success={false}
              // required={true}
            />
          </div>

          {/* Buttons */}
          <ButtonsFormSendCancel
            cancelAdd={cancelAdd}
            isSubmitting={isPending || isUpdating}
            isSubmittingDisabled={isPending || isUpdating}
            submitButton={formik.handleSubmit}
          />
        </Form>
      </FormikProvider>
    </>
  );
};

export default FormAddNewTask;
