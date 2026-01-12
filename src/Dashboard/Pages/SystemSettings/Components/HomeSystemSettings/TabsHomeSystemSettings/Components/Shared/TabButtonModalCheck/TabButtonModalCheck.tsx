import CheckButtonGroup from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/CheckButtonGroup/CheckButtonGroup";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const TabButtonModalCheck = () => {
  const { t } = useTranslation("systemSettings");
  const optionsButton = [t("documentManagement.filter.status.active"), t("documentManagement.filter.status.inactive")];

  // STATE TO MANAGE SELECTED OPTION
  const [selectedOption, setSelectedOption] = useState("");

  // CHNAGE EVENT
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };
  return (
    <div className="main-buttons-info mt-5">
      <h2 className="title text-font-gray mb-2">{t("documentManagement.filter.status.label")}</h2>

      <CheckButtonGroup
        options={optionsButton}
        selected={selectedOption}
        onChange={handleOptionChange}
      />
    </div>
  );
};

export default TabButtonModalCheck;
