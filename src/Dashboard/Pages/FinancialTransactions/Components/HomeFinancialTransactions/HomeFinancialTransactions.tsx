import MoneyArrowRight from "@assets/images/sidebaricons/moneyarrowright.svg"
import HelmetInfo from "@components/HelmetInfo/HelmetInfo"
import { BreadcrumbsDefault } from "@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault"
import { FullRoutes } from "@/Routes/routes"
import PayrollTransactions from "./PayrollTransactions"
import React from "react"
import { useTranslation } from "react-i18next"

const HomeFinancialTransactions = () => {
  const { t } = useTranslation('financialTransactions')
  
  return (
    <>
      <HelmetInfo titlePage={t('pageTitle')} />
      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={false}
          isShowSlashHome={false}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.FinancialTransactions.All}
          iconNewPageText={<img src={MoneyArrowRight} alt="money" />}
          textNewPage={t('pageTitle')}
          isPageDefault={false}
          defaultPageRoute={false}
          textDefaultPage={false}
          isShowTitleTextPage={false}
          titleTextPage={false}
        />
      </header>

      <main>
        <PayrollTransactions />
      </main>
    </>
  )
}

export default HomeFinancialTransactions