import React, { useEffect, useMemo, useState } from "react";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { ExpenseManage } from "@/Dashboard/Pages/types";
import ExpensesCompenstation from "./ExpensesCompenstation";
import FromMileageCompensation from "./FromMileageCompensation/FromMileageCompensation";
import { useTranslation } from "react-i18next";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import ControlledSelect from "@/Dashboard/Shared/SelectBox/ControlledSelect";

type ExpensesFormProps = {
  expenseManagement?: ExpenseManage;
};

export const ExpensesForm: React.FC = () => {
  const { t } = useTranslation("orders");
  const { t: tSystem } = useTranslation("systemSettings");

  

  const formik = useFormik<ExpensesFormProps>({
    initialValues: {
      expenseManagement: undefined
    },
    validationSchema: Yup.object({
      expenseManagement: Yup.object().required(
        t("validation.expenseTypeRequired")
      )
    }),
    onSubmit: () => {}
  });

  const expenseManagement = formik.values.expenseManagement;

  const ExpensesFormContent = useMemo(() => {
    if (expenseManagement === undefined) {
      return null;
    }
    if (expenseManagement.has_mile === 0) {
      return <ExpensesCompenstation expense={expenseManagement} />;
    }
    if (expenseManagement.has_mile === 1) {
      return <FromMileageCompensation expense={expenseManagement} />;
    }
  }, [expenseManagement]);

  const [options, setOptions] = useState([]);
  const lang = i18next.language;

  useEffect(() => {
    axiosInstance
      .get("/expense-mangments", {
        headers: {
          "Accept-Language": lang
        }
      })
      .then((res) => {
        const formattedData = res.data.data.map(
          (item: { id: any; title: any }) => ({
            ...item,
            value: item.id,
            label: item.title
          })
        );
        setOptions(formattedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <FormikProvider value={formik}>
        <div className="gird grid-cols-1">
          <ControlledSelect
            type="static"
            staticOptions={options}
            fieldName="expenseManagement"
            label={tSystem("expenseManagement.addExpense")}
            value={expenseManagement?.id}
            onChange={(e) => {
              formik.setFieldValue("expenseManagement", e);
            }}
          />
        </div>
        {ExpensesFormContent}
      </FormikProvider>
    </div>
  );
};
