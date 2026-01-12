import { FormikConfig } from "formik";
import * as Yup from "yup";
import { TWorkdataForm } from "../types";
import i18next from "i18next";

const getValidationMessage = (key: string) => {
  return i18next.t(`staffManagement:validation.${key}`);
};

const initialValues: FormikConfig<TWorkdataForm>['initialValues'] = {
  role_id: 0,
  hire_date: "",
  trail_end: "",
  manger_id: 0,
  law_country_id: 0,
  worktime_id: 0,
  workplaces: [],
  
   category_id: 0,
    jobtitle_id: 0,
    contract_type_id: null,
    job_type_id: 0,
}


// Yup.mixed()
//         .required(getValidationMessage("departmentRequired"))
//         .test(
//             "valid-id",
//             getValidationMessage("selectDepartment"),
//             (value) =>  value && value !== "0"
//         )
const workDataSchema = Yup.object().shape({
  role_id: Yup.number().optional(),
  manger_id: Yup.mixed().optional(),
  law_country_id: Yup.mixed().optional(),
  worktime_id: Yup.mixed().optional(),
  hire_date: Yup.string().required(getValidationMessage("hireDateRequired")),
  trail_end: Yup.string().required(getValidationMessage("trialEndDateRequired")),
  workplaces: Yup.array().of(Yup.number()).min(1, getValidationMessage("workplaceRequired")),
});

export {
  workDataSchema,
  initialValues
}