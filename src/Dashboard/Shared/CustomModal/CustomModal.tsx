import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import "./CustomModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./CustomModal.css";
import PropTypes from "prop-types";
import React from "react";

interface CustomModalProps {
  newClassModal?: string;
  isOpen: boolean;
  handleOpen: () => void;
  titleModal: React.ReactNode;
  classBodyContent?: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({
  newClassModal,
  isOpen,
  handleOpen,
  titleModal,
  classBodyContent,
  children,
  ...props
}) => {
  return (
    <Dialog
      className={`shadow-none outline-none ${newClassModal}`}
      open={isOpen}
      handler={handleOpen}
      {...props}
    >
      <DialogHeader className="flex justify-between items-center border-b !p-[10px_15px]">
        <div className="title w-full text-font-dark title-modal-header">
          {titleModal}
        </div>
        <div
          className="btn-close-icon border cursor-pointer p-[12px_15px] flex justify-center items-center rounded-[8px] text-[16px] transition-all duration-500 hover:bg-primaryColor hover:border-primaryColor hover:text-whiteColor"
          onClick={handleOpen}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </DialogHeader>
      <DialogBody className={`body-content-modal ${classBodyContent}`}>
        {children}
      </DialogBody>
    </Dialog>
  );
};

CustomModal.propTypes = {
  newClassModal: PropTypes.string,
  classBodyContent: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
  titleModal: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
};

export default CustomModal;
