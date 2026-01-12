import * as Yup from "yup";

import PropTypes from "prop-types";
import TabModalShared from "../../../Shared/TabModalShared/TabModalShared";
import InputField from "@/Dashboard/Shared/Forms/InputField";

const ModalCurrencyManagement = ({ modalOpen, hideModal }) => {
  return (
    <TabModalShared
      open={modalOpen}
      hiddenModal={hideModal}
      initialValues={{ currencyName: "" }}
      validationSchema={Yup.object({
        currencyName: Yup.string().required("إسم العملة مطلوب")
      })}
    >
      {({}) => (
        <>
          <div className="input-one-details w-full">
            <InputField
              isShowLabel={true}
              label={"إسم العملة"}
              name={"currencyName"}
              type={"text"}
              placeholder={"إسم العملة"}
              success
            />
          </div>
        </>
      )}
    </TabModalShared>
  );
};
ModalCurrencyManagement.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired
};

export default ModalCurrencyManagement;
