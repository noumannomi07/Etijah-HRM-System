import PropTypes from "prop-types";
import ModalDelete from "../ModalDelete/ModalDelete";

const ModalDeleteEmployeeSystemPermanently = ({
  openModalDelete,
  hiddenModalDelete,
  onDelete,
  titleModal = "حذف الوردية من النظام نهائيا ؟",
  textModal = "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى.",
}) => {
  return (
    <ModalDelete
      openModalDelete={openModalDelete}
      hiddenModalDelete={hiddenModalDelete}
      titleModal={titleModal}
      textModal={textModal}
      onDelete={onDelete}
    />
  );
};
ModalDeleteEmployeeSystemPermanently.propTypes = {
  openModalDelete: PropTypes.bool.isRequired,
  hiddenModalDelete: PropTypes.func.isRequired,
  titleModal: PropTypes.string,
  textModal: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
};
export default ModalDeleteEmployeeSystemPermanently;
