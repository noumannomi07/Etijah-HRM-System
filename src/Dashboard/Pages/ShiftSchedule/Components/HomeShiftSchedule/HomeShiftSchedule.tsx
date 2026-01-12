
import TableShiftSchedule from '../TableShiftSchedule/TableShiftSchedule'
import { BreadcrumbsDefault } from '@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault'
import { FullRoutes } from '@/Routes/routes'
import TimeIcon from '@assets/images/sidebaricons/timeicon.svg'
import HelmetInfo from '@components/HelmetInfo/HelmetInfo'

const HomeShiftSchedule = () => {
  return (
    <>
      <HelmetInfo titlePage={"جدول العمل"} />
      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={false}
          isShowSlashHome={false}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.ShiftSchedule.All}
          iconNewPageText={<img src={TimeIcon} alt="time" />}
          textNewPage={"جدول العمل"}
          isPageDefault={false}
          defaultPageRoute={false}
          textDefaultPage={false}
          isShowTitleTextPage={false}
          titleTextPage={""}
        />
      </header>

      <main data-aos="fade-up">
        <TableShiftSchedule />
      </main>

    </>
  )
}

export default HomeShiftSchedule
