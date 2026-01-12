import axiosInstance from "@/utils/axios";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { Spinner } from "flowbite-react";
import i18next from "i18next";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const CompanyDocumentsSelect = ({
  labelText = "المستند",
  placeholder = "-إختر-",
  setFieldValue,
  field,
  error,
}) => {
  const [CompanyDocuments, setCompanyDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const lang = i18next.language;

  useEffect(() => {
    axiosInstance
      .get("/filecategory", {
        headers: {
          "Accept-Language": lang,
        },
      })
      .then((res) => {
        
        
        
        const formattedData = res.data.data.map((emp) => ({
          value: emp.id,
          label: emp.title,
        }));
        setCompanyDocuments(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lang]);

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
      options={CompanyDocuments}
      onChange={(option) => {
        setFieldValue(field.name, option.value);
      }}
      placeholder={placeholder}
      isSearchable={true}
      isMulti={false}
      field={field}
      error={error}
      isClearable={true}
    />
  ) : (
    <Spinner />
  );
};

CompanyDocumentsSelect.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  field: PropTypes.object.isRequired,
  error: PropTypes.string,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
};

export default CompanyDocumentsSelect;
