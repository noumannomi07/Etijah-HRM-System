import FormAddNewRequest from "./FormAddNewRequest";
import BreadCrumbRequestsPage from "../ReusablePageAddNewContent/BreadCrumbRequestsPage/BreadCrumbRequestsPage";
import ButtonBack from "@/Dashboard/Shared/ButtonBack/ButtonBack";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import React from "react";
import { CommonRouteKeys, FullRoutes, RelativeRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

const AddNewRequest = () => {
  const { t } = useTranslation("orders");

  return (
    <>
      <HelmetInfo titlePage={t("addNewRequest.vacation.title")} />

      <BreadCrumbRequestsPage titlePage={t("addNewRequest.vacation.title")} />

      <div className="add-new-request-page">
        <header>
          <div className="header-page-request">
            <ButtonBack
              isRouteDashboard={true}
              routeLink={RelativeRoutes.Dashboard.Orders[CommonRouteKeys.Base]}
              isTextBack={true}
              AddNewTextButton={""}
              addNewRoute={FullRoutes.Dashboard.Orders.All}
            />
          </div>
        </header>
        <main>
          <FormAddNewRequest />
        </main>
      </div>
    </>
  );
};

export default AddNewRequest;
