import React, { useState } from "react";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import MapLocation from "@/Dashboard/Shared/MapLocation/MapLocation";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "flowbite-react";
import { useTranslation } from "react-i18next";

interface FormValues {
  ar: {
    title: string;
  };
  en: {
    title: string;
  };
  address: string;
  lat: string | number | null;
  lng: string | number | null;
  round: string | number;
}

const initialValues: FormValues = {
  ar: {
    title: ""
  },
  en: {
    title: ""
  },
  address: "",
  lat: null,
  lng: null,
  round: ""
};

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
  const { t,i18n } = useTranslation("systemSettings");
  const navigate = useNavigate();
  const [location, setLocation] = useState({
    lat: initialValuesForEdit?.lat ? Number(initialValuesForEdit.lat) : null,
    lng: initialValuesForEdit?.lng ? Number(initialValuesForEdit.lng) : null
  });

  const handleLocationSelect = (newLocation: { lat: number; lng: number }) => {
    setLocation(newLocation);
  };

  const validationSchema = Yup.object({
    ar: Yup.object({
      title: Yup.string()
        .required(t("workplaceManagement.form.validation.title_ar_required"))
        .matches(/^[\u0621-\u064A\s]+$/, t("workplaceManagement.form.validation.title_ar_format"))
    }),
    en: Yup.object({
      title: Yup.string()
        .required(t("workplaceManagement.form.validation.title_en_required"))
        .matches(/^[A-Za-z\s]+$/, t("workplaceManagement.form.validation.title_en_format"))
    }),
    address: Yup.string().required(t("workplaceManagement.form.validation.address_required")),
    round: Yup.number()
      .required(t("workplaceManagement.form.validation.round_required"))
      .positive(t("workplaceManagement.form.validation.round_positive"))
  });

  const onSubmit = (values: FormValues) => {
    const formData = {
      ...values,
      lat: `${location.lat}`,
      lng: `${location.lng}`
    };
    handleSubmit(formData);
  };
  console.log({ initialValuesForEdit });

  return (
    <Formik
      initialValues={initialValuesForEdit || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ errors, touched, handleSubmit }) => (
        <Form>
          <div className="all-forms-grid grid-cards-2">
            <div className="input-one-details">
              <InputField
                isShowLabel={true}
                label={t("workplaceManagement.form.fields.title_ar")}
                name={"ar.title"}
                type={"text"}
                placeholder={"الاسم باللغة العربية"}
                success
                error={touched.ar?.title && errors.ar?.title}
              />
            </div>
            <div className="input-one-details">
              <InputField
                isShowLabel={true}
                label={t("workplaceManagement.form.fields.title_en")}
                name={"en.title"}
                type={"text"}
                placeholder={t("workplaceManagement.form.fields.title_en")}
                success
                error={touched.en?.title && errors.en?.title}
              />
            </div>

            <div className="input-one-details">
              <InputField
                isShowLabel={true}
                label={t("workplaceManagement.form.fields.address")}
                name="address"
                type="text"
                placeholder={t("workplaceManagement.form.fields.address")}
                success
                error={touched.address && errors.address}
              />
            </div>

            <div className="input-one-details">
              <InputField
                isShowLabel={true}
                label={
                  <div className="d-flex flex">
                    {t("workplaceManagement.form.fields.round")}
                    <Tooltip
                      content={t(
                        "workplaceManagement.form.fields.round_tooltip"
                      )}
                      style="light"
                    >
                      <div className="ps-1 pe-1">
                   {i18n.language === "ar" ? "؟" :"?"}
                      </div>
                    </Tooltip>
                  </div>
                }
                name="round"
                type="number"
                placeholder={t("workplaceManagement.form.fields.round")}
                success
                error={touched.round && errors.round}
                min="1"
              />
            </div>
          </div>

          {/* Map Location Component */}
          <div className="mt-6 mb-6">
            <h3 className="text-lg font-medium mb-3">
              {t("workplaceManagement.form.fields.map_heading")}
            </h3>
            <MapLocation
              onLocationSelect={handleLocationSelect}
              initialPosition={
                initialValuesForEdit?.lat && initialValuesForEdit?.lng
                  ? {
                      lat: Number(initialValuesForEdit.lat),
                      lng: Number(initialValuesForEdit.lng)
                    }
                  : null
              }
            />
            {!location.lat && !location.lng && touched.lat && (
              <p className="text-red-500 text-sm mt-2">
                {t("workplaceManagement.form.fields.map_error")}
              </p>
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
