import axiosInstance from "@/utils/axios";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Spinner } from "flowbite-react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const MangerSelect = ({
  labelText = "المدير المباشر",
  setFieldValue,
  field,
  error,
  exceptId,
}) => {
  const [Manger, setManger] = useState([]);
  const [loading, setLoading] = useState(true);

  const lang = i18next.language;

  useEffect(() => {
    axiosInstance
      .get("/employee", {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((res) => {
        const formattedData = res.data.data
          .map((emp) => ({
            value: emp.id,
            label: `${emp.first_name}  ${emp.last_name}`,
          }))
          .filter((e) => e.value != exceptId);
        setManger(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [exceptId]);

  // const options = {
  //   employee: [
  //     { value: "موظف1", label: "موظف 1" },
  //     { value: "موظف2", label: "موظف 2" },
  //   ],
  // };

  return !loading ? (
    <SelectBox
      isShowLabel={true}
      label={labelText}
      options={Manger}
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

MangerSelect.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  error: PropTypes.string,
  labelText: PropTypes.string,
};

export default MangerSelect;
