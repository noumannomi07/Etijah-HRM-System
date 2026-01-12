import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components";
import { Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faTimes,
    faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import "./form.css";

const initialValues = {
    name: "",
};
interface FormComponentProps {
    initialValuesForEdit?: any;
    loading?: boolean;
    handleSubmit?: (values: any) => void;
    cancel?: () => void;
}

function FormComponent({
    initialValuesForEdit = null,
    loading = false,
    handleSubmit = () => {},
    cancel,
}: FormComponentProps) {
    const { t } = useTranslation("systemSettings");
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        name: Yup.string().required(
            t("rolesManagement.form.validation.name_required")
        ),
    });

    const { data, isLoading: isLoadingPermissions } = useQuery({
        queryKey: ["permissions"],
        queryFn: async () => {
            const response = await axiosInstance.get("/permissions");
            return response.data;
        },
    });

    const permissions = data?.permissions;
    const roleMap = data?.roleMap;

    if (isLoadingPermissions) {
        return <Loading />;
    }

    return (
        <Formik
            initialValues={initialValuesForEdit || initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleSubmit, errors, touched, setFieldValue, values }) => {
                const handleSelectAll = (group: string, roleMap: string[]) => {
                    const newPermissions = [...(values.permissions || [])];
                    roleMap.forEach((action) => {
                        const value = `${group}-${action}`;
                        if (!newPermissions.includes(value)) {
                            newPermissions.push(value);
                        }
                    });
                    setFieldValue("permissions", newPermissions);
                };

                const handleDeselectAll = (
                    group: string,
                    roleMap: string[]
                ) => {
                    const newPermissions = (values.permissions || []).filter(
                        (permission: string) => {
                            return !roleMap.some(
                                (action: string) =>
                                    permission === `${group}-${action}`
                            );
                        }
                    );
                    setFieldValue("permissions", newPermissions);
                };

                const handleSelectAllPermissions = () => {
                    const allPermissions: string[] = [];
                    permissions?.forEach((group: string) => {
                        roleMap?.forEach((action: string) => {
                            allPermissions.push(`${group}-${action}`);
                        });
                    });
                    setFieldValue("permissions", allPermissions);
                };

                const handleDeselectAllPermissions = () => {
                    setFieldValue("permissions", []);
                };

                return (
                    <Form>
                        {/* Header Section */}
                        <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className="text-blue-600 text-xl"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {t("rolesManagement.form.ui.roleInfoTitle")}
                                    </h3>
                                    <p className="text-gray-600">
                                        {t("rolesManagement.form.ui.roleInfoSubtitle")}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <InputField
                                        isShowLabel={true}
                                        label={t(
                                            "rolesManagement.form.fields.name"
                                        )}
                                        name={"name"}
                                        type={"text"}
                                        placeholder={t(
                                            "rolesManagement.form.fields.name"
                                        )}
                                        success
                                        error={touched.name && errors.name}
                                    />
                                </div>
                                <div className="flex items-end">
                                    <div className="w-full p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <div className="flex items-center gap-2 text-sm text-blue-700">
                                            <FontAwesomeIcon
                                                icon={faCheck}
                                                className="text-blue-600"
                                            />
                                            <span>
                                                {t("rolesManagement.form.ui.roleCreationNote")}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Global Permission Controls */}
                        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon
                                            icon={faCheckDouble}
                                            className="text-blue-600 text-lg"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">
                                            {t("rolesManagement.form.ui.globalControlTitle")}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {t("rolesManagement.form.ui.globalControlSubtitle")}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        type="button"
                                        onClick={handleSelectAllPermissions}
                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm font-medium btn-hover-effect"
                                    >
                                        <FontAwesomeIcon
                                            icon={faCheckDouble}
                                            className="text-sm"
                                        />
                                        <span>{t("rolesManagement.form.ui.selectAll")}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDeselectAllPermissions}
                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm font-medium btn-hover-effect"
                                    >
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className="text-sm"
                                        />
                                        <span>{t("rolesManagement.form.ui.deselectAll")}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-3">
                                <div className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span>{t("rolesManagement.form.ui.progressLabel")}</span>
                                    <span>
                                        {values.permissions?.length || 0} {t("rolesManagement.form.ui.of")}{" "}
                                        {permissions?.length *
                                            roleMap?.length || 0}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                                        style={{
                                            width: `${
                                                permissions?.length *
                                                roleMap?.length
                                                    ? ((values.permissions
                                                          ?.length || 0) /
                                                          (permissions?.length *
                                                              roleMap?.length)) *
                                                      100
                                                    : 0
                                            }%`,
                                        }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <span className="text-green-700">
                                            {t("rolesManagement.form.ui.selected")}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                                        <span className="text-gray-600">
                                            {t("rolesManagement.form.ui.remaining")}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-blue-600 font-medium">
                                    {Math.round(
                                        ((values.permissions?.length || 0) /
                                            (permissions?.length *
                                                roleMap?.length || 1)) *
                                            100
                                    )}
                                    % {t("rolesManagement.form.ui.complete")}
                                </div>
                            </div>
                        </div>

                        {/* Permissions Matrix */}
                        <div className="w-full">
                            <div className="mb-8 text-center">
                                <div className="inline-flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            className="text-white text-xl"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-bold gradient-text mb-2">
                                            {t("rolesManagement.form.ui.permissions")}
                                        </h3>
                                        <p className="text-gray-600 text-lg">
                                            {t("rolesManagement.form.ui.roleInfoSubtitle")}
                                        </p>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 card-entrance">
                                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="text-blue-600"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-gray-800">
                                                    {values.permissions
                                                        ?.length || 0}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {t("rolesManagement.form.ui.selectedPermission")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                <FontAwesomeIcon
                                                    icon={faCheckDouble}
                                                    className="text-green-600"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-gray-800">
                                                    {permissions?.length || 0}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {t("rolesManagement.form.ui.permissionGroup")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                                <FontAwesomeIcon
                                                    icon={faCheck}
                                                    className="text-purple-600"
                                                />
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-gray-800">
                                                    {Math.round(
                                                        ((values.permissions
                                                            ?.length || 0) /
                                                            (permissions?.length *
                                                                roleMap?.length ||
                                                                1)) *
                                                            100
                                                    )}
                                                    %
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {t("rolesManagement.form.ui.completionRate")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8 stats-grid">
                                {permissions &&
                                    permissions.map((group: string) => {
                                        const selectedCount =
                                            roleMap?.filter(
                                                (action: string) => {
                                                    const value = `${group}-${action}`;
                                                    return values.permissions?.includes(
                                                        value
                                                    );
                                                }
                                            ).length || 0;

                                        const isAllSelected =
                                            selectedCount === roleMap?.length;
                                        const isPartiallySelected =
                                            selectedCount > 0 &&
                                            selectedCount <
                                                (roleMap?.length || 0);
                                        const progressPercentage =
                                            roleMap?.length
                                                ? (selectedCount /
                                                      roleMap.length) *
                                                  100
                                                : 0;

                                        return (
                                            <div
                                                key={group}
                                                className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:scale-105 permission-card card-entrance card-stagger"
                                            >
                                                {/* Header */}
                                                <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h4 className="text-lg font-bold text-gray-800 capitalize">
                                                            {t(
                                                                `rolesManagement.permissions.${group}`
                                                            )}
                                                        </h4>
                                                        <div
                                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                                isAllSelected
                                                                    ? "bg-green-100 status-pulse"
                                                                    : isPartiallySelected
                                                                    ? "bg-orange-100"
                                                                    : "bg-gray-100"
                                                            }`}
                                                        >
                                                            {isAllSelected ? (
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCheck
                                                                    }
                                                                    className="text-green-600 text-sm"
                                                                />
                                                            ) : isPartiallySelected ? (
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCheck
                                                                    }
                                                                    className="text-orange-600 text-sm"
                                                                />
                                                            ) : (
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faTimes
                                                                    }
                                                                    className="text-gray-400 text-sm"
                                                                />
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="mb-2">
                                                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                                                            <span>{t("rolesManagement.form.ui.progress")}</span>
                                                            <span>
                                                                {selectedCount}/
                                                                {roleMap?.length ||
                                                                    0}
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className={`h-2 rounded-full transition-all duration-500 ease-out ${
                                                                    isAllSelected
                                                                        ? "bg-green-500"
                                                                        : isPartiallySelected
                                                                        ? "bg-orange-500"
                                                                        : "bg-gray-300"
                                                                }`}
                                                                style={{
                                                                    width: `${progressPercentage}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>

                                                    {/* Control Buttons */}
                                                    <div className="flex gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleSelectAll(
                                                                    group,
                                                                    roleMap ||
                                                                        []
                                                                )
                                                            }
                                                            className={`flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs rounded transition-all duration-200 btn-hover-effect ${
                                                                isAllSelected
                                                                    ? "bg-green-100 text-green-700 border border-green-300"
                                                                    : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 hover:scale-105"
                                                            }`}
                                                            title={t("rolesManagement.form.ui.selectGroupAll")}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faCheckDouble
                                                                }
                                                                className="text-xs"
                                                            />
                                                            <span>
                                                                {t("rolesManagement.form.ui.selectGroupAll")}
                                                            </span>
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeselectAll(
                                                                    group,
                                                                    roleMap ||
                                                                        []
                                                                )
                                                            }
                                                            className="flex-1 flex items-center justify-center gap-1 px-2 py-1 text-xs rounded bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-all duration-200 hover:scale-105 btn-hover-effect"
                                                            title={t("rolesManagement.form.ui.deselectGroupAll")}
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTimes}
                                                                className="text-xs"
                                                            />
                                                            <span>
                                                                {t("rolesManagement.form.ui.deselectGroupAll")}
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Permissions List */}
                                                <div className="p-4 max-h-64 overflow-y-auto custom-scrollbar">
                                                    <div className="space-y-2">
                                                        {roleMap?.map(
                                                            (
                                                                action: string
                                                            ) => {
                                                                const value = `${group}-${action}`;
                                                                const isChecked =
                                                                    values.permissions?.includes(
                                                                        value
                                                                    );
                                                                return (
                                                                    <label
                                                                        key={
                                                                            action
                                                                        }
                                                                        className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                                                                            isChecked
                                                                                ? "bg-blue-50 border border-blue-200"
                                                                                : "border border-transparent"
                                                                        }`}
                                                                    >
                                                                        <Field
                                                                            type="checkbox"
                                                                            name="permissions"
                                                                            value={
                                                                                value
                                                                            }
                                                                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out rounded"
                                                                        />
                                                                        <span className="capitalize text-sm font-medium text-gray-700">
                                                                            {t(
                                                                                `rolesManagement.rolemap.${action}`
                                                                            )}
                                                                        </span>
                                                                        {isChecked && (
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faCheck
                                                                                }
                                                                                className="text-blue-600 text-xs ml-auto"
                                                                            />
                                                                        )}
                                                                    </label>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </div>
                        {/* End Permissions Matrix */}

                        <ButtonsFormSendCancel
                            cancelAdd={() => (cancel ? cancel() : navigate(-1))}
                            submitButton={handleSubmit}
                            isSubmitting={loading}
                        />
                    </Form>
                );
            }}
        </Formik>
    );
}

export default FormComponent;
