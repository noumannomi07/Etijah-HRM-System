import * as Yup from "yup";


export type StepSalaryCompositionForm = {
  salary: number;
  bank_id: number;
  iban: string;
  // account_number: string;
  account_user_name: string;
  payment_method: string;
  salaryextra: {
    id: number;
    amount: number;
  }[];
  gosi_employee_percent: number;
  gosi_office_percent: number;
}

const StepSalaryCompositionInitialValues: StepSalaryCompositionForm = {
  salary: 0,
  bank_id: 0,
  iban: "",
  // account_number: "",
  account_user_name: "",
  payment_method: "",
  salaryextra: [{ id: 0, amount: 0 }],
  gosi_employee_percent: 0,
  gosi_office_percent: 0,
};

const StepSalaryCompositionSchema = Yup.object().shape({
  salary: Yup.number().required("الراتب الأساسي مطلوب"),
  payment_method: Yup.string().required("طريقة الدفع مطلوبة"),
  bank_id: Yup.number().when('payment_method', {
    is: 'bank',
    then: (schema) => schema.min(1, "البنك مطلوب"),
    otherwise: (schema) => schema.notRequired(),
  }),
  iban: Yup.string().when('payment_method', {
    is: 'bank',
    then: (schema) => schema.required("رقم ال IBAN مطلوب"),
    otherwise: (schema) => schema.notRequired(),
  }),
  // account_number: Yup.string().when('payment_method', {
  //   is: 'bank',
  //   then: (schema) => schema.required("رقم الحساب مطلوب"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
  account_user_name: Yup.string().when('payment_method', {
    is: 'bank',
    then: (schema) => schema.required("اسم المستخدم مطلوب"),
    otherwise: (schema) => schema.notRequired(),
  }),
  salaryextra: Yup.array().of(Yup.object().shape({
    id: Yup.number().required("البدل مطلوب"),
    amount: Yup.number().required("القيمة مطلوبة"),
  })),
}).test('bank-fields', 'يجب ملء جميع حقول البنك عند اختيار طريقة الدفع بنك', function (values) {
  if (values.payment_method === 'bank') {
    if (!values.bank_id || !values.iban || !values.account_user_name) {
      return this.createError({
        path: 'payment_method',
        message: 'يجب ملء جميع حقول البنك عند اختيار طريقة الدفع بنك'
      });
    }
  }
  return true;
});

export default {
  validationSchema: StepSalaryCompositionSchema,
  initialValues: StepSalaryCompositionInitialValues,
};