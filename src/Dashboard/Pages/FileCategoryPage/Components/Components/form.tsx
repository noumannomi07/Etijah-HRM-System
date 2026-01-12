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
    en: {
        title: string;
    };
    ar: {
        title: string;
    };
    is_required: number;
    notify_months: number;
    end_notify: number;
}

const initialValues: FormValues = {
    en: {
        title: "",
    },
    ar: {
        title: "",
    },
    is_required: 0,
    notify_months: 0,
    end_notify: 0,
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
        ar: Yup.object({
            title: Yup.string()
                .required("إسم المستند باللغة العربية مطلوب")
                .matches(
                    /^[\u0621-\u064A\s]+$/,
                    "يجب إدخال إسم المستند باللغة العربية فقط"
                ),
        }),
        en: Yup.object({
            title: Yup.string()
                .required("إسم المستند باللغة الإنجليزية مطلوب")
                .matches(
                    /^[A-Za-z\s]+$/,
                    "يجب إدخال إسم المستند باللغة الإنجليزية فقط"
                ),
        }),
        is_required: Yup.object().nullable().required("هل مطلوب ملف ؟ مطلوب"),
        end_notify: Yup.object()
            .nullable()
            .required("هل يوجد اشعار كثير ؟ مطلوب"),
        notify_months: Yup.number().required("عدد الاشهر المطلوب"),
    });

    const onSubmit = (values: FormValues) => {
        const formData = {
            en: {
                title: values.en.title,
            },
            ar: {
                title: values.ar.title,
            },
            is_required: values.is_required.value,
            notify_months: values.notify_months,
            end_notify: values.end_notify.value,
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
                                name="ar.title"
                                type="text"
                                placeholder="الاسم باللغة العربية"
                                success
                                error={touched?.ar?.title && errors?.ar?.title}
                            />
                        </div>
                        <div className="input-one-details">
                            <InputField
                                isShowLabel={true}
                                label="الاسم باللغة الإنجليزية"
                                name="en.title"
                                type="text"
                                placeholder="الاسم باللغة الإنجليزية"
                                success
                                error={touched?.en?.title && errors?.en?.title}
                            />
                        </div>

                        <div className="input-one-details">
                            <Field name="is_required">
                                {({ field }: { field: any }) => (
                                    <SelectBox
                                        isShowLabel={true}
                                        label="هل مطلوب ؟"
                                        options={options.booleanOptions}
                                        onChange={(option: any) =>
                                            setFieldValue("is_required", option)
                                        }
                                        placeholder="-إختر-"
                                        isSearchable={false}
                                        isMulti={false}
                                        field={field}
                                        error={
                                            touched.is_required &&
                                            errors.is_required
                                        }
                                    />
                                )}
                            </Field>
                        </div>
                        <div className="input-one-details">
                            <Field name="end_notify">
                                {({ field }: { field: any }) => (
                                    <SelectBox
                                        isShowLabel={true}
                                        label="اشعار الموظفين عند انتهاء الاشهر"
                                        options={options.booleanOptions}
                                        onChange={(option: any) =>
                                            setFieldValue("end_notify", option)
                                        }
                                        placeholder="-إختر-"
                                        isSearchable={false}
                                        isMulti={false}
                                        field={field}
                                        error={
                                            touched.end_notify &&
                                            errors.end_notify
                                        }
                                    />
                                )}
                            </Field>
                        </div>

                        <div className="input-one-details">
                            <InputField
                                isShowLabel={true}
                                label="عدد الاشهر المطلوب"
                                name="notify_months"
                                type="number"
                                placeholder="عدد الاشهر المطلوب"
                                success
                                error={
                                    touched.notify_months &&
                                    errors.notify_months
                                }
                            />
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
