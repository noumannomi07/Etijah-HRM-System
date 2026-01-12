import axiosInstance from "@/utils/axios";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Spinner } from "flowbite-react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const SelectLoanPurpose = ({ setFieldValue, field, error }) => {
  const [Advance, setAdvance] = useState([]);
  const [loading, setLoading] = useState(true);

  const lang = i18next.language;

  useEffect(() => {
    axiosInstance
      .get("/advancemanage", {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((res) => {
        const formattedData = res.data.data.map((emp) => ({
          value: emp.id,
          label: emp.title,
        }));
        setAdvance(formattedData);
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
      label="الغرض من السلفة"
      options={Advance}
      // onChange={(option) => setFieldValue("loanPurpose", option)}
      onChange={(option) => {
        setFieldValue(field.name, option.value);
      }}
      placeholder="-إختر-"
      isSearchable={false}
      isMulti={false}
      field={field}
      error={error}
    />
  ) : (
    <Spinner />
  );
};

SelectLoanPurpose.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  error: PropTypes.string,
};

export default SelectLoanPurpose;
