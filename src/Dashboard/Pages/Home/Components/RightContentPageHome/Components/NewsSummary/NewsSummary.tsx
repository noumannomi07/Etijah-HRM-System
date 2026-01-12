import HeaderTableInfo from "@/Dashboard/Components/Ui/HeaderTableInfo/HeaderTableInfo";
import CardNewsSummary from "./CardNewsSummary";
import { FullRoutes } from "@/Routes/routes";
import React from "react";
import { HomePageData } from "@/Dashboard/Pages/Home/types";
import { useTranslation } from "react-i18next";
import { MdOutlineArticle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const NewsSummary = (props: Pick<HomePageData, "latest_blogs">) => {
  const { latest_blogs } = props;
  const { t } = useTranslation('home');
  const navigate = useNavigate();

  return (
    <div data-aos="fade-right" className="news-summary-info border-width-content">
      <HeaderTableInfo
        titleHeader={t('dashboard.rightPanel.newsSummary')}
        isButtonAll={true}
        routePageInfo={FullRoutes.Dashboard.CompanyNews.All}
        textLink={t('dashboard.tables.all')}
        buttonAddNewOrder={false}
        newButtonWithoutText={false}
        newComponentsHere={false}
      />
      {/* ================ START ALL NEWS SUMMARY ============== */}
      <div className="all-news-summary max-h-[65vh] scrollbarChange overflow-y-auto pl-1">
        {latest_blogs.length > 0 ? (
          latest_blogs.map((item) => {
            return (
              <CardNewsSummary
                key={item.id}
                image={item.images[0].image}
                titleCard={item.title}
                textCard={item.content}
              />
            );
          })
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                <MdOutlineArticle className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800">{t('dashboard.rightPanel.noNews')}</h3>
                <p className="text-sm text-gray-600 mt-1">{t('dashboard.rightPanel.noNewsDescription')}</p>
              </div>
            </div>
            <button
              onClick={() => navigate(FullRoutes.Dashboard.CompanyNews.AddNewNewsCompany)}
              className="w-full bg-[#4F5CD1] hover:bg-[#4F5CD1]/90 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FontAwesomeIcon icon={faPlus} />
              <span>{t('dashboard.rightPanel.addNews')}</span>
            </button>
          </div>
        )}
      </div>
      {/* ================ END ALL NEWS SUMMARY ============== */}
    </div>
  );
};

export default NewsSummary;
