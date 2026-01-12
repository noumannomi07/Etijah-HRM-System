import React from "react"
import HeaderCardTab from "./HeaderCardTab/HeaderCardTab"
import MainReports from "./MainReports/MainReports"
import { useReports } from "@/hooks/reports/useReports";
import Loading from "@/components/loading";

const TabOneReportInfo = () => {
  const { data, isLoading } = useReports();

  if (isLoading || !data) return <Loading />

  return (
    <div className='tab-report-info'>
      <header>
        <HeaderCardTab data={data} />
      </header>
      <main>
        <MainReports data={data} />
      </main>
    </div>
  )
}

export default TabOneReportInfo
