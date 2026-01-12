import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import ControlledSelect from "@/Dashboard/Shared/SelectBox/ControlledSelect";
import { FullRoutes } from "@/Routes/routes";
import { useCreateNewEmployee } from "@/hooks/employee/manage/information/useCreateNewEmployee";
import { useUpdateEmployee } from "@/hooks/employee/manage/information/useUpdateEmployee";
import { FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonsSteps from "../ButtonsSteps/ButtonsSteps";
import GetInputClassNames from "../GetInputClassNames/GetInputClassNames";
import { useEmployeeContext } from "../providers/EmployeeProvider";
import { personalInformationSchema } from "../schema/personalInformation";
import { TEmployeeForm } from "../types";
import { Loading } from "@/components";
import { useTranslation } from "react-i18next";

const maritalStatusOptions = [
    { value: "single", label: "أعزب" },
    { value: "married", label: "متزوج" },
    { value: "divorced", label: "مطلق" },
    { value: "widowed", label: "أرمل" },
];
const genderOptions = [
    { value: "male", label: "ذكر" },
    { value: "female", label: "أنثى" },
];

const StepPersonalInformation = () => {
    const { id } = useParams();
    const { employee, isPending } = useEmployeeContext();
    const { mutate: createEmployee, isPending: isCreating } =
        useCreateNewEmployee();
    const { mutate: updateEmployee, isPending: isUpdating } = useUpdateEmployee(
        {}
    );
    const navigate = useNavigate();
    const { t } = useTranslation("staffManagement");
    const formik = useFormik<TEmployeeForm>({
        initialValues: {
            first_name: "",
            last_name: "",
            full_name: "",
            nationality_id: 0,
            birth_date: "",
            jobtitle_id: 0,
            category_id: 0,
            phone: "",
            email: "",
            marital_status: "",
            gender: "",
            id_number: "",
            code: "",
            send_invite: false,
            contract_type_id: null,
            job_type_id: null,
        },
        initialTouched: {
            first_name: Boolean(id),
            last_name: Boolean(id),
            full_name: Boolean(id),
            nationality_id: Boolean(id),
            birth_date: Boolean(id),
            jobtitle_id: Boolean(id),
            contract_type_id: Boolean(id),
            job_type_id: Boolean(id),
            code: Boolean(id),
            category_id: Boolean(id),
            phone: Boolean(id),
            email: Boolean(id),
            marital_status: Boolean(id),
            gender: Boolean(id),
            id_number: Boolean(id),
        },
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: personalInformationSchema,
        onSubmit: (values, { setTouched, setErrors }) => {
            // Mark all fields as touched on submit
            setTouched({
                first_name: true,
                last_name: true,
                full_name: true,
                nationality_id: true,
                birth_date: true,
                jobtitle_id: true,
                category_id: true,
                phone: true,
                email: true,
                marital_status: true,
                gender: true,
                id_number: true,
                code: true,
                send_invite: true,
                contract_type_id: true,
                job_type_id: true,
            });

            if (!formik.isValid) {
                return;
            }

            const payload = { ...values };
            delete payload.image;
            delete payload.category;

            const fitleredData = Object.fromEntries(
                Object.entries(payload).filter(
                    ([key, value]) => {
                        // Remove undefined values
                        if (value === undefined) return false;
                        // Remove 0 values for these specific fields
                        if (["category_id", "jobtitle_id", "contract_type_id", "job_type_id"].includes(key) && (value === 0 || value === null)) {
                            return false;
                        }
                        return true;
                    }
                )
            );

            if (fitleredData.send_invite !== undefined) {
                fitleredData.send_invite = fitleredData.send_invite ? 1 : 0;
            }

            if (id) {
                const { send_invite, ...editPayload } = fitleredData;
                updateEmployee(
                    { id, employeeData: editPayload },
                    {
                        onSuccess: () => {
                            toast.success(t("messages.successUpdate"));
                            navigate(
                                FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
                                    {
                                        id: String(id),
                                    }
                                )
                            );
                        },
                        onError: (error: any) => {
                            if (error.response?.data?.errors) {
                                setErrors(error.response.data.errors);
                            }
                            toast.error(
                                error.response?.data?.message ||
                                t("messages.error")
                            );
                        },
                    }
                );
            } else {
                createEmployee(fitleredData, {
                    onSuccess: (res) => {
                        toast.success(t("messages.successAdd"));
                        navigate(
                            FullRoutes.Dashboard.StaffManagement.StaffEmployeeInformationWithId(
                                {
                                    id: String(res?.id),
                                }
                            )
                        );
                    },
                    onError: (error: any) => {
                        if (error.response?.data?.errors) {
                            setErrors(error.response.data.errors);
                        }
                        toast.error(
                            error.response?.data?.message || t("messages.error")
                        );
                    },
                });
            }
        },
    });

    useEffect(() => {
        if (employee) {
            const {
                assets,
                files,
                workdata,
                tickets,
                salaries,
                nationality,
                insurance,
                jobtitle,
                idtype,
                contracttype,
                jobtype,
                ...rest
            } = employee;

            formik.setValues({
                ...rest,
                category_id: employee?.category_id?.id ?? 0,
                nationality_id: employee.nationality?.id,
                jobtitle_id: employee.jobtitle?.id ?? 0,
                contract_type_id: employee.contracttype?.id ?? null,
                job_type_id: employee.jobtype?.id ?? 0,
            });
        } else formik.resetForm();
    }, [employee]);

    const isNextDisabled = !formik.isValid && formik.submitCount > 0;

    if (isPending) return <Loading />;
    return (
        <div className="all-form-steps">
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <div className="main-form-content grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`form-one-step`}>
                            <label className="label-text">
                                {t("personalInfo.firstName")}
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                className={GetInputClassNames(
                                    formik,
                                    "first_name"
                                )}
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                value={formik.values.first_name}
                                placeholder={t("personalInfo.firstName")}
                            // onWheel={(e) => e.target.blur()}
                            />
                            {formik.touched.first_name &&
                                formik.errors.first_name && (
                                    <div className="error-text">
                                        {formik.errors.first_name}
                                    </div>
                                )}
                        </div>
                        <div className={`form-one-step`}>
                            <label className="label-text">
                                {t("personalInfo.lastName")}
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                className={GetInputClassNames(
                                    formik,
                                    "last_name"
                                )}
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                value={formik.values.last_name}
                                placeholder={t("personalInfo.lastName")}
                            // onWheel={(e) => e.target.blur()}
                            />
                            {formik.touched.last_name &&
                                formik.errors.last_name && (
                                    <div className="error-text">
                                        {formik.errors.last_name}
                                    </div>
                                )}
                        </div>
                        <div className={`form-one-step`}>
                            <label className="label-text">
                                {t("personalInfo.fullName")}
                            </label>
                            <input
                                type="text"
                                name="full_name"
                                className={GetInputClassNames(
                                    formik,
                                    "full_name"
                                )}
                                onChange={formik.handleChange}
                                // onBlur={formik.handleBlur}
                                value={formik.values.full_name}
                                placeholder={t("personalInfo.fullName")}
                            // onWheel={(e) => e.target.blur()}
                            />
                            {formik.touched.full_name &&
                                formik.errors.full_name && (
                                    <div className="error-text">
                                        {formik.errors.full_name}
                                    </div>
                                )}
                        </div>


                        <div className="input-one-details">
                            {/* <DatePickerComponent
                                label={t("personalInfo.birthDate")}
                                onDateChange={(date) =>
                                    formik.setFieldValue("birth_date", date)
                                }
                                value={formik.values.birth_date}
                                isDefault={true}
                            /> */}

                         {/* {formik.values.birth_date && (
  <DatePickerComponent
    label={t("personalInfo.birthDate")}
    value={formik.values.birth_date}
    onDateChange={(date) => formik.setFieldValue("birth_date", date)}
    placeholder={t("personalInfo.birthDate")}
    error={formik.touched.birth_date && formik.errors.birth_date ? formik.errors.birth_date : undefined}
  />
)} */}

 <DatePickerComponent
  key={formik.values.birth_date || "empty"}
  value={formik.values.birth_date ? formik.values.birth_date : undefined}
  onDateChange={(date) => formik.setFieldValue("birth_date", date)}
  label={t("personalInfo.birthDate")}
  placeholder={t("personalInfo.birthDate")}
  error={
    formik.touched.birth_date && formik.errors.birth_date
      ? formik.errors.birth_date
      : undefined
  }
/>





                            {formik.touched.birth_date &&
                                formik.errors.birth_date && (
                                    <div className="error-text">
                                        {formik.errors.birth_date}
                                    </div>
                                )}
                        </div>
                        <div className="form-one-step">
                            <ControlledSelect<TEmployeeForm>
                                type="sync"
                                apiEndpoint="/nationalities"
                                fieldName="nationality_id"
                                label={t("personalInfo.nationality")}
                            />
                        </div>
                        {/* <div className="form-one-step">
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
                        </div> */}

                        <div className={`form-one-step`}>
                            <label className="label-text">
                                {t("personalInfo.mobile")}
                            </label>
                            <input
                                type="text"
                                name="phone"
                                className={GetInputClassNames(formik, "phone")}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                placeholder={t("personalInfo.mobile")}
                                onWheel={(e) => e.target.blur()}
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <div className="error-text">
                                    {formik.errors.phone}
                                </div>
                            )}
                        </div>

                        <div className={`form-one-step`}>
                            <label className="label-text">
                                {t("personalInfo.email")}
                            </label>
                            <input
                                type="email"
                                name="email"
                                className={GetInputClassNames(formik, "email")}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                placeholder={t("personalInfo.email")}
                                onWheel={(e) => e.target.blur()}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="error-text">
                                    {formik.errors.email}
                                </div>
                            )}
                        </div>
                        <div className="form-one-step">
                            <ControlledSelect<TEmployeeForm>
                                type="static"
                                staticOptions={genderOptions}
                                fieldName="gender"
                                label={t("personalInfo.gender")}
                            />
                        </div>
                        <div className="form-one-step">
                            <ControlledSelect<TEmployeeForm>
                                type="static"
                                staticOptions={maritalStatusOptions}
                                fieldName="marital_status"
                                label={t("personalInfo.maritalStatus")}
                            />
                        </div>
                        <div className="form-one-step">
                            <label className="label-text">
                                {t("employeeInfo.idNumber")}
                            </label>
                            <input
                                type="text"
                                name="id_number"
                                className={GetInputClassNames(
                                    formik,
                                    "id_number"
                                )}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.id_number}
                                placeholder={t("employeeInfo.idNumber")}
                            />
                            {formik.touched.id_number &&
                                formik.errors.id_number && (
                                    <div className="error-text">
                                        {formik.errors.id_number}
                                    </div>
                                )}
                        </div>

                        <div className="form-one-step">
                            <label className="label-text">
                                {t("table.headers.employeeCode")}
                            </label>
                            <input
                                type="text"
                                name="code"
                                className={GetInputClassNames(formik, "code")}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.code}
                                placeholder={t("table.headers.employeeCode")}
                            />
                            {formik.touched.code && formik.errors.code && (
                                <div className="error-text">
                                    {formik.errors.code}
                                </div>
                            )}
                        </div>

                        {!id && (
                            <div className="sm:col-span-1 md:col-span-2 mt-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="send_invite"
                                        name="send_invite"
                                        className="w-4 h-4 text-blue-600 rounded"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        checked={formik.values.send_invite}
                                    />
                                    <label
                                        htmlFor="send_invite"
                                        className="text-sm"
                                    >
                                        {t("personalInfo.mmesage")}
                                    </label>
                                </div>
                                {formik.touched.send_invite &&
                                    formik.errors.send_invite && (
                                        <div className="error-text">
                                            {formik.errors.send_invite}
                                        </div>
                                    )}
                            </div>
                        )}
                    </div>

                    <ButtonsSteps
                        isShowPrevButton={false}
                        isNextText={isNextDisabled ? "next" : "save"}
                        disabled={isNextDisabled || isCreating || isUpdating}
                        isNextDisabled={isNextDisabled}
                        isLoading={isCreating || isUpdating}
                    />
                </form>
            </FormikProvider>
        </div>
    );
};

export default StepPersonalInformation;
