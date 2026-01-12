import CardEmploymentOne from "./CardEmploymentOne";
import CheckIconBg from "./icons/CheckIconBg";
import ClockIconBg from "./icons/ClockIconBg";
import CloseIconBg from "./icons/CloseIconBg";
// {"accepted":0,"rejected":0,"pending":0,"on_hold":0,"total":0,"applicants":[]}
const HeaderCardEmployment = ({ totals }) => {
    const cardItems = [
        {
            id: 1,
            title: "عدد المقبولين",
            icon: <CheckIconBg />,
            numberCounter: totals?.accepted,
            aosData: "fade-left",
        },
        {
            id: 2,
            title: "عدد المرفوضين",
            icon: <CloseIconBg />,
            numberCounter: totals?.rejected,
            aosData: "fade-up",
        },
        {
            id: 3,
            title: "عدد الإحتياط",
            icon: <ClockIconBg />,
            numberCounter: totals?.on_hold,
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
                />
            ))}
        </div>
    );
};

export default HeaderCardEmployment;
