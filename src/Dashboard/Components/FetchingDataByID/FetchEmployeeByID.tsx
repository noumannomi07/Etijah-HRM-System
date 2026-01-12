import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import { Spinner } from "flowbite-react";
import { useTranslation } from "react-i18next";

interface FetchEmployeeByIDProps {
  id: string | number;
  onDataFetched: (data: any) => void;
}

const FetchEmployeeByID: React.FC<FetchEmployeeByIDProps> = ({ id, onDataFetched }) => {
  const { t } = useTranslation('common');
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError(t('fetchingData.errors.noIdProvided'));
      return;
    }
    else {
      setError(null);
      axiosInstance
        .get(`/employee/${id}`, {
          headers: {
            "Accept-Language": i18next.language,
          },
        })
        .then((res) => {
          setData(res.data);
          onDataFetched(res.data.data);
          setError(null);
        })
        .catch((err) => {
          console.error(t('fetchingData.errors.fetchError'), err);
          setError(t('fetchingData.errors.fetchError'));
        });
    }
  }, [id, t]);

  if (!id) {
    return <></>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return data ? null : <Spinner aria-label={t('fetchingData.loading.employee')} />;
};

export default FetchEmployeeByID;
