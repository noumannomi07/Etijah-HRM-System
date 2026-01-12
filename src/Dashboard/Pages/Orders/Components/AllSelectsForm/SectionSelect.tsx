import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import axiosInstance from "@/utils/axios";
import i18next from "i18next";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const SectionSelect = ({
  labelText = "القسم",
  placeholder = "-إختر-",
  setFieldValue,
  field,
  error,
}: {
  labelText?: string;
  placeholder?: string;
  setFieldValue: (name: string, value: any) => void;
  field: any;
  error: string;
}) => {

  const [section, setSection] = useState([]);

  const [loading, setLoading] = useState(true);

  const lang = i18next.language;

  useEffect(() => {
    axiosInstance
      .get("/employee-categories", {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((res) => {
        const formattedData = res.data.data.map((emp: any) => ({
          value: emp.id,
          label: emp.title,
        }));
        setSection(formattedData);
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
      label={labelText}
      options={section}
      onChange={(option: any) => setFieldValue("sectionInfo", option)} 
      placeholder={placeholder}
      isSearchable={false}
      isMulti={false}
      field={field}
      error={error}
    />
  );
}; 

SectionSelect.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  error: PropTypes.string
};

export default SectionSelect;
