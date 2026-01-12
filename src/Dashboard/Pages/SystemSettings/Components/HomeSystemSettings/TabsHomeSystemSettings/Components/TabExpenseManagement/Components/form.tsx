import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import {
  useExpenseManagement,
  useMileManagement
} from "@/hooks/api/system-settings";
import { useTranslation } from "react-i18next";

const booleanOptions = [
  { value: 0, label: "لا" },
  { value: 1, label: "نعم" }
];

const initialValues = {
  ar: {
    title: "",
    content: ""
  },
  en: {
    title: "",
    content: ""
  },
  has_mile: booleanOptions[0],
  price: ""
};

interface FormValues {
  ar: {
    title: string;
    content: string;
  };
  en: {
    title: string;
    content: string;
  };
  has_mile: { value: number; label: string } | null;
  price?: string;
}

interface FormComponentProps {
  initialValuesForEdit?: FormValues | null;
  loading?: boolean;
  handleSubmit?: (values: FormValues) => void;
  cancel?: () => void;
}

const FormComponent: React.FC<FormComponentProps> = ({
  initialValuesForEdit = null,
  loading = false,
  handleSubmit = () => {},
  cancel
}) => {
  const { t } = useTranslation("systemSettings");

  const { queryAll: queryAllMilePrice, updateItem: updateItemMilePrice } =
    useMileManagement();
  const { queryAll } = useExpenseManagement();

  const hasMileObj = queryAllMilePrice?.data || {};
  const isThereHasMile = useMemo(() => {
    return queryAll?.data?.some((item) => item.has_mile);
  }, [queryAll?.data]);

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
        // .required(t("expenseManagement.content_in_arabic_required"))
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
        // .required(t("expenseManagement.content_in_english_required"))
        .matches(
          /^[A-Za-z\s]+$/,
          t("expenseManagement.content_in_english_only")
        )
    }),
    has_mile: Yup.object().nullable().required("يجب اختيار"),
    price: Yup.number().when("has_mile", {
      is: (has_mile: { value: number }) => has_mile?.value === 1,
      then: (schema) => schema.required("سعر الميل مطلوب")
    })
  });

  const onSubmit = async (values: FormValues) => {
    if (values.has_mile?.value === 1 && values.price) {
      await updateItemMilePrice({
        id: hasMileObj?.id || 1,
        price: values.price
      });
    }

    const formData = {
      ...values,
      has_mile: values.has_mile?.value
    };
    handleSubmit(formData);
  };

  return (
    <Formik
      initialValues={initialValuesForEdit || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit, errors, touched, setFieldValue, values }) => (
        <Form>
          <div className="all-forms-grid grid-cards-2">
            <div className="input-one-details">
              <InputField
                isShowLabel
                label={t("advanceManagement.form.fields.nameAr")}
                name="ar.title"
                type="text"
                placeholder={t("advanceManagement.form.fields.nameAr")}
                success
                error={touched.ar?.title && errors.ar?.title}
              />
            </div>
            <div className="input-one-details">
              <InputField
                isShowLabel
                label={t("advanceManagement.form.fields.nameEn")}
                name="en.title"
                type="text"
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
            {!isThereHasMile && (
              <div className="input-one-details">
                <Field name="has_mile">
                  {({ field }: { field: any }) => (
                    <SelectBox
                      isShowLabel
                      label={t("expenseManagement.by_mile")}
                      options={booleanOptions}
                      onChange={(option: any) =>
                        setFieldValue("has_mile", option)
                      }
                      isClearable={false}
                      placeholder={t("generalSettings.placeholderSelect")}
                      field={field}
                      error={touched.has_mile && errors.has_mile}
                    />
                  )}
                </Field>
              </div>
            )}
            {values.has_mile?.value === 1 && (
              <div className="input-one-details">
                <InputField
                  isShowLabel
                  label={t("expenseManagement.mile_price")}
                  name="price"
                  type="number"
                  placeholder={t("expenseManagement.mile_price")}
                  success
                  error={touched.price && errors.price}
                />
              </div>
            )}
          </div>

          <ButtonsFormSendCancel
            cancelAdd={() => (cancel ? cancel() : navigate(-1))}
            submitButton={handleSubmit}
            isSubmitting={loading}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
