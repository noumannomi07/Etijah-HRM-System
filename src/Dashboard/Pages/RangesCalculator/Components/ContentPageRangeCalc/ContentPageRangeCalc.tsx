import CustomRadioButton from "@/Dashboard/Shared/CustomRadioButton/CustomRadioButton";
import { useState } from "react";
import InfoContentOne from "./Components/InfoContentOne";
import ScopeLevelCurrentFacility from "./Components/ScopeLevelCurrentFacility";
import AllDomainsCard from "./Components/AllDomainsCard";

const ContentPageRangeCalc = () => {
  // STATE TO SELECTED RADO BUTTON
  const [selectedOption, setSelectedOption] = useState("option1");

  // RADIO BUTTON CHNAGES
  const handleRadioChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="content-page-range">
      {/* ================== START HEADER TOP RANGE =================== */}
      <div className="header-top-content-range mt-8 border-width-content">
        <div className="all-info-page">
          <div className="main-check flex flex-col gap-3 mb-5">
            <CustomRadioButton
              id="option1"
              name="options"
              value="option1"
              label="حساب النطاق من خلال النظام"
              checked={selectedOption === "option1"}
              onChange={handleRadioChange}
            />
            <CustomRadioButton
              id="option2"
              name="options"
              value="option2"
              label="حساب النطاق يدويا"
              checked={selectedOption === "option2"}
              onChange={handleRadioChange}
            />
          </div>
          {selectedOption === "option1" && <></>}
          {selectedOption === "option2" && <InfoContentOne />}
        </div>

        {/* ===================== START BOTTOM INFO ==================== */}
        <div className="bottom-info item-center-flex justify-center sm:justify-end  flex-wrap gap-4 mt-7">
          <h2 className="title text-font-gray">إجمالي عدد الموظفين يساوي 10</h2>
          <button className="btn-main w-full sm:w-auto">إحسب النطاق</button>
        </div>
        {/* ===================== END BOTTOM INFO ==================== */}
      </div>
      {/* ================== END HEADER TOP RANGE =================== */}
      {selectedOption === "option2" && (
        <div className="all-main-conent-info  grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <ScopeLevelCurrentFacility />
          <AllDomainsCard />
        </div>
      )}
    </div>
  );
};

export default ContentPageRangeCalc;
