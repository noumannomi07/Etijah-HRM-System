import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import DatePickerComponent from "@/Dashboard/Shared/DatePickerComponent/DatePickerComponent";
import CheckButtonGroup from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/CheckButtonGroup/CheckButtonGroup";
import ModalButtons from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalButtons/ModalButtons";
import { useState } from "react";

const ModalFilterCompany = ({ open, hiddenModal }) => {
  const initialValues = {
    sectionInfo: null,
  };

  const validationSchema = Yup.object({
    sectionInfo: Yup.object().nullable().required("يجب اختيار قسم"),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      sectionInfo: true,
    });

    toast.success("تم إضافة الطلب بنجاح!");
    resetForm();

    // HIDE MODAL IF SUCCESS SEND
    hiddenModal();
  };

  // THIS FOR CHECK BUTTON
  const optionsButton = ["الجميع", "مفعل", "معطل"];

  const [selectedOption, setSelectedOption] = useState("");

  // CHANGE VALUE
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };
  const options = {
    sectionInfo: [
      { value: "عنوان الخبر", label: "عنوان الخبر" },
      { value: "عنوان الخبر1", label: " 1 عنوان الخبر" },
    ],
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
                {/* ================== START INPUT ONE DETAILS ================== */}
                <div className="input-one-details">
                  <Field name="sectionInfo">
                    {({ field }) => (
                      <SelectBox
                        isShowLabel={true}
                        label="عنوان الخبر"
                        options={options.sectionInfo}
                        onChange={(option) =>
                          setFieldValue("sectionInfo", option)
                        }
                        placeholder="-إختر-"
                        isSearchable={false}
                        isMulti={false}
                        field={field}
                        error={touched.sectionInfo && errors.sectionInfo}
                      />
                    )}
                  </Field>
                </div>
                {/* ================== END INPUT ONE DETAILS ================== */}
                <DatePickerComponent
                  label="التاريخ"
                  addTextPlaceHolder="--/--/--"
                />
              </div>

              <div className="main-buttons-info mt-5">
                <h2 className="title text-font-gray mb-2">حالة الطلب</h2>

                <CheckButtonGroup
                  options={optionsButton}
                  selected={selectedOption}
                  onChange={handleOptionChange}
                />
              </div>
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

ModalFilterCompany.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired,
};

export default ModalFilterCompany;
