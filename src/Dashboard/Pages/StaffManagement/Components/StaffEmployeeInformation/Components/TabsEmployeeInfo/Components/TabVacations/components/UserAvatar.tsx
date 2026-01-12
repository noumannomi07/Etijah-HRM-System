import React from "react";
import { useTranslation } from "react-i18next";

interface UserAvatarProps {
  imgUrl: string;
  name: string;
}

export const UserAvatar = ({ imgUrl, name }: UserAvatarProps) => {
  const { t } = useTranslation("staffManagement");

  return (
    <div className="flex items-center gap-3">
      <img
        src={imgUrl}
        className="rounded-[50px] !w-[40px] !h-[40px] border border-lightColorWhite2"
        alt={t("common.userAvatar", { username: name })}
        loading="lazy"
      />
      {name}
    </div>
  );
};