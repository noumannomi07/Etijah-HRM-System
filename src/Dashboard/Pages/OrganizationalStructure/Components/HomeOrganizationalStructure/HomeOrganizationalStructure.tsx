import Logo from "@components/Logo/Logo";
import "./HomeOrganizationalStructure.css";
import CardOrganiztionalDetailsOne from "./CardOrganiztionalDetailsOne";
import useOrganizationalStructure from "../UseOrganizationalStructure";
import React from "react";
import WindowLoader from "@/Website/Components/WindowLoader/WindowLoader";
import { useTranslation } from "react-i18next";

const HomeOrganizationalStructure = () => {
  const { t } = useTranslation('organizationalStructure');
  const { data: organizationalStructure, isLoading, error } = useOrganizationalStructure();

  if(isLoading){
    return <WindowLoader />
  }

  if(error){
    return <WindowLoader />
  }

  return (
    <div className="home-organiztional pt-[50px] pb-[100px]">
      {/* ==================== START LOGO ======================= */}
      <div className="logo-organization bg-white relative border rounded-[8px] p-[25px]  w-max m-auto">
        <Logo />
      </div>
      {/* ==================== END LOGO ======================= */}

      {/* ==================== START LOGO ======================= */}

      <div className="logo-organization ceo-organization flex flex-col gap-3 mt-14 text-center bg-white p-[15px]  relative    w-max m-auto">
        {/* ================== START IMAGE CEO =============== */}
        <div className="image-ceo m-auto">
          <img
            src={organizationalStructure?.ceo.image}
            className="w-[60px] h-[60px] rounded-full object-cover"
            alt="image"
            loading="lazy"
          />
        </div>
        {/* ================== END IMAGE CEO =============== */}
        <div className="details-ceo">
          <h2 className="name-ceo text-font-dark">{organizationalStructure?.ceo.name}</h2>
          <div className="job-title text-font-gray font-[700] text-[20px]">
            {t('ceo.title')}
          </div>
        </div>
      </div>
      {/* ==================== END LOGO ======================= */}

      

      <div className="border-bottom-all  relative">
        <div className="border-one--1"></div>
        <div className="border-one--1"></div>
        <div className="border-one--1"></div>
        <div className="border-one--1"></div>
      </div>
      {/* ================== START ALL CARD CONTENT ===================== */}
      <div className="all-cards-content-organizational mt-[150px]">
        {/* ================ START CARD ORGA ONE =============== */}

        {organizationalStructure?.categories.map((data, index) => (

          <CardOrganiztionalDetailsOne
            key={index}
            category={data}
          />
        ))}
        {/* ================ END CARD ORGA ONE =============== */}
      </div>
      {/* ================== END ALL CARD CONTENT ===================== */}
    </div>
  );
};

export default HomeOrganizationalStructure;
