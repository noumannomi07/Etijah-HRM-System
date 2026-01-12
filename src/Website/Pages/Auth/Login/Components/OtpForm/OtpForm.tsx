import { useState, useEffect, useRef } from "react";
import "./OtpForm.css";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import ArrowSendWhite from "@assets/Icons/ArrowSendWhite.svg";
import { toast } from "react-toastify";
import HeaderLogin from "../HeaderLogin/HeaderLogin";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

const OtpForm = ({ onBack }) => {
  const { t } = useTranslation('login');
  // LOADER BUTTON
  const [loader, setLoader] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [inputValue, setInputValue] = useState(["", "", "", ""]);
  useEffect(() => {
    focusInput(0);
  }, []);
  const handleInputChange = (index, e) => {
    const value = e.target.value;
    if (value.length > 1) return;

    setInputValue((prev) => {
      const newValue = [...prev];
      newValue[index] = value;
      return newValue;
    });

    const nextIndex = index + 1;
    if (value.length === 1 && nextIndex <= 3) {
      focusInput(nextIndex);
    }
  };

  const handleKeyDown = (index, e) => {
    const value = e.target.value;
    const prevIndex = index - 1;

    if (e.key === "Backspace" && index > 0 && value.length === 0) {
      focusInput(prevIndex);
    }
  };

  const focusInput = (index) => {
    if (inputRefs[index] && inputRefs[index].current) {
      inputRefs[index].current.focus();
    }
  };
  const isButtonDisabled = inputValue.some((value) => value === "");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault(); // PREVENT FORM SUBMISSION

    // SET LOADER LOADER TO TRUE
    setLoader(true);
    setInputValue(["", "", "", ""]); // RESET INPUTS
    focusInput(0);
    // TIME REMOVE LOADER AND ADD TOAST SUCCESS
    setTimeout(() => {
      setLoader(false); // Remove loader
      toast.success(t('otp.successMessage')); // Show success toast
      navigate(FullRoutes.Website.Base);
    }, 800);
  };

  return (
    <div className="info-otp-form" dir="rtl">
      <HeaderLogin
        onBack={onBack} // BACK TO LOGIN FORM
        title={t('otp.title')}
        text={t('otp.description')}
      />
      <div className="otp-form mt-6">
        <form onSubmit={handleSubmit}>
          <div className="all-input-otp flex-items-center gap-3" dir="ltr">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                type="number"
                name={`digit${index + 1}`}
                className="form-control focus:shadow-none focus:outline-none text-center"
                maxLength={1}
                value={inputValue[index]}
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={inputRefs[index]}
                onWheel={(e) => e.target.blur()}
                inputMode="numeric"
                pattern="[0-9]*"
                style={{ direction: "ltr" }}
              />
            ))}
          </div>
          <button
            className={`btn-main  rounded-[50px] w-full mt-6 ${
              isButtonDisabled ? "disabled-btn" : ""
            }`}
            disabled={isButtonDisabled}
            type="submit"
          >
            {loader ? (
              <SpinnerLoader />
            ) : (
              <>
                {t('form.buttons.confirmOtp')}
                <div className="icon-arrow-button">
                  <img src={ArrowSendWhite} />
                </div>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
OtpForm.propTypes = {
  onBack: PropTypes.func.isRequired
};
export default OtpForm;
