import * as Yup from "yup";

import PropTypes from "prop-types";
import TabModalShared from "../../../Shared/TabModalShared/TabModalShared";
import InputField from "@/Dashboard/Shared/Forms/InputField";

const ModalViolationsManagement = ({ modalOpen, hideModal }) => {
  return (
    <TabModalShared
      open={modalOpen}
      hiddenModal={hideModal}
      initialValues={{ nameViolation: "" }}
      validationSchema={Yup.object({
        nameViolation: Yup.string().required("إسم المخالفة مطلوب")
      })}
    >
      {({}) => (
        <>
          <div className="input-one-details w-full">
            <InputField
              isShowLabel={true}
              label={"إسم المخالفة"}
              name={"nameViolation"}
              type={"text"}
              placeholder={"إسم المخالفة"}
              success
            />
          </div>
        </>
      )}
    </TabModalShared>
  );
};
ModalViolationsManagement.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired
};

export default ModalViolationsManagement;
