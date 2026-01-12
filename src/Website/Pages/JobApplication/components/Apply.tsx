import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/utils/axios";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface ApplicationFormData {
  job_id: string;
  name: string;
  phone: string;
  email: string;
  cv: File | null;
  job_title: string;
  job_type: string;
  experience: string;
  education: string;
  skills: string;
  address: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  phone: Yup.string()
    .required("Phone number is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  cv: Yup.mixed<File>()
    .required("CV is required")
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return true;
      return (value as File).size <= 5 * 1024 * 1024;
    })
    .test(
      "fileType",
      "Only PDF, DOC, image, and DOCX files are allowed",
      (value) => {
        if (!value) return true;
        return [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/bmp",
          "image/tiff",
          "image/webp"
        ].includes((value as File).type);
      }
    ),
  job_title: Yup.string(),
  job_type: Yup.string(),
  experience: Yup.string(),
  education: Yup.string(),
  skills: Yup.string(),
  address: Yup.string()
});

const initialValues: ApplicationFormData = {
  job_id: "",
  name: "",
  phone: "",
  email: "",
  cv: null,
  job_title: "",
  job_type: "",
  experience: "",
  education: "",
  skills: "",
  address: ""
};

const JobApplicationApply = ({
  setActiveTab,
  job
}: {
  setActiveTab: (tab: string) => void;
  job: any;
}) => {
  const { t } = useTranslation("jobApplication");
  const navigate = useNavigate();

  const handleSubmit = async (
    values: ApplicationFormData,
    {
      resetForm,
      setSubmitting,
      setErrors
    }: {
      resetForm: (values: ApplicationFormData) => void;
      setSubmitting: (isSubmitting: boolean) => void;
      setErrors: (errors: any) => void;
    }
  ) => {
    try {
      const formDataToSend = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== null) {
          if (key === "job_id") {
            formDataToSend.append(key, job.link);
          } else if (key == "terms") {
          } else {
            formDataToSend.append(key, value);
          }
        }
      });

      await axiosInstance.post(
        "https://backend.etijah.sa/website/job-apply",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      resetForm(initialValues);
      toast.success(t("jobApplication.applySuccess"));
      navigate("/");
    } catch (error: any) {
      setErrors(error.response?.data?.errors || {});
      toast.error(
        error.response?.data?.message || t("jobApplication.applyError")
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-full md:max-w-[656px] w-full md:w-[80%] mx-auto bg-white border border-[#eaecf0] rounded-[12px] p-[32px] shadow-[0_0_0_0_transparent]">
      <h3 className="text-xl text-gray-900 font-medium mb-6">
        {t("jobApplication.jobTitle")}
      </h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-6">
            {/* Personal Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[15px] font-medium text-darkColor mb-1"
                >
                  {t("jobApplication.fullName")}{" "}
                  <span className="text-red-600 text-[20px]">*</span>
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-[15px] font-medium text-darkColor mb-1"
                >
                  {t("jobApplication.phoneNumber")}{" "}
                  <span className="text-red-600 text-[20px]">*</span>
                </label>
                <div className="flex">
                  <span className="hidden items-center px-3 text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md rtl:rounded-l-none rtl:rounded-r-md">
                    +20
                  </span>
                  <Field
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-r-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-[15px] font-medium text-darkColor mb-1"
                >
                  {t("jobApplication.email")}{" "}
                  <span className="text-red-600 text-[20px]">*</span>
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-[15px] font-medium text-darkColor mb-1"
                >
                  {t("jobApplication.address")}{" "}
                  <span className="text-red-600 text-[20px]">*</span>
                </label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Professional Information Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="block text-[17px] font-bold text-primaryColor mb-3">
                {t("jobApplication.professionalInformation")}
              </h3>

              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="job_title"
                    className="block text-[15px] font-medium text-darkColor mb-1"
                  >
                    {t("jobApplication.jobTitle")}{" "}
                    <span className="text-red-600 text-[20px]">*</span>
                  </label>
                  <Field
                    type="text"
                    id="job_title"
                    name="job_title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="job_title"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="job_type"
                    className="block text-[15px] font-medium text-darkColor mb-1"
                  >
                    {t("jobApplication.jobType")}{" "}
                    <span className="text-red-600 text-[20px]">*</span>
                  </label>
                  <Field
                    as="select"
                    id="job_type"
                    name="job_type"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">
                      {t("jobApplication.selectJobType")}
                    </option>
                    <option value="inhouse">
                      {t("jobApplication.inHouse")}
                    </option>
                    <option value="remote">{t("jobApplication.remote")}</option>
                    <option value="hybrid">{t("jobApplication.hybrid")}</option>
                  </Field>
                  <ErrorMessage
                    name="job_type"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div> */}

              <div className="grid grid-cols-1 gap-6 mt-6">
                <div>
                  <label
                    htmlFor="experience"
                    className="block text-[15px] font-medium text-darkColor mb-1"
                  >
                    {t("jobApplication.experience")}{" "}
                    {/* <span className="text-red-600 text-[20px]">*</span> */}
                  </label>
                  <Field
                    as="textarea"
                    id="experience"
                    name="experience"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder={t("jobApplication.experiencePlaceholder")}
                  />
                  <ErrorMessage
                    name="experience"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label
                    htmlFor="education"
                    className="block text-[15px] font-medium text-darkColor mb-1"
                  >
                    {t("jobApplication.education")}{" "}
                    {/* <span className="text-red-600 text-[20px]">*</span> */}
                  </label>
                  <Field
                    type="text"
                    id="education"
                    name="education"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="education"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="skills"
                    className="block text-[15px] font-medium text-darkColor mb-1"
                  >
                    {t("jobApplication.skills")}{" "}
                    {/* <span className="text-red-600 text-[20px]">*</span> */}
                  </label>
                  <Field
                    type="text"
                    id="skills"
                    name="skills"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="List your key skills"
                  />
                  <ErrorMessage
                    name="skills"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Resume Upload Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="block text-[17px] font-bold text-primaryColor mb-3">
                {t("jobApplication.uploadCV")}
              </h3>
              <div>
                <label
                  htmlFor="cv"
                  className="block text-[15px] font-medium text-darkColor mb-1"
                >
                  {t("jobApplication.uploadCV")}{" "}
                  <span className="text-red-600 text-[20px]">*</span>
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="text-sm text-gray-500 mt-2">
                        <span className="font-semibold">
                          {t("jobApplication.clickToUpload")}
                        </span>{" "}
                        {t("jobApplication.orDragAndDrop")}
                      </p>
                      <p className="text-xs text-gray-500">
                        {values.cv
                          ? values.cv.name
                          : "PDF, DOC, DOCX (Max. 5MB)"}
                      </p>
                    </div>
                    <input
                      id="cv"
                      name="cv"
                      type="file"
                      className="hidden"
                      onChange={(event) => {
                        if (event.currentTarget.files) {
                          setFieldValue("cv", event.currentTarget.files[0]);
                        }
                      }}
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                </div>
                <ErrorMessage
                  name="cv"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Terms and Submit */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className=" cursor-pointer mb-6 flex items-center gap-3">
                <Field
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-[15px] font-medium text-darkColor mb-1"
                >
                  {t("jobApplication.confirmInformation")}
                </label>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  className="!px-[25px] btn-main  button-danger"
                  onClick={() => setActiveTab("overview")}
                >
                  {t("jobApplication.back")}
                </button>
                <button
                  type="submit"
                  className="px-6  border border-transparent rounded-md shadow-sm text-sm font-medium text-white btn-main  disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("jobApplication.submitting")
                    : t("jobApplication.submitApplication")}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobApplicationApply;
