import React from "react";
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import CustomFileUploader from "@/Dashboard/Shared/FileUploader/CustomFileUploader";
import { useJobs } from "@/hooks/api";

interface FormValues {
    job_id: string;
    name: string;
    email: string;
    phone: string;
    cv: File | null;
    job_title: string;
    job_type: string;
    experience: string;
    education: string;
    skills: string;
    address: string;
}

interface FormAddNewAdProps {
    initialValuesForEdit?: FormValues | null;
    loading?: boolean;
    handleSubmit?: (values: FormValues) => void;
    cancel?: () => void;
}

const JOB_TYPES = [
    { value: "hybrid", label: "مزدوج" },
    { value: "remote", label: "عن بعد" },
    { value: "inhouse", label: "من المنزل" },
];

const FormAddNewAd: React.FC<FormAddNewAdProps> = ({
    initialValuesForEdit = null,
    loading = false,
    handleSubmit = () => {},
    cancel,
    jobOptions,
}) => {

    const initialValues: FormValues = {
        job_id: "",
        name: "",
        email: "",
        phone: "",
        cv: null,
        job_title: "",
        job_type: "",
        experience: "",
        education: "",
        skills: "",
        address: "",
    };

    const validationSchema = Yup.object({
        job_id: Yup.object().required("الوظيفة مطلوبة"),
        name: Yup.string().required("الاسم مطلوب"),
        email: Yup.string()
            .email("البريد الإلكتروني غير صالح")
            .required("البريد الإلكتروني مطلوب"),
        phone: Yup.string().required("الهاتف مطلوب"),
        cv: Yup.mixed().required("السيرة الذاتية مطلوبة"),
        job_title: Yup.string().required("الوظيفة مطلوبة"),
        job_type: Yup.object().required("نوع الوظيفة مطلوب"),
        experience: Yup.string().required("الخبرة مطلوبة"),
        education: Yup.string().required("التعليم مطلوب"),
        skills: Yup.string().required("المهارات مطلوبة"),
        address: Yup.string().required("العنوان مطلوب"),
    });

    const onSubmit = (values: FormValues) => {
        handleSubmit(values);
    };

    const navigate = useNavigate();

    return (
        <div className="">
            <h2 className="title-head-form text-font-dark py-3">
                {initialValuesForEdit ? "تعديل المرشح" : "إضافة مرشح جديد"}
            </h2>
            <div className="main-form-new">
                <Formik
                    initialValues={initialValuesForEdit || initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    context={{ isEditMode: !!initialValuesForEdit }}
                >
                    {({ handleSubmit, setFieldValue, errors, touched }) => {
                        console.log({ errors });

                        return (
                            <Form>
                                <div className="all-forms-grid grid-cards-2">
                                    <div className="input-one-details">
                                        <Field name="job_id">
                                            {({ field }: { field: any }) => (
                                                <SelectBox
                                                    isShowLabel={true}
                                                    label="الوظيفة"
                                                    options={jobOptions?.map(
                                                        (job: any) => ({
                                                            value: job.id,
                                                            label: job.title,
                                                        })
                                                    )}
                                                    onChange={(option: any) =>
                                                        setFieldValue(
                                                            "job_id",
                                                            option
                                                        )
                                                    }
                                                    placeholder="-إختر-"
                                                    isClearable={false}
                                                    isSearchable={false}
                                                    isMulti={false}
                                                    field={field}
                                                    error={
                                                        touched.job_id &&
                                                        errors.job_id
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </div>
                                    <div className="input-one-details">
                                        <InputField
                                            isShowLabel={true}
                                            label="الاسم"
                                            name="name"
                                            type="text"
                                            placeholder="الاسم"
                                        />
                                    </div>

                                    <div className="input-one-details">
                                        <InputField
                                            isShowLabel={true}
                                            label="الهاتف"
                                            name="phone"
                                            type="text"
                                            placeholder="الهاتف"
                                        />
                                    </div>
                                    <div className="input-one-details">
                                        <InputField
                                            isShowLabel={true}
                                            label="البريد الإلكتروني"
                                            name="email"
                                            type="text"
                                            placeholder="البريد الإلكتروني"
                                        />
                                    </div>
                                    <div className="input-one-details">
                                        <InputField
                                            isShowLabel={true}
                                            label="اسم الوظيفة"
                                            name="job_title"
                                            type="text"
                                            placeholder="اسم الوظيفة"
                                        />
                                    </div>

                                    <div className="input-one-details">
                                        <Field name="job_type">
                                            {({ field }: { field: any }) => (
                                                <SelectBox
                                                    isShowLabel={true}
                                                    label="نوع الوظيفة"
                                                    options={JOB_TYPES}
                                                    onChange={(option: any) =>
                                                        setFieldValue(
                                                            "job_type",
                                                            option
                                                        )
                                                    }
                                                    placeholder="-إختر-"
                                                    isClearable={false}
                                                    isSearchable={false}
                                                    isMulti={false}
                                                    field={field}
                                                    error={
                                                        touched.job_type &&
                                                        errors.job_type
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </div>

                                    <div className="input-one-details">
                                        <InputField
                                            isShowLabel={true}
                                            label="الخبرة"
                                            name="experience"
                                            type="text"
                                            placeholder="الخبرة"
                                        />
                                    </div>
                                    <div className="input-one-details">
                                        <InputField
                                            isShowLabel={true}
                                            label="التعليم"
                                            name="education"
                                            type="text"
                                            placeholder="التعليم"
                                        />
                                    </div>
                                    <div className="input-one-details">
                                        <InputField
                                            isShowLabel={true}
                                            label="المهارات"
                                            name="skills"
                                            type="text"
                                            placeholder="المهارات"
                                        />
                                    </div>
                                    <div className="input-one-details">
                                        <InputField
                                            isShowLabel={true}
                                            label="العنوان"
                                            name="address"
                                            type="text"
                                            placeholder="العنوان"
                                        />
                                    </div>

                                    {!initialValuesForEdit && (
                                        <div className="col-span-2">
                                            <CustomFileUploader
                                                textLabel="السيرة الذاتية"
                                                name="cv"
                                                onFileSelect={(file: File) => {
                                                    setFieldValue("cv", file);
                                                }}
                                            />
                                            {touched.cv && errors.cv && (
                                                <div className="error-text">
                                                    {errors.cv}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <ButtonsFormSendCancel
                                    cancelAdd={() =>
                                        cancel ? cancel() : navigate(-1)
                                    }
                                    submitButton={handleSubmit}
                                    isSubmitting={loading}
                                />
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default FormAddNewAd;
