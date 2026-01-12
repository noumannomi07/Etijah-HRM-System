import CheckButtonGroup from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/CheckButtonGroup/CheckButtonGroup";
import ModalButtons from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalButtons/ModalButtons";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import InputField from "@/Dashboard/Shared/Forms/InputField";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ModalFilterDepartments = ({ open, hiddenModal }) => {
  const initialValues = {
    nameSection: "",
  };

  const validationSchema = Yup.object({
    nameSection: Yup.string().required("إسم القسم مطلوب"),
  });

  const handleSubmit = (values, { setTouched, resetForm }) => {
    setTouched({
      email: false,
    });

    toast.success("تم التصفية بنجاح!");
    resetForm();
    // HIDE MODAL IF SUCCESS SEND
    hiddenModal();
  };

  const optionsButton = ["مفعل", "معطل"];
  const [selectedOption, setSelectedOption] = useState("");

  // CHANGE VALUE
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };
  return (
    <ModalShared open={open} hiddenModal={hiddenModal}>
      <div className="all-content-modal-filter">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit }) => (
            <Form>
              <div className="all-forms-grid">
                <InputField
                  isShowLabel={true}
                  label="إسم القسم"
                  name="nameSection"
                  type="text"
                  placeholder="إسم القسم"
                  success
                />
              </div>

              <div className="main-buttons-info mt-5">
                <h2 className="title text-font-gray mb-2">الحالة</h2>

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

ModalFilterDepartments.propTypes = {
  open: PropTypes.bool.isRequired,
  hiddenModal: PropTypes.func.isRequired,
};

export default ModalFilterDepartments;
