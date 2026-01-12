import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import AllFaqContent from "./Components/AllFaqContent/AllFaqContent";
import HeaderFaq from "./Components/HeaderFaq/HeaderFaq";
import  { useEffect, useState } from "react";
import { FaqResponse } from "../BlogsEtijah/BlogType";
import { Faq } from "../BlogsEtijah/BlogType";
import { query } from "@/utils/website";
import React from "react";
import Loading from "@/components/loading";
import { useTranslation } from "react-i18next";
const FaqEtijah = () => {
  const { t } = useTranslation(['faq', 'seo']);
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trim());
  };

  const [faqs, setFaqs] = useState<Faq | null>(null);

  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await query<FaqResponse>({
          endpoint: `faqs`,
        });
        setFaqs(response.data.data);
      } catch (error) {
        console.error('Error fetching faqs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);
 
  return (
    <>
      <HelmetInfo 
        titlePage={t('seo:faq.title')}
        description={t('seo:faq.description')}
        keywords={t('seo:faq.keywords')}
        type="website"
      />
      <div className="faq-page-etijah">
        <HeaderFaq search={search} handleSearch={handleSearch} />
        {loading ? (
          <Loading />
        ) : faqs ? (
          <AllFaqContent faqs={faqs} />
        ) : (
          <div className="error-state">{t('error.noFaqs')}</div>
        )}
      </div>
    </>
  );
};

export default FaqEtijah;
