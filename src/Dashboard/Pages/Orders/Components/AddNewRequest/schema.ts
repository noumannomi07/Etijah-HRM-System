import * as Yup from "yup";
import { VacationRequestFormData } from "../../types/VacationRequest";
import { formatDateToYmd } from "@/utils/date";

export const initialValues: Partial<VacationRequestFormData> = {
    start_date: formatDateToYmd(new Date()),
    end_date: formatDateToYmd(new Date()),
    // note: "",
};

export const validationSchema = Yup.object({
    employee_id: Yup.number().required("يجب اختيار موظف"),
    vacation_manage_id: Yup.number().required("يجب اختيار نوع الإجازة"),
    start_date: Yup.date().required("يجب اختيار تاريخ البدء"),
    end_date: Yup.date()
        .required("يجب اختيار تاريخ الانتهاء")
        .min(
            Yup.ref("start_date"),
            "يجب أن يكون تاريخ الانتهاء بعد تاريخ البدء"
        ),
    // note: Yup.string()
    //     .min(5, "يجب أن يحتوي التعليق على 5 أحرف على الأقل")
    //     .max(500, "يجب ألا يتجاوز التعليق 500 حرفًا"),
});
