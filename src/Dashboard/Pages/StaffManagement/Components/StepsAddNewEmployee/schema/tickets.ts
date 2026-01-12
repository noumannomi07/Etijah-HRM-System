import * as Yup from "yup";
import { Ticket } from "../../../types";

const ticketsSchema = Yup.object().shape({
  title: Yup.string().required("اسم التذكرة مطلوب"),
  amount: Yup.number()
    .required("مبلغ تذكرة الطيران مطلوب")
    .positive("يجب أن يكون مبلغ تذكرة الطيران رقماً موجباً"),
  adult: Yup.number()
    .min(0, "عدد البالغين يجب أن يكون 0 أو أكثر"),
  child: Yup.number()
    .min(0, "عدد الأطفال يجب أن يكون 0 أو أكثر"),
  infant: Yup.number()
    .min(0, "عدد الرضع يجب أن يكون 0 أو أكثر"),
  used_this_year: Yup.boolean()
});


const initialValues: Ticket = {
  amount: 0,
  adult: 0,
  child: 0,
  infant: 0,
  title: "",
  used_this_year: false,
  created_at: "",
  updated_at: ""
};


export {
  initialValues,
  ticketsSchema
}