
 
import { useEffect, useState } from "react";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import SuccessSend from "@/Dashboard/Shared/SuccessSend/SuccessSend";
import ModalSendInvitationEmployees from "../Modals/ModalSendInvitationEmployees/ModalSendInvitationEmployees";
import ModalFilterInviteEmployees from "../Modals/ModalFilterInviteEmployees/ModalFilterInviteEmployees";
import ModalSendInvitationEmployee from "../Modals/ModalSendInvitationEmployee/ModalSendInvitationEmployee";
import "./TableInviteEmployees.css"
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
const TableInviteEmployees = () => {
  const [openSuccess, setOpenSuccess] = useState(false);

  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get(endpoints.invitation.all)
    .then((res) => {
      setInvitations(res.data.data);
    })
    .catch((error) => {
      console.error("Error fetching invitations:", error);
    })
    .finally(() => {
      setLoading(false);
    });

  }, []);
 
  const handleOpenSuccess = () => {
    setOpenSuccess(true);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  };

  const handleRowSelection = (selectedIndices: number[]) => {
    console.log("Selected indices:", selectedIndices);
  };




  // SHOW MODAL INVITE EMPLOYEES
  const [openModalSendInvite, setOpenModalSendInvite] = useState(false);

  const handleOpenModalSendInvite = () => setOpenModalSendInvite(true);

  const hideModalSendInvite = () => setOpenModalSendInvite(false);

  // SHOW MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  // SHOW MODAL SEND INVITATION
  const [openSendInvitation, setOpenSendInvitation] = useState(false);
  const handleOpenSendInvitationEmployee = () => setOpenSendInvitation(true);
  const hiddenSendInvitationEmployee = () => setOpenSendInvitation(false);

  const sendInvitationToAll = () => {
    
    setOpenModalSendInvite(true);

  }

  const sendInvitationToEmployee = (id: number) => {

    axiosInstance.post(endpoints.invitation.onEmployee(id))
    .then((res) => {
     
    })
    .catch((error) => {
      console.error("Error sending invitation:", error);
    })
    .finally(() => {
      setOpenSuccess(true);
    })

  }



  const theadTrContent = [
    "الموظف",
    "البريد الإلكتروني",
    "القسم",
    "الحالة",
    "الإستجابة",
    ""
  ];
 
  // CONTENT OF ARRAY
  const tbodyContent = invitations.map((item) => [
    <div className="flex items-center gap-3" key={item.id}>
      <img
        src={item.image}
        className="rounded-[50px] !w-[40px] !h-[40px] border border-lightColorWhite2"
        alt="img user"
      />
      {item.name}
    </div>,
    item.email,
    item.category?.title,
    <div key={item.id} className={"status-primary"}>
      {(item.send_invite) ? "تم إرسال الدعوة" : "لم يتم إرسال الدعوة"}
    </div>,

    <div
      key={item.id}
      className={(item.invite_status)
        ? "status-success"
        : "status-danger"
      }
    >
      {(item.invite_status) ? "تم التسجيل" : "لم يتم التسجيل"}
    </div>,
    <button
      onClick={() => sendInvitationToEmployee(item.id)}
      key={item.id}
      className="btn-main button-green"
    >
      {" "}

      {item.send_invite ? "إعادة إرسال الدعوة" : "ارسال الدعوة"}
     
    </button>
  ]);

  return (
    <>
      <SuccessSend
        openSuccess={openSuccess}
        hiddenModalSuccess={handleCloseSuccess}
        textTitleTop="تم إرسال الدعوة بنجاح"
        textInfoModal="تم إرسال الدعوة بنجاح!"
      />

      <ModalSendInvitationEmployees
        openModalSendInvite={openModalSendInvite}
        hiddenModalSendInvite={hideModalSendInvite}
      />

      <ModalFilterInviteEmployees open={open} hiddenModal={handleOpen} />
     
      <ModalSendInvitationEmployee
        openSendInvitationEmployee={openSendInvitation}
        hiddenModalSendInvitationEmployee={hiddenSendInvitationEmployee}
      />

      <div className="invite-requests-table border-width-content mt-5">
        <DataTableTwo
          theadContent={theadTrContent}
          tbodyContent={tbodyContent}
          withCheckboxes={false}
          isShowContentFilterInfo={true}
          isShowModalButtonFilter={false}
          functionButtonFilter={() => {
            sendInvitationToAll();
          }}
          isTrueButtonsModalContentRight={true}
          functionButtonModalOne={() => {
            sendInvitationToAll();
          }}
          textContentButtonOne={"دعوة جميع الموظفين"}
          isTrueButtonTwoModalContent={false}
          newClassButtonTwo={"button-green"}
          functionModalButtonTwo={() => {
            sendInvitationToAll();
          }}
          textContetButtonTwo={"دعوة جميع الموظفين"}
          isLoading={loading}
          onRowSelection={handleRowSelection}
 
        />
      </div>
    </>
  );
};

export default TableInviteEmployees;
