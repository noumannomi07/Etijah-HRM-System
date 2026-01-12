import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import TextAreaInput from "@/Dashboard/Shared/Forms/TextArea";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";

const ModalSendInvitationEmployee = ({
  openSendInvitationEmployee,
  hiddenModalSendInvitationEmployee,
}) => {
  const options = {
    nationality: [
      { value: "egypt", label: "مصر" },
      { value: "usa", label: "الولايات المتحدة الأمريكية" },
      { value: "canada", label: "كندا" },
    ],
    typePerson: [
      { value: "male", label: "ذكر" },
      { value: "female", label: "أنثى" },
    ],
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    nationality: null,
    typePerson: null,
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("الإسم الأول مطلوب"),
    lastName: Yup.string().required("إسم العائلة مطلوب"),
    nationality: Yup.object().nullable().required("الجنسية مطلوب"),
    typePerson: Yup.object().required("الجنس مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
    message: Yup.string()
      .required("هذا الحقل مطلوب")
      .min(5, "يجب أن يحتوي التعليق على 5 أحرف على الأقل")
      .max(500, "يجب ألا يتجاوز التعليق 500 حرفًا"),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({});

    toast.success("تم إضافة الطلب بنجاح!");
    resetForm();

    // HIDE MODAL IF SUCCESS SEND
    hiddenModalSendInvitationEmployee();
  };

  return (
    <CustomModal
      newClassModal={""}
      isOpen={openSendInvitationEmployee}
      handleOpen={hiddenModalSendInvitationEmployee}
      titleModal="دعوة موظف جديد "
      classBodyContent={""}
    >
      <div className="all-content-modal-filter">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue, errors, touched }) => (
            <Form>
              <div className="all-forms-grid grid-cards-2">
                <InputField
                  isShowLabel={true}
                  label="الإسم الأول"
                  name="firstName"
                  type="text"
                  placeholder="الإسم الأول"
                  success
                />
                <InputField
                  isShowLabel={true}
                  label="إسم العائلة"
                  name="lastName"
                  type="text"
                  placeholder="إسم العائلة"
                  success
                />

                <Field name="nationality">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label="الجنسية"
                      options={options.nationality}
                      onChange={(option) =>
                        setFieldValue("nationality", option)
                      }
                      placeholder="-إختر-"
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.nationality && errors.nationality}
                    />
                  )}
                </Field>

                <Field name="typePerson">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label="الجنس"
                      options={options.typePerson}
                      onChange={(option) => setFieldValue("typePerson", option)}
                      placeholder="-إختر-"
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.typePerson && errors.typePerson}
                    />
                  )}
                </Field>

                <div className="sm:col-span-1 md:col-span-2">
                  <InputField
                    isShowLabel={true}
                    label="البريد الإلكتروني"
                    name="email"
                    type="email"
                    placeholder="البريد الإلكتروني"
                    success
                  />
                </div>
                <div className="sm:col-span-1 md:col-span-2">
                  <TextAreaInput
                    isShowLabel={true}
                    label="الرسالة"
                    name="message"
                    type="text"
                    placeholder="الرسالة"
                    success
                  />
                </div>
              </div>

              <div className="main-buttons-modal flex justify-end items-end w-full gap-3 mt-5 flex-wrap">
                <button
                  className="button-transparent button-transparent-danger height--50 flex-grow basis-[140px] w-full sm:flex-grow-0 sm:basis-auto  sm:w-auto"
                  onClick={() => {
                    hiddenModalSendInvitationEmployee();
                  }}
                >
                  الغاء
                </button>
                <button
                  onClickCapture={() => {
                    handleSubmit();
                  }}
                  className="btn-main height--50 flex-grow basis-[140px] w-full sm:flex-grow-0 sm:basis-auto  sm:w-auto"
                >
                  ارسال الدعوة
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </CustomModal>
  );
};

ModalSendInvitationEmployee.propTypes = {
  openSendInvitationEmployee: PropTypes.bool.isRequired,
  hiddenModalSendInvitationEmployee: PropTypes.func.isRequired,
};

export default ModalSendInvitationEmployee;
