import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import ControlledInput from "@/Dashboard/Shared/Forms/ControlledInput";
import NumberInput from "@/Dashboard/Shared/NumberInput/NumberInput";
import { useEmployeeInsurance } from "@/hooks/employee/manage/insurance/useEmployeeInsurnace";
import { FormikProvider, useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import ButtonsSteps from "../../../../../../StepsAddNewEmployee/ButtonsSteps/ButtonsSteps";
import {
    initialValues,
    getValidationSchema,
} from "../../../../../../StepsAddNewEmployee/schema/insurance";
import { TInsuranceForm } from "../../../../../../StepsAddNewEmployee/types";
import FileUploader from "@/Dashboard/Shared/FileUploader/FileUploader";
import { Loading } from "@/components";
import { toast } from "react-toastify";
import axiosInstance from "@/utils/axios";
import endpoints from "@/api/endpoints";
import { queryClient } from "@/utils/queryClient";
import { useTranslation } from "react-i18next";

const MedicalInsurancePage = ({
    employeeId,
    closeModal,
}: {
    employeeId: string;
    closeModal: () => void;
}) => {
    const { t } = useTranslation("staffManagement");
    const { data: insurance, isLoading } = useEmployeeInsurance(employeeId);
    const [oldFile, setOldFile] = useState<File | null>(null);
    const [isPending, setIsPending] = useState(false);

    const options = [
        { id: 1, label: t("medicalInsurance.yes") },
        { id: 0, label: t("medicalInsurance.no") },
    ];

    const formik = useFormik<TInsuranceForm>({
        initialValues: initialValues,
        validationSchema: getValidationSchema(),
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (insurance && employeeId) {
                const formData = new FormData();
                formData.append("medical", values.medical.toString());
                
                if (values.medical === 1) {
                    formData.append("number", values.number.toString());
                    formData.append("persons", values.persons.toString());
                    formData.append("category", values.category);
                    formData.append("start_date", values.start_date);
                    formData.append("end_date", values.end_date);
                    if (values.file && values.file[0]) {
                        formData.append("file", values.file[0]["file"]);
                    }
                } else {
                    // When medical is 0, send empty values
                    formData.append("number", "");
                    formData.append("persons", "0");
                    formData.append("category", "");
                    formData.append("start_date", "");
                    formData.append("end_date", "");
                }

                setIsPending(true);
                try {
                    await axiosInstance.post(
                        endpoints.employee.manage.insurance.update(employeeId),
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        }
                    );
                    toast.success(t("medicalInsurance.messages.updateSuccess"));
                    await queryClient.invalidateQueries({
                        queryKey: ["employee-information", `${employeeId}`],
                    });

                    closeModal();
                } catch (error) {
                    console.log(error);
                    toast.error(t("medicalInsurance.messages.updateError"));
                } finally {
                    setIsPending(false);
                }
            }
        },
    });

    useEffect(() => {
        if (insurance) {
            formik.setValues({
                category: insurance.category || "",
                number: insurance.number || "",
                persons: insurance.persons || 1,
                start_date: insurance.start_date || "",
                end_date: insurance.end_date || "",
                medical: insurance.medical || 0,
                file: null,
            });
            setOldFile(insurance.file);
        }
    }, [insurance]);

    const handlemedical = (newValue: number) => {
        formik.setFieldValue("medical", newValue);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="step-login-form">
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <div className="main-form-content grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="content-cheked-details my-4">
                            <h2 className="title text-font-gray mb-4">
                                {t("medicalInsurance.form.hasMedicalInsurance")}
                            </h2>
                            <div className="all-buttons-checked flex items-center gap-3">
                                {options.map((option) => (
                                    <div key={option.id}>
                                        <input
                                            type="radio"
                                            id={option.id.toString()}
                                            name="medical"
                                            value={option.id}
                                            checked={
                                                formik.values.medical ===
                                                option.id
                                            }
                                            onChange={() =>
                                                handlemedical(option.id)
                                            }
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor={option.id.toString()}
                                            onClick={() =>
                                                handlemedical(option.id)
                                            }
                                            className={`cursor-pointer py-2 px-4 rounded-lg ${
                                                formik.values.medical ===
                                                option.id
                                                    ? "bg-lightColorblue border border-primaryColor_01 text-primaryColor_01 "
                                                    : " border  border-gray-300 text-primaryColor_02"
                                            }`}
                                        >
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {formik.values.medical === 1 && (
                            <>
                                <ControlledInput<TInsuranceForm>
                                    fieldName="number"
                                    label={t("medicalInsurance.form.insuranceNumber")}
                                    placeholder={t("medicalInsurance.form.insuranceNumberPlaceholder")}
                                    type="text"
                                />

                                <div className="form-one-step">
                                    <ControlledInput<TInsuranceForm>
                                        fieldName="category"
                                        label={t("medicalInsurance.form.insuranceCategory")}
                                        placeholder={t("medicalInsurance.form.insuranceCategoryPlaceholder")}
                                        type="text"
                                    />
                                </div>

                                <NumberInput
                                    textLabel={t("medicalInsurance.form.personsCount")}
                                    initialValue={formik.values.persons}
                                    min={1}
                                    step={1}
                                    error={formik.errors.persons}
                                    onChange={(value) =>
                                        formik.setFieldValue("persons", value)
                                    }
                                />

                                <div className="input-one-details">
                                    <DatePickerComponent
                                        label={t("medicalInsurance.form.startDate")}
                                        addTextPlaceHolder={"--/--/--"}
                                        onDateChange={(date) =>
                                            formik.setFieldValue(
                                                "start_date",
                                                date
                                            )
                                        }
                                    />
                                    {formik.errors.start_date && (
                                        <p className="text-red-500 text-sm">
                                            {formik.errors.start_date}
                                        </p>
                                    )}
                                </div>

                                <div className="input-one-details">
                                    <DatePickerComponent
                                        label={t("medicalInsurance.form.endDate")}
                                        addTextPlaceHolder={"--/--/--"}
                                        onDateChange={(date) =>
                                            formik.setFieldValue(
                                                "end_date",
                                                date
                                            )
                                        }
                                    />
                                    {formik.errors.end_date && (
                                        <p className="text-red-500 text-sm">
                                            {formik.errors.end_date}
                                        </p>
                                    )}
                                </div>

                                <div className="sm:col-span-1 md:col-span-2">
                                    <FileUploader
                                        textLabel={t("medicalInsurance.form.attachFile")}
                                        name="file"
                                        maxFiles={1}
                                        error={
                                            formik.touched.file &&
                                            formik.errors.file
                                        }
                                    />
                                    {oldFile && (
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {t("medicalInsurance.form.oldFile")}{" "}
                                                <>
                                                    <img
                                                        src={oldFile}
                                                        alt="oldFile"
                                                        className="w-40 h-40"
                                                    />
                                                </>
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                    <ButtonsSteps
                        isShowPrevButton={false}
                        isNextText={false}
                        disabled={isPending}
                        isNextDisabled={false}
                        functionNext={formik.handleSubmit}
                        isLoading={isPending}
                    />
                </form>
            </FormikProvider>
        </div>
    );
};

MedicalInsurancePage.propTypes = {
    onPrev: PropTypes.func.isRequired,
};

export default MedicalInsurancePage;
