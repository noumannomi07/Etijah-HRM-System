import { useNavigate } from "react-router-dom";
import DirectionLeftIcon from "@assets/Icons/DirectionLeftIcon.svg";
import { useTranslation } from "react-i18next";

const HeaderButtonBack = () => {
    const navigate = useNavigate();
    const {t} =useTranslation("main")

    return (
        <>
            {/* ==================== START HEADER PAGE REQUEST =================== */}
            <header>
                <div className="header-page-request">
                    <button
                        data-aos="fade-left"
                        onClick={() => navigate(-1)} // Go back to the previous page
                        className="button-transparent button-hover-svg font-[600] gap-[5px]"
                    >
                        <img src={DirectionLeftIcon} alt="Back" /> {t("Back")}
                    </button>
                </div>
            </header>
            {/* ==================== END HEADER PAGE REQUEST =================== */}
        </>
    );
};

export default HeaderButtonBack;
