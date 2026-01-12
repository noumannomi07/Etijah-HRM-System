import * as Yup from "yup";
import { AdvanceFormData } from "@/Dashboard/Pages/Orders/types/Advance";

export const createAdvanceSchema = (t: (key: string) => string) => 
  Yup.object({
    employee_id: Yup.number()
      .required(t("labels.requiredEmployee")),
    start_date: Yup.date()
      .required(t("labels.requiredField"))
      .min(new Date(), t("labels.startDateMin")),
    // file: Yup.mixed<File[]>()
    //   .required(t("labels.fileRequired"))
    //   .test("file-size", t("labels.fileSizeMax"), (value) => {
    //     if (!value || value.length === 0) return false;
    //     return value[0].size <= 10 * 1024 * 1024;
    //   }),
    amount: Yup.number()
      .required(t("labels.amountRequired"))
      .positive(t("labels.amountPositive"))
      .min(1, t("labels.amountMin")),
    advance_manage_id: Yup.number()
      .nullable()
      .required(t("labels.requiredAdvancePurpose")),
    // note: Yup.string()
    //   .min(5, t("labels.noteMin"))
    //   .max(500, t("labels.noteMax")),
  });

export const editAdvanceSchema = (t: (key: string) => string) => 
  Yup.object({
    employee_id: Yup.number()
      .required(t("labels.requiredEmployee")),
    start_date: Yup.date()
      .required(t("labels.requiredField"))
      .min(new Date(), t("labels.startDateMin")),
    // file: Yup.mixed<File[]>()
    //   .nullable()
    //   .test("file-size", t("labels.fileSizeMax"), (value) => {
    //     if (!value || value.length === 0) return true;
    //     return value[0].size <= 10 * 1024 * 1024;
    //   }),
    amount: Yup.number()
      .required(t("labels.amountRequired"))
      .positive(t("labels.amountPositive"))
      .min(1, t("labels.amountMin")),
    advance_manage_id: Yup.number()
      .nullable()
      .required(t("labels.requiredAdvancePurpose")),
    // note: Yup.string()
    //   .min(5, t("labels.noteMin"))
    //   .max(500, t("labels.noteMax")),
  });

export const initialValues: AdvanceFormData = {
  employee_id: -1,
  start_date: "",
  advance_manage_id: -1,
  amount: 0,
  note: "",
  file: null,
};
