import InputField from "@/Dashboard/Shared/Forms/InputField";
import * as Yup from "yup";
import TabModalShared from "../Shared/TabModalShared/TabModalShared";
import PropTypes from "prop-types";
const ModalTabManage = ({ modalOpen, hideModal }) => {
  return (
    <TabModalShared
      open={modalOpen}
      hiddenModal={hideModal}
      initialValues={{ validityName: "" }}
      validationSchema={Yup.object({
        validityName: Yup.string().required("إسم الصلاحية مطلوب")
      })}
    >
      {({}) => (
        <>
          <div className="input-one-details w-full">
            <InputField
              isShowLabel={true}
              label={"إسم الصلاحية"}
              name={"validityName"}
              type={"text"}
              placeholder={"إسم الصلاحية"}
              success
            />
          </div>
        </>
      )}
    </TabModalShared>
  );
};
ModalTabManage.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired
};

export default ModalTabManage;
