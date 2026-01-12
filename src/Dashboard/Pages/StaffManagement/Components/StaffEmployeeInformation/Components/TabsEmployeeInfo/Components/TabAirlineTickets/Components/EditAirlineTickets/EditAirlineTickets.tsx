import FormEditAirlineTickets from "./FormEditAirlineTickets";
import DetailsPageInfo from "../../../../Shared/DetailsPageInfo/DetailsPageInfo";
import React from "react";
import { useTranslation } from "react-i18next";

const EditAirlineTickets = () => {
  const { t } = useTranslation("staffManagement");
  const textTitle = t("airlineTickets.title");

  return (
    <>
      <DetailsPageInfo titleHelmet={textTitle} titlePage={textTitle} />
      <main>
        <FormEditAirlineTickets />
      </main>
    </>
  );
};

export default EditAirlineTickets;
