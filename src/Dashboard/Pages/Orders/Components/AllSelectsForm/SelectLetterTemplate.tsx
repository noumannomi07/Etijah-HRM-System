import axiosInstance from "@/utils/axios";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import i18next from "i18next";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const SelectLetterTemplate = ({
    setFieldValue,
    field,
    error,
    employee_id,
    handleLetterMangment,
}) => {
    const {t} =useTranslation("orders")
    const [Letter, setLetter] = useState([]);
    const [loading, setLoading] = useState(true);

    const lang = i18next.language;

    useEffect(() => {
        const fetchLetters = async () => {
            setLoading(true);
            setLetter([]);
            // setFieldValue("letter_mangment_id", null);

            try {
                const res = employee_id
                    ? await axiosInstance.post(
                          `/checkletters`,
                          {
                              employee_id: employee_id?.value,
                          },
                          {
                              headers: {
                                  "Accept-Language": lang,
                              },
                          }
                      )
                    : await axiosInstance.get("/letter-mangments", {
                          headers: {
                              "Accept-Language": lang,
                          },
                      });

                const data = res?.data?.data?.map((emp) => ({
                    value: emp.id,
                    label: emp.title,
                    room_of_commerce: emp.room_of_commerce,
                }));

                setLetter(data || []);
            } catch (error) {
                console.error("Failed to fetch letters", error);
                setLetter([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLetters();
    }, [employee_id?.value, lang]);

    return (
        <SelectBox
            isShowLabel={true}
            label={t("labels.letterTemplate")}
            options={Letter}
            onChange={(option) => {
                setFieldValue(field.name, option.value);
                handleLetterMangment(option.room_of_commerce);
            }}
            placeholder={t("forms.selects.selectPlaceholder")}
            isSearchable={false}
            isMulti={false}
            field={field}
            error={error}
            isLoading={loading}
        />
    );
};

SelectLetterTemplate.propTypes = {
    setFieldValue: PropTypes.func.isRequired,
    field: PropTypes.object.isRequired,
    error: PropTypes.string,
};

export default SelectLetterTemplate;
