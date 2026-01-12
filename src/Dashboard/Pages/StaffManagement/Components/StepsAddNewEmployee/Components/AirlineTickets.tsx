import ControlledInput from "@/Dashboard/Shared/Forms/ControlledInput";
import ControlledSwitch from "@/Dashboard/Shared/Forms/ControlledSwitch";
import NumberInput from "@/Dashboard/Shared/NumberInput/NumberInput";
import { useEmployeeTicket } from "@/hooks/employee/manage/tickets/useEmployeeTicket";
import { useUpdateEmployeeTicket } from "@/hooks/employee/manage/tickets/useUpdateEmployeeTicket";
import { FullRoutes } from "@/Routes/routes";
import { FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonsSteps from "../ButtonsSteps/ButtonsSteps";
import { initialValues, ticketsSchema } from "../schema/tickets";
import { Ticket } from "@/Dashboard/Pages/types";

const AirlineTickets = ({ onPrev }: { onPrev: () => void }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: tickets } = useEmployeeTicket();
  const { mutate: updateTicketData } = useUpdateEmployeeTicket();

  const formik = useFormik<Ticket>({
    initialValues,
    validationSchema: ticketsSchema,
    onSubmit: (ticketData) => {
      if (id) {
        updateTicketData({ id, ticketData });
        toast.success("تم تعديل بيانات الموظف بنجاح!");
        navigate(FullRoutes.Dashboard.StaffManagement.All);
      }
    },
  });

  useEffect(() => {
    if (tickets?.[0]) {
      const ticketData = tickets[0];
      formik.setFieldValue("title", ticketData.title);
      formik.setFieldValue(
        "amount",
        parseInt(String(ticketData.amount) ?? "0")
      );
      formik.setFieldValue("adult", ticketData.adult ?? 0);
      formik.setFieldValue("child", ticketData.child ?? 0);
      formik.setFieldValue("infant", ticketData.infant ?? 0);
      formik.setFieldValue("used_this_year", ticketData.used_this_year ?? null);
    }
  }, [tickets]);

  const isNextDisabled = !formik.isValid || !formik.dirty;

  const manualChangeFormField = (formField: keyof Ticket, value: any) =>
    formik.setFieldValue(formField, value);

  return (
    <div className="all-form-steps">
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <div className="main-form-content grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`form-one-step`}>
              <ControlledInput<Ticket>
                fieldName="title"
                label="اسم التذكرة"
                placeholder="ادخل اسم التذكرة"
              />
            </div>
            <div className={`form-one-step`}>
              <ControlledInput<Ticket>
                fieldName="amount"
                label="مبلغ تذكرة الطيران"
                placeholder="ادخل مبلغ التذكرة"
                type="number"
              />
            </div>

            <NumberInput
              textLabel="عدد الكبار"
              initialValue={formik.values.adult}
              min={1}
              step={1}
              onChange={(newCount: number) =>
                manualChangeFormField("adult", newCount)
              }
            />
            <NumberInput
              textLabel="عدد الاطفال"
              initialValue={formik.values.child}
              min={1}
              step={1}
              onChange={(newCount: number) =>
                manualChangeFormField("child", newCount)
              }
            />
            <NumberInput
              textLabel="عدد الرضع"
              initialValue={formik.values.infant}
              min={1}
              step={1}
              onChange={(newCount: number) =>
                manualChangeFormField("infant", newCount)
              }
            />
            <ControlledSwitch<Ticket>
              fieldName="used_this_year"
              label="تم استخدام التذكرة هذه السنه"
            />
          </div>
          <ButtonsSteps
            isShowPrevButton={true}
            functionPrev={onPrev}
            isNextText={true}
            disabled={isNextDisabled}
            isNextDisabled={isNextDisabled}
            functionNext={formik.handleSubmit}
            isLoading={false}
          />
        </form>
      </FormikProvider>
    </div>
  );
};

export default AirlineTickets;
