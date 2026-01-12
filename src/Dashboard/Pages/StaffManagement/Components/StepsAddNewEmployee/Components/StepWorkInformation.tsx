import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import ControlledSelect from "@/Dashboard/Shared/SelectBox/ControlledSelect";
import { FormikProvider, useFormik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonsSteps from "../ButtonsSteps/ButtonsSteps";
import { initialValues, workDataSchema } from "../schema/workInformation";
import { TEmployeeForm, TWorkdataForm } from "../types";
import { useWorkdataContext } from "../providers/WorkdataProvider";
import { useUpdateWorkdata } from "@/hooks/employee/manage/workdata/useUpdateWorkdata";
import { TSelectOption } from "@/types/forms";
import { Employee, Place } from "@/Dashboard/Pages/types";
import { FullRoutes } from "@/Routes/routes";
import { toast } from "react-toastify";
import { Loading } from "@/components";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useEmployeeContext } from "../providers/EmployeeProvider";

const StepWorkInformation = ({ onPrev }) => {
    const { t } = useTranslation("staffManagement");
    const lang = i18next.language;
    const { id } = useParams();
    const { workdata, isPending } = useWorkdataContext();
    const { employee, isPending: employeePendingData } = useEmployeeContext();

    const { mutate: updateWorkData, isPending: isUpdating } =
        useUpdateWorkdata();
    const navigate = useNavigate();

    const formik = useFormik<TWorkdataForm>({
        initialValues,
        validationSchema: workDataSchema,
        onSubmit: (formData, { setErrors }) => {
            if (id) {
                console.log({ formData });

                const formatedData = {
                    ...formData,
                    workplaces: Array.from(new Set(formData.workplaces)).map(
                        Number
                    ),
                    role_id: formData.role_id,
                };
                updateWorkData(
                    {
                        id,
                        workdata: { ...formatedData },
                    },
                    {
                        onSuccess: () => {
                            toast.success(t("messages.successUpdate"));
                              window.location.reload();
                            navigate(
                                FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
                                    {
                                        id: String(id),
                                    }
                                )
                            );
                        },
                        onError: (error) => {
                            setErrors(error.response?.data?.errors || {});
                            toast.error(error.response?.data?.message);
                        },
                    }
                );
            }
        },
    });

    useEffect(() => {
        if (workdata) {
            formik.setValues({
                trail_end: workdata.trail_end,
                hire_date: workdata.hire_date,
                manger_id: workdata.manger?.id,
                law_country_id: workdata.law_country?.id,
                worktime_id: workdata.worktime?.id,
                workplaces: (workdata.places ?? []).map((place: Place) =>
                    String(place.id)
                ),
                role_id: workdata.role?.id,



                category_id: employee?.category_id?.id ?? 0,
                jobtitle_id: employee.jobtitle?.id ?? 0,
                contract_type_id: employee.contracttype?.id ?? null,
                job_type_id: employee.jobtype?.id ?? 0,

            });
        } else formik.resetForm();
    }, [workdata]);

    if (isPending) return <Loading />;

    return (
        <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
                <div className="main-form-content grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="input-one-details">
                        <DatePickerComponent
                            label={t("employeeInfo.hireDate")}
                            addTextPlaceHolder="--/--/--"
                            onDateChange={(date) =>
                                formik.setFieldValue("hire_date", date)
                            }
                        />
                        {formik.errors.hire_date && (
                            <p className="text-red-500">
                                {formik.errors.hire_date}
                            </p>
                        )}
                    </div>
                    <div className="input-one-details">
                        <DatePickerComponent
                            label={t("employeeInfo.trialEndDate")}
                            addTextPlaceHolder="--/--/--"
                            onDateChange={(date) =>
                                formik.setFieldValue("trail_end", date)
                            }
                        />
                        {formik.errors.trail_end && (
                            <p className="text-red-500">
                                {formik.errors.trail_end}
                            </p>
                        )}
                    </div>
                    <div className="form-one-step">
                        <ControlledSelect<TWorkdataForm>
                            type="sync"
                            apiEndpoint="/employee"
                            customMapping={(data: Array<Employee>) =>
                                data.map(
                                    (employee): TSelectOption => ({
                                        label: `${employee.first_name} ${employee.last_name}`,
                                        value: employee.id,
                                    })
                                )
                            }
                            fieldName="manger_id"
                            label={t("employeeInfo.directManager")}
                        />
                    </div>

                    <div className="form-one-step">
                        <ControlledSelect<TWorkdataForm>
                            type="sync"
                            apiEndpoint="/nationalities"
                            fieldName="law_country_id"
                            label={t("employeeInfo.legalResidenceCountry")}
                        />
                    </div>

                    <div className="form-one-step">
                        <ControlledSelect<TWorkdataForm>
                            type="sync"
                            apiEndpoint="/worktime"
                            fieldName="worktime_id"
                            label={t("workInfo.workTime")}
                        />
                    </div>

                    <div className="form-one-step">
                        <ControlledSelect<TEmployeeForm>
                            type="sync"
                            apiEndpoint="/role"
                            customMapping={(data) =>
                                data.map((item: { id: any; name: any }) => ({
                                    value: item.id,
                                    label: item.name,
                                }))
                            }
                            fieldName="role_id"
                            label={t("personalInfo.role")}
                        />
                    </div>
                    <div className="form-one-step">
                        <ControlledSelect<TWorkdataForm>
                            type="sync"
                            apiEndpoint="/workplace"
                            fieldName="workplaces"
                            customMapping={(data: Array<Place>) =>
                                data.map(
                                    (workplace): TSelectOption => ({
                                        label: lang === "ar" ? workplace.ar_title : workplace.en_title,
                                        value: String(workplace.id),
                                    })
                                )
                            }
                            label={t("workInfo.workplaces")}
                            isMulti={true}
                        />
                    </div>
                    <div className="form-one-step">
                        <ControlledSelect<TEmployeeForm>
                            type="sync"
                            apiEndpoint="/employee-categories"
                            fieldName="category_id"
                            label={t("personalInfo.department")}
                        />
                    </div>
                    <div className="form-one-step">
                        <ControlledSelect<TEmployeeForm>
                            type="sync"
                            apiEndpoint="/job-title"
                            fieldName="jobtitle_id"
                            label={t("personalInfo.jobTitle")}
                        />
                    </div>
                    <div className="form-one-step">
                        <ControlledSelect<TEmployeeForm>
                            type="sync"
                            apiEndpoint="/contract-type"
                            fieldName="contract_type_id"
                            label={t("employeeInfo.contractType")}
                        />
                    </div>
                    <div className="form-one-step">
                        <ControlledSelect<TEmployeeForm>
                            type="sync"
                            apiEndpoint="/job-type"
                            fieldName="job_type_id"
                            label={t("personalInfo.jobType")}
                        />
                    </div>
                </div>
                <ButtonsSteps
                    isShowPrevButton={false}
                    functionPrev={onPrev}
                    isNextText={false}
                    disabled={isUpdating}
                    isNextDisabled={false}
                    functionNext={() => { }}
                    isLoading={isUpdating}
                />
            </form>
        </FormikProvider>
    );
};

StepWorkInformation.propTypes = {
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
};

export default StepWorkInformation;
