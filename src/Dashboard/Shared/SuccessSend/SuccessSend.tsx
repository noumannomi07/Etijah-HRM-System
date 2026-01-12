import React from "react";
import Lottie from "lottie-react";
import animationSuccess from "@assets/images/animation/success2.json";
import CustomModal from "../CustomModal/CustomModal";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import { useTranslation } from "react-i18next";

interface SuccessSendProps {
  newClassModal: string;
  openSuccess: boolean;
  hiddenModalSuccess: () => void;
  textTitleTop: string;
  textInfoModal: string;
  children?: React.ReactNode;
}

interface CustomModalProps {
  newClassModal: string;
  isOpen: boolean;
  handleOpen: () => void;
  titleModal: string;
  classBodyContent: string;
  children?: React.ReactNode;
}

const SuccessSend: React.FC<SuccessSendProps> = ({
  newClassModal,
  openSuccess,
  hiddenModalSuccess,
  textTitleTop,
  textInfoModal,
  children
}) => {
  const { t } = useTranslation("common");

  // LOADER BUTTON
  const [loader, setLoader] = useState(false);

  const toastSuccess = () => {
    setLoader(true); // ADD ACTIVE FOR LOADER
    setTimeout(() => {
      // AFTER 800MS ADD FALSE TO LOADER AND ADD TOAST SUCCESS TO SEND AND HIDDEN MODAL
      setLoader(false);
      toast.success(t("toasts.operationSuccess"));
      hiddenModalSuccess();
    }, 800);
  };

  return (
    <CustomModal
      newClassModal={`modal-success-info small-modal ${newClassModal}`}
      isOpen={openSuccess}
      handleOpen={hiddenModalSuccess}
      titleModal={textTitleTop}
      classBodyContent={""}
    >
      <div className="success-send-modal pt-4 pb-2 flex flex-col gap-3 justify-center items-center w-full text-center">
        <div className="success-anim w-[200px] h-[120px] mb-[50px] mt-[-50px]">
          <Lottie animationData={animationSuccess} />
        </div>
        <div className="bottom-content w-full">
          <h2 className="title text-font-dark mb-3">{textInfoModal}</h2>
          <button onClick={toastSuccess} className="btn-main w-full">
            {loader ? <SpinnerLoader /> : t("common.buttons.ok")}
          </button>
        </div>
        {children}
      </div>
    </CustomModal>
  );
};

SuccessSend.propTypes = {
  newClassModal: PropTypes.string.isRequired,
  openSuccess: PropTypes.bool.isRequired,
  hiddenModalSuccess: PropTypes.func.isRequired,
  textTitleTop: PropTypes.string.isRequired,
  textInfoModal: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default SuccessSend;
