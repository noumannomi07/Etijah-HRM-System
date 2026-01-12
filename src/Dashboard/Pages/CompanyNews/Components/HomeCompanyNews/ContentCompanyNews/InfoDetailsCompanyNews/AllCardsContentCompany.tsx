import CardContentInfo from "./CardContentInfo";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import { Loading } from "@/components";

const AllCardsContentCompany = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const lang = i18next.language;

    useEffect(() => {
        axiosInstance
            .get("/blogs", {
                headers: {
                    "Accept-Language": lang,
                },
            })
            .then((res) => {
                setData(res.data.data);
            })
            .catch((error) => {
                console.error("Error fetching blogs:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [lang]);

    if (loading) return <Loading />;

    return (
        <div className="all-cards-content-company grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">
            {data.map((item) => (
                <CardContentInfo
                    key={item.id}
                    image={
                        item.images && item.images.length > 0
                            ? item.images[0].image
                            : null
                    }
                    title={item.title}
                    content={item.content.slice(0, 100) + "..."} // أول 100 حرف
                    date={new Date().toLocaleDateString("ar-EG", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                />
            ))}
        </div>
    );
};

export default AllCardsContentCompany;
