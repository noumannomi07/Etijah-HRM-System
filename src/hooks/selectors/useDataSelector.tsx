// import { ApiResponse } from "@/types/api";
// import { TSelectOption } from "@/types/forms";
// import axiosInstance from "@/utils/axios";
// import { useQuery } from "@tanstack/react-query";

// const fetchDataSelector = async <T extends any>({ apiEndpoint }: { apiEndpoint: string }) => {
//   return axiosInstance
//     .get<ApiResponse<Array<T>>>(apiEndpoint)
//     .then((res) => {
//       return res.data?.data;
//     });
// };

// type isSelectorStatic = {
//   enabled: false;
// }

// type isSelectorSync = {
//   enabled: true;
//   apiEndpoint: string;
// }

// type DataSelectorProps<T> = {
//   customMapping?: (data: Array<T>) => any;
// } & (isSelectorStatic | isSelectorSync);

// export const useDataSelector = <T extends { id: any; title: any }>(props: DataSelectorProps<T>) => {
//   const { customMapping, enabled } = props;
//   const query = useQuery<Array<T>, Error>({
//     enabled: !!enabled,
//     staleTime: 15 * 60 * 1000,
//     queryKey: ["selector", props.apiEndpoint],
//     queryFn: () => fetchDataSelector<T>({ apiEndpoint: props?.apiEndpoint }),
//   });

//   const _data: Array<TSelectOption> = customMapping
//     ? customMapping(query?.data ?? [])
//     : query?.data?.map((item: { id: any; title: any }) => ({
//       value: item.id,
//       label: item.title,
//     }));

//   return {
//     ...query,
//     data: _data,
//   };
// };
