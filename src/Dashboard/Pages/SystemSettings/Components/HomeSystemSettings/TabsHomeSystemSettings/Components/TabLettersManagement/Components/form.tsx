import React, { useEffect, useState } from "react";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { useNationalaties } from "@/hooks/api/system-settings";
import { useTranslation } from "react-i18next";

interface NationalityOption {
  value: string;
  label: string;
}

interface BooleanOption {
  value: number;
  label: string;
}

interface FormValues {
  ar: { title: string };
  en: { title: string };
  nationalities: NationalityOption[];
  all_nationality: BooleanOption | null;
  room_of_commerce: BooleanOption | null;
}

const booleanOptions: BooleanOption[] = [
  { value: 1, label: "نعم" },
  { value: 0, label: "لا" }
];

const initialValues: FormValues = {
  ar: { title: "" },
  en: { title: "" },
  nationalities: [],
  all_nationality: booleanOptions[0],
  room_of_commerce: booleanOptions[0]
};

interface FormComponentProps {
  initialValuesForEdit?: FormValues | null;
  loading?: boolean;
  handleSubmit?: (values: any) => void;
  cancel?: () => void;
}

const FormComponent: React.FC<FormComponentProps> = ({
  initialValuesForEdit = null,
  loading = false,
  handleSubmit = () => {},
  cancel
}) => {
  const { t } = useTranslation("systemSettings");
  const navigate = useNavigate();
  const { queryAll } = useNationalaties();
  const [showNationalitiesSelect, setShowNationalitiesSelect] = useState(false);

  // ✅ Fixed Validation Schema
  const validationSchema = Yup.object().shape({
    ar: Yup.object().shape({
      title: Yup.string()
        .required(t("advanceManagement.form.validation.title_ar_required"))
        .matches(
          /^[\u0621-\u064A\s]+$/,
          t("advanceManagement.form.validation.title_ar_format")
        )
    }),
    en: Yup.object().shape({
      title: Yup.string()
        .required(t("advanceManagement.form.validation.title_en_required"))
        .matches(
          /^[A-Za-z\s]+$/,
          t("advanceManagement.form.validation.title_en_format")
        )
    }),
    room_of_commerce: Yup.object()
      .shape({
        value: Yup.number().oneOf([0, 1]),
        label: Yup.string().required(
          t("lettersManagement.form.You_correct_type")
        )
      })
      .nullable()
      .required(t("lettersManagement.form.You_must_choose_type")),

    all_nationality: Yup.object()
      .shape({
        value: Yup.number().oneOf(
          [0, 1],
          t("lettersManagement.form.You_correct_type")
        ),
        label: Yup.string().required(
          t("lettersManagement.form.You_must_choose_type")
        )
      })
      .nullable()
      .required(t("lettersManagement.form.You_must_choose_type")),
    nationalities: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.string().required(
            t("lettersManagement.form.A_valid_value_be_chosen")
          ),
          label: Yup.string().required(
            t("lettersManagement.form.valid_name_required")
          )
        })
      )
      .when("all_nationality", {
        is: (val: BooleanOption | null) => val?.value === 0,
        then: (schema) =>
          schema
            .min(1, t("lettersManagement.form.select_at_least_one_nationality"))
            .required(t("lettersManagement.form.nationality_required")),
        otherwise: (schema) => schema.notRequired()
      })
  });

  const onSubmit = (values: FormValues) => {
    const formData = {
      ...values,
      all_nationality: values?.all_nationality?.value,
      room_of_commerce: values?.room_of_commerce?.value,
      nationalaties:
        values.all_nationality?.value === 1
          ? []
          : values?.nationalities.map((n) => n.value)
    };
    handleSubmit(formData);
  };

  useEffect(() => {
    if (initialValuesForEdit) {
      setShowNationalitiesSelect(
        initialValuesForEdit.all_nationality?.value === 0
      );
    }
  }, [initialValuesForEdit]);

  const handleAllNationalityChange = (
    option: BooleanOption | null,
    setFieldValue: any
  ) => {
    setFieldValue("all_nationality", option);
    setFieldValue("nationalities", []);
    setShowNationalitiesSelect(option?.value === 0);
  };

  return (
    <Formik
      initialValues={initialValuesForEdit || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnBlur
      validateOnChange
    >
      {({
        errors,
        touched,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        values
      }) => (
        <Form>
          <div className="all-forms-grid grid-cards-2">
            {/* Arabic Title */}
            <div className="input-one-details">
              <Field name="ar.title">
                {({ field, meta }: { field: any; meta: any }) => (
                  <InputField
                    isShowLabel={true}
                    label={t("advanceManagement.form.fields.nameAr")}
                    name={field.name}
                    type="text"
                    placeholder={t("advanceManagement.form.fields.nameAr")}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={meta.touched && meta.error}
                  />
                )}
              </Field>
            </div>

            {/* English Title */}
            <div className="input-one-details">
              <Field name="en.title">
                {({ field, meta }: { field: any; meta: any }) => (
                  <InputField
                    isShowLabel={true}
                    label={t("advanceManagement.form.fields.nameEn")}
                    name={field.name}
                    type="text"
                    placeholder={t("advanceManagement.form.fields.nameEn")}
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={meta.touched && meta.error}
                  />
                )}
              </Field>
            </div>

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
                    label={t("lettersManagement.form.chamber_of_commerce")}
                    options={booleanOptions}
                    onChange={(option: BooleanOption | null) => {
                      setFieldValue("room_of_commerce", option?.value);

                      form.validateField("room_of_commerce");
                    }}
                    onBlur={() =>
                      form.setFieldTouched("room_of_commerce", true)
                    }
                    placeholder={t("generalSettings.placeholderSelect")}
                    isSearchable={false}
                    isMulti={false}
                    isClearable={false}
                    field={field}
                    error={meta.touched && meta.error}
                  />
                )}
              </Field>
            </div>

            {/* All Nationalities Select */}
            <div className="input-one-details">
              <Field name="all_nationality">
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
                    label={t("lettersManagement.form.IsItForAllNationalities")}
                    options={booleanOptions}
                    onChange={(option: BooleanOption | null) => {
                      handleAllNationalityChange(option, setFieldValue);
                      form.setFieldTouched("all_nationality", true);
                      form.validateField("nationalities");
                    }}
                    onBlur={() => form.setFieldTouched("all_nationality", true)}
                    placeholder={t("generalSettings.placeholderSelect")}
                    isSearchable={false}
                    isMulti={false}
                    isClearable={false}
                    field={field}
                    error={meta.touched && meta.error}
                  />
                )}
              </Field>
            </div>

            {/* Nationalities Select (Shown Conditionally) */}
            {showNationalitiesSelect && (
              <div className="input-one-details">
                <Field name="nationalities">
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
                      label={t("lettersManagement.form.Specific_nationalities")}
                      options={queryAll.data?.map((item) => ({
                        value: item.id,
                        label: item.title
                      }))}
                      onChange={(option: NationalityOption[]) => {
                        setFieldValue("nationalities", option);
                        form.setFieldTouched("nationalities", true);
                      }}
                      onBlur={() => form.setFieldTouched("nationalities", true)}
                      placeholder={t("generalSettings.placeholderSelect")}
                      isSearchable={true}
                      isMulti={true}
                      isLoading={queryAll.isLoading}
                      field={field}
                      error={meta.touched && meta.error}
                      value={values.nationalities}
                    />
                  )}
                </Field>
              </div>
            )}
          </div>

          <ButtonsFormSendCancel
            cancelAdd={() => (cancel ? cancel() : navigate(-1))}
            submitButton={handleSubmit}
            isSubmitting={loading || isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
