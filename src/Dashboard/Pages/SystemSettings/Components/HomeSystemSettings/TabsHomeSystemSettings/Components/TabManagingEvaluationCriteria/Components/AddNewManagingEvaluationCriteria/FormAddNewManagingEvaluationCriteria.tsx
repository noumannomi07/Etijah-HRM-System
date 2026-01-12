import axiosInstance from "@/utils/axios";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { FullRoutes } from "@/Routes/routes";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const FormAddNewManagingEvaluationCriteria = () => {
  const initialValues = {
    ar: {
      title: "", // Arabic title
    },
    en: {
      title: "", // English title
    },
  };

  const validationSchema = Yup.object({
    ar: Yup.object({
      title: Yup.string()
        .required("إسم المعيار باللغة العربية مطلوب")
        .matches(/^[\u0621-\u064A\s]+$/, "يجب إدخال الاسم باللغة العربية فقط"),
    }),
    en: Yup.object({
      title: Yup.string()
        .required("إسم المعيار باللغة الإنجليزية مطلوب")
        .matches(/^[A-Za-z\s]+$/, "يجب إدخال الاسم باللغة الإنجليزية فقط"),
    }),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      "ar.title": true,
      "en.title": true,
    });

    axiosInstance
      .post("/rate-management", values)
      .then((res) => res.data)
      .then((data) => {
        toast.success("تم إضافة الطلب بنجاح!");
        resetForm();
        navigate(FullRoutes.Dashboard.SystemSettings.All);
      });
  };

  const navigate = useNavigate();
  const cancelAdd = () => {
    toast.success("تم الالغاء بنجاح.");
    navigate(FullRoutes.Dashboard.SystemSettings.All);
  };
  return (
    <div className="all-conent-permission mt-5 border-width-content">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form>
            <div className="all-forms-grid grid-cards-2">
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={"إسم المعيار باللغة العربية"}
                  name={"ar.title"}
                  type={"text"}
                  placeholder={"إسم المعيار باللغة العربية"}
                  success
                  error={touched.ar?.title && errors.ar?.title}
                />
              </div>
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label={"إسم المعيار باللغة الإنجليزية"}
                  name={"en.title"}
                  type={"text"}
                  placeholder={"إسم المعيار باللغة الإنجليزية"}
                  success
                  error={touched.en?.title && errors.en?.title}
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

export default FormAddNewManagingEvaluationCriteria;
