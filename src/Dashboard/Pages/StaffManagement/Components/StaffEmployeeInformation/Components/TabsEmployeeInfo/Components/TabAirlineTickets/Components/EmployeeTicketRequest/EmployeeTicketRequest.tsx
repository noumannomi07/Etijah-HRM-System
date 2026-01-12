import Saudiriyal from "@/assets/iconsaudiriyal/saudiriyal";
import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import DataTableTwo from "@/Dashboard/Shared/DataTableInfo/DataTableTwo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EmployeeTicketRequest = ({employeeRequests}) => {

    const { t } = useTranslation("staffManagement");

    const navigate = useNavigate();

    const theadTrContent = [
        t("salary.status"),
        t("salary.type"),
        t("salary.amount"),
        t("salary.createdAt"),
        t("salary.action"),
        ""
      ]; 
      const status = (item: any) => {
        const statusText = item.salaryAdjustment ? t("salary.approved") : t("salary.rejected");
        
        return item.salaryAdjustment ? (
          <div className="text-greenColor01">
            {statusText}
            {item.salaryAdjustment?.payroll_transaction && (
              <p className="text-greenColor01">
                {t("airlineTickets.processedInPayroll", {
                  month: item.salaryAdjustment.payroll_transaction.month,
                  year: item.salaryAdjustment.payroll_transaction.year
                })}
              </p>
            )}
          </div>
        ) : (
          <div className="text-redColor01">
            {statusText}
          </div>
        );
      }
      // CONTENT OF ARRAY
      const tbodyContent = employeeRequests.map((item) => [
        status(item),
        item.type,
        <div className="flex items-center gap-2">
            {item.price}
            <Saudiriyal />
        </div>,
        new Date(item.created_at).toLocaleDateString('ar-SA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        <div className="flex items-center gap-2">
            <button className="btn-main button-green"
            onClick={() => {
               navigate('/dashboard/orders?tab=5')
            }}
            >
                {t("airlineTickets.viewRequest")}
            </button>
        </div>
 

      ]);
    
      return (
        <div className="border-width-content">
           
          <HeaderTableInfo
            titleHeader=''
            isButtonAll={false}
            routePageInfo=""
            textLink=""
            buttonAddNewOrder={false}
            functionButtonAddNewOrder={() => {}}
            newButtonWithoutText={false}
            functionButtonNewButton={() => {}}
            textButton=""
     
          />
          <DataTableTwo
            theadContent={theadTrContent}
            tbodyContent={tbodyContent}
            withCheckboxes={false}
            isShowContentFilterInfo={false}
            isShowModalButtonFilter={false}
            functionButtonFilter={() => {}}
            isTrueButtonsModalContentRight={false}
            functionButtonModalOne={() => {}}
            textContentButtonOne=""
            isTrueButtonTwoModalContent={false}
            newClassButtonTwo=""
            functionModalButtonTwo={() => {}}
            textContetButtonTwo=""
            showDateFilter={false}
          />
        </div>
      );
    };

export default EmployeeTicketRequest;
