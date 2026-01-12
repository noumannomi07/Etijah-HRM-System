import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import GetInputClassNames from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/GetInputClassNames/GetInputClassNames";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const ModalUserProfileEdit = ({ open, hiddenModal, initialValues, onSave }) => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("أسم المستخدم  مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صحيح")
      .required("البريد الإلكتروني مطلوب"),
    password: Yup.string()
      .min(8, "كلمة المرور يجب أن تكون على الأقل 8 أحرف")
      .required("كلمة المرور مطلوبة"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "كلمتا المرور غير متطابقتين")
      .required("تأكيد كلمة المرور مطلوب")
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const updatedValues = {
        firstName: values.firstName,
        email: values.email,
        password: values.password
      };
      onSave(updatedValues);
      resetForm();
      toast.success("تم التعديل بنجاح");
    }
  });

  // SHOW HIDE PASSWORD
  const [showPassword, setShowPassword] = useState(false);
  const [showRepassword, setShowRepassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRepasswordVisibility = () => setShowRepassword(!showRepassword);

  return (
    <CustomModal
      newClassModal={""}
      isOpen={open}
      handleOpen={hiddenModal}
      titleModal="تعديل المعلومات الشخصية"
      classBodyContent={""}
    >
      <div className="form-edit-info-user">
        <form onSubmit={formik.handleSubmit}>
          <div className="main-form-content grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ==================== START INPUT FORM  =================== */}
            <div className={`form-one-step`}>
              <label className="label-text">أسم المستخدم</label>
              <input
                type="text"
                name="firstName"
                className={GetInputClassNames(formik, "firstName")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                placeholder="أسم المستخدم"
                onWheel={(e) => e.target.blur()}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <div className="error-text">{formik.errors.firstName}</div>
              )}
            </div>
            {/* ==================== END INPUT FORM  =================== */}

            {/* ==================== START EMAIL INPUT FORM  =================== */}
            <div className={`form-one-step`}>
              <label className="label-text">البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                className={GetInputClassNames(formik, "email")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="البريد الإلكتروني"
                onWheel={(e) => e.target.blur()}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error-text">{formik.errors.email}</div>
              )}
            </div>
            {/* ==================== END EMAIL INPUT FORM  =================== */}

            {/* ==================== START PASSWORD INPUT FORM  =================== */}
            <div className="input-pass relative">
              <div
                className={`form-one-step relative ${
                  (formik.touched.password && formik.errors.password) ||
                  (formik.touched.confirmPassword &&
                    formik.errors.confirmPassword)
                    ? "has-error"
                    : ""
                }`}
              >
                <label className="label-text">كلمة المرور</label>
                <input
                  type="password"
                  name="password"
                  className={GetInputClassNames(formik, "password")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="كلمة المرور"
                  onWheel={(e) => e.target.blur()}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="error-text">{formik.errors.password}</div>
                )}
              </div>
              <button
                className="icon-eye-button"
                onClick={togglePasswordVisibility}
                type="button"
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            </div>
            {/* ==================== END PASSWORD INPUT FORM  =================== */}

            {/* ==================== START CONFIRM PASSWORD INPUT FORM  =================== */}
            <div className="input-pass relative">
              <div
                className={`form-one-step relative ${
                  (formik.touched.password && formik.errors.password) ||
                  (formik.touched.confirmPassword &&
                    formik.errors.confirmPassword)
                    ? "has-error"
                    : ""
                }`}
              >
                <label className="label-text">تأكيد كلمة المرور</label>
                <input
                  type={showRepassword ? "text" : "password"}
                  name="confirmPassword"
                  className={GetInputClassNames(formik, "confirmPassword")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  placeholder="تأكيد كلمة المرور"
                  onWheel={(e) => e.target.blur()}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <div className="error-text">
                      {formik.errors.confirmPassword}
                    </div>
                  )}
              </div>
              <button
                className="icon-eye-button"
                onClick={toggleRepasswordVisibility}
                type="button"
              >
                {showRepassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </button>
            </div>
            {/* ==================== END CONFIRM PASSWORD INPUT FORM  =================== */}
          </div>

          <div className="buttons-modal justify-end mt-5 item-center-flex w-full flex-nowrap">
            <button
              type="button"
              onClick={() => {
                hiddenModal();
              }}
              className="button-transparent button-transparent-danger height--50   w-full sm:w-auto"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="btn-main height--50 w-full sm:w-auto"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </CustomModal>
  );
};
ModalUserProfileEdit.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    firstName: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    confirmPassword: PropTypes.string
  }).isRequired,
  onSave: PropTypes.func.isRequired
};
export default ModalUserProfileEdit;
