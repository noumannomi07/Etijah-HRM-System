import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import InfoUserProfile from "../InfoUserProfile/InfoUserProfile";
const ContentProfileUser = () => {
  return (
    <>
      <ButtonBack
        isRouteDashboard={true}
        routeLink="home-dashboard"
        addNewRoute={false}
        isTextBack={true}
        AddNewTextButton={""}
      />

      <InfoUserProfile />
    </>
  );
};

export default ContentProfileUser;
