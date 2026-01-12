import * as Yup from "yup";
import i18next from "i18next";

// Define the type for the task form values
export interface TaskFormValues {
    title: string;
    content: string;
    start_date: string;
    end_date: string;
    priority: { value: string; label: string };
    employees: number[];
    start_time: string;
    end_time: string;
}

// Initial values for the form
const today = new Date().toISOString().split("T")[0];

export const initialValues: TaskFormValues = {
    title: "",
    content: "",
    start_date: today,
    end_date: today,
    priority: { value: "low", label: "" },
    employees: [],
    start_time: "",
    end_time: "",
};

// Validation schema
export const getValidationSchema = () => {
    const t = (key: string) => i18next.t(key, { ns: 'tasks' });
    
    return Yup.object({
        title: Yup.string().required(t('validation.taskTitleRequired')),
        content: Yup.string().optional(),
        start_date: Yup.string()
            .required(t('validation.startDateRequired'))
            .matches(/^\d{4}-\d{2}-\d{2}$/, t('validation.invalidDateFormat')),
        end_date: Yup.string()
            .required(t('validation.endDateRequired'))
            .matches(/^\d{4}-\d{2}-\d{2}$/, t('validation.invalidDateFormat')),
        priority: Yup.object().required(t('validation.priorityRequired')),
        employees: Yup.array()
            .of(
                Yup.object().shape({
                    value: Yup.number()
                        .integer()
                        .positive(t('validation.employeeIdRequired')),
                    label: Yup.string().required(t('validation.employeeTitleRequired')),
                })
            )
            .min(1, t('validation.employeesRequired')),
        start_time: Yup.string()
            .required(t('validation.startTimeRequired'))
            .matches(
                /^([01]\d|2[0-3]):([0-5]\d)$/,
                t('validation.invalidTimeFormat')
            ),
        end_time: Yup.string()
            .required(t('validation.endTimeRequired'))
            .matches(
                /^([01]\d|2[0-3]):([0-5]\d)$/,
                t('validation.invalidTimeFormat')
            ),
    });
};

// For backward compatibility
export const validationSchema = getValidationSchema();
