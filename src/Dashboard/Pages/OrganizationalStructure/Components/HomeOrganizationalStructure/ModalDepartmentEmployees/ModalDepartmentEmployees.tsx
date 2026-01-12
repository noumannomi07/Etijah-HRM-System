import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import { FullRoutes } from "@/Routes/routes";
import img1 from "@assets/images/homeimages/users/female.png";
import img2 from "@assets/images/homeimages/users/male.png";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Category } from "../../OrganizationalStructureTypes";
import { useTranslation } from "react-i18next";

const ModalDepartmentEmployees = ({
  openModalDepartmentEmployees,
  hiddenModalDepartmentEmployees,
  category
}: {
  openModalDepartmentEmployees: boolean;
  hiddenModalDepartmentEmployees: () => void;
  category: Category;
}) => {
  const { t } = useTranslation('organizationalStructure');
 
  return (
    <CustomModal
      newClassModal={"medium-modal modal-department-employees"}
      isOpen={openModalDepartmentEmployees}
      handleOpen={hiddenModalDepartmentEmployees}
      titleModal={t('modal.departmentEmployees', { department: category.title })}
      classBodyContent={"modal-scroll-auto"}
    >
      {/* ===================== START INFO DEPARTMENT EMPLOYEES ==================== */}
      <div className="info-department-employees">
        {category.children.map((employee, index) => (
          <div
            key={index}
            className="card-one-department flex-between border-b py-3"
          >
            {/* =============== START CONTENT EMPLOYEE ================= */}
            <div className="content-employee item-center-flex">
              <img
                src={employee.image}
                alt="employee image"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%"
                }}
                loading="lazy"
              />
              <h2 className="name-employee text-font-dark text-[16px]">
                {employee.name}
              </h2>
            </div>
            {/* =============== END CONTENT EMPLOYEE ================= */}
            <Link
              to={`${FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformation}/${employee.id}`}
              className="btn-main button-green height--50"
            >
              {t('buttons.view')}
            </Link>
          </div>
        ))}
      </div>
      {/* ===================== END INFO DEPARTMENT EMPLOYEES ==================== */}
    </CustomModal>
  );
};
ModalDepartmentEmployees.propTypes = {
  openModalDepartmentEmployees: PropTypes.bool.isRequired,
  hiddenModalDepartmentEmployees: PropTypes.func.isRequired
};
export default ModalDepartmentEmployees;
