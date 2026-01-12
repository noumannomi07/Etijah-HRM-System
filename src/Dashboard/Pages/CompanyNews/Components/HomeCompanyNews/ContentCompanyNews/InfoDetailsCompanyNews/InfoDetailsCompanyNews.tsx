import { useState } from "react";
import ModalFilterCompany from "../../ModalFilterCompany/ModalFilterCompany";
import HeaderCompanyNewsFilter from "./HeaderCompanyNewsFilter";
import AllCardsContentCompany from "./AllCardsContentCompany";


const InfoDetailsCompanyNews = () => {
  // SHOW MODAL
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
    <ModalFilterCompany open={open} hiddenModal={handleOpen} />

      <div className="info-company-news border-width-content my-5">
        {/* ================== START HEADER COMPANY NEWS ================== */}
        <header>
          <HeaderCompanyNewsFilter handleOpen={handleOpen} />
        </header>
        {/* ================== END HEADER COMPANY NEWS ================== */}
      
        <main>
          <AllCardsContentCompany />
        </main>
      </div>
    </>
  );
};

export default InfoDetailsCompanyNews;
