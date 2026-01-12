import PropTypes from "prop-types";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const CardEmploymentOne = ({
    dataAos = "",
    iconCard,
    title,
    numberCounter,
    typeCurrency,
}) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
    });
    return (
        <div
            data-aos={dataAos}
            className="card-employment-one flex-wrap w-full border rounded-[8px] transition-all duration-500  hover:border-primaryColor flex-between p-[25px_15px]"
        >
            {/* ================ START CONTENT RIGHT ================ */}
            <div className="content-card-right item-center-flex">
                {/* =============== START ICON CARD ================= */}
                <div className="icon-employment">{iconCard}</div>
                {/* =============== END ICON CARD ================= */}
                <h2 className="title text-font-dark text-[13px] sm:text-[16px]">
                    {title}
                </h2>
            </div>
            {/* ================ END CONTENT RIGHT ================ */}
            {/* ================ START NUMBER COUNTER ============= */}
            <div
                ref={ref}
                className="number-counter text-[18px] sm:text-[22px] font-[600] text-darkColor flex items-center gap-1"
            >
                {inView && <CountUp end={numberCounter} duration={3} />}
                <sub>
                    <p className="type-currency text-[14px] sm:text-[15px]">
                        {typeCurrency}
                    </p>
                </sub>
            </div>
            {/* ================ END NUMBER COUNTER ============= */}
        </div>
    );
};

CardEmploymentOne.propTypes = {
    dataAos: PropTypes.string.isRequired,
    iconCard: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    typeCurrency: PropTypes.string.isRequired,
    numberCounter: PropTypes.number.isRequired,
};
export default CardEmploymentOne;
