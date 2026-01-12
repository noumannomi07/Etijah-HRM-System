import axiosInstance from "@/utils/axios";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { FullRoutes } from "@/Routes/routes";
import { Form, Formik } from "formik";
import i18next from "i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useState } from "react";

const FormAddNewDepartments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    ar: { title: "" },
    en: { title: "" },
  };

  const validationSchema = Yup.object({
    ar: Yup.object({
      title: Yup.string()
        .required("إسم المسمي الوظيفي باللغة العربية مطلوب")
        .matches(/^[\u0621-\u064A\s]+$/, "يجب إدخال الاسم باللغة العربية فقط"),
    }),
    en: Yup.object({
      title: Yup.string()
        .required("إسم المسمي الوظيفي باللغة الإنجليزية مطلوب")
        .matches(/^[A-Za-z\s]+$/, "يجب إدخال الاسم باللغة الإنجليزية فقط"),
    }),
  });

  const handleSubmit = async (values, { setTouched, resetForm }) => {
    setTouched({
      "ar.title": true,
      "en.title": true,
    });

    setLoading(true);

    try {
      const res = await axiosInstance.post("/job-title", values, {
        headers: {
          "Accept-Language": i18next.language,
        },
      });

      if (res?.data?.success) {
        toast.success("تم إضافة المسمي الوظيفي بنجاح!");
        resetForm();
        navigate(FullRoutes.Dashboard.JobTitle.All);
      } else {
        toast.error("حدث خطأ أثناء إضافة المسمي الوظيفي");
      }
    } catch (error) {
      toast.error("فشل في الاتصال بالخادم");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelAdd = () => {
    toast.info("تم الإلغاء.");
    navigate(FullRoutes.Dashboard.JobTitle.All);
  };

  return (
    <div className="all-content-modal-filter border-width-content mt-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form>
            <div className="all-forms-grid grid-cards-2">
              <InputField
                isShowLabel
                label="إسم المسمي الوظيفي باللغة العربية"
                name="ar.title"
                type="text"
                placeholder="إسم المسمي الوظيفي باللغة العربية"
                success
                error={touched.ar?.title && errors.ar?.title}
              />
              <InputField
                isShowLabel
                label="إسم المسمي الوظيفي باللغة الانجليزية"
                name="en.title"
                type="text"
                placeholder="إسم المسمي الوظيفي باللغة الانجليزية"
                success
                error={touched.en?.title && errors.en?.title}
              />
            </div>

            <ButtonsFormSendCancel
              cancelAdd={cancelAdd}
              submitButton={handleSubmit}
              isLoading={loading}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormAddNewDepartments;
