import ButtonsFormSendCancel from "@/Dashboard/Pages/Orders/Components/ReusablePageAddNewContent/ButtonsFormSendCancel/ButtonsFormSendCancel";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { FullRoutes } from "@/Routes/routes";
import { Field, Form, Formik, FormikHelpers } from "formik";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useCountryTicketManagement } from "@/hooks/api/system-settings";
import { useUpdateEmployeeTicket } from "@/hooks/employee/manage/tickets/useUpdateEmployeeTicket";
import { Loading } from "@/components";
import { ApiResponse } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CountryTicket {
  id: string;
  title: string;
}

interface FormValues {
  country_ticket_id: { value: string; label: string } | null;
}

interface FormEditAirlineTicketsProps {
  onClose: () => void;
}

const FormEditAirlineTickets: React.FC<FormEditAirlineTicketsProps> = ({ onClose }) => {
  const { t } = useTranslation("staffManagement");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  
  const { queryAll } = useCountryTicketManagement();
  const { mutate: updateTicket, isPending: isUpdating } = useUpdateEmployeeTicket();

  if (!id) {
    toast.error(t("messages.error"));
    navigate(FullRoutes.Dashboard.StaffManagement.All);
    return null;
  }

  const options = {
    country_ticket_id: queryAll.data?.map((item) => ({
      value: item.id,
      label: item.title,
    })) || [],
  };

  const initialValues: FormValues = {
    country_ticket_id: null,
  };

  const validationSchema = Yup.object({
    country_ticket_id: Yup.object().nullable().required(t("validation.required")),
  });

  const handleSubmit = (
    values: FormValues,
    { setTouched, resetForm }: FormikHelpers<FormValues>
  ) => {
    setTouched({
      country_ticket_id: true,
    });

    if (!values.country_ticket_id?.value) {
      toast.error(t("validation.required"));
      return;
    }

    const ticketData = {
      country_ticket_id: values.country_ticket_id.value,
      employee_id: id,
    };

    updateTicket(
      { 
        ticketData,
        id 
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["employee-ticket", id] });
          toast.success(t("messages.ticketUpdateSuccess"));
          resetForm();
          onClose();
        },
        onError: (error) => {
          toast.error(error.message || t("messages.error"));
        }
      }
    );
  };

  const cancelAdd = () => {
    toast.success(t("messages.cancel"));
    onClose();
  };

  if (queryAll.isLoading) {
    return <Loading />;
  }

  return (
    <div className="form-airline-add border-width-content mt-5">
      <div className="main-form-new">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue, errors, touched }) => (
            <Form>
              <div className="all-forms-grid--1 flex flex-col sm:grid sm:grid-cols-1 gap-1">
                <div className="input-one-details">
                  <Field name="country_ticket_id">
                    {({ field }: { field: any }) => (
                      <SelectBox
                        isShowLabel={true}
                        label={t("airlineTickets.tickettype")}
                        options={options.country_ticket_id}
                        onChange={(option: any) =>
                          setFieldValue("country_ticket_id", option)
                        }
                        placeholder={t("airlineTickets.selectPlaceholder")}
                        isSearchable={false}
                        isMulti={false}
                        field={field}
                        error={touched.country_ticket_id && errors.country_ticket_id}
                      />
                    )}
                  </Field>
                </div>
              </div>
              <ButtonsFormSendCancel
                cancelAdd={cancelAdd}
                submitButton={() => handleSubmit()}
                isSubmitting={isUpdating}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FormEditAirlineTickets;
