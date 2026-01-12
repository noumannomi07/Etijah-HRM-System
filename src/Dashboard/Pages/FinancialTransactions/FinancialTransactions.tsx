import { Outlet } from "react-router-dom";
import { withPermissions } from "@/hoc";

const FinancialTransactions = () => {
  return <Outlet />;
};

export default withPermissions(FinancialTransactions, "financial_transactions");
