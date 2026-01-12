import axiosInstance from "@/utils/axios";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Spinner } from "flowbite-react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const WorkplaceSelect = ({
  labelText = "أماكن العمل",
  placeholder = "-إختر-",
  // labelText = "مكتب العمل",
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
  const [category, setcategory] = useState([]);
  const [loading, setLoading] = useState(true);

  const lang = i18next.language;

  useEffect(() => {
    axiosInstance
      .get("/workplace", {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((res) => {
        const formattedData = res.data.data.map((emp) => ({
          value: emp.id,
          label: emp.title,
        }));
        setcategory(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return !loading ? (
    <SelectBox
      isShowLabel={true}
      label={labelText}
      options={category}
      onChange={(option) => {
        setFieldValue(field.name, option.value);
      }}
      placeholder={placeholder}
      isSearchable={false}
      isMulti={false}
      field={field}
      error={error}
    />
  ) : (
    <Spinner />
  );
};

WorkplaceSelect.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  error: PropTypes.string,
  labelText: PropTypes.string,
};

export default WorkplaceSelect;
