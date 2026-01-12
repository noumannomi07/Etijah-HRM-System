import axiosInstance from "@/utils/axios";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import i18next from "i18next";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const SelectTypeVacation = ({
    setFieldValue,
    field,
    error,
    isMulti = false,
}) => {
    const { t } = useTranslation("orders");
    const [Vacation, setVacation] = useState([]);
    const [loading, setLoading] = useState(true);

    const lang = i18next.language;

    useEffect(() => {
        axiosInstance
            .get("/vacation-management", {
                headers: {
                    "Accept-Language": lang,
                },
            })
            .then((res) => {
                const formattedData = res.data.data.map((emp) => ({
                    value: emp.id,
                    label: emp.title,
                }));
                setVacation(formattedData);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <SelectBox
            isShowLabel={true}
            label={t("forms.selects.vacationType")}
            options={Vacation}
            onChange={(option) => {
                setFieldValue("vacation_manage_id", option.value);
            }}
            placeholder={t("forms.selects.selectPlaceholder")}
            isSearchable={false}
            isMulti={isMulti}
            field={field}
            error={error}
            isLoading={loading}
        />
    );
};

SelectTypeVacation.propTypes = {
    setFieldValue: PropTypes.func.isRequired,
    field: PropTypes.object.isRequired,
    error: PropTypes.string,
};

export default SelectTypeVacation;
