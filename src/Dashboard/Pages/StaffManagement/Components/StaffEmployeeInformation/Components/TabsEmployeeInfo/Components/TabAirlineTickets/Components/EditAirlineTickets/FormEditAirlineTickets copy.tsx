import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import FileUploader from "@/Dashboard/Shared/FileUploader/FileUploader";
import NumberInput from "@/Dashboard/Shared/NumberInput/NumberInput";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { FullRoutes } from "@/Routes/routes";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

interface FormValues {
  insuranceClass: { value: string; label: string } | null;
  entitlementType: { value: string; label: string } | null;
}

interface FormEditAirlineTicketsProps {
  onClose: () => void;
}

const FormEditAirlineTickets: React.FC<FormEditAirlineTicketsProps> = ({ onClose }) => {
  const { t } = useTranslation("staffManagement");

  const options = {
    insuranceClass: [
      { value: "فئة التأمين", label: t("airlineTickets.category") + " 1" },
      { value: "فئة التأمين2", label: t("airlineTickets.category") + " 2" },
    ],
    entitlementType: [
      { value: "نوع الإستحقاق", label: t("airlineTickets.entitlement") + " 1" },
      { value: "نوع الإستحقاق2", label: t("airlineTickets.entitlement") + " 2" },
    ],
  };

  const initialValues: FormValues = {
    insuranceClass: null,
    entitlementType: null,
  };

  const validationSchema = Yup.object({
    insuranceClass: Yup.object().nullable().required(t("validation.required")),
    entitlementType: Yup.object().nullable().required(t("validation.required")),
  });

  const handleSubmit = (
    values: FormValues,
    { setTouched, resetForm }: FormikHelpers<FormValues>
  ) => {
    setTouched({
      insuranceClass: true,
      entitlementType: true,
    });

    toast.success(t("messages.successAdd"));
    resetForm();
  };

  // NAVIGATE CANCEL
  const navigate = useNavigate();

  const cancelAdd = () => {
    toast.success(t("messages.cancel"));
    onClose();
  };

  // NUMBER INPUT
  const [number1, setNumber1] = useState(1);

  const handleNumber1Change = (newValue: number) => {
    setNumber1(newValue);
  };

  // FILE UPLOAD
  const handleFileUpload = (file: File) => {
    // Handle file upload logic
  };

  return (
    <div className="form-airline-add border-width-content mt-5">
      {/* ================= START MAIN FORM NEW ================ */}
      <div className="main-form-new ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue, errors, touched }) => (
            <Form>
              <div className="all-forms-grid--2  flex flex-col sm:grid sm:grid-cols-2 gap-4">
                {/* ================== START INPUT ONE DETAILS ================== */}
                <div className="input-one-details">
                  <Field name="insuranceClass">
                    {({ field }: { field: any }) => (
                      <SelectBox
                        isShowLabel={true}
                        label={t("airlineTickets.category")}
                        options={options.insuranceClass}
                        onChange={(option: any) =>
                          setFieldValue("insuranceClass", option)
                        }
                        placeholder="-إختر-"
                        isSearchable={false}
                        isMulti={false}
                        field={field}
                        error={touched.insuranceClass && errors.insuranceClass}
                      />
                    )}
                  </Field>
                </div>
                {/* ================== END INPUT ONE DETAILS ================== */}
                <div className="input-one-details">
                  <NumberInput
                    textLabel={t("airlineTickets.personsCount")}
                    initialValue={number1}
                    min={1}
                    step={1}
                    onChange={handleNumber1Change}
                  />
                </div>

                {/* ================== START INPUT ONE DETAILS ================== */}
                <div className="input-one-details">
                  <Field name="entitlementType">
                    {({ field }: { field: any }) => (
                      <SelectBox
                        isShowLabel={true}
                        label={t("airlineTickets.entitlement")}
                        options={options.entitlementType}
                        onChange={(option: any) =>
                          setFieldValue("entitlementType", option)
                        }
                        placeholder="-إختر-"
                        isSearchable={false}
                        isMulti={false}
                        field={field}
                        error={
                          touched.entitlementType && errors.entitlementType
                        }
                      />
                    )}
                  </Field>
                </div>
                {/* ================== END INPUT ONE DETAILS ================== */}

                {/* ================== START INPUT FOUR DETAILS ================== */}
                <div className="input-one-details">
                  <DatePickerComponent
                    label={t("airlineTickets.entitlementDate")}
                    addTextPlaceHolder="--/--/--"
                  />
                </div>
                {/* ================== END INPUT FOUR DETAILS ================== */}
                <div className="col-span-1 sm:col-span-2">
                  <FileUploader
                    textLabel={t("common.fileAttachment")}
                    name="ticket-file"
                    error=""
                  />
                </div>
              </div>
              <ButtonsFormSendCancel
                cancelAdd={cancelAdd}
                submitButton={() => handleSubmit()}
              />
            </Form>
          )}
        </Formik>
      </div>
      {/* ================= END MAIN FORM NEW ================ */}
    </div>
  );
};

export default FormEditAirlineTickets;
