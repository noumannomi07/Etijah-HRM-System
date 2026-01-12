import React from 'react';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CustomFileUploader from "@/Dashboard/Shared/FileUploader/CustomFileUploader";
import RichTextEditor from "@/Dashboard/Shared/Forms/RichTextEditor";
import ControlledSelect from '@/Dashboard/Shared/SelectBox/ControlledSelect';
import { Place } from '@/Dashboard/Pages/types';
import { TSelectOption } from '@/types/forms';
import { JobType } from '@/Dashboard/Pages/types';

interface FormValues {
    ar: {
        title: string;
    };
    en: {
        title: string;
    };
    content: string;
    location: string;
    // salary: string;
    type: string;
    image: File | null;
}

interface FormAddNewAdProps {
    initialValuesForEdit?: FormValues | null;
    loading?: boolean;
    handleSubmit?: (values: FormValues) => void;
    cancel?: () => void;
}


const FormAddNewAd: React.FC<FormAddNewAdProps> = ({
    initialValuesForEdit = null,
    loading = false,
    handleSubmit = () => {},
    cancel,
}) => {
    const { t } = useTranslation('recruitmentAds');
    
    const initialValues: FormValues = {
        ar: {
            title: "",
        },
        en: {
            title: "",
        },
        content: "",
        location: "",
        // salary: "",
        type: "",
        image: null,
    };

    const validationSchema = Yup.object({
        ar: Yup.object({
            title: Yup.string()
                .required(t('validation.arabicTitleRequired'))
                .matches(
                    /^[\u0621-\u064A\s]+$/,
                    t('validation.arabicTitlePattern')
                ),
        }),
        en: Yup.object({
            title: Yup.string()
                .required(t('validation.englishTitleRequired'))
                .matches(
                    /^[A-Za-z\s]+$/,
                    t('validation.englishTitlePattern')
                ),
        }),
        content: Yup.string()
            .required(t('validation.contentRequired'))
            .min(10, t('validation.contentMin')),
        location: Yup.string().required(t('validation.locationRequired')),
        // salary: Yup.string(),
        type: Yup.string().required(t('validation.jobTypeRequired')),
        image: Yup.mixed()
            .test('is-required', t('validation.imageRequired'), function(value) {
                const isEditMode = this.options.context?.isEditMode;
                if (!isEditMode && !value) {
                    return false;
                }
                return true;
            })
    });

    const onSubmit = (values: FormValues) => {

       handleSubmit(values);
       console.log(values);
    };

    const navigate = useNavigate();
    const currentLanguage = i18next.language;

    return (
        <div className="">
            <h2 className="title-head-form text-font-dark py-3">
                {initialValuesForEdit ? t('form.editJob') : t('form.addNewJob')}
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
                                <div className="all-forms-grid flex flex-col md:grid md:grid-cols-2 gap-4">
                                    <div className="input-one-details">
                                        <InputField
                                            isShowLabel={true}
                                            label={t('form.arabicTitle')}
                                            name="ar.title"
                                            type="text"
                                            placeholder={t('form.placeholders.arabicTitle')}
                                        />
                                    </div>

                                    <div className="input-one-details">
                                        <InputField
                                            isShowLabel={true}
                                            label={t('form.englishTitle')}
                                            name="en.title"
                                            type="text"
                                            placeholder={t('form.placeholders.englishTitle')}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <RichTextEditor
                                            label={t('form.content')}
                                            name="content"
                                            isShowLabel={true}
                                            rows={10}
                                        />
                                    </div>
 
                                    <div className="input-one-details">
                                    <ControlledSelect<FormValues>
                                        type="sync"
                                        apiEndpoint="/workplace"
                                        fieldName="location"
                                        customMapping={(data: Array<Place>) =>
                                            data.map(
                                                (workplace): TSelectOption => ({
                                                    label: currentLanguage === 'ar' ? workplace.ar_title : workplace.en_title,
                                                    value: String(currentLanguage === 'ar' ? workplace.ar_title : workplace.en_title),
                                                })
                                            )
                                        }
                                        label={t('form.location')}
                                        isMulti={false}
                                    />
                                </div>

                                <div className="form-one-step">
                                    <ControlledSelect<FormValues>
                                        type="sync"
                                        apiEndpoint="/job-type"
                                        fieldName="type"
                                        label={t('form.jobType')}
                                        customMapping={(data: Array<JobType>) =>
                                            data.map(
                                                (jobType): TSelectOption => ({
                                                    label: currentLanguage === 'ar' ? jobType.ar_title : jobType.en_title,
                                                    value: String(currentLanguage === 'ar' ? jobType.ar_title : jobType.en_title),
                                                })
                                            )
                                        }
                                    />
                                </div>
                            

                                    {/* <div className="input-one-details">
                                        <InputField
                                            isShowLabel={true}
                                            label="الراتب"
                                            name="salary"
                                            type="number"
                                            placeholder="الراتب"
                                        />
                                    </div> */}

                                    {/* <div className="input-one-details">
                                        <Field name="type">
                                            {({ field }: { field: any }) => (
                                                <SelectBox
                                                    isShowLabel={true}
                                                    label="نوع الوظيفة"
                                                    options={JOB_TYPES}
                                                    onChange={(option: any) =>
                                                        setFieldValue(
                                                            "type",
                                                            option
                                                        )
                                                    }
                                                    placeholder="-إختر-"
                                                    isClearable={false}
                                                    isSearchable={false}
                                                    isMulti={false}
                                                    field={field}
                                                    error={
                                                        touched.type &&
                                                        errors.type
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </div> */}

                                    {!initialValuesForEdit && (
                                        <div className="col-span-2">
                                            <CustomFileUploader
                                                textLabel={t('form.attachedFile')}
                                                dragDropText={t('form.dragDropText')}
                                                name="image"
                                                onFileSelect={(file: File) => {
                                                    setFieldValue("image", file);
                                                }}
                                            />
                                            {touched.image && errors.image && (
                                                <div className="error-text">
                                                    {errors.image}
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
