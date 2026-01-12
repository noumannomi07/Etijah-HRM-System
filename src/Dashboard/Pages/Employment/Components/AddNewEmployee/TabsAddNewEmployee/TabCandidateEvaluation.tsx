import CheckButtonGroup from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/CheckButtonGroup/CheckButtonGroup";
import RatingTab from "./RatingTab/RatingTab";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FullRoutes } from "@/Routes/routes";
import { useTranslation } from "react-i18next";

const TabCandidateEvaluation = () => {
  const { t } = useTranslation('employment');
  
  // LIST OF RATING SYSTEMS WITH ID AND TITLE
  const ratingSystems = [
    { id: 1, title: t('addCandidate.evaluation.ratingItems') },
    { id: 2, title: t('addCandidate.evaluation.ratingItems') },
    { id: 3, title: t('addCandidate.evaluation.ratingItems') }
  ];

  const [ratings, setRatings] = useState({});
  const [selectedStatus, setSelectedStatus] = useState(""); // STATE FOR MANAGING RATINGS
  const [resetRatings, setResetRatings] = useState(false); // STATE FOR SELECTED STATUS IN CheckButtonGroup
  // OPTIONS FOR BUTTON GROUP STATUS
  const optionsButton = [t('addCandidate.evaluation.accepted'), t('addCandidate.evaluation.rejected'), t('addCandidate.evaluation.waitlist')];

  const navigate = useNavigate();
  // FUNCTION TO HANDLE CANCELLATION AND REDIRECT TO EMPLOYMENT PAGE
  const cancelAdd = () => {
    toast.success(t('addCandidate.form.messages.cancelSuccess'));
    navigate(FullRoutes.Dashboard.Employment.All);
  };
  // FUNCTION TO UPDATE RATINGS WHEN THEY ARE CHANGED
  const handleRatingChange = (id, rating) => {
    setRatings((prev) => ({
      ...prev,
      [id]: rating
    }));
  };
  // FUNCTION TO HANDLE FORM SUBMISSION, CHECK ALL RATINGS AND STATUS
  const handleSubmit = () => {
    const allRated = ratingSystems.every((system) => ratings[system.id]);

    if (!allRated || !selectedStatus) {
      toast.error(t('addCandidate.evaluation.messages.allFieldsRequired'));
      return;
    }

    // SHOW SUCCESS TOAST MESSAGE
    toast.success(t('addCandidate.evaluation.messages.evaluationSuccess'));

    // RESET RATINGS AND STATUS AFTER SUBMISSION
    setResetRatings(true); // RESET ALL RATINGS
    setSelectedStatus(""); // RESET CheckButtonGroup
    setTimeout(() => setResetRatings(false), 0);
  };

  const inputFields = [
    {
      id: "text1",
      label: t('addCandidate.evaluation.weakPoints'),
      placeholder: t('addCandidate.evaluation.weakPoints')
    },
    {
      id: "text2",
      label: t('addCandidate.evaluation.strengths'),
      placeholder: t('addCandidate.evaluation.strengths')
    },
    {
      id: "text3",
      label: t('addCandidate.evaluation.notes'),
      placeholder: t('addCandidate.evaluation.notes')
    }
  ];
  return (
    <div className="all-candidate-valuation">
      <div className="all-candidate-rating">
        {ratingSystems.map((system) => (
          <div key={system.id}>
            <h1 className="text-font-dark text-[16px] mb-2">{system.title}</h1>
            <RatingTab
              ratingId={system.id}
              onRatingChange={(rating) => handleRatingChange(system.id, rating)}
              reset={resetRatings}
              initialRating={ratings[system.id]}
              disabled={false}
            />
          </div>
        ))}
        {/* ================== START ALL TEXTINPUT FORM ================== */}
        <div className="all-textInput-form grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {inputFields.map((field) => (
            <div key={field.id} className="input-text-area flex flex-col gap-2">
              <label htmlFor={field.id} className="text-font-gray text-[15px]">
                {field.label}
              </label>
              <textarea
                id={field.id}
                className={`input-field !h-[140px] outline-none shadow-none `}
                required
                onWheel={(e) => e.target.blur()}
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>
        {/* ================== END ALL TEXTINPUT FORM ================== */}
      </div>

      <div className="main-buttons-info mt-5">
        <h2 className="title text-font-gray mb-2">{t('addCandidate.evaluation.requestStatus')}</h2>
        <CheckButtonGroup
          options={optionsButton}
          selected={selectedStatus}
          onChange={setSelectedStatus}
        />
      </div>

      <ButtonsFormSendCancel
        cancelAdd={cancelAdd}
        submitButton={handleSubmit}
      />
    </div>
  );
};

export default TabCandidateEvaluation;
