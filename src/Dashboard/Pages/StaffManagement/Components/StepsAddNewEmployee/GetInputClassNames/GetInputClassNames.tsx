import classNames from "classnames";

const GetInputClassNames = (formik, name) => {
  return classNames("input-field-step outline-none shadow-none", {
    "error-border": formik.touched[name] && formik.errors[name],
    "active-border-success": !formik.errors[name] && formik.touched[name]
  });
};

export default GetInputClassNames;
