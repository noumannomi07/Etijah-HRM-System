import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { OrganizationalStructure } from "./OrganizationalStructureTypes";
import endpoints from "@/api/endpoints";
import axiosInstance from "@/utils/axios";

 
const getOrganizationalStructure = async (): Promise<OrganizationalStructure> => {

    const response = await axiosInstance.get(endpoints.organizationalStructure.all);

    return response.data;
};

const useOrganizationalStructure = () => {
    return useQuery({
        queryKey: ["organizationalStructure"],
        queryFn: getOrganizationalStructure,
        staleTime: 1000 * 60 * 60 * 24,
    });
};

const addManagerToCategory = async (categortData: any) => {

    const response = await axiosInstance.post(endpoints.organizationalStructure.addManager, categortData);

    return response;
};

const removeManagerFromCategory = async (categoryId: number) => {

    const response = await axiosInstance.get(endpoints.organizationalStructure.removeManager + `/${categoryId}`);

    return response;
};


export { addManagerToCategory, removeManagerFromCategory };

export default useOrganizationalStructure ;


    

