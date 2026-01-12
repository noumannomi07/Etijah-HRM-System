import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import FileUploaderFormik from "@/Dashboard/Shared/FileUploader/FileUploaderFormik";
import ControlledInput from "@/Dashboard/Shared/Forms/ControlledInput";
import axiosInstance from "@/utils/axios";
import { FormikProvider, useFormik } from "formik";
import i18next from "i18next";
import PropTypes from "prop-types";
import React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Asset } from "../../../types";
import ButtonsSteps from "../ButtonsSteps/ButtonsSteps";

const StepAssets = ({ onPrev }: { onPrev: () => void }) => {
  const { id } = useParams();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("الإسم الأول مطلوب"),
    content: Yup.string().required("الوصف مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      deliver_date: "",
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = {
        ...values,
        file: values.file[0],
      };
      axiosInstance
        .post(`/employeeassets/${id}`, formData, {
          headers: {
            "Accept-Language": i18next.language,
          },
        })
        .then((res) => res.data)
        .then((data) => {
          toast.success("تم تعديل بيانات الموظف بنجاح!");
          // navigate(FullRoutes.Dashboard.StaffManagement.All);
        });
    },
  });

  const handleFileUpload = (incomingFiles) => {
    formik.setFieldValue("file", incomingFiles);
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <FormikProvider value={formik}>
      <div className="all-form-steps">
        <form onSubmit={formik.handleSubmit}>
          <div className="step-assets-form mt-4 grid sm:grid-cols-1 md:grid-cols-2 gap-4">
            <ControlledInput<Asset>
              fieldName="title"
              label="اسم الأصل"
              placeholder="إسم الأصل"
            />
            <div className="input-one-details">
              <DatePickerComponent
                label="تاريخ التسليم"
                addTextPlaceHolder="--/--/--"
                onDateChange={(date) =>
                  formik.setFieldValue("deliver_date", date)
                }
              />
            </div>
            <ControlledInput<Asset>
              fieldName="content"
              label="الوصف"
              placeholder="وصف الأصل"
            />

            <div className="col-span-2">
              <FileUploaderFormik
                formik={formik}
                textLabel=": صورة الأصل"
                name="file"
                onFileUpload={handleFileUpload}
              />
            </div>
          </div>

          <ButtonsSteps
            isShowPrevButton={false}
            functionPrev={handlePrev}
            isNextText={false}
            isNextDisabled={false}
            functionNext={formik.handleSubmit}
          />
        </form>
      </div>
    </FormikProvider>
  );
};

StepAssets.propTypes = {
  onPrev: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default StepAssets;
