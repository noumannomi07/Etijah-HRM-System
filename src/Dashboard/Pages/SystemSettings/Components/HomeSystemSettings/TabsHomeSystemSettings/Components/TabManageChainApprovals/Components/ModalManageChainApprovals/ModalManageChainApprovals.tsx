import * as Yup from "yup";

import PropTypes from "prop-types";
import TabModalShared from "../../../Shared/TabModalShared/TabModalShared";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Field } from "formik";

const ModalManageChainApprovals = ({ modalOpen, hideModal }) => {
  const options = {
    typeOrder: [
      { value: "type1", label: "Type 1" },
      { value: "type2", label: "Type 2" }
    ]
  };
  return (
    <TabModalShared
      open={modalOpen}
      hiddenModal={hideModal}
      initialValues={{ typeOrder: null }}
      validationSchema={Yup.object({
        typeOrder: Yup.object().nullable().required("يجب اختيار العملة")
      })}
    >
      {({ setFieldValue, errors, touched }) => (
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
      )}
    </TabModalShared>
  );
};
ModalManageChainApprovals.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired
};

export default ModalManageChainApprovals;
