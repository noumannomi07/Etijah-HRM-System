import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import Cookies from "js-cookie";

// تعريف نوع بيانات المستخدم
export interface UserProfile {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    birth_date?: string;
    id_number?: string;
    marital_status?: string;
    image?: string;
    nationality?: {
        ar_title?: string;
        en_title?: string;
    };
    jobtitle?: {
        title?: string;
    };
    roles?: Array<{
        id?: number;
        name?: string;
        permissions?: Array<{
            id?: number;
            name?: string;
        }>;
    }>;
    // يمكن إضافة المزيد من الحقول حسب الحاجة
}

// تعريف نوع Context
interface UserContextType {
    userProfile: UserProfile | null;
    loading: boolean;
    error: string | null;
    fetchUserProfile: () => Promise<void>;
    updateUserProfile: (updatedData: Partial<UserProfile>) => void;
    clearUserProfile: () => void;
}

// إنشاء Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider Component
interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // دالة لجلب بيانات المستخدم
    const fetchUserProfile = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance.get("/profile", {
                headers: {
                    "Accept-Language": i18next.language,
                },
            });

            setUserProfile(response.data.data);
        } catch (err: any) {
            console.error("Error fetching user profile:", err);
            setError(
                err?.response?.data?.message || "حدث خطأ في جلب بيانات المستخدم"
            );
        } finally {
            setLoading(false);
        }
    };

    // دالة لتحديث بيانات المستخدم
    const updateUserProfile = (updatedData: Partial<UserProfile>) => {
        setUserProfile((prev) => (prev ? { ...prev, ...updatedData } : null));
    };

    // دالة لمسح بيانات المستخدم (عند تسجيل الخروج)
    const clearUserProfile = () => {
        setUserProfile(null);
        setError(null);
    };

    // جلب بيانات المستخدم عند تحميل التطبيق إذا كان هناك token
    useEffect(() => {
        const token =
            Cookies.get("access_token") ||
            localStorage.getItem("access_token") ||
            sessionStorage.getItem("access_token");
        if (token) {
            fetchUserProfile();
        }
    }, []);

    const value: UserContextType = {
        userProfile,
        loading,
        error,
        fetchUserProfile,
        updateUserProfile,
        clearUserProfile,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

// Hook لاستخدام Context
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

export default UserContext;
