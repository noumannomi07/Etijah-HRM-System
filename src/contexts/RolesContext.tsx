import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";

// Define user role type
export interface UserRole {
    id?: number;
    name?: string;
    permissions?: Array<{
        id?: number;
        name?: string;
    }>;
}

// Define RolesContext type
interface RolesContextType {
    userRoles: UserRole[];
    loading: boolean;
    error: string | null;
    fetchUserRoles: () => Promise<void>;
}

// Create Context
const RolesContext = createContext<RolesContextType | undefined>(undefined);

// Provider Component
interface RolesProviderProps {
    children: ReactNode;
}

export const RolesProvider: React.FC<RolesProviderProps> = ({ children }) => {
    const [userRoles, setUserRoles] = useState<UserRole[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Function to fetch user roles
    const fetchUserRoles = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get("/my-role", {
                headers: {
                    "Accept-Language": i18next.language,
                },
            });

            const rolesData = response.data.data;
            setUserRoles(rolesData);

            // Cache roles in localStorage
            localStorage.setItem("user_roles", JSON.stringify(rolesData));
        } catch (err: any) {
            setUserRoles([]);
            console.error("Error fetching user roles:", err);
            setError(
                err?.response?.data?.message || "حدث خطأ في جلب بيانات الدور"
            );
        } finally {
            setLoading(false);
        }
    };

    // Load roles on mount
    useEffect(() => {
        // Try to load cached roles first
        const cachedRoles = localStorage.getItem("user_roles");
        if (cachedRoles) {
            try {
                const rolesData = JSON.parse(cachedRoles);
                setUserRoles(rolesData);
                setLoading(false); // Show cached data immediately
            } catch (error) {
                console.error("Error parsing cached roles:", error);
                localStorage.removeItem("user_roles");
            }
        }

        // Always fetch fresh data
        fetchUserRoles();
    }, []);

    const value: RolesContextType = {
        userRoles,
        loading,
        error,
        fetchUserRoles,
    };

    return (
        <RolesContext.Provider value={value}>{children}</RolesContext.Provider>
    );
};

// Hook to use RolesContext
export const useRoles = (): RolesContextType => {
    const context = useContext(RolesContext);
    if (context === undefined) {
        throw new Error("useRoles must be used within a RolesProvider");
    }
    return context;
};

export default RolesContext;
