import HeaderOrderManagement from './Components/HeaderOrderManagement/HeaderOrderManagement'
import CardsHeaderOrderManagement from './Components/CardsHeaderOrderManagement/CardsHeaderOrderManagement'
import BannerOrderManagement from './Components/BannerOrderManagement/BannerOrderManagement'
import ServicesSection from '@/Website/Pages/Home/Components/ServicesSection/ServicesSection'
import BannerSectionShared from '@/Website/Shared/BannerSectionShared/BannerSectionShared'
import SectionCustomerOpinions from '@/Website/Shared/SectionCustomerOpinions/SectionCustomerOpinions'
import HelmetInfo from '@components/HelmetInfo/HelmetInfo'
import { useTranslation } from 'react-i18next'

const OrderManagementServices = () => {
  const { t } = useTranslation(['orderManagementServices', 'seo'])
  
  return (
    <>
      <HelmetInfo 
        titlePage={t('seo:orders.title')}
        description={t('seo:orders.description')}
        keywords={t('seo:orders.keywords')}
        type="website"
      />
      <div className="Order-management-page">
        <HeaderOrderManagement />
        <CardsHeaderOrderManagement />
        <BannerOrderManagement />
        <ServicesSection />
        <SectionCustomerOpinions />
        <BannerSectionShared />
      </div>
    </>
  )
}

export default OrderManagementServices
