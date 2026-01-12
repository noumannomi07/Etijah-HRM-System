import DetailsPageInfo from "../../../../Shared/DetailsPageInfo/DetailsPageInfo";
import FormAddMedicalInsurance from "./FormAddMedicalInsurance";

const AddMedicalInsurance = () => {
  const textTitle = "التأمين الصحي";
  return (
    <>
      <DetailsPageInfo titleHelmet={textTitle} titlePage={textTitle} />
      <main>
        <FormAddMedicalInsurance />
      </main>
    </>
  );
};

export default AddMedicalInsurance;
