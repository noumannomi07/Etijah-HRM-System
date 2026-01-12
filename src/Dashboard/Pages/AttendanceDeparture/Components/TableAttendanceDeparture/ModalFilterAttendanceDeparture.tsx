import ModalButtons from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalButtons/ModalButtons";
import ModalShared from "@/Dashboard/Pages/Orders/Components/VacationsRequests/ModalFilterData/Components/ModalShared/ModalShared";
import ControlledSelect from "@/Dashboard/Shared/SelectBox/ControlledSelect";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export type TAttendanceFilter = {
  sectionInfo: string | null;
  workplace: string | null;
};

type ModalFilterAttendanceDepartureProps = {
  open: boolean;
  hiddenModal: () => void;
};

const ModalFilterAttendanceDeparture = ({ open, hiddenModal }: ModalFilterAttendanceDepartureProps) => {
  const [, setSearchParams] = useSearchParams();

  const formik = useFormik<Partial<TAttendanceFilter>>({
    initialValues: {},
    onSubmit: (values) => {
      setSearchParams((_prev) => {
        _prev.set("sectionInfo", values.sectionInfo ?? "");
        _prev.set("workplace", values.workplace ?? "");
        return _prev;
      });
      hiddenModal();
    },
  });

  const handleFilterReset = () => {
    setSearchParams((_prev) => {
      _prev.delete("sectionInfo");
      _prev.delete("workplace");
      return _prev;
    });
    hiddenModal();
  };

  return (
    <ModalShared open={open} hiddenModal={hiddenModal}>
      <div className="all-content-modal-filter">
        <FormikProvider
          value={formik}
        >
          <Form>
            <div className="all-forms-grid grid-cards-2">
              <div className="input-one-details">
                <ControlledSelect<TAttendanceFilter>
                  fieldName="sectionInfo"
                  label="القسم"
                  placeholder="-إختر-"
                  type="sync"
                  apiEndpoint="/employee-categories"
                />
              </div>
              <div className="input-one-details">
                <ControlledSelect<TAttendanceFilter>
                  fieldName="workplace"
                  label="مكان العمل"
                  placeholder="-إختر-"
                  type="sync"
                  apiEndpoint="/workplace"
                />
              </div>
            </div>
            <ModalButtons
              hiddenModal={handleFilterReset}
              handleSubmit={formik.handleSubmit}
            />
          </Form>
        </FormikProvider>
      </div>
    </ModalShared>
  );
};

export default ModalFilterAttendanceDeparture;
