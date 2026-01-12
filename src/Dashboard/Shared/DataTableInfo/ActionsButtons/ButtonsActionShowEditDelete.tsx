import ActionData from "../ActionData";
import EyeShowIcon from "../Icons/EyeShowIcon";
import EditIcon from "../Icons/EditIcon";
import TrashIcon from "../Icons/TrashIcon";
import PropTypes from "prop-types";
import LinkIcon from "../Icons/LinkIcon";
import React from "react";
import { useTranslation } from "react-i18next";

type ButtonsActionShowEditDeleteProps = {
  hideShowFunction: boolean;
  functionShow: () => void;
  showLinkCopy: boolean;
  functionLinkCopy: () => void;
  hideEdit: boolean;
  functionEdit: () => void;
  hideDelete: boolean;
  functionDelete: () => void;
}

const ButtonsActionShowEditDelete = ({
  hideShowFunction,
  functionShow,
  showLinkCopy,
  functionLinkCopy,
  hideEdit,
  functionEdit,
  hideDelete,
  functionDelete
}: ButtonsActionShowEditDeleteProps) => {
    const {t} =useTranslation("main")

  const firstMenuData = [
    ...(hideShowFunction
      ? []
      : [
        {
          icon: <EyeShowIcon />,
          label: t("show"),
          onClick: functionShow,
          textClass: ""
        }
      ]),
    ...(showLinkCopy
      ? [
        {
          icon: <LinkIcon />,
          label: t("Create and copy a link"),
          onClick: functionLinkCopy,
          textClass: ""
        }
      ]
      : []),
    ...(!hideEdit
      ? [
        {
          icon: <EditIcon />,
          label: t("edit"),
          onClick: functionEdit,
          textClass: ""
        }
      ]
      : []),
    ...(!hideDelete
      ? [
        {
          icon: <TrashIcon />,
          label: t("delete"),
          onClick: functionDelete,
          textClass: "text-redColor01"
        }
      ]
      : [])
  ];
  return <ActionData menuItems={firstMenuData} />;
};
ButtonsActionShowEditDelete.propTypes = {
  hideShowFunction: PropTypes.bool,
  functionShow: PropTypes.func.isRequired,
  functionEdit: PropTypes.func.isRequired,
  functionDelete: PropTypes.func.isRequired,
  showLinkCopy: PropTypes.bool,
  functionLinkCopy: PropTypes.func.isRequired
};
export default ButtonsActionShowEditDelete;
