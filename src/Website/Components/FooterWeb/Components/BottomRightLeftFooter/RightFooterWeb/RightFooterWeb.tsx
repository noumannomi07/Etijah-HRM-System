import LogoWeb from "@/Website/Components/LogoWeb/LogoWeb";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const RightFooterWeb = () => {
  const { t } = useTranslation('footer');
  
  const mainLinks = [
    { path: "about", label: t('right.links.about') },
    { path: "services-page", label: t('right.links.services') },
    { path: "about-app", label: t('right.links.aboutApp') },
    { path: "packages-page", label: t('right.links.packages') },
    { path: "faq-etijah", label: t('right.links.faq') },
    { path: "blogs-etijah", label: t('right.links.blog') },
    { path: "contact-us", label: t('right.links.contact') },
    { path: "privacy-usage-policy", label: t('right.links.privacy') }
  ];
  const servicesLinks = [
    {
      path: "attendance-departure-management-page",
      label: t('right.serviceLinks.attendance')
    },
    {
      path: "follow-up-performance",
      label: t('right.serviceLinks.performance')
    },
    { path: "payroll-benefits-management", label: t('right.serviceLinks.payroll') },
    { path: "order-management-services", label: t('right.serviceLinks.orders') },
    // { path: "smart-range-calculator", label: "حاسبة النطاقات" },
    { path: "recruitment-management-services", label: t('right.serviceLinks.recruitment') }
  ];

  return (
    <div className="right-footer-web grid sm:grid-cols-1 md:grid-cols-6 gap-5">
      <div className="col-span-1 md:col-span-2">
        {/* ================ START LOGO ================ */}
        <LogoWeb />
        {/* ================ END LOGO ================ */}
      </div>
      {/* ================ START LIST LINKS ================= */}
      <nav className="col-span-1 md:col-span-2">
        <h2 className="title-footer-links text-font-white text-[20px]">
          {t('right.mainPages')}
        </h2>
        <ul className="list-links-footer">
          {mainLinks.map((link, index) => (
            <li key={index} className="nav-item">
              <Link
                to={link.path}
                className="text-font-white mt-3 flex font-[500] hover:text-orangeColor transition-all duration-500"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* ================ END LIST LINKS ================= */}

      <nav className="col-span-1 md:col-span-2">
        <h2 className="title-footer-links text-font-white text-[20px]">
          {t('right.services')}
        </h2>
        <ul className="list-links-footer">
          {servicesLinks.map((link, index) => (
            <li key={index} className="nav-item">
              <Link
                to={link.path}
                className="text-font-white mt-3 flex font-[500] hover:text-orangeColor transition-all duration-500"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default RightFooterWeb;
