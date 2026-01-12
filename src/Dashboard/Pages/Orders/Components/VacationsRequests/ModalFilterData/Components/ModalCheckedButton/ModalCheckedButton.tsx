import React, { useState } from "react";
import CheckButtonGroup from "../CheckButtonGroup/CheckButtonGroup";
import { useTranslation } from "react-i18next";

const ModalCheckedButton: React.FC = () => {
  const { t } = useTranslation("orders");

  const optionsButton = [
    t("status.all"),
    t("status.pending"),
    t("status.approved"),
    t("status.rejected")
  ];
  const [selectedOption, setSelectedOption] = useState("");

  // CHANGE VALUE
  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="main-buttons-info mt-5">
      <h2 className="title text-font-gray mb-2">{t("filters.requestStatus")}</h2>
      <CheckButtonGroup
        options={optionsButton}
        selected={selectedOption}
        onChange={handleOptionChange}
      />
    </div>
  );
};

export default ModalCheckedButton;
