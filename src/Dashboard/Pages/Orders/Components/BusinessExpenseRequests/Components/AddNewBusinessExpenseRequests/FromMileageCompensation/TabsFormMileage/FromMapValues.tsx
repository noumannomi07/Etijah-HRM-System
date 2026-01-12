import InputField from "@/Dashboard/Shared/Forms/InputField";
import { Form, FormikProvider, useFormikContext } from "formik";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { MileageMapCompensationType } from "../../../../types";
import { calculateDistanceInMiles } from "@/utils/calculateDistance";
import ControlledMap from "@/Dashboard/Shared/MapLocation/ControlledMap";
import { useTranslation } from "react-i18next";

const FromMapValues: React.FC = () => {
  const { t } = useTranslation("orders");
  const formik = useFormikContext<MileageMapCompensationType>();

  useEffect(() => {
    const miles = calculateDistanceInMiles(formik.values.start_lat, formik.values.start_lng, formik.values.end_lat, formik.values.end_lng);
    formik.setFieldValue("miles", miles.toFixed(1));
  }, [formik.values.start_lat, formik.values.start_lng, formik.values.end_lat, formik.values.end_lng]);

  return (
    <FormikProvider value={formik}>
      <Form>
        <div className="flex gap-2">
          <ControlledMap label={t("expenses.startPoint")} latName="start_lat" lngName="start_lng" />
          <ControlledMap label={t("expenses.endPoint")} latName="end_lat" lngName="end_lng" />
        </div>
        <div className="flex flex-col gap-4 mt-2">
          <div>
            <h2 className="title-form-info text-font-dark my-3">
              {t("expenses.distanceCalculation")}
            </h2>
            <div className="all-forms-grid grid-cards-2">
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
          <div>
            <h2 className="title-form-info text-font-dark my-3">
              {t("expenses.additionalInfo")}
            </h2>
            <div className="all-forms-grid grid-cards-2">
              <InputField
                isShowLabel={true}
                label={t("expenses.descriptionOptional")}
                name="content"
                type="text"
                placeholder={t("expenses.description")}
              />
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

FromMapValues.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default FromMapValues;
