import { Employee } from "@/Dashboard/Pages/types";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import TextAreaInput from "@/Dashboard/Shared/Forms/TextArea";
import ControlledSelect from "@/Dashboard/Shared/SelectBox/ControlledSelect";
import {
  useCreateVacation,
  useUpdateVacation,
  useVacationDetails
} from "@/hooks/orders/vacations";
import { TSelectOption } from "@/types/forms";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { VacationRequestFormData } from "../../types/VacationRequest";
import ButtonsFormSendCancel from "../ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { validationSchema } from "./schema";
import { useCheckEmployeeVacation } from "@/hooks/Tasks/useCheckEmployeeVacation";
import { useTranslation } from "react-i18next";
import { Loading } from "@/components";
import { formatDateToYmd } from "@/utils/date";
import FileUploader from "@/Dashboard/Shared/FileUploader/FileUploader";
import { ExtFile } from "@files-ui/react";

const FormAddNewRequest = ({
  cancel,
  id,
  isDisabledEmployee,
  employeeId
}: {
  cancel: () => void;
  id?: string;
  isDisabledEmployee?: boolean;
  employeeId?: string;
}) => {
  const { t } = useTranslation("orders");
  
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [maxAllowedDays, setMaxAllowedDays] = useState<number | null>(null);

  const [searchParams] = useSearchParams();
  const employee_id = searchParams.get("employee_id");

  const { data: vacationData, isLoading: isCheckingVacation } =
    useCheckEmployeeVacation({ employee_id: selectedEmployeeId });

  const { data: vacationDetails, isLoading: isLoadingVacationDetails } =
    useVacationDetails(id || "");

  const { mutate: createVacation, isPending } = useCreateVacation({
    onSuccess: () => {
      toast.success(t("modals.success.createSuccess"));
      if (cancel) {
        cancel();
      } else {
        navigate(-1);
      }
    },
    onError: () => {
      toast.error(t("modals.success.createError"));
    }
  });
  const { mutate: updateVacation, isPending: isUpdating } = useUpdateVacation({
    onSuccess: () => {
      toast.success(t("modals.success.updateSuccess"));
      if (cancel) {
        cancel();
      } else {
        navigate(-1);
      }
    },
    onError: () => {
      toast.error(t("modals.success.updateError"));
    }
  });

  const getInitialValues = () => {
    if (!id) {
      return {
        employee_id: null,
        vacation_manage_id: null,
        start_date: formatDateToYmd(new Date()),
        end_date: formatDateToYmd(new Date()),
        note: "",
        file: []
      };
    }

    return {
      vacation_manage_id: vacationDetails?.vacation_manage_id,
      employee_id: vacationDetails?.employee?.id,
      start_date: vacationDetails?.start_date || formatDateToYmd(new Date()),
      end_date: vacationDetails?.end_date || formatDateToYmd(new Date()),
      note: vacationDetails?.note || "",
      file: []
    };
  };

  const formik = useFormik<Partial<VacationRequestFormData>>({
    initialValues: getInitialValues(),
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // Only submit if all required fields are present
      if (
        values.employee_id !== undefined &&
        values.vacation_manage_id !== undefined &&
        values.start_date &&
        values.end_date
      ) {
        const formData: VacationRequestFormData = {
          employee_id: values.employee_id,
          vacation_manage_id: values.vacation_manage_id,
          start_date: values.start_date,
          end_date: values.end_date,
          note: values.note || "",
          file: values.file || null
        };

        if (
          values.file &&
          Array.isArray(values.file) &&
          values.file.length > 0
        ) {
          const file = values.file[0] as ExtFile;
          if (file.file) {
            formData.file = file.file;
          }
        }

        try {
          if (id) {
            const new_formData = new FormData();
            new_formData.append("employee_id", values.employee_id.toString());
            new_formData.append(
              "vacation_manage_id",
              values.vacation_manage_id.toString()
            );
            new_formData.append("start_date", values.start_date);
            new_formData.append("end_date", values.end_date);
            new_formData.append("note", values.note || "");
            values.file &&
              values.file.length > 0 &&
              new_formData.append("file", values.file[0].file as File);
            updateVacation({
              id,
              vacationData: new_formData
            });
          } else {
            createVacation(formData);
          }
        } catch (error) {
          toast.error(t("modals.success.createError"));
        }
      } else {
        toast.error(t("addNewRequest.vacation.fillRequired"));
      }
    }
  });

  // Handle employee selection change
  useEffect(() => {
    if (selectedEmployeeId !== formik.values.employee_id?.toString()) {
      setSelectedEmployeeId(formik.values.employee_id?.toString());
    }
  }, [formik.values.employee_id]);

  // Handle vacation type selection change and update max allowed days
  useEffect(() => {
    if (formik.values.vacation_manage_id && vacationData?.types) {
      const selectedVacationType = vacationData.types.find(
        (type) => type.id === formik.values.vacation_manage_id
      );

      if (selectedVacationType?.days_calculated) {
        setMaxAllowedDays(selectedVacationType.days_calculated.left_days);
      } else {
        setMaxAllowedDays(null);
      }

      // Clear dates when vacation type changes
      formik.setFieldValue("start_date", null);
      formik.setFieldValue("end_date", null);
      setStartDate(null);
    }
  }, [formik.values.vacation_manage_id, vacationData]);

  // Calculate maximum end date based on start date and max allowed days
  const calculateMaxEndDate = (): Date | undefined => {
    if (!startDate || !maxAllowedDays) return undefined;

    const start = new Date(startDate);
    const maxEnd = new Date(start);
    maxEnd.setDate(start.getDate() + maxAllowedDays - 1); // -1 because the start date is counted as one day
    return maxEnd;
  };

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    formik.setFieldValue("start_date", date);

    // Clear end date when start date changes
    formik.setFieldValue("end_date", null);
  };

  const navigate = useNavigate();

  const cancelAdd = () => {
    toast.success(t("addNewRequest.vacation.cancelSuccess"));
    if (cancel) {
      cancel();
    } else {
      navigate(-1);
    }
  };

  const isVacationTypeDisabled =
    !selectedEmployeeId || (vacationData?.types ?? []).length === 0;

  const vacationTypes = (vacationData?.types ?? [])?.filter(vacation => vacation.id !== 0)?.map(
    (vacation): TSelectOption => ({
      label: (
        <div className="flex items-center gap-1">
          <span>{vacation.title}</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${vacation.paid
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
              }`}
          >
            {vacation.paid
              ? t("vacationRequests.types.paid")
              : t("vacationRequests.types.unpaid")}
          </span>
        </div>
      ),
      value: vacation.id
    })
  );

  const vacation_id = formik.values.vacation_manage_id;

  // Get the selected vacation type's available days
  // Always recalculate availableDays from the freshest data

  // const selectedVacationType = vacationData?.types?.find(
  //   (type) => type.id === vacation_id
  // );
  // const availableDays = selectedVacationType?.days_calculated?.left_days || 0;

  // Find both types from vacationData
  const monthlyLeave = vacationData?.types?.find((t) => t.title === "Monthly Leave");

  // Selected vacation type (already defined)
  const selectedVacationType = vacationData?.types?.find(
    (type) => type.id === vacation_id
  );

  // Available days for selected vacation
  const availableDays = selectedVacationType?.days_calculated?.left_days || 0;

  // Check if Monthly Leave has 0 remaining days
  const isMonthlyLeaveZero = monthlyLeave?.days_calculated?.left_days === 0;


  // Add effect to set employee_id from URL params
  useEffect(() => {
    if (employeeId) {
      formik.setFieldValue("employee_id", employeeId);
      setSelectedEmployeeId(employeeId);
    } else if (employee_id) {
      formik.setFieldValue("employee_id", employee_id);
      setSelectedEmployeeId(employee_id);
    }
  }, [employeeId, employee_id]);

  useEffect(() => {
    if (id && !isLoadingVacationDetails && !isCheckingVacation) {
      setTimeout(() => {
        setStartDate(vacationDetails?.start_date);
        formik.setFieldValue("start_date", vacationDetails?.start_date);
        formik.setFieldValue("end_date", vacationDetails?.end_date);
      }, 200);
    }
  }, [id, isLoadingVacationDetails, isCheckingVacation]);

  if (isLoadingVacationDetails && id) {
    return <Loading />;
  }

  return (
    <div className="form-add-new-request border-width-content mt-5">
      <h2 className="title-head-form text-font-dark pt-3 mb-3 ">
        {t("addNewRequest.vacation.newRequestTitle")}
      </h2>
      <div className="main-form-new ">
        {/* Case 1: Annual Leave selected but Monthly Leave has 0 days → show red error */}
        {vacation_id &&
          selectedVacationType?.id === 1 &&
          isMonthlyLeaveZero && (
            <div className="w-full bg-red-50 p-4 mb-4 rounded-lg text-center">
              <span className="text-red-700 font-medium">
                {t("addNewRequest.vacation.noRemainingDaysForMonth")}
              </span>
            </div>
          )}

        {/* Case 2: Normal remaining days (if allowed) */}
        {vacation_id &&
          (!(
            selectedVacationType?.id === 1 && isMonthlyLeaveZero
          ) &&
            availableDays > 0) && (
            <div className="w-full bg-green-50 p-4 mb-4 rounded-lg text-center">
              <span className="text-green-700 font-medium">
                {t("addNewRequest.vacation.remainingDays")}: {availableDays}{" "}
                {t("vacationRequests.details.days")}
              </span>
            </div>
          )}

        {/* Case 3: Other vacations with 0 days left */}
        {vacation_id &&
          selectedVacationType?.id !== 1 &&
          availableDays === 0 && (
            <div className="w-full bg-red-50 p-4 mb-4 rounded-lg text-center">
              <span className="text-red-700 font-medium">
                {t("addNewRequest.vacation.noRemainingDays")}
              </span>
            </div>
          )}



        {/* {vacation_id && availableDays > 0 && (
          <div className="w-full bg-green-50 p-4 mb-4 rounded-lg text-center">
            <span className="text-green-700 font-medium">
              {t("addNewRequest.vacation.remainingDays")}: {availableDays}{" "}
              {t("vacationRequests.details.days")}
            </span>
          </div>
        )}
        {vacation_id && availableDays <= 0 && (
          <div className="w-full bg-red-50 p-4 mb-4 rounded-lg text-center">
            <span className="text-red-700 font-medium">
              {t("addNewRequest.vacation.noRemainingDays")}
            </span>
          </div>
        )} */}
        <FormikProvider value={formik}>
          <Form>
            <div className="all-forms-grid grid-cards-2">
              <div className="input-one-details">
                <ControlledSelect<VacationRequestFormData>
                  type="sync"
                  apiEndpoint="/employee"
                  isDisabled={!!employee_id || isDisabledEmployee}
                  onChange={(value) => {
                    formik.setFieldValue("employee_id", value.value);
                    formik.setFieldValue("vacation_manage_id", null);
                    setMaxAllowedDays(null);
                  }}
                  customMapping={(data: Array<Employee>) =>
                    data?.map(
                      (employee): TSelectOption => ({
                        label: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                      })
                    )
                  }
                  fieldName="employee_id"
                  label={t("forms.selects.employee")}
                />
              </div>
              <div className="input-one-details">
                <ControlledSelect<VacationRequestFormData>
                  type="static"
                  isDisabled={isVacationTypeDisabled}
                  isLoading={isCheckingVacation}
                  staticOptions={vacationTypes}
                  fieldName="vacation_manage_id"
                  label={t("forms.selects.vacationType")}
                  placeholder={
                    !selectedEmployeeId
                      ? t("addNewRequest.vacation.selectEmployee")
                      : isCheckingVacation
                        ? t("addNewRequest.vacation.checkingVacation")
                        : vacationTypes.length === 0
                          ? t("addNewRequest.vacation.noVacationTypes")
                          : t("addNewRequest.vacation.selectVacationType")
                  }
                />
                {/* ✅ Same logic for inline message below the select */}
                {vacation_id &&
                  selectedVacationType?.id === 1 &&
                  isMonthlyLeaveZero && (
                    <div className="text-xs text-red-600 mt-1">
                      {t("addNewRequest.vacation.noRemainingDaysForMonth")}
                    </div>
                  )}

                {vacation_id &&
                  !(
                    selectedVacationType?.id === 1 && isMonthlyLeaveZero
                  ) &&
                  availableDays > 0 && (
                    <div className="text-xs text-green-600 mt-1">
                      {t("addNewRequest.vacation.remainingDays")}: {availableDays}{" "}
                      {t("vacationRequests.details.days")}
                    </div>
                  )}

                {vacation_id &&
                  selectedVacationType?.id !== 1 &&
                  availableDays === 0 && (
                    <div className="text-xs text-red-600 mt-1">
                      {t("addNewRequest.vacation.noRemainingDays")}
                    </div>
                  )}

              </div>
              <div className="input-one-details">
                <DatePickerComponent
                  disabled={!vacation_id || availableDays <= 0}
                  value={formik.values?.start_date}
                  label={t("addNewRequest.vacation.startDate")}
                  addTextPlaceHolder="--/--/--"
                  onDateChange={handleStartDateChange}
                  // minDate={new Date()} // Cannot select dates in the past
                  // maxDate =  this year
                  maxDate={new Date(new Date().getFullYear(), 11, 31)}
                />
                {formik.touched.start_date && formik.errors.start_date && (
                  <div className="error-text">{formik.errors.start_date}</div>
                )}
              </div>
              <div className="input-one-details">
                <DatePickerComponent
                  disabled={!vacation_id || !startDate || availableDays <= 0}
                  value={formik.values?.end_date}
                  label={t("addNewRequest.vacation.endDate")}
                  addTextPlaceHolder="--/--/--"
                  onDateChange={(date) =>
                    formik.setFieldValue("end_date", date)
                  }
                  minDate={startDate ? new Date(startDate) : undefined}
                  maxDate={calculateMaxEndDate()}
                />
                {formik.touched.end_date && formik.errors.end_date && (
                  <div className="error-text">{formik.errors.end_date}</div>
                )}
                {startDate && maxAllowedDays && (
                  <div className="text-xs text-gray-600 mt-1">
                    {/* {t("addNewRequest.vacation.maxDays", {
                                            days: maxAllowedDays,
                                        })} */}
                  </div>
                )}
              </div>

              <div className="input-full-width text-area-height col-span-2">
                <TextAreaInput
                  label={t("addNewRequest.vacation.notes")}
                  name="note"
                  placeholder={t("modals.reject.placeholder")}
                  className="w-full min-h-[100px]"
                  isShowLabel={true}
                  success={false}
                  parentClass=""
                />
              </div>

              <div className="input-full-width text-area-height col-span-2">
                <FileUploader
                  name="file"
                  textLabel={t("labels.attachFile")}
                  error={formik.errors.file}
                  imagePreview={vacationDetails?.file}
                />
              </div>
            </div>
            <ButtonsFormSendCancel
              cancelAdd={cancelAdd}
              isSubmitting={isPending || isUpdating}
              isSubmittingDisabled={
                isPending ||
                isUpdating ||
                !formik.values.employee_id ||
                !formik.values.vacation_manage_id ||
                !formik.values.start_date ||
                !formik.values.end_date ||
                availableDays <= 0 ||
                // Disable if Annual Leave is selected but Monthly Leave has 0 days
                (selectedVacationType?.id === 1 && isMonthlyLeaveZero)
              }
              submitButton={formik.handleSubmit}
            />
          </Form>
        </FormikProvider>
      </div>
      {/* ================= END MAIN FORM NEW ================ */}
    </div>
  );
};

export default FormAddNewRequest;
