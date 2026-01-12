import axiosInstance from "@/utils/axios";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Spinner } from "flowbite-react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const JobTypeSelect = ({
  labelText = "نوع الوظيفة",
  placeholder = "-إختر-",
  setFieldValue,
  field,
  error,
  isMulti = false,
}: {
  labelText?: string;
  placeholder?: string;
  setFieldValue: (name: string, value: any) => void;
  field: any;
  error: string;
  isMulti?: boolean;
}) => {
  const [jobType, setjobType] = useState([]);
  const [loading, setLoading] = useState(true);

  const lang = i18next.language;

  useEffect(() => {
    axiosInstance
      .get("/job-type", {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((res) => {
        const formattedData = res.data.data.map((emp: any) => ({
          value: emp.id,
          label: emp.title,
        }));
        setjobType(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
 
  const handleChange = (option: any) => {
    if (isMulti) {
      // For multi-select, option will be an array of selected values
      const values = option ? option.map((item: any) => item.value) : [];
      setFieldValue(field.name, values);
    } else {
      // For single select, option will be a single object
      setFieldValue(field.name, option?.value || null);
    }
  };

  return !loading ? (
    <SelectBox
      isShowLabel={true}
      label={labelText}
      options={jobType}
      onChange={handleChange}
      placeholder={placeholder}
      isSearchable={true}
      isMulti={isMulti}
      field={field}
      error={error}
    />
  ) : (
    <Spinner />
  );
};

JobTypeSelect.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  error: PropTypes.string,
  labelText: PropTypes.string,
  isMulti: PropTypes.bool,
};

export default JobTypeSelect;
