import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Field, Form, Formik } from "formik";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import AllCardsContent from "./AllCardsContent";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

const ContentInfoNewPermisssion = () => {
  const { t } = useTranslation("systemSettings");
  
  const initialValues = {
    validityName: "",
    validityNameEn: "",
    users: null,
  };

  const options = {
    users: [
      { value: "user1", label: "User 1" },
      { value: "user2", label: "User 2" },
      { value: "user3", label: "User 3" },
    ],
  };

  const validationSchema = Yup.object({
    validityName: Yup.string()
      .required(t("permissionsAndTasks.validityNameRequired"))
      .matches(/^[\u0621-\u064A\s]+$/, t("permissionsAndTasks.arabicOnlyError")),
    validityNameEn: Yup.string()
      .required(t("permissionsAndTasks.validityNameEnglishRequired"))
      .matches(/^[A-Za-z\s]+$/, t("permissionsAndTasks.englishOnlyError")),

    users: Yup.array()
      .min(1, t("permissionsAndTasks.usersMinError"))
      .required(t("permissionsAndTasks.usersRequired")),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      validityName: true,
      validityNameEn: true,
      users: true,
    });

    toast.success(t("messages.successAdd"));
    resetForm();
  };

  const navigate = useNavigate();
  const cancelAdd = () => {
    toast.success(t("messages.cancelSuccess"));
    navigate(FullRoutes.Dashboard.SystemSettings.All);
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
                  label="إسم الصلاحية باللغة العربية"
                  name="validityName"
                  type="text"
                  placeholder="إسم الصلاحية باللغة العربية"
                  success
                  error={touched.validityName && errors.validityName}
                />
              </div>
              <div className="input-one-details">
                <InputField
                  isShowLabel={true}
                  label="إسم الصلاحية باللغة الإنجليزية"
                  name="validityNameEn"
                  type="text"
                  placeholder="إسم الصلاحية باللغة الإنجليزية"
                  success
                  error={touched.validityNameEn && errors.validityNameEn}
                />
              </div>

              <div className="input-one-details col-span-1 sm:col-span-2">
                <Field name="users">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label="المستخدمين"
                      options={options.users}
                      onChange={(option) => setFieldValue("users", option)}
                      placeholder="-إختر-"
                      isSearchable={false}
                      isMulti={true}
                      field={field}
                      error={touched.users && errors.users}
                    />
                  )}
                </Field>
              </div>
            </div>
            <div className="mt-4">
              <AllCardsContent />
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

export default ContentInfoNewPermisssion;
