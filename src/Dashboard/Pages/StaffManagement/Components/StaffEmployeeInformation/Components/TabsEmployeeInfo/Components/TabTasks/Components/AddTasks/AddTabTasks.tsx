import DetailsPageInfo from "../../../../Shared/DetailsPageInfo/DetailsPageInfo";
import FormAddTabTasks from "./FormAddTabTasks";

const AddMedicalInsurance = () => {
  const textTitle = "التأمين الصحي";
  return (
    <>
      <DetailsPageInfo titleHelmet={textTitle} titlePage={textTitle} />
      <main>
        <FormAddTabTasks />
      </main>
    </>
  );
};

export default AddMedicalInsurance;
