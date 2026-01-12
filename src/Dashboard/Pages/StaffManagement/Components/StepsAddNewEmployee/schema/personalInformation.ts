import * as Yup from "yup";
import i18next from "i18next";

const getValidationMessage = (key: string) => {
    return i18next.t(`staffManagement:validation.${key}`);
};

const personalInformationSchema = Yup.object().shape({
    first_name: Yup.string().required(getValidationMessage("firstNameRequired")),
    last_name: Yup.string().required(getValidationMessage("lastNameRequired")),
    phone: Yup.string()
        .optional()
        .matches(/^[0-9]+$/, getValidationMessage("phoneNumbersOnly")),
    email: Yup.string()
        .required(getValidationMessage("emailRequired"))
        .email(getValidationMessage("emailInvalid")),
    id_number: Yup.string()
        .optional()
        .nullable()
        .matches(/^[0-9]+$/, getValidationMessage("idNumbersOnly")),
    nationality_id: Yup.mixed()
        .required(getValidationMessage("nationalityRequired"))
        .test(
            "valid-id",
            getValidationMessage("selectNationality"),
            (value) => value && value !== "0"
        ),
    category_id: Yup.mixed()
        .optional()
        .nullable()
        .test(
            "valid-id",
            getValidationMessage("selectDepartment"),
            (value) => !value || value === "0" || value !== "0"
        ),
    jobtitle_id: Yup.mixed()
        .optional()
        .nullable()
        .test(
            "valid-id",
            getValidationMessage("selectJobTitle"),
            (value) => !value || value === "0" || value !== "0"
        ),
    marital_status: Yup.string().optional(),
    gender: Yup.string().optional(),
    code: Yup.string().required(getValidationMessage("codeRequired")),
    birth_date: Yup.string().nullable(),
    send_invite: Yup.boolean()
        .optional()
        .default(false),
    sponsorship: Yup.boolean()
        .optional()
        .default(false),
});

export { personalInformationSchema };
