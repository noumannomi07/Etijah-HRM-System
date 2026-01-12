import * as Yup from "yup";
import PropTypes from "prop-types";
import TabModalShared from "../../../Shared/TabModalShared/TabModalShared";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import InputField from "@/Dashboard/Shared/Forms/InputField";

const ModalProjectManagementSettings = ({ modalOpen, hideModal }) => {
  return (
    <TabModalShared
      open={modalOpen}
      hiddenModal={hideModal}
      initialValues={{ projectName: "" }}
      validationSchema={Yup.object({
        projectName: Yup.string().required("مطلوب أسم المشروع")
      })}
    >
      {({ errors, touched }) =>
        <div className="all-forms-grid grid-cards-2">
          <div className="input-one-details">
            <InputField
              isShowLabel={true}
              label={"أسم المشروع"}
              name={"projectName"}
              type={"text"}
              placeholder={"أسم المشروع"}
              success
              error={touched.projectName && errors.projectName}
            />
          </div>
          <DatePickerComponent label="التاريخ" addTextPlaceHolder="--/--/--" />
        </div>}
    </TabModalShared>
  );
};
ModalProjectManagementSettings.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired
};

export default ModalProjectManagementSettings;
