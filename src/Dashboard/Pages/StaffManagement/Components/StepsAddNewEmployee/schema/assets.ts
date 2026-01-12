import * as Yup from "yup";

const initialValues = {
  title: "",
  code: "",
  expire_date: "",
  file: null,
};

const documentsSchema = Yup.object({
  title: Yup.string().required("إسم المستند مطلوب"),
  code: Yup.number().required("رقم المستند مطلوب"),
  expire_date: Yup.string().nullable().required("تاريخ الإنتهاء مطلوب"),
  file: Yup.mixed().required("الملف مطلوب"),
});

export {
  initialValues,
  documentsSchema
}