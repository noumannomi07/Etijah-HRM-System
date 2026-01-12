import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { Tooltip } from "@material-tailwind/react";

const initialValues = {
  ar: {
    title: "",
    content: ""
  },
  en: {
    title: "",
    content: ""
  },
  days: "",
  can_take_after: "",
  paid: 1,
  paid_percent: "",
  days_type: "work_days"
};

function FormComponent({
  initialValuesForEdit = null,
  loading = false,
  handleSubmit = () => {},
  cancel = () => {}
}: {
  initialValuesForEdit?: any;
  loading?: boolean;
  handleSubmit?: (values: any, formikHelpers: any) => void;
  cancel?: () => void;
}) {
  const { t } = useTranslation("systemSettings");

  const optionsButton = [
    {
      value: 1,
      label: t("leaveManagement.paid")
    },
    {
      value: 0,
      label: t("leaveManagement.unpaid")
    }
  ];

  const optionsButtonDaysType = [
    {
      value: "work_days",
      label: (
        <Tooltip
          className="bg-white  w-full max-w-[233px] border border-gray-50 shadow-lg p-[20px] rounded-[12px]"
          content={
            <div className="w-full text-[12px] font-semibold text-black">
              {t("leaveManagement.excludeHolidaysFromLeave")}
            </div>
          }
        >
          {t("leaveManagement.work_days")}
        </Tooltip>
      )
    },
    {
      value: "all_week",
      label: (
        <Tooltip
          className="bg-white  w-full max-w-[233px] border border-gray-50 shadow-lg p-[20px] rounded-[12px]"
          content={
            <div className="w-full text-[12px] font-semibold text-black">
              {t("leaveManagement.includeHolidaysInLeave")}
            </div>
          }
        >
          {t("leaveManagement.all_week")}
        </Tooltip>
      )
    }
  ];

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    ar: Yup.object({
      title: Yup.string()
        .required(t("advanceManagement.form.validation.title_ar_required"))
        .matches(
          /^[\u0621-\u064A\s]+$/,
          t("advanceManagement.form.validation.title_ar_format")
        ),
      content: Yup.string()
        .required(t("expenseManagement.content_in_arabic_required"))
        .matches(
          /^[\u0621-\u064A\s]+$/,
          t("expenseManagement.content_in_arabic_only")
        )
    }),
    en: Yup.object({
      title: Yup.string()
        .required(t("advanceManagement.form.validation.title_en_required"))
        .matches(
          /^[A-Za-z\s]+$/,
          t("advanceManagement.form.validation.title_en_format")
        ),
      content: Yup.string()
        .required(t("expenseManagement.content_in_english_required"))
        .matches(
          /^[A-Za-z\s]+$/,
          t("expenseManagement.content_in_english_only")
        )
    }),
    days: Yup.number()
      .min(1, t("leaveManagement.validation.days.min"))
      .max(365, t("leaveManagement.validation.days.max"))
      .required(t("leaveManagement.validation.days.required")),
    can_take_after: Yup.number()
      .required(t("leaveManagement.validation.days.required"))
      .positive(t("leaveManagement.validation.can_take_after.positive")),
    paid: Yup.boolean().required(t("leaveManagement.validation.days.required")),
    paid_percent: Yup.number()
      .min(0, t("leaveManagement.validation.paid_percent.min"))
      .max(100, t("leaveManagement.validation.paid_percent.max"))
      .optional()
      .positive(t("leaveManagement.validation.can_take_after.positive")),
    days_type: Yup.string().required(
      t("leaveManagement.validation.days_type.required")
    )
  });

  return (
    <Formik
      initialValues={initialValuesForEdit || initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, errors, touched, values, setFieldValue }) => {
        return (
          <Form>
            <div className="all-forms-grid grid-cards-2">
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={t("advanceManagement.form.fields.nameAr")}
                  name={"ar.title"}
                  type={"text"}
                  placeholder={t("advanceManagement.form.fields.nameAr")}
                  success
                  error={touched.ar?.title && errors.ar?.title}
                />
              </div>
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={t("advanceManagement.form.fields.nameEn")}
                  name={"en.title"}
                  type={"text"}
                  placeholder={t("advanceManagement.form.fields.nameEn")}
                  success
                  error={touched.en?.title && errors.en?.title}
                />
              </div>
              <div className="input-one-details">
                <InputField
                  isShowLabel
                  label={t("expenseManagement.content_in_arabic")}
                  name="ar.content"
                  type="text"
                  placeholder={t("expenseManagement.content_in_arabic")}
                  success
                  error={touched.ar?.content && errors.ar?.content}
                />
              </div>
              <div className="input-one-details">
                <InputField
                  isShowLabel
                  label={t("expenseManagement.content_in_english")}
                  name="en.content"
                  type="text"
                  placeholder={t("expenseManagement.content_in_english")}
                  success
                  error={touched.en?.content && errors.en?.content}
                />
              </div>

              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={t("leaveManagement.fields.days")}
                  name={"days"}
                  type={"number"}
                  placeholder={t("leaveManagement.fields.days")}
                  success
                  error={touched.days && errors.days}
                  min="1"
                  max="12"
                />
              </div>
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={t("leaveManagement.available_after")}
                  name={"can_take_after"}
                  type={"number"}
                  placeholder={t("leaveManagement.available_after")}
                  success
                  error={touched.can_take_after && errors.can_take_after}
                  min="1"
                  max="12"
                />
              </div>
              <div className="all-content-buttons">
                <h2 className="title text-font-gray mb-2">
                  {t("leaveManagement.fields.paid")}
                </h2>
                <div className="item-center-flex">
                  {optionsButton.map((option) => (
                    <label
                      key={option.value}
                      className={`item-center-flex gap-[8px] text-[14px] text-font-gray cursor-pointer border rounded-lg max-w-fit p-[10px_17px] ${
                        values.paid === option.value
                          ? "border-primaryColor bg-lightColorblue text-primaryColor"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paid_options"
                        value={option.value}
                        checked={values.paid === option.value}
                        onChange={() => setFieldValue("paid", option.value)}
                        className="hidden"
                      />

                      <span
                        className={`flex items-center justify-center w-5 h-5 border rounded-full ${
                          values.paid === option.value
                            ? "border-primaryColor bg-primaryColor"
                            : "border-gray-300"
                        }`}
                      >
                        {values.paid === option.value && (
                          <span className="w-2 h-2 bg-whiteColor rounded-full" />
                        )}
                      </span>
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              {values.paid === 1 && (
                <div className="input-one-details">
                  <InputField
                    isShowLabel={true}
                    label={t("leaveManagement.fields.paid_percent")}
                    name={"paid_percent"}
                    type={"number"}
                    placeholder={t("leaveManagement.fields.paid_percent")}
                    success
                    error={touched.paid_percent && errors.paid_percent}
                    min="0"
                    max="100"
                  />
                </div>
              )}
            </div>

            <div className="all-content-buttons mt-5">
              <h2 className="title text-font-gray mb-2">
                {t("leaveManagement.days_type")}
              </h2>
              <div className="item-center-flex">
                {optionsButtonDaysType.map((option) => (
                  <label
                    key={option.value}
                    className={`item-center-flex gap-[8px] text-[14px] text-font-gray cursor-pointer border rounded-lg max-w-fit p-[10px_17px] ${
                      values.days_type === option.value
                        ? "border-primaryColor bg-lightColorblue text-primaryColor"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="days_type_options"
                      value={option.value}
                      checked={values.days_type === option.value}
                      onChange={() => setFieldValue("days_type", option.value)}
                      className="hidden"
                    />

                    <span
                      className={`flex items-center justify-center w-5 h-5 border rounded-full ${
                        values.days_type === option.value
                          ? "border-primaryColor bg-primaryColor"
                          : "border-gray-300"
                      }`}
                    >
                      {values.days_type === option.value && (
                        <span className="w-2 h-2 bg-whiteColor rounded-full" />
                      )}
                    </span>
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <ButtonsFormSendCancel
              cancelAdd={() => (cancel ? cancel() : navigate(-1))}
              submitButton={handleSubmit}
              isSubmitting={loading}
            />
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormComponent;
