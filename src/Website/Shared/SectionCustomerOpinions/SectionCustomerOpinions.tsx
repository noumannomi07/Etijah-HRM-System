import ContainerMedia from "@/Website/Components/ContainerMedia/ContainerMedia";
import AnimationCustomerImages from "./Components/AnimationCustomerImages/AnimationCustomerImages";
import CardsSectionCustomerOpinions from "./Components/CardsSectionCustomerOpinions/CardsSectionCustomerOpinions";

const SectionCustomerOpinions = () => {
  return (
    <div className="section-customer-opinions margin-60-web py-[50px] bg-lightColorblue_02 overflow-hidden">
      {/* ======================= START OCNTAINER ===================== */}
      <ContainerMedia>
        {/* =================== START ALL SECTIONS CUSTOMERS OPINIONS =================== */}
        <div className="all-section-customer-opinions  grid-cards-2 items-center">
          <CardsSectionCustomerOpinions />
          {<AnimationCustomerImages />}
        </div>
        {/* =================== END ALL SECTIONS CUSTOMERS OPINIONS =================== */}
      </ContainerMedia>
      {/* ======================= END OCNTAINER ===================== */}
    </div>
  );
};

export default SectionCustomerOpinions;
