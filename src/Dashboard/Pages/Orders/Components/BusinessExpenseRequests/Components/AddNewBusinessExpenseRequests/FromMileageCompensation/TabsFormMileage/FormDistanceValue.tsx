import InputField from "@/Dashboard/Shared/Forms/InputField";
import { Form, FormikProvider, useFormikContext } from "formik";
import React from "react";
import { MileageDistanceCompensationType } from "../../../../types";
import { useTranslation } from "react-i18next";

const FormDistanceValue: React.FC = () => {
  const { t } = useTranslation("orders");
  const formik = useFormikContext<MileageDistanceCompensationType>();

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="title-form-info text-font-dark my-3">{t("expenses.distanceCalculation")}</h2>
            <div className="all-forms-grid grid-cards-2">
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={t("expenses.distanceInMiles")}
                  name="miles"
                  type="number"
                  placeholder={t("expenses.distance")}
                  success
                  error={formik.errors.miles}
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="title-form-info text-font-dark my-3">{t("expenses.additionalInfo")}</h2>
            <div className="all-forms-grid grid-cards-2">
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={t("expenses.descriptionOptional")}
                  name="content"
                  type="text"
                  placeholder={t("expenses.description")}
                />
              </div>
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={t("expenses.referenceNumberOptional")}
                  name="code"
                  type="text"
                  placeholder={t("expenses.referenceNumber")}
                />
              </div>
            </div>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default FormDistanceValue;
