
import { Formik, Form } from "formik";
import PropTypes from "prop-types";

const FormField = ({ initialValues, validationSchema, onSubmit, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        {children}
      </Form>
    </Formik>
  );
};
FormField.propTypes = {
  initialValues: PropTypes.object.isRequired,
  validationSchema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default FormField;
