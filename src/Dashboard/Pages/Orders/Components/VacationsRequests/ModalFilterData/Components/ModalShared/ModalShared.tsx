import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import PropTypes from "prop-types";

const ModalShared = ({ titleModal = "تصفية", open, hiddenModal, children }) => {
  return (
    <CustomModal
      newClassModal={""}
      isOpen={open}
      handleOpen={hiddenModal}
      titleModal={titleModal}
      classBodyContent={""}
    >
      {children}
    </CustomModal>
  );
};

ModalShared.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  titleModal: PropTypes.string.isRequired
};

export default ModalShared;
