import axiosInstance from "@/utils/axios";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Spinner } from "flowbite-react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const JobTitleSelect = ({
  labelText = "المسمى الوظيفي",
  setFieldValue,
  field,
  error,
}) => {
  const [Job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);

  const lang = i18next.language;

  useEffect(() => {
    axiosInstance
      .get("/job-title", {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((res) => {
        const formattedData = res.data.data.map((emp) => ({
          value: emp.id,
          label: emp.title,
        }));
        setJob(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // const options = {
  //   Job: [
  //     { value: "موظف1", label: "موظف 1" },
  //     { value: "موظف2", label: "موظف 2" },
  //   ],
  // };

  return !loading ? (
    <SelectBox
      isShowLabel={true}
      label={labelText}
      options={Job}
      onChange={(option) => {
        setFieldValue(field.name, option.value);
      }}
      placeholder="-إختر-"
      isSearchable={true}
      isMulti={false}
      field={field}
      error={error}
    />
  ) : (
    <Spinner />
  );
};

JobTitleSelect.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  error: PropTypes.string,
  labelText: PropTypes.string,
};

export default JobTitleSelect;
