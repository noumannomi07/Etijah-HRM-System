import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";
import { ApiResponse } from "@/types/api";

type EndpointConfig<T = string> = {
    all: T;
    create?: T | { url: T; config?: any };
    update?: T;
    delete?: T;
    get?: T;
};

export const useApi = <T, TCreate = T, TUpdate = T>(
    endpointKey: string,
    endpoints: EndpointConfig,
    options?: {
        staleTime?: number;
        retry?: number;
        retryDelay?: number;
        lazy?: boolean; // Add this
    }
) => {
    const queryClient = useQueryClient();
    const defaultOptions = {
        staleTime: 15 * 60 * 1000, // 15 minutes
        retry: 3,
        retryDelay: (attempt: number) => attempt * 2000,
        ...options,
    };

    // GET all items
    const fetchAll = async () => {
        return axiosInstance
            .get<ApiResponse<T[]>>(endpoints.all)
            .then((res) =>
                Array.isArray(res.data?.data) ? res.data?.data : res.data
            );
    };

    // GET single item
    const fetchOne = async (id: string) => {
        if (!endpoints.get) throw new Error("Get endpoint not defined");
        return axiosInstance.get(`${endpoints.get}/${id}`).then((res) => {
            if (!res.data.data) {
                throw new Error("Update operation returned undefined data");
            }
            return res.data.data;
        });
    };

    // POST new item
    const createItem = async (data: TCreate) => {
        if (!endpoints.create) throw new Error("Create endpoint not defined");

        // Handle both string and object configurations
        if (typeof endpoints.create === "string") {
            return axiosInstance.post(endpoints.create, data);
        } else {
            const { url, config } = endpoints.create;
            return axiosInstance.post(url, data, config);
        }
    };

    // UPDATE item
    const updateItem = async ({ id, ...data }: TUpdate & { id: string }) => {
        if (!endpoints.update) throw new Error("Update endpoint not defined");
        return axiosInstance
            .put(`${endpoints.update}/${id}`, data)
            .then((res) => res);
    };

    // DELETE item
    const deleteItem = async (id: string) => {
        if (!endpoints.delete) throw new Error("Delete endpoint not defined");
        return axiosInstance
            .delete(`${endpoints.delete}/${id}`)
            .then((res) => res);
    };

    // Queries
    const queryAll = useQuery({
        queryKey: [endpointKey],
        queryFn: fetchAll,
        enabled: !options?.lazy, // Add this
        ...defaultOptions,
    });

    const queryOne = (id: string, options?: { enabled?: boolean }) =>
        useQuery<T, Error>({
            queryKey: [endpointKey, id],
            queryFn: () => fetchOne(id),
            enabled: options?.enabled !== false && !!id && id !== "disabled",
            ...defaultOptions,
        });

    // Mutations
    const createMutation = useMutation({
        mutationFn: createItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [endpointKey] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [endpointKey] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [endpointKey] });
        },
    });

    return {
        // Queries
        queryAll,
        queryOne,

        // Mutation functions
        createItem: createMutation.mutateAsync,
        updateItem: updateMutation.mutateAsync,
        deleteItem: deleteMutation.mutateAsync,

        // Mutation states
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,

        // Errors
        createError: createMutation.error,
        updateError: updateMutation.error,
        deleteError: deleteMutation.error,

        // Raw mutations for more control
        mutations: {
            create: createMutation,
            update: updateMutation,
            delete: deleteMutation,
        },
    };
};
