import React from "react";
import TabViolationDetails from "./Components/TabViolationDetails";
import { useNavigate } from "react-router-dom";
import { FullRoutes } from "@/Routes/routes";
const TabViolation = () => {

  const navigate = useNavigate();
  


  return (
    <div className="tab-medical">

      <TabViolationDetails />
    </div>
  );
};

export default TabViolation;
