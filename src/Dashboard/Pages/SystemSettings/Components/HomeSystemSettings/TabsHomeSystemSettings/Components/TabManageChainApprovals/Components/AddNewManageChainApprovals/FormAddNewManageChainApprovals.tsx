import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { FullRoutes } from "@/Routes/routes";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const FormAddNewManageChainApprovals = () => {
  const options = {
    users: [
      { value: "1", label: "المستخدم 1" },
      { value: "2", label: "المستخدم 2" },
    ],
    typeOrder: [
      { value: "1", label: "نوع الطلب 1" },
      { value: "2", label: "نوع الطلب 2" },
    ],
    levelOne: [
      { value: "1", label: "المستوى الأول - خيار 1" },
      { value: "2", label: "المستوى الأول - خيار 2" },
    ],
    levelTwo: [
      { value: "1", label: "المستوى الثاني - خيار 1" },
      { value: "2", label: "المستوى الثاني - خيار 2" },
    ],
    levelThree: [
      { value: "1", label: "المستوى الثالث - خيار 1" },
      { value: "2", label: "المستوى الثالث - خيار 2" },
    ],
  };

  const initialValues = {
    users: "",
    typeOrder: "",
    levelOne: "",
    levelTwo: "",
    levelThree: "",
  };
  const validationSchema = Yup.object({
    users: Yup.string().required("يرجى اختيار مستخدم"),
    typeOrder: Yup.string().required("يرجى اختيار نوع الطلب"),
    levelOne: Yup.string().required("يرجى اختيار خيار للمستوى الأول"),
    levelTwo: Yup.string().required("يرجى اختيار خيار للمستوى الثاني"),
    levelThree: Yup.string().required("يرجى اختيار خيار للمستوى الثالث"),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      nameExpense: true,
    });

    toast.success("تم إضافة الطلب بنجاح!");
    resetForm();
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
        {({ handleSubmit, setFieldValue, errors, touched }) => (
          <Form>
            <div className="all-forms-grid grid-cards-2">
              <Field name="users">
                {({ field }) => (
                  <SelectBox
                    isShowLabel={true}
                    label="المستخدمين"
                    options={options.users}
                    onChange={(option) => setFieldValue("users", option)}
                    placeholder="-إختر-"
                    isSearchable={false}
                    isMulti={false}
                    field={field}
                    error={touched.users && errors.users}
                  />
                )}
              </Field>

              <Field name="typeOrder">
                {({ field }) => (
                  <SelectBox
                    isShowLabel={true}
                    label="نوع الطلب"
                    options={options.typeOrder}
                    onChange={(option) => setFieldValue("typeOrder", option)}
                    placeholder="-إختر-"
                    isSearchable={false}
                    isMulti={false}
                    field={field}
                    error={touched.typeOrder && errors.typeOrder}
                  />
                )}
              </Field>

              <Field name="levelOne">
                {({ field }) => (
                  <SelectBox
                    isShowLabel={true}
                    label="المستوى الأول"
                    options={options.levelOne}
                    onChange={(option) => setFieldValue("levelOne", option)}
                    placeholder="-إختر-"
                    isSearchable={false}
                    isMulti={false}
                    field={field}
                    error={touched.levelOne && errors.levelOne}
                  />
                )}
              </Field>

              <Field name="levelTwo">
                {({ field }) => (
                  <SelectBox
                    isShowLabel={true}
                    label="المستوى الثاني"
                    options={options.levelTwo}
                    onChange={(option) => setFieldValue("levelTwo", option)}
                    placeholder="-إختر-"
                    isSearchable={false}
                    isMulti={false}
                    field={field}
                    error={touched.levelTwo && errors.levelTwo}
                  />
                )}
              </Field>

              <div className="sm:col-span-1 md:col-span-2">
                <Field name="levelThree">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label="المستوى الثالث"
                      options={options.levelThree}
                      onChange={(option) => setFieldValue("levelThree", option)}
                      placeholder="-إختر-"
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.levelThree && errors.levelThree}
                    />
                  )}
                </Field>
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

export default FormAddNewManageChainApprovals;
