import HeaderProfileInfo from "@/Dashboard/Shared/HeaderProfileInfo/HeaderProfileInfo";
import DetailsInfoDiv from "@/Dashboard/Pages/Orders/Components/ModalsOrder/ModalVacationDetails/DetailsInfoDiv";
import ModalUserProfileEdit from "../ModalUserProfileEdit/ModalUserProfileEdit";
import { useState } from "react";
import "./InfoUserProfile.css";
import { Loading } from "@/components";
import React from "react";
import { useUser } from "@/contexts";

const InfoUserProfile = () => {
  const { userProfile, loading, updateUserProfile } = useUser();

  // SHOW MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const handleSaveChanges = (updatedValues: any) => {
    updateUserProfile(updatedValues);
    handleOpen(); // Close the modal after updating
  };

  // Check if the data is loaded
  if (loading) {
    return <Loading />; // Show a loading message while fetching data
  }

  // DATA OF USER
  const details = [
    { titleDetails: "الإسم", textDetails: `${userProfile?.first_name} ${userProfile?.last_name}` },
    { titleDetails: "تاريخ الميلاد", textDetails: userProfile?.birth_date || "غير محدد" },
    { titleDetails: "الجنسية", textDetails: userProfile?.nationality?.ar_title || "غير محدد" },
    { titleDetails: "رقم الجوال", textDetails: userProfile?.phone || "غير محدد" },
    { titleDetails: "البريد الإلكتروني", textDetails: userProfile?.email || "غير محدد" },
    { titleDetails: "رقم الهوية", textDetails: userProfile?.id_number || "غير محدد" },
    { titleDetails: "الحالة الإجتماعية", textDetails: userProfile?.marital_status || "غير محدد" },
  ];

  // VALUE USER
  const initialValues = {
    firstName: userProfile?.first_name,
    email: userProfile?.email,
    password: "********", // Password should be hidden for security
    confirmPassword: "********", // Confirm password should be hidden
  };

  return (
    <>
      <ModalUserProfileEdit
        open={open}
        hiddenModal={handleOpen}
        initialValues={initialValues}
        onSave={handleSaveChanges}
      />
      <div className="all-content-prpfile-user border-width-content mt-4">
        <HeaderProfileInfo
          imageUser={userProfile?.image || ""}
          nameUser={`${userProfile?.first_name || ""} ${userProfile?.last_name || ""}`}
          isShowToggle={false}
          idToggle=""
          textInfoWork={userProfile?.jobtitle?.title || "غير محدد"}
          emailUser={userProfile?.email || ""}
        // functionEditInfoUser={() => handleOpen()}
        />

        <div
          data-aos="fade-up"
          className="all-details-user border-width-content mt-8 grid-cards-2 gap-0 gap-x-4"
        >
          {details.map((detail, index) => (
            <DetailsInfoDiv
              key={index}
              newClassName=""
              titleDetails={detail.titleDetails}
              textDetails={detail.textDetails}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default InfoUserProfile;
