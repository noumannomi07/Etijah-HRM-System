import CardEmploymentOne from "./CardEmploymentOne";
import CheckIconBg from "./icons/CheckIconBg";
import ClockIconBg from "./icons/ClockIconBg";
import CloseIconBg from "./icons/CloseIconBg";
import { useTranslation } from "react-i18next";

const HeaderCardEmployment = ({ queryAll }) => {
    const { t } = useTranslation('employment');
    
    const cardItems = [
        {
            id: 1,
            title: t('cards.accepted'),
            icon: <CheckIconBg />,
            numberCounter: queryAll?.data?.accepted || 0,
            aosData: "fade-left",
        },
        {
            id: 2,
            title: t('cards.rejected'),
            icon: <CloseIconBg />,
            numberCounter: queryAll?.data?.rejected || 0,
            aosData: "fade-up",
        },
        {
            id: 3,
            title: t('cards.onHold'),
            icon: <ClockIconBg />,
            numberCounter: queryAll?.data?.on_hold || 0,
            aosData: "fade-right",
        },
    ];
    return (
        <div className="all-card-employment grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cardItems.map((item) => (
                <CardEmploymentOne
                    dataAos={item.aosData}
                    key={item.id}
                    iconCard={item.icon}
                    title={item.title}
                    numberCounter={item.numberCounter}
                    typeCurrency={false}
                    isHideCurrency={true}
                />
            ))}
        </div>
    );
};

export default HeaderCardEmployment;
