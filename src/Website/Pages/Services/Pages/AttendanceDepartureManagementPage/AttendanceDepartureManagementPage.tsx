import React from "react";
import ServicesSection from "@/Website/Pages/Home/Components/ServicesSection/ServicesSection";
import CardsHeaderAttendance from "./Components/CardsHeaderAttendance/CardsHeaderAttendance";
import HeaderAttendanceDeparture from "./Components/HeaderAttendanceDeparture/HeaderAttendanceDeparture";
import BannerSectionShared from "@/Website/Shared/BannerSectionShared/BannerSectionShared";
import BannerAttendance from "./Components/BannerAttendance/BannerAttendance";
import SectionCustomerOpinions from "@/Website/Shared/SectionCustomerOpinions/SectionCustomerOpinions";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { useTranslation } from "react-i18next";
// import { withPermissions } from "@/hoc";


const AttendanceDepartureManagementPage = () => {
    const { t } = useTranslation(['attendanceDepartureManagement', 'seo']);

    return (
        <>
            <HelmetInfo 
                titlePage={t('seo:attendance.title')}
                description={t('seo:attendance.description')}
                keywords={t('seo:attendance.keywords')}
                type="website"
            />
            <div className="attendance-departure-page">
                <HeaderAttendanceDeparture />
                <CardsHeaderAttendance />
                <BannerAttendance />
                <ServicesSection />
                <SectionCustomerOpinions />
                <BannerSectionShared />
            </div>
        </>
    );
};

export default AttendanceDepartureManagementPage;


// import ServicesSection from "@/Website/Pages/Home/Components/ServicesSection/ServicesSection";
// import CardsHeaderAttendance from "./Components/CardsHeaderAttendance/CardsHeaderAttendance";
// import HeaderAttendanceDeparture from "./Components/HeaderAttendanceDeparture/HeaderAttendanceDeparture";
// import BannerSectionShared from "@/Website/Shared/BannerSectionShared/BannerSectionShared";
// import BannerAttendance from "./Components/BannerAttendance/BannerAttendance";
// import SectionCustomerOpinions from "@/Website/Shared/SectionCustomerOpinions/SectionCustomerOpinions";
// import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
// import { withPermissions } from "@/hoc";

// const AttendanceDepartureManagementPage = ({
//     permissions,
// }: {
//     permissions: any;
// }) => {
//     console.log({ permissions });
//     return (
//         <>
//             <HelmetInfo titlePage={" إدارة الحضور والمغادرة"} />
//             <div className="attendance-departure-page">
//                 <HeaderAttendanceDeparture />
//                 <CardsHeaderAttendance />
//                 <BannerAttendance />
//                 <ServicesSection />
//                 <SectionCustomerOpinions />
//                 <BannerSectionShared />
//             </div>
//         </>
//     );
// };

// export default withPermissions(AttendanceDepartureManagementPage, "attendance");
