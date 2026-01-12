import React, { useEffect } from "react";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import { Field, Form, Formik } from "formik";

import "react-clock/dist/Clock.css";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { useNavigate, useParams } from "react-router-dom";
import TimePickerSelect from "@/Dashboard/Shared/TimePickerSelect/TimePickerSelect";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import axiosInstance from "@/utils/axios";
import { FullRoutes } from "@/Routes/routes";
import { useWorkTime } from "@/hooks/api/system-settings";
import { Loading } from "@/components";
const FormAddShift = () => {
    const { id } = useParams();
    const { queryOne, queryAll } = useWorkTime();

    const {
        data: dataShift = [],
        isLoading: isLoadingShift,
        refetch,
    } = queryOne(id ?? "");

    const options = {
        flexible: [
            { value: "1", label: "مرونة" },
            { value: "0", label: "لا يوجد مرونة" },
        ],
        period: [
            { value: "night", label: "مسائي" },
            { value: "day", label: "صباحي" },
        ],
        vacation_days: [
            { value: "0", label: "الأحد" },
            { value: "1", label: "الأثنين" },
            { value: "2", label: "الثلاثاء" },
            { value: "3", label: "الأربعاء" },
            { value: "4", label: "الخميس" },
            { value: "5", label: "الجمعة" },
            { value: "6", label: "السبت" },
        ],
    };

    const initialValues = {
        ar: {
            title: dataShift?.ar_title ?? "",
        },
        en: {
            title: dataShift?.en_title ?? "",
        },
        time_from: dataShift?.time_from ?? "",
        time_to: dataShift?.time_to ?? "",
        period:
            options.period.find(
                (option) => option.value === dataShift?.period
            ) ?? options.period[0],
        vacation_days:
            dataShift?.vacation_days?.map((day) =>
                options.vacation_days.find((option) => option.value === day)
            ) ?? [],
        flexible:
            options.flexible.find(
                (option) => option.value == dataShift?.flexible
            ) ?? "",
        flexible_time: dataShift?.flexible_time ?? "",
        absent_after: dataShift?.absent_after ?? "",
        break: dataShift?.break ?? "",
    };

    const validationSchema = Yup.object({
        ar: Yup.object({
            title: Yup.string()
                .required("إسم الوردية باللغة العربية مطلوب")
                .matches(
                    /^[\u0621-\u064A\s]+$/,
                    "يجب إدخال الاسم باللغة العربية فقط"
                ),
        }),
        en: Yup.object({
            title: Yup.string()
                .required("إسم الوردية باللغة الإنجليزية مطلوب")
                .matches(
                    /^[A-Za-z\s]+$/,
                    "يجب إدخال الاسم باللغة الإنجليزية فقط"
                ),
        }),
        time_from: Yup.string().required("وقت البداية مطلوب"),
        time_to: Yup.string().required("وقت النهاية مطلوب"),
        period: Yup.object().required("الفترة مطلوبة"),
        flexible: Yup.object().required("المرونة مطلوبة"),
        absent_after: Yup.number(),
        break: Yup.number(),
    });

    const handleSubmit = (
        values,
        { setTouched, setSubmitting, setErrors, resetForm }
    ) => {
        const formattedData = {
            ...values,
            period: values.period.value,
            flexible: values.flexible.value,
            vacation_days: values.vacation_days.map((day) => day.value),
        };
        if (formattedData.flexible === "0") {
            delete formattedData.flexible_time
        }
        if (id) {
            axiosInstance
                .put(`/worktime/${id}`, formattedData)
                .then((res) => {
                    toast.success("تم تعديل الوردية بنجاح!");
                    navigate(FullRoutes.Dashboard.ShiftSchedule.All);
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                    setErrors(err.response.data.errors);
                })
                .finally(() => {
                    setSubmitting(false);
                    refetch();
                    queryAll.refetch();
                });
        } else {
            axiosInstance
                .post("/worktime", formattedData)
                .then((res) => {
                    toast.success("تم إضافة الوردية بنجاح!");
                    navigate(FullRoutes.Dashboard.ShiftSchedule.All);
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                    setErrors(err.response.data.errors);
                })
                .finally(() => {
                    setSubmitting(false);
                    refetch();
                    queryAll.refetch();
                });
        }
    };

    // NAVIGATE CANCEL
    const navigate = useNavigate();

    const cancelAdd = () => {
        toast.success("تم الالغاء بنجاح.");
        navigate(FullRoutes.Dashboard.Orders.All);
    };

    if (id && isLoadingShift) {
        return <Loading />;
    }

    return (
        <div className="form-add-new-request border-width-content mt-5">
            <h2 className="title-head-form text-font-dark pt-3 mb-3">
                إضافة وردية جديدة
            </h2>
            {/* ================= START MAIN FORM NEW ================ */}
            <div className="main-form-new ">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({
                        handleSubmit,
                        setFieldValue,
                        isSubmitting,
                        errors,
                        touched,
                        values,
                    }) => {
                        console.log({ values });

                        return (
                            <Form>
                                <div className="all-forms-grid grid-cards-2">
                                    <InputField
                                        isShowLabel={true}
                                        label="إسم الوردية باللغة العربية"
                                        name={"ar.title"}
                                        type="text"
                                        placeholder="إسم الوردية باللغة العربية"
                                        success
                                        error={
                                            touched.ar?.title &&
                                            errors.ar?.title
                                        }
                                    />
                                    <InputField
                                        isShowLabel={true}
                                        label="إسم الوردية باللغة الانجليزية"
                                        name={"en.title"}
                                        type="text"
                                        placeholder="إسم الوردية باللغة الانجليزية"
                                        success
                                        error={
                                            touched.en?.title &&
                                            errors.en?.title
                                        }
                                    />
                                    {/* ================== START INPUT ONE DETAILS ================== */}
                                    {/* ================== END INPUT ONE DETAILS ================== */}
                                    {/* ================== END INPUT FOUR DETAILS ================== */}
                                    {/* ================== START INPUT ONE DETAILS ================== */}

                                    {/* ================== END INPUT ONE DETAILS ================== */}
                                    <div>
                                        <TimePickerSelect
                                            textLable="توقيت بداية العمل"
                                            onTimeChange={(time) =>
                                                setFieldValue("time_from", time)
                                            }
                                        />
                                        {errors.time_from && (
                                            <p className="text-red-500 text-sm">
                                                {errors.time_from}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <TimePickerSelect
                                            textLable="توقيت نهاية العمل"
                                            onTimeChange={(time) =>
                                                setFieldValue("time_to", time)
                                            }
                                        />
                                        {errors.time_to && (
                                            <p className="text-red-500 text-sm">
                                                {errors.time_to}
                                            </p>
                                        )}
                                    </div>
                                    <div className="input-one-details">
                                        <Field name="period">
                                            {({ field }) => (
                                                <SelectBox
                                                    isShowLabel={true}
                                                    label="الفترة"
                                                    options={options.period}
                                                    onChange={(option) =>
                                                        setFieldValue(
                                                            "period",
                                                            option
                                                        )
                                                    }
                                                    placeholder="-إختر-"
                                                    isSearchable={false}
                                                    isMulti={false}
                                                    field={field}
                                                    error={
                                                        touched.period &&
                                                        errors.period
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </div>
                                    <Field name="vacation_days">
                                        {({ field }) => (
                                            <SelectBox
                                                isShowLabel={true}
                                                label="الأيام الأجازة"
                                                options={options.vacation_days}
                                                onChange={(option) =>
                                                    setFieldValue(
                                                        "vacation_days",
                                                        option
                                                    )
                                                }
                                                placeholder="-إختر-"
                                                isSearchable={false}
                                                isMulti={true}
                                                field={field}
                                                error={
                                                    touched.vacation_days &&
                                                    errors.vacation_days
                                                }
                                            />
                                        )}
                                    </Field>
                                    <Field name="flexible">
                                        {({ field }) => (
                                            <SelectBox
                                                isShowLabel={true}
                                                label="المرونة"
                                                options={options.flexible}
                                                onChange={(option) => {
                                                    setFieldValue(
                                                        "flexible",
                                                        option
                                                    );
                                                    // Reset flexible_time when flexible is set to 0
                                                    if (option.value === "0") {
                                                        setFieldValue(
                                                            "flexible_time",
                                                            ""
                                                        );
                                                    }
                                                }}
                                                placeholder="-إختر-"
                                                isSearchable={false}
                                                isMulti={false}
                                                field={field}
                                                error={
                                                    touched.flexible &&
                                                    errors.flexible
                                                }
                                            />
                                        )}
                                    </Field>
                                    {values.flexible?.value === "1" && (
                                        <InputField
                                            isShowLabel={true}
                                            label="وقت المرونة (بالدقائق)"
                                            name="flexible_time"
                                            type="number"
                                            placeholder="وقت المرونة"
                                        />
                                    )}
                                    <InputField
                                        isShowLabel={true}
                                        label="وقت الراحة (بالدقائق)"
                                        name="break"
                                        type="number"
                                        placeholder="وقت الراحة"
                                    />

                                    <InputField
                                        isShowLabel={true}
                                        label="الغياب بعد (بالدقائق)"
                                        name="absent_after"
                                        type="number"
                                        placeholder="يتم احتساب الغياب بعد هذا الوقت"
                                    />

                                  
                                </div>
                                <ButtonsFormSendCancel
                                    isSubmittingDisabled={isSubmitting}
                                    isSubmitting={isSubmitting}
                                    cancelAdd={cancelAdd}
                                    submitButton={() => handleSubmit()}
                                />
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default FormAddShift;
