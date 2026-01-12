import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import TimePickerSelect from "@/Dashboard/Shared/TimePickerSelect/TimePickerSelect";

const options = {
    periodTimeOption: [
        { value: "day", label: "صباحي" },
        { value: "night", label: "مسائي" },
    ],
    vacationDaysOption: [
        { value: "0", label: "الأحد" },
        { value: "1", label: "الأثنين" },
        { value: "2", label: "الثلاثاء" },
        { value: "3", label: "الأربعاء" },
        { value: "4", label: "الخميس" },
        { value: "5", label: "الجمعة" },
        { value: "6", label: "السبت" },
    ],
    booleanOptions: [
        { value: 1, label: "نعم" },
        { value: 0, label: "لا" },
    ],
};

interface FormValues {
    shiftNameAr: string;
    shiftNameEn: string;
    time_from: string;
    time_to: string;
    period: { value: string; label: string } | null;
    vacationDays: { value: string; label: string }[];
    flexible: { value: number; label: string } | null;
    flexible_time: number;
    break: number;
    absent_after: number;
}

const initialValues: FormValues = {
    shiftNameAr: "",
    shiftNameEn: "",
    time_from: "",
    time_to: "",
    period: null,
    vacationDays: [],
    flexible: null,
    flexible_time: 10,
    break: 15,
    absent_after: 15,
};

interface FormComponentProps {
    initialValuesForEdit?: FormValues | null;
    loading?: boolean;
    handleSubmit?: (values: any) => void;
    cancel?: () => void;
}


const FormComponent: React.FC<FormComponentProps> = ({
    initialValuesForEdit = null,
    loading = false,
    handleSubmit = () => {},
    cancel,
}) => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        shiftNameAr: Yup.string()
            .required("الاسم باللغة العربية مطلوب")
            .matches(
                /^[\u0621-\u064A\s]+$/,
                "يجب إدخال الاسم  باللغة العربية فقط"
            ),
        shiftNameEn: Yup.string()
            .required("الاسم باللغة الإنجليزية مطلوب")
            .matches(
                /^[A-Za-z\s]+$/,
                "يجب إدخال الاسم  باللغة الإنجليزية فقط"
            ),
        time_from: Yup.string().required("وقت العمل من مطلوب"),
        time_to: Yup.string().required("وقت العمل إلى مطلوب"),
        period: Yup.object().nullable().required("يجب اختيار الفترة"),
        vacationDays: Yup.array()
            .min(1, "يجب اختيار أيام الإجازة")
            .required("يجب اختيار أيام الإجازة"),
        flexible: Yup.object()
            .nullable()
            .required("يجب اختيار هل المناوبة مرنة"),
        flexible_time: Yup.number()
            .required("الوقت المرن مطلوب")
            .positive("يجب أن يكون الوقت المرن رقم موجب"),
        break: Yup.number()
            .required("وقت الاستراحة مطلوب")
            .positive("يجب أن يكون وقت الاستراحة رقم موجب"),
        absent_after: Yup.number()
            .required("الغياب بعد مطلوب")
            .positive("يجب أن يكون الغياب بعد رقم موجب"),
    });

    const onSubmit = (values: FormValues) => {
        const formData = {
            en: {
                title: values.shiftNameEn,
            },
            ar: {
                title: values.shiftNameAr,
            },
            time_from: values.time_from,
            time_to: values.time_to,
            period: values.period?.value,
            vacation_days: values.vacationDays?.map((day) => day.value),
            flexible: values.flexible?.value,
            flexible_time: values.flexible_time,
            break: values.break,
            absent_after: values.absent_after,
        };
        handleSubmit(formData);
    };

    return (
        <Formik
            initialValues={initialValuesForEdit || initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
        >
            {({ errors, touched, handleSubmit, setFieldValue, values }) => (
                <Form>
                    <div className="all-forms-grid grid-cards-2">
                        <div className="input-one-details">
                            <InputField
                                isShowLabel={true}
                                label="الاسم باللغة العربية"
                                name="shiftNameAr"
                                type="text"
                                placeholder="الاسم باللغة العربية"
                                success
                                error={
                                    touched.shiftNameAr && errors.shiftNameAr
                                }
                            />
                        </div>
                        <div className="input-one-details">
                            <InputField
                                isShowLabel={true}
                                label="الاسم باللغة الإنجليزية"
                                name="shiftNameEn"
                                type="text"
                                placeholder="الاسم باللغة الإنجليزية"
                                success
                                error={
                                    touched.shiftNameEn && errors.shiftNameEn
                                }
                            />
                        </div>

                        <TimePickerSelect
                            textLable="وقت العمل من"
                            onTimeChange={(time) =>
                                setFieldValue("time_from", time)
                            }
                            error={touched.time_from && errors.time_from}
                        />
                        <TimePickerSelect
                            textLable="وقت العمل إلى"
                            onTimeChange={(time) =>
                                setFieldValue("time_to", time)
                            }
                            error={touched.time_to && errors.time_to}
                        />
                        <div className="input-one-details">
                            <Field name="flexible">
                                {({ field }: { field: any }) => (
                                    <SelectBox
                                        isShowLabel={true}
                                        label="هل وقت العمل مرن؟"
                                        options={options.booleanOptions}
                                        onChange={(option: any) =>
                                            setFieldValue("flexible", option)
                                        }
                                        placeholder="-إختر-"
                                        isSearchable={false}
                                        isMulti={false}
                                        field={field}
                                        error={
                                            touched.flexible && errors.flexible
                                        }
                                    />
                                )}
                            </Field>
                        </div>

                        {values.flexible?.value === 1 && (
                            <div className="input-one-details">
                                <InputField
                                    isShowLabel={true}
                                    label="الوقت المرن (دقائق)"
                                    name="flexible_time"
                                    type="number"
                                    placeholder="الوقت المرن"
                                    success
                                    error={
                                        touched.flexible_time &&
                                        errors.flexible_time
                                    }
                                />
                            </div>
                        )}

                        <div className="input-one-details">
                            <InputField
                                isShowLabel={true}
                                label="وقت الاستراحة (دقائق)"
                                name="break"
                                type="number"
                                placeholder="وقت الاستراحة"
                                success
                                error={touched.break && errors.break}
                            />
                        </div>

                        <div className="input-one-details">
                            <InputField
                                isShowLabel={true}
                                label="الغياب بعد (دقائق)"
                                name="absent_after"
                                type="number"
                                placeholder="الغياب بعد"
                                success
                                error={
                                    touched.absent_after && errors.absent_after
                                }
                            />
                        </div>

                        <div className="input-one-details">
                            <Field name="period">
                                {({ field }: { field: any }) => (
                                    <SelectBox
                                        isShowLabel={true}
                                        label="الفترة"
                                        options={options.periodTimeOption}
                                        onChange={(option: any) =>
                                            setFieldValue("period", option)
                                        }
                                        placeholder="-إختر-"
                                        isSearchable={false}
                                        isMulti={false}
                                        field={field}
                                        error={touched.period && errors.period}
                                    />
                                )}
                            </Field>
                        </div>

                        <div className="input-one-details">
                            <Field name="vacationDays">
                                {({ field }: { field: any }) => (
                                    <SelectBox
                                        isShowLabel={true}
                                        label="أيام الأجازة"
                                        options={options.vacationDaysOption}
                                        onChange={(option: any) =>
                                            setFieldValue(
                                                "vacationDays",
                                                option
                                            )
                                        }
                                        placeholder="-إختر-"
                                        isSearchable={false}
                                        isMulti={true}
                                        field={field}
                                        error={
                                            touched.vacationDays &&
                                            errors.vacationDays
                                        }
                                    />
                                )}
                            </Field>
                        </div>
                    </div>

                    <ButtonsFormSendCancel
                        cancelAdd={() => (cancel ? cancel() : navigate(-1))}
                        submitButton={handleSubmit}
                        isSubmitting={loading}
                    />
                </Form>
            )}
        </Formik>
    );
};

export default FormComponent;
