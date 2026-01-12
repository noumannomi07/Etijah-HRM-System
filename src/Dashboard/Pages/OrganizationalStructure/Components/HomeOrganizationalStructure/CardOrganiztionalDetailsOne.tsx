import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import ArchiveIconInfo from "@assets/Icons/ArchiveIconInfo.svg";
import UsersIcon from "@assets/images/sidebaricons/usersicon.svg";
import { useState, useEffect } from "react";
import ModalAddDirectManager from "./ModalCard/ModalAddDirectManager";
import { toast } from "react-toastify";
import ModalDepartmentEmployees from "./ModalDepartmentEmployees/ModalDepartmentEmployees";
import React from "react";
import { Category } from "../OrganizationalStructureTypes";
import { addManagerToCategory, removeManagerFromCategory } from "../UseOrganizationalStructure";
import { useTranslation } from "react-i18next";

const CardOrganiztionalDetailsOne = ({
  category
}: {
  category: Category;
}) => {
  const { t } = useTranslation('organizationalStructure');
  const [openModalAdd, setOpenModalAdd] = useState(false);
  
  const [assignedEmployee, setAssignedEmployee] = useState(category.manager);

  //ADD TO LOCAL STORGE
  useEffect(() => {
    const savedEmployee = JSON.parse(
      localStorage.getItem(`assignedEmployee-${category.id}`)
    );
    if (savedEmployee) {
      setAssignedEmployee(savedEmployee);
    }
  }, [category.id]);

  const openButton = () => {
    setOpenModalAdd(!openModalAdd);
  };

  const handleAssignEmployee = async (employee: any) => {

    const data = {
      category_id: category.id,
      manager_id: employee.id
    }
    const response = await addManagerToCategory(data);

    if(response.status === 200){
      toast.success(t('messages.assignSuccess'));
      setAssignedEmployee(employee);

     localStorage.setItem(
      `assignedEmployee-${category.id}`,
      JSON.stringify(employee)
    ); // SAVE IN LOCAL STORGE USE KEY

    }else{
      toast.error(t('messages.assignError'));
    }

    
 

  };

  const handleRemoveEmployee = async () => {

   const response = await removeManagerFromCategory(category.id);

   if(response.status === 200){
    toast.success(t('messages.removeSuccess'));
    setAssignedEmployee(null)
    localStorage.removeItem(`assignedEmployee-${category.id}`); // REMOVE FORM LOCAL STORGE USE KEY
   }else{
    toast.error(t('messages.removeError'));
   }

 

  };

  //   SHOW MODAL DEPARTMENT EMPLOYEE
  const [openModalDepartmentEmployees, setOpenModalDepartmentEmployees] =
    useState(false);
  const showModalDepartment = () => {
    setOpenModalDepartmentEmployees(!openModalDepartmentEmployees);
  };

  return (
    <>
      <ModalAddDirectManager
        openModalAddDirectManager={openModalAdd}
        hiddenModalAddDirectManager={openButton}
        onAssignEmployee={handleAssignEmployee}
      />

      <ModalDepartmentEmployees
        openModalDepartmentEmployees={openModalDepartmentEmployees}
        hiddenModalDepartmentEmployees={showModalDepartment}
        category={category}

      />
      <div className="card-box-one rounded-[10px] border border-lightColorWhite2">
        {/* =============== START HEADER CARD ================= */}
        <div className="header-card rounded-[10px_10px_0_0] item-center-flex bg-lightGrayColor2 p-3">
          <div className="icon">
            <img src={ArchiveIconInfo} />
          </div>
          <h2 className="title text-font-dark text-[17px]">{category.title}</h2>
        </div>
        {/* =============== END HEADER CARD ================= */}
        {/* =============== START ADD EMPLOYEE ============== */}
        <div className="add-employee py-5 px-3">
          {assignedEmployee ? (
            <div className="direct-manager flex-between">
              {/* =========== START CONTENT INFO ============= */}
              <div className="content-info-details flex items-center gap-3">
                <div className="image-manager">
                  <img
                    src={assignedEmployee.image}
                    alt="image"
                    className="w-[45px] h-[45px] rounded-full"
                    loading="lazy"
                  />
                </div>
                <div className="content-direct">
                  <h2 className="name text-font-dark text-[16px]">
                    {assignedEmployee.name}
                  </h2>
                  <p className="title-job text-font-gray">{t('card.directManager')}</p>
                </div>
              </div>
              {/* =========== END CONTENT INFO ============= */}
              <div
                className="icon-remove text-[16px] text-redColor01 cursor-pointer"
                onClick={() => handleRemoveEmployee()}
              >
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </div>
          ) : (
            <div
              onClick={openButton}
              className="text-add text-[16px] cursor-pointer text-primaryColor font-[600] flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} /> <p>{t('card.assignDirectManager')}</p>
            </div>
          )}
        </div>
        {/* =============== END ADD EMPLOYEE ============== */}


        {/* =============== START DETAILS CARD BOTTOM ================ */}


        <div className="details-card-bottom flex-between p-3 w-full">
          {/* =============== START IMAGES EMPLOYEE ============== */}
          <div className="images-employee w-full">
            <div className="flex -space-x-4 rtl:space-x-reverse">
              {category.children.map((employee, index) => (
                <img
                  key={employee.id}
                  className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                  src={employee.image}
                  alt={`image-${index}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
          {/* =============== END IMAGES EMPLOYEE ============== */}
          <div
            onClick={
              category.employees_count > 0 ? () => {
              showModalDepartment();
            } : undefined
            }
            className="num-employee status-primary flex items-center gap-2 text-[16px] font-[600] text-primaryColor"
          >
            <img src={UsersIcon} alt="users" /> {category.employees_count}
          </div>
        </div>


        {/* =============== END DETAILS CARD BOTTOM ================ */}


      </div>
    </>
  );
};

CardOrganiztionalDetailsOne.propTypes = {
  category: PropTypes.object.isRequired
};

export default CardOrganiztionalDetailsOne;
