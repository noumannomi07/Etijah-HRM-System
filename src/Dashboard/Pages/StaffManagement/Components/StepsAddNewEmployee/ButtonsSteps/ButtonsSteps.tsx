import React from "react";
import { useTranslation } from "react-i18next";

interface ButtonsStepsProps {
  isShowPrevButton: boolean;
  functionPrev: () => void;
  isNextDisabled: boolean;
  disabled: boolean;
  isNextText: string;
  functionNext: () => void;
  isLoading: boolean;
}

const ButtonsSteps: React.FC<ButtonsStepsProps> = ({
  isShowPrevButton,
  functionPrev,
  isNextDisabled,
  disabled,
  isNextText,
  functionNext,
  isLoading,
}) => {
  const { t } = useTranslation("staffManagement");
  return (
    <div className="buttons-step mt-6 flex items-center justify-between">
      {isShowPrevButton ? (
        <button
          className="w-full sm:w-auto button-transparent hover:bg-redColor01 hover:border-redColor01 height--50"
          onClick={functionPrev}
          type="button"
        >
          {t("common.previous")}
        </button>
      ) : (
        <div></div>
      )}

      <button
        className="w-full sm:w-auto btn-main height--50 disabled:opacity-75"
        type="submit"
        disabled={isNextDisabled || disabled || isLoading}
        onClick={functionNext}
      >
        {isLoading ? (
          <span className="loading-dots flex gap-2">
            {t(isNextText === "next" ? "common.next" : "common.save")}
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </span>
        ) : (
          t(isNextText === "next" ? "common.next" : "common.save")
        )}
      </button>
    </div>
  );
};

export default ButtonsSteps;
