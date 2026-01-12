import React, { useEffect, useState } from "react";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import axiosInstance from "@/utils/axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import EmployeeSelect from "../../../AllSelectsForm/EmployeeSelect";
import SelectLetterTemplate from "../../../AllSelectsForm/SelectLetterTemplate";
import ButtonsFormSendCancel from "../../../ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { useTranslation } from "react-i18next";
import { queryClient } from "@/utils/queryClient";
import { Loading } from "@/components";
import { useLetters } from "@/hooks/api";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";

interface FormValues {
  employee_id: { value: string; label: string } | null;
  letter_mangment_id: { value: string; label: string } | null;
  directed_to: string;
  note: string;
  file: any;
  room_of_commerce: BooleanOption | null;
}

interface BooleanOption {
  value: number;
  label: string;
}

const booleanOptions: BooleanOption[] = [
  { value: 1, label: "نعم" },
  { value: 0, label: "لا" }
];

interface FieldProps {
  field: {
    name: string;
    value: any;
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: React.FocusEvent<any>) => void;
  };
}

const FormAddNewLetter: React.FC = ({ id, cancel, isDisabledEmployee }) => {
  const { t } = useTranslation("orders");
  // NAVIGATE CANCEL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { queryOne } = useLetters();
  const { data, isLoading } = queryOne(id || "");
  const [showRoomOfCommerce, setShowRoomOfCommerce] = useState(0);

  // Transform API data to form initial values
  const getInitialValues = () => {
    if (!data) {
      return {
        employee_id: null,
        letter_mangment_id: null,
        directed_to: "",
        note: "",
        file: null,
        room_of_commerce: booleanOptions[0]
      };
    }

    return {
      employee_id: data?.employee
        ? { value: data?.employee?.id, label: data?.employee?.name }
        : null,
      letter_mangment_id: data?.letter_mangment
        ? {
            value: data?.letter_mangment?.id,
            label: data?.letter_mangment?.title
          }
        : null,
      directed_to: data?.directed_to || "",
      note: data?.note || "",
      file: data?.file || null,
      room_of_commerce:
        booleanOptions.find(
          (option) => option.value === data?.room_of_commerce
        ) || booleanOptions[0]
    };
  };

  const validationSchema = Yup.object({
    employee_id: Yup.object()
      .nullable()
      .required(t("validation.employeeRequired")),
    letter_mangment_id: Yup.object()
      .nullable()
      .required(t("validation.letterTemplateRequired")),
    directed_to: Yup.string()
      .nullable()
      .required(t("validation.directedToRequired")),
    // note: Yup.string()
    //   .required(t("validation.required"))
    //   .min(5, t("validation.minChars", { count: 5 }))
    //   .max(500, t("validation.maxChars", { count: 500 })),
    room_of_commerce: Yup.object().nullable().required(t("validation.required"))
  });

  const handleSubmit = (
    values: FormValues,
    { setTouched, resetForm }: FormikHelpers<FormValues>
  ) => {
    setLoading(true);
    setTouched({
      employee_id: true,
      letter_mangment_id: true,
      directed_to: true,
      note: true,
      file: true,
      room_of_commerce: true
    });

    const formattedValues = {
      ...values,
      employee_id: values.employee_id?.value || null,
      letter_mangment_id: values.letter_mangment_id?.value || null,
      room_of_commerce: values.room_of_commerce?.value || 0
    };

    const request = id
      ? axiosInstance.put(`/letters/${id}`, formattedValues)
      : axiosInstance.post("/letters", formattedValues);

    request
      .then((res) => res.data)
      .then((data) => {
        toast.success(id ? "تم تحديث الطلب بنجاح!" : "تم إضافة الطلب بنجاح!");
        if (!id) resetForm();
        if (cancel) {
          cancel();
        } else {
          navigate(-1);
        }
        queryClient.invalidateQueries({ queryKey: ["letters"] });
      })
      .catch((error) => {
        toast.error("حدث خطأ أثناء الحفظ");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const cancelAdd = () => {
    toast.success(t("toasts.cancelSuccess"));
    if (cancel) {
      cancel();
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (data?.letter_mangment?.room_of_commerce === 1) {
      setShowRoomOfCommerce(data?.letter_mangment?.room_of_commerce);
    }
  }, [data?.letter_mangment?.room_of_commerce]);

  const handleLetterMangment = (option: any) => {
    if (option === 1) {
      setShowRoomOfCommerce(1);
    } else {
      setShowRoomOfCommerce(0);
    }
  };
  if (id && isLoading) {
    return <Loading />;
  }

  return (
    <div className="form-add-new-request border-width-content mt-5">
      <h2 className="title-head-form text-font-dark pt-3 mb-3">
        {id ? t("common.editRequest") : t("common.newRequest")}
      </h2>
      {/* ================= START MAIN FORM NEW ================ */}
      <div className="main-form-new ">
        <Formik
          initialValues={getInitialValues()}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, errors, touched, values }) => {
            return (
              <Form>
                <div className="all-forms-grid grid-cards-2">
                  {/* ================== START INPUT ONE DETAILS ================== */}
                  <div className="input-one-details">
                    <Field name="employee_id">
                      {({ field }: FieldProps) => (
                        <EmployeeSelect
                          setFieldValue={(values) => {
                            setFieldValue("employee_id", values);
                            setFieldValue("letter_mangment_id", null);
                          }}
                          field={field}
                          error={touched.employee_id && errors.employee_id}
                          isDisabled={isDisabledEmployee}
                        />
                      )}
                    </Field>
                  </div>
                  {/* ================== END INPUT ONE DETAILS ================== */}

                  {/* ================== START INPUT ONE DETAILS ================== */}
                  <div className="input-one-details">
                    <Field name="letter_mangment_id">
                      {({ field }: FieldProps) => (
                        <SelectLetterTemplate
                          onChange={(option: any) => {
                            setFieldValue("letter_mangment_id", option);
                            console.log("changed");
                          }}
                          setFieldValue={setFieldValue}
                          field={field}
                          employee_id={values?.employee_id}
                          error={
                            touched.letter_mangment_id &&
                            errors.letter_mangment_id
                          }
                          handleLetterMangment={handleLetterMangment}
                        />
                      )}
                    </Field>
                  </div>
                  {/* ================== END INPUT ONE DETAILS ================== */}

                  {/* ================== START INPUT ONE DETAILS ================== */}
                  <div className="input-one-details ">
                    <InputField
                      isShowLabel={true}
                      label={t("labels.directedTo")}
                      name="directed_to"
                      type="text"
                      placeholder={t("labels.directedTo")}
                      success
                      error={touched.directed_to && errors.directed_to}
                    />
                  </div>
                  {/* ================== END INPUT ONE DETAILS ================== */}

                  {/* ================== START INPUT FOUR DETAILS ================== */}
                  <div className="input-one-details">
                    <InputField
                      isShowLabel={true}
                      label={t("labels.notes")}
                      name="note"
                      type="text"
                      placeholder={t("labels.addNotes")}
                      success
                      parentClass=""
                      error={touched.note && errors.note}
                    />
                  </div>
                  {/* ================== END INPUT FOUR DETAILS ================== */}

                  {showRoomOfCommerce != 0 && (
                    <div className="input-one-details">
                      <Field name="room_of_commerce">
                        {({
                          field,
                          form,
                          meta
                        }: {
                          field: any;
                          form: any;
                          meta: any;
                        }) => (
                          <SelectBox
                            isShowLabel={true}
                            label="الغرفة التجارية"
                            options={booleanOptions}
                            onChange={(option: BooleanOption | null) => {
                              setFieldValue("room_of_commerce", option?.value);

                              form.validateField("room_of_commerce");
                            }}
                            onBlur={() =>
                              form.setFieldTouched("room_of_commerce", true)
                            }
                            placeholder="-إختر-"
                            isSearchable={false}
                            isMulti={false}
                            isClearable={false}
                            field={field}
                            error={meta.touched && meta.error}
                          />
                        )}
                      </Field>
                    </div>
                  )}

                  {/* <FileUploader textLabel={t("labels.attachFile")} name="file" /> */}
                </div>
                <ButtonsFormSendCancel
                  cancelAdd={cancelAdd}
                  submitButton={() => handleSubmit()}
                  isSubmittingDisabled={loading}
                  isSubmitting={loading}
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

export default FormAddNewLetter;
