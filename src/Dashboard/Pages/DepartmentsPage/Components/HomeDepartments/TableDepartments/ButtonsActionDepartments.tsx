import ActionData from "@/Dashboard/Shared/DataTableInfo/ActionData";
import EditIcon from "@/Dashboard/Shared/DataTableInfo/Icons/EditIcon";
import TrashIcon from "@/Dashboard/Shared/DataTableInfo/Icons/TrashIcon";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const ButtonsActionDepartments = ({ functionEdit, functionDelete }) => {
  const {t} =useTranslation("main")

  const firstMenuData = [
    {
      icon: <EditIcon />,
      label: t("edit"),
      onClick: functionEdit,
      textClass: ""
    },
    {
      icon: <TrashIcon />,
      label: t("delete"),
      onClick: functionDelete,
      textClass: "text-redColor01"
    }
  ];
  return <ActionData menuItems={firstMenuData} />;
};

ButtonsActionDepartments.propTypes = {
  functionShow: PropTypes.func.isRequired,
  functionEdit: PropTypes.func.isRequired,
  functionDelete: PropTypes.func.isRequired
};
export default ButtonsActionDepartments;
