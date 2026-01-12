
import ActionData from "@/Dashboard/Shared/DataTableInfo/ActionData";
import EditIcon from "@/Dashboard/Shared/DataTableInfo/Icons/EditIcon";
import EyeShowIcon from "@/Dashboard/Shared/DataTableInfo/Icons/EyeShowIcon";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const ActionTableSalaryMarches = ({functionShow,functionEdit}) => {
  const {t} =useTranslation("main")

  const firstMenuData = [
  
    {
      icon: <EyeShowIcon />,
      label: t("Salary details"),
      onClick: functionShow,
      textClass: ""
    },
    // {
    //   icon: <EditIcon />,
    //   label: t("edit"),
    //   onClick: functionEdit,
    //   textClass: ""
    // }
  ];
  return (
    <>
      <ActionData menuItems={firstMenuData} />
    </>
  );
};

ActionTableSalaryMarches.propTypes = {
    functionCheckMark: PropTypes.func.isRequired,
    functionSendTransaction: PropTypes.func.isRequired,
    functionShow: PropTypes.func.isRequired,
    functionEdit: PropTypes.func.isRequired,
  };
  

export default ActionTableSalaryMarches;
