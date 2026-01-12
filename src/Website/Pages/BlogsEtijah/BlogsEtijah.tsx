import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BlogsEtijah = () => {
  const { t } = useTranslation(['blogs', 'seo']);
  
  return (
    <>
      <HelmetInfo 
        titlePage={t('seo:blogs.title')}
        description={t('seo:blogs.description')}
        keywords={t('seo:blogs.keywords')}
        type="website"
      />
      <div className="blogs-page">
        <Outlet />
      </div>
    </>
  );
};

export default BlogsEtijah;
