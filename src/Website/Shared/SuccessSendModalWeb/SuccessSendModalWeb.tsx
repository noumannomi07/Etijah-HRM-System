import Lottie from "lottie-react";
import animationSuccess from "@assets/images/animation/success2.json";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";

const SuccessSendModalWeb = ({
  openSuccessSendModalWeb,
  hiddenModalSuccessSendModalWeb,
  titleDetails,
  textDetails,
  modalTitle,
  buttonText,
  toastMessage,
  children
}) => {
  
  // LOADER BUTTON
  const [loader, setLoader] = useState(false);

  const toastSuccess = () => {
    setLoader(true); // ADD ACTIVE FOR LOADER
    setTimeout(() => {
      // AFTER 800MS ADD FALSE TO LOADER AND ADD TOAST SUCCESS TO SEND AND HIDDEN MODAL
      setLoader(false);
      toast.success(toastMessage);
      hiddenModalSuccessSendModalWeb();
    }, 800);
  };

  return (
    <CustomModal
      newClassModal={"modal-success-info medium-modal"}
      isOpen={openSuccessSendModalWeb}
      handleOpen={hiddenModalSuccessSendModalWeb}
      titleModal={modalTitle}
      classBodyContent={""}
    >
      <div className="success-send-modal pt-4 pb-2 flex flex-col gap-3 justify-center items-center w-full text-center">
        <div className="success-anim w-[200px] h-[120px]  mb-[50px] mt-[-50px]">
          <Lottie animationData={animationSuccess} />
        </div>
        <div className="bottom-content w-full">
          <h2 className="title text-font-dark text-[17px] sm:text-[20px] mb-3">
            {titleDetails}
          </h2>
          <p className="text-title text-font-dark text-[13px] sm:text-[15px] mb-3">
            {textDetails}
          </p>
          {children}

          <button
            onClick={toastSuccess}
            className=" btn-blue-01 rounded-[12px] w-full mt-4"
          >
            {loader ? <SpinnerLoader /> : buttonText}
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

SuccessSendModalWeb.propTypes = {
  openSuccessSendModalWeb: PropTypes.bool.isRequired,
  hiddenModalSuccessSendModalWeb: PropTypes.func.isRequired,
  titleDetails: PropTypes.string.isRequired,
  textDetails: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  toastMessage: PropTypes.string.isRequired,
  children: PropTypes.node
};
export default SuccessSendModalWeb;
