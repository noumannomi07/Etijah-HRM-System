import NumberInput from "@/Dashboard/Shared/NumberInput/NumberInput";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const InfoContentOne = () => {
  const options = {
    oneEconomicActivity: [
      { value: "قسم1", label: "قسم 1" },
      { value: "قسم2", label: "قسم 2" },
    ],
    subEconomicActivity: [
      { value: "موظف1", label: "موظف 1" },
      { value: "موظف2", label: "موظف 2" },
    ],
  };

  const initialValues = {
    oneEconomicActivity: null,
    subEconomicActivity: null,
  };

  const validationSchema = Yup.object({
    oneEconomicActivity: Yup.object()
      .nullable()
      .required("يجب اختيار النشاط الإقتصادي (اختياري)"),
    subEconomicActivity: Yup.object()
      .nullable()
      .required("يجب اختيار النشاط الاقتصادي الفرعي"),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      oneEconomicActivity: true,
      subEconomicActivity: true,
    });

    resetForm();
  };

  //   NUBMBER
  const [number1, setNumber1] = useState(1);
  const [number2, setNumber2] = useState(1);

  const handleNumber1Change = (newValue) => {
    setNumber1(newValue);
  };

  const handleNumber2Change = (newValue) => {
    setNumber2(newValue);
  };

  return (
    <div className="all-info-conetnt-one">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form>
            <div className="all-cols-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* ================== START INPUT ONE DETAILS ================== */}
              <div className="input-one-details">
                <Field name="oneEconomicActivity">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label="النشاط الإقتصادي (اختياري)"
                      options={options.oneEconomicActivity}
                      onChange={(option) =>
                        setFieldValue("oneEconomicActivity", option)
                      }
                      placeholder="-إختر-"
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={
                        touched.oneEconomicActivity &&
                        errors.oneEconomicActivity
                      }
                    />
                  )}
                </Field>
              </div>
              {/* ================== END INPUT ONE DETAILS ================== */}
              {/* ================== START INPUT ONE DETAILS ================== */}
              <div className="input-one-details">
                <Field name="subEconomicActivity">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label="النشاط الاقتصادي الفرعي"
                      options={options.subEconomicActivity}
                      onChange={(option) =>
                        setFieldValue("subEconomicActivity", option)
                      }
                      placeholder="-إختر-"
                      isSearchable={true}
                      isMulti={false}
                      field={field}
                      error={
                        touched.subEconomicActivity &&
                        errors.subEconomicActivity
                      }
                    />
                  )}
                </Field>
              </div>
              {/* ================== END INPUT ONE DETAILS ================== */}
              <NumberInput
                textLabel="عدد الموظفين السعوديين"
                initialValue={number1}
                min={1}
                step={1}
                onChange={handleNumber1Change}
              />
              <NumberInput
                textLabel="عدد الموظفين غير السعوديين"
                initialValue={number2}
                min={1}
                step={1}
                onChange={handleNumber2Change}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InfoContentOne;
