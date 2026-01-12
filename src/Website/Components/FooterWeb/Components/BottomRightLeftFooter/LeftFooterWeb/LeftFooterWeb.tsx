import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
faYoutube,
  faXTwitter
} from "@fortawesome/free-brands-svg-icons";
import AppsWeb from "@/Website/Shared/AppsWeb/AppsWeb";
import { useTranslation } from "react-i18next";

const LeftFooterWeb = () => {
  const { t } = useTranslation('footer');
  
  const arraySocial = [
    { icon: faFacebookF, link: "https://www.facebook.com/etijah.sa" },
    { icon: faXTwitter, link: "https://x.com/ETIJAH1" },
    { icon: faInstagram, link: "https://www.instagram.com/etijah.sa" },
    { icon: faYoutube, link: "https://www.youtube.com/@etijahsa" }
  ];
  return (
    <div className="left-footer-web">
      {/* =============== START HEADER LEFT FOOTER ================ */}
      <div className="header-left-footer">
        <h2 className="title text-font-white text-[20px]">{t('left.downloadApp')}</h2>
        {/* =============== START APPS INFO =================== */}
        <AppsWeb />
        {/* =============== END APPS INFO =================== */}
      </div>
      {/* =============== END HEADER LEFT FOOTER ================ */}
      {/* =============== START BOTTOM FOOTER CONTENT ============ */}
      <div className="bottom-footer-left mt-[25px] md:mt-[50px]">
        <h2 className="title text-font-white text-[20px]">
          {t('left.followUs')}
        </h2>
        <ul className="list-social mt-4 item-center-flex">
          {arraySocial.map((social, index) => (
            <li className="nav-item-social" key={index}>
              <a
                href={social.link}
                className="w-[45px] h-[45px] text-[18px] flex items-center justify-center text-primaryColor bg-whiteColor rounded-full hover:bg-orangeColor hover:text-whiteColor transition-all duration-500"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Go to ${social.name} profile`}
              >
                <FontAwesomeIcon icon={social.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* =============== END BOTTOM FOOTER CONTENT ============ */}
    </div>
  );
};

export default LeftFooterWeb;
