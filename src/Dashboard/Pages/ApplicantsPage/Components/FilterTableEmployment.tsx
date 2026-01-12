import ModalButtons from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalButtons/ModalButtons";
import ModalCheckedButton from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalCheckedButton/ModalCheckedButton";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as Yup from "yup";

const FilterTableEmployment = ({ open, hiddenModal }) => {
  const options = {
    nationality: [
      { value: "egypt", label: "مصر" },
      { value: "usa", label: "الولايات المتحدة الأمريكية" },
      { value: "canada", label: "كندا" },
    ],
    typePerson: [
      { value: "male", label: "ذكر" },
      { value: "female", label: "أنثى" },
    ],
    candidate: [
      { value: "applicant1", label: "مرشح 1" },
      { value: "applicant2", label: "مرشح 2" },
      { value: "applicant3", label: "مرشح 3" },
    ],
  };

  const initialValues = {
    candidate: null,
    email: "",
    nationality: null,
    typePerson: null,
  };

  const validationSchema = Yup.object({
    candidate: Yup.object().required("المرشح مطلوب"),
    email: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("البريد الإلكتروني مطلوب"),
    nationality: Yup.object().required("الجنسية مطلوبة"),
    typePerson: Yup.object().required("الجنس مطلوب"),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      candidate: false,
      email: false,
      nationality: false,
      typePerson: false,
    });

    toast.success("تم إضافة الطلب بنجاح!");
    resetForm();

    // HIDE MODAL IF SUCCESS SEND
    hiddenModal();
  };

  return (
    <ModalShared open={open} hiddenModal={hiddenModal}>
      <div className="all-content-modal-filter">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue, errors, touched }) => (
            <Form>
              <div className="all-forms-grid grid-cards-2">
                <Field name="candidate">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label="المرشح"
                      options={options.candidate}
                      onChange={(option) => setFieldValue("candidate", option)}
                      placeholder="-إختر-"
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.candidate && errors.candidate}
                    />
                  )}
                </Field>
                <InputField
                  isShowLabel={true}
                  label="البريد الإلكتروني"
                  name="email"
                  type="email"
                  placeholder="البريد الإلكتروني"
                  success
                />
                <Field name="nationality">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label="الجنسية"
                      options={options.nationality}
                      onChange={(option) =>
                        setFieldValue("nationality", option)
                      }
                      placeholder="-إختر-"
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.nationality && errors.nationality}
                    />
                  )}
                </Field>

                <Field name="typePerson">
                  {({ field }) => (
                    <SelectBox
                      isShowLabel={true}
                      label="الجنس"
                      options={options.typePerson}
                      onChange={(option) => setFieldValue("typePerson", option)}
                      placeholder="-إختر-"
                      isSearchable={false}
                      isMulti={false}
                      field={field}
                      error={touched.typePerson && errors.typePerson}
                    />
                  )}
                </Field>

                <DatePickerComponent
                  label="تاريخ الإضافة من"
                  addTextPlaceHolder="--/--/--"
                />
                <DatePickerComponent
                  label="تاريخ الإضافة إلى"
                  addTextPlaceHolder="--/--/--"
                />
              </div>
              <ModalCheckedButton />

              <div className="main-buttons-modal flex justify-end items-end w-100">
                <ModalButtons
                  hiddenModal={hiddenModal}
                  handleSubmit={handleSubmit}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalShared>
  );
};

FilterTableEmployment.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired,
};

export default FilterTableEmployment;
