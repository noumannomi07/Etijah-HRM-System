import InputField from "@/Dashboard/Shared/Forms/InputField";
import { Form, FormikProvider, useFormikContext } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { MileageDistanceCounterCompensationType } from "../../../../types";
import { useTranslation } from "react-i18next";

const FormOdometerValues: React.FC = () => {
  const { t } = useTranslation("orders");
  const formik = useFormikContext<MileageDistanceCounterCompensationType>();

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="title-form-info text-font-dark my-3">{t("expenses.distanceCalculation")}</h2>
            <div className="all-forms-grid grid-cards-2">
              <InputField
                isShowLabel={true}
                label={t("expenses.startDistance")}
                name="km_start"
                type="number"
                placeholder={t("expenses.enterStartDistance")}
              />
              <InputField
                isShowLabel={true}
                label={t("expenses.endDistance")}
                name="km_end"
                type="number"
                placeholder={t("expenses.enterEndDistance")}
              />
            </div>
          </div>

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
      </Form>
    </FormikProvider>
  );
};

FormOdometerValues.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default FormOdometerValues;
