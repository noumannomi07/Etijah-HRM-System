import GlobalIcon from "@assets/images/systemsettings/globalicon.svg";
import { useLanguage } from "./LanguageContext";
import ArIcon from "./icons/ArIcon.svg";
import EnIcon from "./icons/EnIcon.svg";
import PropTypes from "prop-types";
const LanguagesDropMenu = ({
  hideGlobal,
  newClassLang,
  textAr = "العربية"
}) => {
  const { selectedLang, handleLanguageChange } = useLanguage();

  // TOGGLE LANGUGE DIRECTION
  const toggleLanguage = () => {
    const newLang = selectedLang === "ar" ? "en" : "ar";
    handleLanguageChange(newLang);
  };

  return (
    <div
      onClick={toggleLanguage}
      className="dropmenu-lang_1 flex items-center justify-between gpa-3"
    >
      {!hideGlobal && (
        <div className="lang-text text-font-dark font-[700] flex items-center gap-2">
          <img src={GlobalIcon} />
          اللغة
        </div>
      )}

      <div
        className={`name-lang text-font-gray font-[700] flex items-center gap-2 cursor-pointer ${newClassLang}`}
      >
        {selectedLang === "ar" ? (
          <>
            <img src={EnIcon} alt="English language icon" />
            En
          </>
        ) : (
          <>
            <img src={ArIcon} alt="Arabic language icon" />
            <span>{textAr}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default LanguagesDropMenu;

LanguagesDropMenu.propTypes = {
  hideGlobal: PropTypes.bool,
  newClassLang: PropTypes.string,
  textAr: PropTypes.string
};
