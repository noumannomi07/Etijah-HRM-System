import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import TextAreaInput from "@/Dashboard/Shared/Forms/TextArea";
import NumberInput from "@/Dashboard/Shared/NumberInput/NumberInput";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { FullRoutes } from "@/Routes/routes";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const FormAddNewViolationsManagement = () => {
  const options = {
    sanction: [
      { value: "type1", label: "Type 1" },
      { value: "type2", label: "Type 2" },
    ],
  };
  const initialValues = {
    violationName: "",
    violationNameEn: "",
    sanction: null,
    discountPercentage: "",

    detailsArea: "",
  };

  const validationSchema = Yup.object({
    violationName: Yup.string()
      .required("إسم المخالفة باللغة العربية مطلوب")
      .matches(
        /^[\u0621-\u064A\s]+$/,
        "يجب إدخال إسم المخالفة باللغة العربية فقط"
      ),

    violationNameEn: Yup.string()
      .required("إسم المخالفة باللغة الإنجليزية مطلوب")
      .matches(/^[A-Za-z\s]+$/, "يجب إدخال إسم المخالفة باللغة الإنجليزية فقط"),
    sanction: Yup.object().nullable().required("يجب اختيار الجزاء"),
    discountPercentage: Yup.number()
      .min(0, "النسبة يجب أن تكون 0 أو أكثر")
      .max(100, "النسبة يجب ألا تزيد عن 100")
      .required("نسبة الخصم مطلوبة"),

    detailsArea: Yup.string()
      .min(10, "التفاصيل يجب أن تحتوي على 10 أحرف على الأقل")
      .required("التفاصيل مطلوبة"),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      violationName: false,
      violationNameEn: false,

      sanction: false,
      discountPercentage: false,

      detailsArea: false,
    });

    toast.success("تم إضافة الطلب بنجاح!");
    resetForm();
  };

  const navigate = useNavigate();
  const cancelAdd = () => {
    toast.success("تم الالغاء بنجاح.");
    navigate(FullRoutes.Dashboard.SystemSettings.All);
  };

  //   NUBMBER
  const [number1, setNumber1] = useState(1);

  const handleNumber1Change = (newValue) => {
    setNumber1(newValue);
  };

  return (
    <div className="all-conent-permission mt-5 border-width-content">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, errors, touched }) => (
          <Form>
            <div className="all-forms-grid grid-cards-2">
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label="إسم المخالفة باللغة العربية"
                  name="violationName"
                  type="text"
                  placeholder="إسم المخالفة باللغة العربية"
                  success
                  error={touched.violationName && errors.violationName}
                />
              </div>
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label="إسم المخالفة باللغة الإنجليزية"
                  name="violationNameEn"
                  type="text"
                  placeholder="أدخل إسم المخالفة باللغة الإنجليزية"
                  success
                  error={touched.violationNameEn && errors.violationNameEn}
                />
              </div>
              <div className="col-span-1 sm:col-span-2">
                <Field name="sanction">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label="الجزاء"
                      options={options.sanction}
                      onChange={(option) => setFieldValue("sanction", option)}
                      placeholder="-إختر-"
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.sanction && errors.sanction}
                    />
                  )}
                </Field>
              </div>

              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label="نسبة الخصم"
                  name="discountPercentage"
                  type="number"
                  placeholder="أدخل نسبة الخصم"
                  success
                  error={
                    touched.discountPercentage && errors.discountPercentage
                  }
                />
              </div>

              <NumberInput
                textLabel="عدد أيام الخصم"
                initialValue={number1}
                min={1}
                step={1}
                onChange={handleNumber1Change}
              />

              <div className="input-one-details sm:col-span-1 md:col-span-2">
                <TextAreaInput
                  isShowLabel={true}
                  label="تفاصيل"
                  name="detailsArea"
                  type="text"
                  placeholder="تفاصيل"
                  success
                  error={touched.detailsArea && errors.detailsArea}
                />
              </div>
            </div>

            <ButtonsFormSendCancel
              cancelAdd={cancelAdd}
              submitButton={() => handleSubmit()}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormAddNewViolationsManagement;
