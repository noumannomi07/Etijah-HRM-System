import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import { ReportsResponse } from '@/types/Reports';
import endpoints from '@/api/endpoints';
import i18next from 'i18next';

export const useReports = () => {
  const lang = i18next.language;
  
  return useQuery<ReportsResponse>({
    queryKey: ['reports', lang],
    queryFn: async () => {
      const { data } = await axiosInstance.get(endpoints.reports.all, {
        headers: {
          'Accept-Language': lang
        }
      });
      return data;
    }
  });
}; 