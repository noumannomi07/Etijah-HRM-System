import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";

function FormComponent({
  initialValuesForEdit,
  loading = false,
  handleSubmit = () => {},
  cancel,
  price
}) {
  const navigate = useNavigate();
  const { t } = useTranslation("systemSettings");
  const validationSchema = Yup.object({
    price: Yup.number().required(t("expenseManagement.mile_price_required"))
  });

  console.log("priceeeee", price);
  return (
    <Formik
      initialValues={initialValuesForEdit}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, errors, touched }) => (
        <Form>
          <div className="all-forms-grid grid-cards-2">
            <div className="input-one-details">
              <InputField
                isShowLabel={true}
                label={t("expenseManagement.mile_price")}
                name={"price"}
                type={"number"}
                placeholder={price + " ريال"}
                value={price}
                success
                error={touched.price && errors.price}
              />
            </div>
          </div>

          <ButtonsFormSendCancel
            cancelAdd={cancel}
            submitButton={handleSubmit}
            isSubmitting={loading}
          />
        </Form>
      )}
    </Formik>
  );
}

export default FormComponent;
