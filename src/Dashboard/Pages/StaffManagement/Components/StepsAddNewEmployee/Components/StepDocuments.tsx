import PropTypes from "prop-types";
import { Field, Form, Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import CustomFileUploader from "@/Dashboard/Shared/FileUploader/CustomFileUploader";
import { FullRoutes } from "@/Routes/routes";
import React from "react";
import { documentsSchema, initialValues } from "../schema/assets";

const StepDocuments = ({ onNext }) => {
  const { id } = useParams();

  const handleSubmit = (values, { setTouched }) => {
    setTouched({
      title: true,
      code: true,
      expire_date: true,
      file: true,
    });

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("code", values.code);
    formData.append("expire_date", values.expire_date);

    if (values.file instanceof File) {
      formData.append("file", values.file, values.file.name);

      console.log("File details:", {
        name: values.file.name,
        size: values.file.size,
        type: values.file.type,
      });
    } else {
      toast.error("الرجاء اختيار ملف صحيح");
      return;
    }

    axiosInstance
      .post(`/employeefiles/${id}`, formData, {
        headers: {
          "Accept-Language": i18next.language,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const data = res.data;
        toast.success("تم إضافة الطلب بنجاح!");
        if (onNext) onNext();
      })
      .catch((error) => {
        console.error("Upload error:", error);
        if (error.response?.data?.errors) {
          Object.values(error.response.data.errors).forEach((msg) =>
            toast.error(msg[0])
          );
        } else {
          toast.error("حدث خطأ أثناء رفع المستند");
        }
      });
  };

  const navigate = useNavigate();

  const cancelAdd = () => {
    toast.success("تم الالغاء بنجاح.");
    navigate(FullRoutes.Dashboard.Orders.All);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={documentsSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, setFieldValue, errors, touched }) => (
          <Form>
            <div className="all-forms-grid grid-cards-2">
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label="إسم المستند"
                  name="title"
                  type="text"
                  placeholder="إسم المستند"
                  success
                />
              </div>
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label="رقم المستند"
                  name="code"
                  type="number"
                  placeholder="رقم المستند"
                  success
                />
              </div>
              <div className="input-one-details">
                <Field name="date">
                  {({ field }) => (
                    <DatePickerComponent
                      label="تاريخ الإنتهاء"
                      addTextPlaceHolder="--/--/--"
                      onDateChange={(date) =>
                        setFieldValue("expire_date", date)
                      }
                      field={field}
                      error={touched.expire_date && errors.expire_date}
                    />
                  )}
                </Field>
              </div>
              <div className="input-one-details">
                <CustomFileUploader
                  textLabel="إرفق ملف"
                  name="file"
                  onFileSelect={(file) => {
                    setFieldValue("file", file);
                  }}
                />
                {touched.file && errors.file && (
                  <div className="error-text">{errors.file}</div>
                )}
              </div>
            </div>
            <ButtonsFormSendCancel
              cancelAdd={cancelAdd}
              submitButton={() => handleSubmit()}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

StepDocuments.propTypes = {
  onNext: PropTypes.func.isRequired,
};

export default StepDocuments;
