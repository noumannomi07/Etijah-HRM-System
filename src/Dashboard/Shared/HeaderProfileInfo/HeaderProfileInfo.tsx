import React, { useState, ChangeEvent, ReactNode } from "react";
import PropTypes from "prop-types";
import CustomModal from "../CustomModal/CustomModal";
import style from "./employeeEditImage.module.css";
import EditIcon from "../DataTableInfo/Icons/EditIcon";
import TrashIconWhite from "../DataTableInfo/Icons/TrashIconWhite";
import { toast } from "react-toastify";
import InformationWorkIcon from "@assets/images/staffmanagementpage/iconssteps/informationworkicon";
import EmailUser from "@assets/images/staffmanagementpage/emailuser.svg";
import PhoneUser from "@assets/images/staffmanagementpage/phoneuser.svg";
import StatusSwitch from "./components/StatusSwitch";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

type HeaderProfileInfoProps = {
    imageUser: string;
    nameUser: string | ReactNode;
    isShowToggle: boolean;
    textInfoWork: string;
    emailUser: string;
    functionEditInfoUser?: () => void;
    idToggle?: string;
    id?: string;
    phoneUser?: string;
};

const HeaderProfileInfo = ({
    imageUser,
    nameUser,
    isShowToggle,
    textInfoWork,
    emailUser,
    functionEditInfoUser,
    id,
    phoneUser,
}: HeaderProfileInfoProps) => {
    const { t } = useTranslation("staffManagement");
    const location = useLocation();
    const isEditingImages = location.pathname.includes("staff-employee-information") && location.search.includes("DocumentEmployeeInfo");

    const [editImage, setEditImage] = useState(false);
    const [userImage, setUserImage] = useState<string | undefined>(imageUser);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setUserImage(URL.createObjectURL(file));
        }
    };

    const handleDeleteImage = async () => {
        try {
            setIsDeleting(true);
            // Add your delete API call here if needed
            setUserImage(undefined);
            setSelectedFile(null);
            toast.success(t("messages.successUpdate"));
        } catch (error) {
            toast.error(t("messages.error"));
        } finally {
            setIsDeleting(false);
        }
    };

    const handleEditImage = async () => {
        if (!selectedFile || !id) return;
console.log('selected file', selectedFile)
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("image", selectedFile);
           formData.append("_method", "PUT");

            await axiosInstance.post(
                endpoints.employee.manage.information.update(id),
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast.success(t("messages.successUpdate"));
            setEditImage(false);
        } catch (error) {
            toast.error(t("messages.error"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            data-aos="fade-up"
            className="header-employee-information flex-between flex-wrap gap-5"
        >
            <div className="content-right-employee item-center-flex gap-4 flex-wrap">
                <div
                    className="image-employee relative"
                    onClick={() => setEditImage(true)}
                    style={{ cursor: "pointer" }}
                >
                    {userImage ? (
                        <>
                            <img
                                src={userImage}
                                alt="User"
                                className="object-contain w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-full"
                                loading="lazy"
                            />
                            {(isLoading || isDeleting) && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="object-cover w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-full bg-gray-200 flex items-center justify-center">
                            لا توجد صورة
                        </div>
                    )}
                </div>

                <CustomModal
                    isOpen={editImage}
                    handleOpen={() => {
                        setEditImage(false);
                    }}
                    titleModal={t("profileHeader.editEmployeeImage")}
                >
                    <div className={style.parent}>
                        <div className={style.imageuser}>
                            <label
                                htmlFor="fileInput"
                                className={`button-transparent button-hover-svg ${style.editbutton} relative`}
                            >
                                {userImage ? (
                                    <>
                                        <img src={userImage} alt="User" />
                                        {(isLoading || isDeleting) && (
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className={style.noImage}>
                                        لا توجد صورة
                                    </div>
                                )}
                            </label>

                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                                disabled={isLoading || isDeleting}
                            />
                        </div>
                        <div className={style.buttons}>
                            <button
                                className={`button-transparent button-hover-svg ${style.editbutton}`}
                                onClick={handleEditImage}
                                disabled={
                                    !selectedFile || isLoading || isDeleting
                                }
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        {t("profileHeader.uploading")}
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                                    </span>
                                ) : (
                                    <>
                                        {t("common.save")} <EditIcon />
                                    </>
                                )}
                            </button>
                            <button
                                className={style.deletebutton}
                                onClick={handleDeleteImage}
                                disabled={!userImage || isLoading || isDeleting}
                            >
                                {isDeleting ? (
                                    <span className="flex items-center gap-2">
                                        جاري الحذف...
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    </span>
                                ) : (
                                    <>
                                        حذف <TrashIconWhite />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </CustomModal>
                <div className="content-info-employee">
                    <div className="content-one item-center-flex">
                        <h2 className="title-name text-font-dark">
                            {nameUser}
                        </h2>
                        {isShowToggle && <StatusSwitch />}
                    </div>
                    <div className="main-content-bottom mt-3">
                        <div className="info-one text-font-dark item-center-flex mb-1 text-[14px] sm:text-[16px]">
                            <InformationWorkIcon />
                            {textInfoWork}
                        </div>
                        <div className="info-one text-font-dark item-center-flex text-[14px] sm:text-[16px]">
                            <img src={EmailUser} alt="Email" />
                            {emailUser}
                        </div>
                        <div className="info-one text-font-dark item-center-flex text-[14px] sm:text-[16px]">
                            <img src={PhoneUser} alt="Phone" />
                            {phoneUser}
                        </div>
                    </div>
                </div>
            </div>

            {functionEditInfoUser && (
                <div className="content-left-employee">
                    <button
                        onClick={() => {
                            if (isEditingImages) {
                                openModal
                            }
                            else {
                                functionEditInfoUser()
                            }
                        }}
                        className="button-transparent button-hover-svg"
                    >
                        {isEditingImages ? t("profileHeader.editImage") : t("profileHeader.editPersonalInfo")} <EditIcon />
                    </button>
                </div>
            )}
        </div>
    );
};

HeaderProfileInfo.propTypes = {
    imageUser: PropTypes.string.isRequired,
    nameUser: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    isShowToggle: PropTypes.bool.isRequired,
    idToggle: PropTypes.string,
    textInfoWork: PropTypes.string.isRequired,
    emailUser: PropTypes.string.isRequired,
    functionEditInfoUser: PropTypes.func,
};

export default HeaderProfileInfo;
