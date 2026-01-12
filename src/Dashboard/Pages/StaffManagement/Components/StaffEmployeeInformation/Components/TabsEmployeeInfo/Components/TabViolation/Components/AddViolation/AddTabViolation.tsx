import DetailsPageInfo from "../../../../Shared/DetailsPageInfo/DetailsPageInfo";
import FormAddTabViolation from "./FormAddTabViolation";

const AddTabViolation = () => {
  const textTitle = "التأمين الصحي";
  return (
    <>
      <DetailsPageInfo titleHelmet={textTitle} titlePage={textTitle} />
      <main>
        <FormAddTabViolation />
      </main>
    </>
  );
};

export default AddTabViolation;
