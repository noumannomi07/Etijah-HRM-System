import ButtonBack from '@/Dashboard/Shared/ButtonBack/ButtonBack'
import FormAddNewDepartments from './FormAddNewDepartments'
import GridIcon2 from '@assets/images/sidebaricons/gridicon2.svg'
import { BreadcrumbsDefault } from '@/Dashboard/Shared/BreadcrumbsDefault/BreadcrumbsDefault'
import HelmetInfo from '@components/HelmetInfo/HelmetInfo'
import { FullRoutes } from '@/Routes/routes'

const AddNewDepartments = () => {
  return (
    <>
      <HelmetInfo titlePage={"إضافة قسم جديد"} />

      <header>
        <BreadcrumbsDefault
          isShowTitleHomePage={false}
          isShowSlashHome={false}
          isDashboardRouteHomePage={false}
          isShowNewLinkPage={true}
          routeOfNewLinkPage={FullRoutes.Dashboard.Departments.All}
          iconNewPageText={<img src={GridIcon2} alt="grid" />}
          textNewPage={"الأقسام"}
          isPageDefault={false}
          defaultPageRoute={false}
          textDefaultPage={false}
          isShowTitleTextPage={true}
          titleTextPage={"إضافة قسم جديد"}
        />
      </header>
      <ButtonBack
        isRouteDashboard={true}
        routeLink="departments-page"
        addNewRoute={false}
        isTextBack={true}
        AddNewTextButton={""}
      />
      <main data-aos="fade-up">
        <FormAddNewDepartments />
      </main>
    </>
  )
}

export default AddNewDepartments