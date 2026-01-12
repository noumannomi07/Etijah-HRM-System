import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import female from "@assets/images/homeimages/users/female.png";
import male from "@assets/images/homeimages/users/male.png";
import PropTypes from "prop-types";
import ModalButtonsEditTrash from "@/Dashboard/Shared/ModalButtonsEditTrash/ModalButtonsEditTrash";
import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";
import { useTranslation } from "react-i18next";

const ModalDetailsBouns = ({
  openModalDetailsBouns,
  hiddenModalDetailsBouns,
  handleButtonDelete,
  buttonEditPageRoute,
  rewardData
}) => {
  const { t } = useTranslation('bonus');
  
  // تحديد صورة الموظف بناءً على الجنس
  const getImage = (gender) => (gender === "male" ? male : female);

  // Function to format amount safely
  const formatAmount = (amount) => {
    return amount ? amount.toLocaleString() : t('details.notSpecified'); // Return formatted string or fallback
  };

  return (
    <CustomModal
      newClassModal={"modal-bouns"}
      isOpen={openModalDetailsBouns}
      handleOpen={hiddenModalDetailsBouns}
      titleModal={t('details.title')}
      classBodyContent={""}
    >
      <div className="all-content-details-bouns ">
        {/* <div className="buttons-actions mb-3 flex justify-end">
          <ModalButtonsEditTrash
            // openModalDeleteFunction={handleButtonDelete}
            routePageAdd={buttonEditPageRoute}
          />
        </div> */}
        {/* ====================== START DETAILS CONTENT ================= */}
        <div className="details-doucments-content  border-width-content">
          <div className="reward-info">
            {/* <h3 className="text-lg text-font-dark mb-3">معلومات المكافأة</h3>
            <div className="reward-details mb-3">
              <div><strong>عنوان المكافأة:</strong> {rewardData?.title}</div>
              <div className="flex items-center gap-2"><strong>المبلغ:</strong> {formatAmount(rewardData?.amount)}<Saudiriyal /></div>
              <div><strong>النسبة المئوية للتقييم:</strong> {rewardData?.rate}%</div>
              <div><strong>الفترة:</strong> {rewardData?.quarters ? rewardData?.quarters.replace(/[\[\]\"\,]/g, "") : "غير محدد"}</div>
              <div><strong>السنة:</strong> {rewardData?.year}</div>
              <div><strong>الحالة:</strong> {rewardData?.status === "upcoming" ? "قادم" : "تم"}</div>
            </div> */}
          </div>

          {/* ====================== START EMPLOYEES CONTENT ================= */}
          <div className="all-cards-bouns">
            {rewardData?.employees.map((employee) => (
              <div
                key={employee.id}
                className="card-details-bouns flex-between flex-wrap gap-4 border-b pb-3 mb-3"
              >
                {/* ================== START CONTENT USER =============== */}
                <div className="content-user w-full sm:w-auto item-center-flex">
                  <img
                    src={employee.image}
                    className="rounded-[50px] !w-[40px] !h-[40px] border border-lightColorWhite2"
                    alt={`img user ${employee.name}`}
                    loading="lazy"
                  />
                  <h2 className="title-name text-font-dark text-[14px] sm:text-[15px]">
                    {employee.name}
                  </h2>
                </div>
                {/* ================== END CONTENT USER ================= */}
                {/* ================== START MIDDLE CONTENT BOUNS =================== */}
                <div className="meddle-content   flex flex-col gap-1 text-right sm:text-center w-full sm:w-auto">
                  <h2 className="title text-font-dark text-[14px] sm:text-[15px]">
                    {t('details.achievedRating')}
                  </h2>
                  <div className="per text-font-gray text-[18px]">
                    {rewardData?.rate || t('details.notSpecified')}%
                  </div>
                </div>
                {/* ================== END MIDDLE CONTENT BOUNS =================== */}
                {/* ================== START LEFT CONTENT ==================== */}
                <div className="left-content flex flex-col gap-1  w-full sm:w-auto">
                  <h2 className="title text-font-dark text-[14px] sm:text-[15px]">
                    {t('details.amount')}
                  </h2>
                  <p className="money-number text-font-gray text-[18px]">
                    {formatAmount(rewardData?.amount)}  <Saudiriyal/>
                  </p>
                </div>
                {/* ================== END LEFT CONTENT ==================== */}
              </div>
            ))}
          </div>
          {/* ====================== END EMPLOYEES CONTENT ================= */}
        </div>
        {/* ====================== END DETAILS CONTENT ================= */}
      </div>
    </CustomModal>
  );
};

ModalDetailsBouns.propTypes = {
  openModalDetailsBouns: PropTypes.bool.isRequired,
  hiddenModalDetailsBouns: PropTypes.func.isRequired,
  // handleButtonDelete: PropTypes.func.isRequired,
  buttonEditPageRoute: PropTypes.string.isRequired,
  rewardData: PropTypes.object.isRequired, // Prop to pass reward data
};

export default ModalDetailsBouns;
