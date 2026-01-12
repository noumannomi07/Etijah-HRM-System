import React from "react";
import ContractTypeSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/ContractTypeSelect";
import EmployeeSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/EmployeeSelect";
import JobTypeSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/JobTypeSelect";
import SectionSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/SectionSelect";
import WorkplaceSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/WorkplaceSelect";
import ModalButtons from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalButtons/ModalButtons";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const ModalFilterSalaryMarches = ({
    open,
    hiddenModal,
    handleFilterData,
}: {
    open: boolean;
    hiddenModal: () => void;
    handleFilterData: Dispatch<SetStateAction<any>>;
}) => {
    const { t, i18n } = useTranslation('salaryMarches');
    const selectPlaceholder = i18n.language === 'ar' ? '-إختر-' : '-Select-';
    
    const options = {
        paymentMethod: [
            { value: "bank", label: t('paymentMethods.bank') },
            { value: "check", label: t('paymentMethods.check') },
            { value: "cash", label: t('paymentMethods.cash') },
        ],
    };
    const initialValues = {
        sectionInfo: null,
        employee: null,
        workplace: null,
        paymentMethod: null,
        jobType: null,
        contractType: null,
    };

    const validationSchema = Yup.object({
        // sectionInfo: Yup.object().nullable().required("هذا الحقل مطلوب"),
        // employee: Yup.object().nullable().required("هذا الحقل مطلوب"),
        // workplace: Yup.object().nullable().required("هذا الحقل مطلوب"),
        // paymentMethod: Yup.object().nullable().required("هذا الحقل مطلوب"),
        // jobType: Yup.object().nullable().required("هذا الحقل مطلوب"),
        // contractType: Yup.object().nullable().required("هذا الحقل مطلوب"),
    });

    const handleSubmit = (values: any, { setTouched, resetForm }: any) => {
        setTouched({
            sectionInfo: true,
            employee: true,
            workplace: true,
            paymentMethod: true,
            jobType: true,
            contractType: true,
        });

        const filterValues = {
            category_id: values.sectionInfo?.value,
            payment_method: values.paymentMethod?.value,
            job_type_id: Array.isArray(values.jobType)
                ? values.jobType.map((item: any) => item.value)
                : values.jobType?.value,
            contract_type_id: Array.isArray(values.contractType)
                ? values.contractType.map((item: any) => item.value)
                : values.contractType?.value,
        };
        console.log("filterValues", filterValues);

        handleFilterData(filterValues);

        toast.success(t('modal.filter.success'));

        // resetForm();

        // HIDE MODAL IF SUCCESS SEND
        hiddenModal();
    };

    return (
        <ModalShared open={open} hiddenModal={hiddenModal} titleModal={t('modal.filter.title')}>
            <div className="all-content-modal-filter">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit, setFieldValue, errors, touched }) => (
                        <Form>
                            <div className="all-forms-grid grid-cards-2">
                                <Field name="sectionInfo">
                                    {({ field }) => (
                                        <SectionSelect
                                            labelText={t('modal.filter.section')}
                                            placeholder={selectPlaceholder}
                                            setFieldValue={setFieldValue}
                                            field={field}
                                            error={
                                                touched.sectionInfo &&
                                                errors.sectionInfo
                                            }
                                        />
                                    )}
                                </Field>
                                {/* ================== START INPUT ONE DETAILS ================== */}

                                <div className="input-one-details">
                                    <Field name="jobType">
                                        {({ field }) => (
                                            <JobTypeSelect
                                                labelText={t('modal.filter.jobType')}
                                                placeholder={selectPlaceholder}
                                                setFieldValue={setFieldValue}
                                                field={field}
                                                error={
                                                    touched.jobType &&
                                                    errors.jobType
                                                }
                                                isMulti={true}
                                            />
                                        )}
                                    </Field>
                                </div>

                                <div className="input-one-details">
                                    <Field name="contractType">
                                        {({ field }) => (
                                            <ContractTypeSelect
                                                labelText={t('modal.filter.contractType')}
                                                placeholder={selectPlaceholder}
                                                setFieldValue={setFieldValue}
                                                field={field}
                                                error={
                                                    touched.contractType &&
                                                    errors.contractType
                                                }
                                                isMulti={true}
                                            />
                                        )}
                                    </Field>
                                </div>

                                {/* <div className="input-one-details">
                  <Field name="employee">
                    {({ field }) => (
                      <EmployeeSelect
                        setFieldValue={setFieldValue}
                        field={field}
                        error={touched.employee && errors.employee}
                        name="employee_id"
                      />
                    )}
                  </Field>
                </div> */}
                                {/* ================== END INPUT ONE DETAILS ================== */}
                                {/* ================== START INPUT ONE DETAILS ================== */}
                                {/* <div className="input-one-details">
                  <Field name="workplace">
                    {({ field }) => (
                      <WorkplaceSelect
                        setFieldValue={setFieldValue}
                        field={field}
                        error={touched.workplace && errors.workplace}
                      />
                    )}
                  </Field>
                </div> */}
                                {/* ================== END INPUT ONE DETAILS ================== */}

                                <Field name="paymentMethod">
                                    {({ field }) => (
                                        <SelectBox
                                            isShowLabel={true}
                                            label={t('modal.filter.paymentMethod')}
                                            options={options.paymentMethod}
                                            onChange={(option) =>
                                                setFieldValue(
                                                    "paymentMethod",
                                                    option
                                                )
                                            }
                                            placeholder={selectPlaceholder}
                                            isSearchable={false}
                                            isMulti={false}
                                            field={field}
                                            error={
                                                touched.paymentMethod &&
                                                errors.paymentMethod
                                            }
                                        />
                                    )}
                                </Field>

                                {/* <div className="sm:col-span-1 md:col-span-2">
                  <DatePickerComponent
                    label="التاريخ"
                    addTextPlaceHolder="--/--/--"
                  />
                </div> */}
                            </div>

                            <div className="main-buttons-modal flex justify-end items-end w-100">
                                <ModalButtons
                                    hiddenModal={hiddenModal}
                                    handleSubmit={handleSubmit}
                                    buttonResetText={t('modal.filter.resetButton')}
                                    buttonSaveText={t('modal.filter.searchButton')}
                                    resetSuccessMessage={t('modal.filter.resetSuccess')}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </ModalShared>
    );
};

ModalFilterSalaryMarches.propTypes = {
    open: PropTypes.bool.isRequired,
    hiddenModal: PropTypes.func.isRequired,
};

export default ModalFilterSalaryMarches;
