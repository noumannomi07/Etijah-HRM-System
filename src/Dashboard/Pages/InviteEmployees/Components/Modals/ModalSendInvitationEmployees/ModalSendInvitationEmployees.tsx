import PropTypes from "prop-types";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import IconInvitation from "./IconInvitation";
import SuccessSend from "@/Dashboard/Shared/SuccessSend/SuccessSend";
import { useState } from "react";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { toast } from "react-toastify";

const ModalSendInvitationEmployees = ({
  openModalSendInvite,
  hiddenModalSendInvite
}) => {
  const [openSuccess, setOpenSuccess] = useState(false);

  const handleOpenSuccess = () => {
    setOpenSuccess(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };


  const toastSuccess = () => {
    hiddenModalSendInvite();
    handleOpenSuccess();
  };


  const handleSendInvitation = () => {
    console.log("Send invitation");

  axiosInstance.post(endpoints.invitation.create)
    .then((res) => {
  
    })
    .catch((error) => {
      toast.error("حدث خطأ ما أثناء إرسال الدعوة");
      console.error("Error sending invitations:", error);
    }).finally(() => {
      hiddenModalSendInvite();
      toastSuccess();
    });
  };

  return (
    <>
      <SuccessSend
        openSuccess={openSuccess}
        hiddenModalSuccess={handleCloseSuccess}
        textTitleTop="تم إرسال الدعوة بنجاح"
        textInfoModal="تم إرسال الدعوة بنجاح!"
      />

      <CustomModal
        newClassModal={"modal-delete small-modal"}
        isOpen={openModalSendInvite}
        handleOpen={hiddenModalSendInvite}
        titleModal={
          <>
            <IconInvitation />
          </>
        }
        classBodyContent={""}
      >
        <div className="content-delete-modal">
          <h2 className="title text-font-dark text-[15px] sm:text-[17px]">
            إرسال الدعوة للموظفين ؟
          </h2>
          <p className="text text-font-gray text-[14px] sm:text-[15px] pt-2">
            بالضغط على موافق سيتم إرسال ادعوة إلى جميع الموظفين
          </p>
          <div className="all-buttons-modal-bottom item-center-flex justify-end w-full  mt-3">
            <button
              onClick={handleSendInvitation}
              className="btn-main height--50 w-full sm:w-auto"
            >
              نعم , إرسال
            </button>
            <button
              onClick={hiddenModalSendInvite}
              className="button-transparent height--50 w-full sm:w-auto"
            >
              لا , رجوع
            </button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};

ModalSendInvitationEmployees.propTypes = {
  openModalSendInvite: PropTypes.bool.isRequired,
  hiddenModalSendInvite: PropTypes.func.isRequired
};

export default ModalSendInvitationEmployees;
