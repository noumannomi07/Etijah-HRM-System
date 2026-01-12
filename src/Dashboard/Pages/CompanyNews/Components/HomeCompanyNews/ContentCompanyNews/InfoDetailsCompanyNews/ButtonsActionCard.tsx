import ActionData from "@/Dashboard/Shared/DataTableInfo/ActionData";
import EditIcon from "@/Dashboard/Shared/DataTableInfo/Icons/EditIcon";
import TrashIcon from "@/Dashboard/Shared/DataTableInfo/Icons/TrashIcon";
import ToggleSwitchCheck from "@/Dashboard/Shared/ToggleSwitch/ToggleSwitchCheck";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const ButtonsActionCard = ({ onEdit, onDelete, idSwitchCard, onSwitch }) => {
  const {t} =useTranslation("main")
  const menuItems = [
    {
      id: 1,
      icon: <EditIcon />,
      label: t("edit"),
      action: onEdit,
    },
    {
      id: 2,
      icon: <TrashIcon />,
      label: t("delete"),
      action: onDelete,
    },
    // {
    //   id: 3,
    //   icon: <ToggleSwitchCheck id={idSwitchCard} onChange={onSwitch} />,
    //   label: "تعطيل",
    //   action: () => {},
    // },
  ];

  return (
    <>
      <ActionData menuItems={menuItems} />
    </>
  );
};

ButtonsActionCard.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  idSwitchCard: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onSwitch: PropTypes.func.isRequired,
};

export default ButtonsActionCard;
