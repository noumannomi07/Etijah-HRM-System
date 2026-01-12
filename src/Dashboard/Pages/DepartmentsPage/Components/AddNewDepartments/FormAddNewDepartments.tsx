import axiosInstance from "@/utils/axios";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { FullRoutes } from "@/Routes/routes";
import { Field, Form, Formik } from "formik";
import i18next from "i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useState } from "react";
import EmployeeSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/EmployeeSelect";

const FormAddNewDepartments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

 
  const initialValues = {
    ar: { title: "" },
    en: { title: "" },
    manager_id: null,
  };

  const validationSchema = Yup.object({
    ar: Yup.object({
      title: Yup.string()
        .required("إسم القسم باللغة العربية مطلوب")
        .matches(/^[\u0621-\u064A\s]+$/, "يجب إدخال الاسم باللغة العربية فقط"),
    }),
    en: Yup.object({
      title: Yup.string()
        .required("إسم القسم باللغة الإنجليزية مطلوب")
        .matches(/^[A-Za-z\s]+$/, "يجب إدخال الاسم باللغة الإنجليزية فقط"),
    }),
 
  });

  const handleSubmit = async (values, { setTouched, resetForm }) => {
    setTouched({
      "ar.title": true,
      "en.title": true,
      "manager_id": true,
    });

    setLoading(true);

    values.manager_id = values.manager_id?.id;

    console.log(values);

    try {
      const res = await axiosInstance.post("/employee-categories", values, {
        headers: {
          "Accept-Language": i18next.language,
        },
      });

      if (res?.data?.success) {
        toast.success("تم إضافة القسم بنجاح!");
        resetForm();
        navigate(FullRoutes.Dashboard.Departments.All);
      } else {
        toast.error("حدث خطأ أثناء إضافة القسم");
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
    navigate(FullRoutes.Dashboard.Departments.All);
  };

  return (
    <div className="all-content-modal-filter border-width-content mt-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <Form>
            <div className="all-forms-grid grid-cards-2">
              <InputField
                isShowLabel
                label="إسم القسم باللغة العربية"
                name="ar.title"
                type="text"
                placeholder="إسم القسم باللغة العربية"
                success
                error={touched.ar?.title && errors.ar?.title}
              />
              <InputField
                isShowLabel
                label="إسم القسم باللغة الانجليزية"
                name="en.title"
                type="text"
                placeholder="إسم القسم باللغة الانجليزية"
                success
                error={touched.en?.title && errors.en?.title}
              />


 
                  <Field name="manager_id">
                    {({ field }) => (
                      <EmployeeSelect
                        setFieldValue={(name, value) => setFieldValue(name, value?.id)}
                        field={field}
                        error={touched.manager_id && errors.manager_id}
                        labelText="المدير"
                      />
                    )}
                  </Field>
         
 
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
