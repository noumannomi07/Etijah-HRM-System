import { useState } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import TextAreaInput from "@/Dashboard/Shared/Forms/TextArea";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import ButtonsFormSendCancel from "../../../../ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
// import FileUploader from "@/Dashboard/Shared/FileUploader/FileUploader";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import { FullRoutes } from "@/Routes/routes";
import React from "react";
import { useTranslation } from "react-i18next";
import EmployeeSelect from "../../../../AllSelectsForm/EmployeeSelect";

interface FormValues {
    from: string;
    to: string;
    employee_id: string;
    leave_date: string;
    return_date: string;
    reference_number: string;
    email: string;
    phone: string;
    // price: string;
    tax: string;
    content: string;
    request_type: string;
    // file: any;
    has_tax: boolean;
    flight_type: string;
    people: any[];
    firstName: string[];
    lastName: string[];
    date_of_birth: string[];
}

const TabRoundTrip: React.FC = ({
    employeeId,
    type,
}: {
    employeeId: number;
}) => {
    const { t } = useTranslation("orders");

    const options = {
        to: [
            { value: "city1", label: t("airlineTicket.city1") },
            { value: "city2", label: t("airlineTicket.city2") },
        ],

        cabinClass: [
            { value: "economy", label: t("airlineTicket.cabinClass.economy") },
            {
                value: "business",
                label: t("airlineTicket.cabinClass.business"),
            },
        ],
        preferredAirline: [
            { value: "airline1", label: t("airlineTicket.airline.airline1") },
            { value: "airline2", label: t("airlineTicket.airline.airline2") },
        ],

        // gender (adult,child,infant)
        gender: [
            { value: "male", label: t("airlineTicket.peoples.male") },
            { value: "female", label: t("airlineTicket.peoples.female") },
        ],
        types: [
            { value: "adult", label: t("airlineTicket.peoples.adult") },
            { value: "child", label: t("airlineTicket.peoples.child") },
            {
                value: "infant",
                label: t("airlineTicket.peoples.infant"),
            },
        ],
        has_tax: [
            { value: true, label: t("airlineTicket.hasTax.true") },
            { value: false, label: t("airlineTicket.hasTax.false") },
        ],
    };

    const initialValues: FormValues = {
        from: "",
        to: "",
        employee_id: "",
        leave_date: "",
        return_date: "",
        reference_number: "",
        email: "",
        phone: "",
        // price: "",
        // currency: null,
        // requiredAmount: "",
        tax: "",
        // cabinClass: null,
        // preferredAirline: null,
        content: "",
        request_type: "ticket",
        // file: null,
        has_tax: true,
        flight_type: "roundtrip",
        people: [],
        firstName: [],
        lastName: [],
        date_of_birth: [],
    };

    // State For Format
    const [formCount, setFormCount] = useState(1);

    const validationSchema = Yup.object({
        from: Yup.string().required(t("validation.required")),
        to: Yup.string().required(t("validation.required")),
        employee_id: Yup.object().required(t("validation.required")),

        return_date:
            type === 1
                ? Yup.string()
                : Yup.string().required(t("validation.required")),
        leave_date: Yup.string().required(t("validation.required")),
        email: Yup.string()
            .email(t("validation.invalidEmail"))
            .required(t("validation.required")),
        phone: Yup.string().required(t("validation.required")),

        tax: Yup.string(),

        content: Yup.string().required(t("validation.required")),
    });

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = (
        values: FormValues,
        { setTouched, resetForm }: FormikHelpers<FormValues>
    ) => {
        setIsLoading(true);
        setTouched({
            from: true,
            to: true,
            employee_id: true,
            leave_date: true,
            return_date: true,
            reference_number: true,
            email: true,
            phone: true,
            // price: true,
            tax: true,
            content: true,
        });

        const formattedValues = {
            ...values,
            flight_type: type === 1 ? "oneway" : "roundtrip",
            employee_id: values?.employee_id?.value,
            has_tax: values?.has_tax === "true" ? 1 : 0,
            tax: values?.has_tax === "true" ? values?.tax : 0,
            // price: 0,
            people: values?.people?.map((person) => ({
                // ...person,
                type: person.type?.value || 0,
                gender: person.gender?.value || 0,
                first_name: person.first_name || 0,
                last_name: person.last_name || 0,
                passport_number: person.passport_number || 0,
                date_of_birth:
                    person?.date_of_birth || new Date().toISOString(),
            })),
        };
        if (type === 1) {
            delete formattedValues.return_date;
        }

        axiosInstance
            .post("/ticketrequests", formattedValues, {
                headers: {
                    "Accept-Language": i18next.language,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => res.data)
            .then((data) => {
                toast.success(t("toasts.requestAddedSuccess"));
                // resetForm();
                navigate(-1);
            })
            .catch((error) => {
                toast.error(t("toasts.error"));
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const cancelAdd = () => {
        toast.success(t("toasts.cancelSuccess"));
        navigate(-1);
    };

    const addForm = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFormCount((prevCount) => prevCount + 1);
    };

    const removeForm = (index: number) => {
        if (formCount > 1) {
            setFormCount((prevCount) => prevCount - 1);
        }
    };

    return (
        <>
            {/* ================= START MAIN FORM NEW ================ */}
            <div className="main-form-new ">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        handleSubmit,
                        setFieldValue,
                        errors,
                        touched,
                        setValues,
                        values,
                    }) => {
                        console.log({ errors });
                        return (
                            <>
                                <Form>
                                    {/* ================ START ALL FORM GRID =============== */}
                                    <div className="all-forms-grid grid grid-flow-row gap-4  sm:grid-cols-1 md:grid-cols-2">
                                        {/* ================== START INPUT ONE DETAILS ================== */}
                                        <div className="input-one-details">
                                            <InputField
                                                isShowLabel={true}
                                                label={t(
                                                    "airlineTicket.travelFrom"
                                                )}
                                                name="from"
                                                type="text"
                                                placeholder={t(
                                                    "airlineTicket.destination"
                                                )}
                                                success
                                                error={
                                                    touched.from && errors.from
                                                }
                                            />
                                        </div>
                                        {/* ================== END INPUT ONE DETAILS ================== */}
                                        {/* ================== START INPUT ONE DETAILS ================== */}
                                        <div className="input-one-details">
                                            <InputField
                                                isShowLabel={true}
                                                label={t(
                                                    "airlineTicket.travelTo"
                                                )}
                                                name="to"
                                                type="text"
                                                placeholder={t(
                                                    "airlineTicket.arrival"
                                                )}
                                                success
                                                error={touched.to && errors.to}
                                            />
                                        </div>
                                        {/* ================== END INPUT ONE DETAILS ================== */}
                                        {/* ================== START INPUT FOUR DETAILS ================== */}
                                        <div className="input-one-details">
                                            <Field name="employee_id">
                                                {({
                                                    field,
                                                }: {
                                                    field: any;
                                                }) => {
                                                    return (
                                                        <EmployeeSelect
                                                            defaultEmployee={
                                                                +employeeId
                                                            }
                                                            isDisabled={true}
                                                            setFieldValue={(
                                                                name,
                                                                value
                                                            ) => {
                                                                setFieldValue(
                                                                    name,
                                                                    value
                                                                );
                                                            }}
                                                            field={field}
                                                            error={
                                                                touched.employee_id &&
                                                                (errors.employee_id as string)
                                                            }
                                                        />
                                                    );
                                                }}
                                            </Field>
                                        </div>
                                        {/* ================== END INPUT FOUR DETAILS ================== */}

                                        {/* ================== START INPUT ONE DETAILS ================== */}

                                        <div className="input-one-details">
                                            <Field name="leave_date">
                                                {({
                                                    field,
                                                }: {
                                                    field: any;
                                                }) => (
                                                    <DatePickerComponent
                                                        label={t(
                                                            "airlineTicket.leaveDate"
                                                        )}
                                                        addTextPlaceHolder="--/--/--"
                                                        onDateChange={(date) =>
                                                            setFieldValue(
                                                                "leave_date",
                                                                date
                                                            )
                                                        }
                                                        field={field}
                                                        error={
                                                            touched.leave_date &&
                                                            errors.leave_date
                                                        }
                                                    />
                                                )}
                                            </Field>
                                        </div>

                                        {/* ================== END INPUT ONE DETAILS ================== */}

                                        {/* ================== START INPUT ONE DETAILS ================== */}
                                        {type != 1 && (
                                            <div className="input-one-details">
                                                <Field name="return_date">
                                                    {({
                                                        field,
                                                    }: {
                                                        field: any;
                                                    }) => (
                                                        <DatePickerComponent
                                                            label={t(
                                                                "airlineTicket.returnDate"
                                                            )}
                                                            addTextPlaceHolder="--/--/--"
                                                            onDateChange={(
                                                                date
                                                            ) =>
                                                                setFieldValue(
                                                                    "return_date",
                                                                    date
                                                                )
                                                            }
                                                            field={field}
                                                            error={
                                                                touched.return_date &&
                                                                errors.return_date
                                                            }
                                                        />
                                                    )}
                                                </Field>
                                            </div>
                                        )}
                                        {/* ================== END INPUT ONE DETAILS ================== */}

                                        {/* ================== START INPUT ONE DETAILS ================== */}
                                        <div className="input-one-details">
                                            <InputField
                                                isShowLabel={true}
                                                label={t(
                                                    "airlineTicket.referenceNumber"
                                                )}
                                                name="reference_number"
                                                type="number"
                                                placeholder={t(
                                                    "airlineTicket.referenceNumber"
                                                )}
                                                success
                                            />
                                        </div>
                                        {/* ================== END INPUT ONE DETAILS ================== */}

                                        {/* ================== START INPUT ONE DETAILS ================== */}
                                        <div className="sm:col-span-1 md:col-span-2 mt-3">
                                            <h2 className="title-head-form text-font-dark">
                                                {t("airlineTicket.contactInfo")}
                                            </h2>
                                        </div>
                                        {/* ================== END INPUT ONE DETAILS ================== */}

                                        {/* ================== START INPUT ONE DETAILS ================== */}
                                        <div className="input-one-details">
                                            <InputField
                                                isShowLabel={true}
                                                label={t("airlineTicket.email")}
                                                name="email"
                                                type="email"
                                                placeholder={t(
                                                    "airlineTicket.email"
                                                )}
                                                success
                                                error={
                                                    touched.email &&
                                                    errors.email
                                                }
                                            />
                                        </div>
                                        {/* ================== END INPUT ONE DETAILS ================== */}

                                        {/* ================== START INPUT ONE DETAILS ================== */}
                                        <div className="input-one-details">
                                            <InputField
                                                isShowLabel={true}
                                                label={t("airlineTicket.phone")}
                                                name="phone"
                                                type="text"
                                                placeholder={t(
                                                    "airlineTicket.phone"
                                                )}
                                                success
                                                error={
                                                    touched.phone &&
                                                    errors.phone
                                                }
                                            />
                                        </div>
                                        {/* ================== END INPUT ONE DETAILS ================== */}

                                        {/* ================== START INPUT ONE DETAILS ================== */}
                                        <div className="sm:col-span-1 md:col-span-2 mt-3">
                                            <h2 className="title-head-form text-font-dark">
                                                {t(
                                                    "airlineTicket.ticketDetails"
                                                )}
                                            </h2>
                                        </div>
                                        {/* ================== END INPUT ONE DETAILS ================== */}

                                        {/* ================== START INPUT ONE DETAILS ================== */}
                                        {/* <div className="input-one-details">
                                    <InputField
                                        isShowLabel={true}
                                        label={t("airlineTicket.ticketPrice")}
                                        name="price"
                                        type="text"
                                        placeholder={t(
                                            "airlineTicket.ticketPrice"
                                        )}
                                        success
                                        error={touched.price && errors.price}
                                    />
                                </div> */}
                                        {/* ================== END INPUT ONE DETAILS ================== */}

                                        {/* ================== START INPUT ONE DETAILS ================== */}
                                        <Field name={`has_tax`}>
                                            {({ field }: { field: any }) => (
                                                <SelectBox
                                                    isShowLabel={true}
                                                    label={t(
                                                        "airlineTicket.hasTax"
                                                    )}
                                                    options={options.has_tax}
                                                    onChange={(option: any) =>
                                                        setFieldValue(
                                                            `has_tax`,
                                                            option
                                                        )
                                                    }
                                                    placeholder={t(
                                                        "placeholders.select"
                                                    )}
                                                    isMulti={false}
                                                    field={field}
                                                />
                                            )}
                                        </Field>

                                        {values?.has_tax?.value && (
                                            <div className="input-one-details">
                                                <InputField
                                                    isShowLabel={true}
                                                    label={t(
                                                        "airlineTicket.Tax"
                                                    )}
                                                    name="tax"
                                                    type="number"
                                                    placeholder={t(
                                                        "airlineTicket.Tax"
                                                    )}
                                                    success
                                                />
                                            </div>
                                        )}

                                        {/* ================== START INPUT ONE DETAILS ================== */}
                                        <div className="input-one-details text-area-height">
                                            <TextAreaInput
                                                isShowLabel={true}
                                                label={t("labels.notes")}
                                                name="content"
                                                type="text"
                                                placeholder={t(
                                                    "labels.addNotes"
                                                )}
                                                success
                                                parentClass=""
                                                error={
                                                    touched.content &&
                                                    errors.content
                                                }
                                            />
                                        </div>
                                        {/* ================== END INPUT ONE DETAILS ================== */}
                                        <div className="sm:col-span-1 md:col-span-2 mt-3">
                                            <h2 className="title-head-form text-font-dark">
                                                {t(
                                                    "airlineTicket.passengerInformation"
                                                )}
                                            </h2>
                                        </div>
                                        <div className="forms-passanger w-full mb-4 sm:col-span-1 md:col-span-2">
                                            <div>
                                                {Array.from({
                                                    length: formCount,
                                                }).map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className="all-form-passanger mb-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                                                    >
                                                        {/* ================== START INPUT ONE DETAILS ================== */}
                                                        <div className="input-one-details">
                                                            <InputField
                                                                isShowLabel={
                                                                    true
                                                                }
                                                                label={t(
                                                                    "airlineTicket.firstName"
                                                                )}
                                                                name={`people.[${index}].first_name`}
                                                                type="text"
                                                                placeholder={t(
                                                                    "airlineTicket.firstName"
                                                                )}
                                                            />
                                                        </div>
                                                        <div className="input-one-details">
                                                            <InputField
                                                                isShowLabel={
                                                                    true
                                                                }
                                                                label={t(
                                                                    "airlineTicket.lastName"
                                                                )}
                                                                name={`people.[${index}].last_name`}
                                                                type="text"
                                                                placeholder={t(
                                                                    "airlineTicket.lastName"
                                                                )}
                                                            />
                                                        </div>
                                                        {/* {'Gender (male, female)'} */}
                                                        <div className="input-one-details">
                                                            <Field
                                                                name={`people[${index}].gender`}
                                                            >
                                                                {({
                                                                    field,
                                                                }: {
                                                                    field: any;
                                                                }) => (
                                                                    <SelectBox
                                                                        isShowLabel={
                                                                            true
                                                                        }
                                                                        label={t(
                                                                            "airlineTicket.gender"
                                                                        )}
                                                                        options={
                                                                            options.gender
                                                                        }
                                                                        onChange={(
                                                                            option: any
                                                                        ) =>
                                                                            setFieldValue(
                                                                                `people[${index}].gender`,
                                                                                option
                                                                            )
                                                                        }
                                                                        placeholder={t(
                                                                            "placeholders.select"
                                                                        )}
                                                                        isSearchable={
                                                                            false
                                                                        }
                                                                        isMulti={
                                                                            false
                                                                        }
                                                                        field={
                                                                            field
                                                                        }
                                                                        error={
                                                                            touched
                                                                                .people?.[
                                                                                index
                                                                            ] &&
                                                                            errors
                                                                                .people?.[
                                                                                index
                                                                            ]
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </div>

                                                        {/* gender (adult,child,infant) */}

                                                        <div className="input-one-details">
                                                            <Field
                                                                name={`people[${index}].type`}
                                                            >
                                                                {({
                                                                    field,
                                                                }: {
                                                                    field: any;
                                                                }) => (
                                                                    <SelectBox
                                                                        isShowLabel={
                                                                            true
                                                                        }
                                                                        label={t(
                                                                            "airlineTicket.type"
                                                                        )}
                                                                        options={
                                                                            options.types
                                                                        }
                                                                        onChange={(
                                                                            option: any
                                                                        ) =>
                                                                            setFieldValue(
                                                                                `people[${index}].type`,
                                                                                option
                                                                            )
                                                                        }
                                                                        placeholder={t(
                                                                            "placeholders.select"
                                                                        )}
                                                                        isSearchable={
                                                                            false
                                                                        }
                                                                        isMulti={
                                                                            false
                                                                        }
                                                                        field={
                                                                            field
                                                                        }
                                                                        error={
                                                                            touched
                                                                                .people?.[
                                                                                index
                                                                            ] &&
                                                                            errors
                                                                                .people?.[
                                                                                index
                                                                            ]
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </div>
                                                        {/* ================== END INPUT ONE DETAILS ================== */}

                                                        {/* ================== END INPUT ONE DETAILS ================== */}

                                                        {/* ================== START INPUT ONE DETAILS ================== */}
                                                        <div className="input-one-details">
                                                            <InputField
                                                                isShowLabel={
                                                                    true
                                                                }
                                                                label={t(
                                                                    "airlineTicket.passportNumber"
                                                                )}
                                                                name={`people.[${index}].passport_number`}
                                                                type="text"
                                                                placeholder={t(
                                                                    "airlineTicket.passportNumber"
                                                                )}
                                                                success
                                                            />
                                                        </div>
                                                        {/* ================== END INPUT ONE DETAILS ================== */}

                                                        {/* ================== START INPUT ONE DETAILS ================== */}
                                                        {/* ================== END INPUT ONE DETAILS ================== */}

                                                        {/* ================== END INPUT ONE DETAILS ================== */}

                                                        {/* ================== START INPUT ONE DETAILS ================== */}
                                                        <div className="input-one-details">
                                                            <Field
                                                                name={`people.[${index}].date_of_birth`}
                                                            >
                                                                {({
                                                                    field,
                                                                }: {
                                                                    field: any;
                                                                }) => (
                                                                    <DatePickerComponent
                                                                        label={t(
                                                                            "airlineTicket.dateOfBirth"
                                                                        )}
                                                                        addTextPlaceHolder="--/--/--"
                                                                        onDateChange={(
                                                                            date
                                                                        ) =>
                                                                            setFieldValue(
                                                                                `people.[${index}].date_of_birth`,
                                                                                date
                                                                            )
                                                                        }
                                                                        field={
                                                                            field
                                                                        }
                                                                    />
                                                                )}
                                                            </Field>
                                                        </div>
                                                        {/* ================== END INPUT ONE DETAILS ================== */}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="buttons-info">
                                                <button
                                                    onClick={addForm}
                                                    className="btn-main w-auto height--50"
                                                >
                                                    {t("buttons.addPassenger")}
                                                </button>
                                                {formCount > 1 && (
                                                    <button
                                                        onClick={() =>
                                                            removeForm(
                                                                formCount - 1
                                                            )
                                                        }
                                                        className="btn-main button-danger w-auto height--50"
                                                    >
                                                        {t(
                                                            "buttons.removeLastPassenger"
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        {/* <FileUploader
                                    textLabel={t("labels.attachFile")}
                                    name="file"
                                /> */}
                                    </div>
                                    {/* ================ END ALL FORM GRID =============== */}

                                    <ButtonsFormSendCancel
                                        cancelAdd={cancelAdd}
                                        submitButton={() => handleSubmit()}
                                        isSubmitting={isLoading}
                                        isSubmittingDisabled={isLoading}
                                    />
                                </Form>
                            </>
                        );
                    }}
                </Formik>
            </div>
            {/* ================= END MAIN FORM NEW ================ */}
        </>
    );
};

export default TabRoundTrip;
