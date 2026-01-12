import { useFormik } from "formik";
import * as Yup from "yup";

import { useState } from "react";

import Select from "react-select";
import classNames from "classnames";

import GetInputClassNames from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/GetInputClassNames/GetInputClassNames";
import NumberInput from "@/Dashboard/Shared/NumberInput/NumberInput";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import FileUploader from "@/Dashboard/Shared/FileUploader/FileUploader";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FullRoutes } from "@/Routes/routes";
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";
import React from "react";
const FormAddMedicalInsurance = () => {
 const insuranceClassOption = [
  { value: "USD", label: "دولار أمريكي" },
  { value: "EUR", label: "يورو" },
  { value: "SAR", label: <Saudiriyal /> }, 
];

  const validationSchema = Yup.object().shape({
    insuranceNumber: Yup.string().required(" رقم التأمين مطلوب"),
    insuranceClass: Yup.object()
      .shape({
        value: Yup.string().required("فئة التأمين مطلوبة"),
      })
      .nullable()
      .required("فئة التأمين مطلوبة"),
    amount: Yup.string().required(" المبلغ مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      insuranceNumber: "",
      insuranceClass: null,
      amount: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      resetForm();
      toast.success("تم الحفظ بنجاح");
    },
  });

  const handleSelectChange = (selectedOption, name) => {
    formik.setFieldValue(name, selectedOption);
  };

  // NUMBER INPUT
  const [number1, setNumber1] = useState(1);

  const handleNumber1Change = (newValue) => {
    setNumber1(newValue);
  };

  // FILE UPLOAD
  const handleFileUpload = (incomingFiles) => {
    formik.setFieldValue("files", incomingFiles);
  };

  // State  the selected option
  const [selectedOption, setSelectedOption] = useState(null);

  // Options array to map over
  const options = [
    { id: "yes", label: "نعم" },
    { id: "no", label: "لا" },
  ];

  const navigate = useNavigate();

  const cancelAdd = () => {
    toast.success("تم الالغاء بنجاح.");
    navigate(FullRoutes.Dashboard.StaffManagement.All);
  };
  return (
    <div className="form-medical-insurance border-width-content mt-5">
      <form onSubmit={formik.handleSubmit}>
        <div className="main-form-content flex flex-col sm:grid sm:grid-cols-2 gap-4">
          {/* ==================== START INPUT FORM  =================== */}
          <div className={`form-one-step`}>
            <label className="label-text">رقم التأمين</label>
            <input
              type="number"
              name="insuranceNumber"
              className={GetInputClassNames(formik, "insuranceNumber")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.insuranceNumber}
              placeholder="رقم التأمين"
              onWheel={(e) => e.target.blur()}
            />
            {formik.touched.insuranceNumber &&
              formik.errors.insuranceNumber && (
                <div className="error-text">
                  {formik.errors.insuranceNumber}
                </div>
              )}
          </div>
          {/* ==================== END INPUT FORM  =================== */}

          {/* =================== START SELECT BOX ================= */}
          <div className="form-one-step">
            <label htmlFor="insuranceClass" className="label-text">
              فئة التأمين
            </label>
            <Select
              options={insuranceClassOption}
              onChange={(option) =>
                handleSelectChange(option, "insuranceClass")
              }
              placeholder="-إختر-"
              className={classNames("main-select-box mt-1", {
                active:
                  formik.touched.insuranceClass && formik.errors.insuranceClass,
                "active-border": formik.values.insuranceClass,
              })}
              classNamePrefix="select"
              isSearchable={false}
              value={formik.values.insuranceClass}
            />
            {formik.touched.insuranceClass && formik.errors.insuranceClass && (
              <div className="error-text">
                {formik.errors.insuranceClass.message}
              </div>
            )}
          </div>
          {/* =================== END SELECT BOX ================= */}

          {/* =================== START INPUT NUMBER ================ */}
          <NumberInput
            textLabel="عدد الأفراد"
            initialValue={number1}
            min={1}
            step={1}
            onChange={handleNumber1Change}
          />
          {/* =================== END INPUT NUMBER ================ */}
          {/* ==================== START INPUT FORM  =================== */}
          <div className={`form-one-step`}>
            <label className="label-text">المبلغ</label>
            <input
              type="number"
              name="amount"
              className={GetInputClassNames(formik, "amount")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
              placeholder="المبلغ"
              onWheel={(e) => e.target.blur()}
            />
            {formik.touched.amount && formik.errors.amount && (
              <div className="error-text">{formik.errors.amount}</div>
            )}
          </div>
          {/* ==================== END INPUT FORM  =================== */}

          {/* ==================== START DATE INPUT ================== */}
          <div className="input-one-details">
            <DatePickerComponent label="تاريخ البداية" />
          </div>
          {/* ==================== END DATE INPUT ================== */}
          {/* ==================== START DATE INPUT ================== */}
          <div className="input-one-details">
            <DatePickerComponent label="تاريخ النهاية" />
          </div>
          {/* ==================== END DATE INPUT ================== */}
          {/* ================= START CONTENT CHECKED DETAILS ================= */}
          <div className="content-cheked-details my-4">
            <h2 className="title text-font-gray mb-4">يوجد تأمين طبي</h2>
            <div className="all-buttons-checked flex items-center gap-3">
              {options.map((option) => (
                <div key={option.id}>
                  <input
                    type="radio"
                    id={option.id}
                    name="yesNo"
                    value={option.id}
                    checked={selectedOption === option.id}
                    onChange={() => setSelectedOption(option.id)}
                    className="hidden"
                  />
                  <label
                    htmlFor={option.id}
                    onClick={() => setSelectedOption(option.id)}
                    className={`cursor-pointer py-2 px-4 rounded-lg ${
                      selectedOption === option.id
                        ? "bg-lightColorblue border border-primaryColor_01 text-primaryColor_01 "
                        : " border  border-gray-300 text-primaryColor_02"
                    }`}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* ================= END CONTENT CHECKED DETAILS ================= */}

          <div className="col-span-2">
            <FileUploader
              textLabel="ملف مرفق"
              onFileUpload={handleFileUpload}
            />
          </div>
        </div>
        <ButtonsFormSendCancel
          cancelAdd={cancelAdd}
          submitButton={formik.handleSubmit}
        />
      </form>
    </div>
  );
};

export default FormAddMedicalInsurance;
