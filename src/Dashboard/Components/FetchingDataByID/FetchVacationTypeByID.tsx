import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import { Spinner } from "flowbite-react";
import { useTranslation } from "react-i18next";

interface FetchVacationTypeByIDProps {
  id: string | number;
  onDataFetched: (data: any) => void;
}

const FetchVacationTypeByID: React.FC<FetchVacationTypeByIDProps> = ({ id, onDataFetched }) => {
  const { t } = useTranslation('common');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = () => {
      if (!id) {
        setError(t('fetchingData.errors.noIdProvided'));
        return;
      }

      axiosInstance
        .get(`/vacation-management/${id}`, {
          headers: {
            "Accept-Language": i18next.language,
          },
        })
        .then((res) => {
          onDataFetched(res.data.data);
          setError(null);
        })
        .catch((err) => {
          console.error(t('fetchingData.errors.fetchError'), err);
          setError(t('fetchingData.errors.fetchError'));
        });
    };

    fetchData();
    i18next.on("languageChanged", fetchData);

    return () => {
      i18next.off("languageChanged", fetchData);
    };
  }, [id, t]);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return <Spinner aria-label={t('fetchingData.loading.vacation')} />;
};

export default FetchVacationTypeByID;
