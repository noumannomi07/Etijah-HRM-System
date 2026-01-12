import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import React, { useState } from "react";

const filtersData = {
  category: ["1", "2", "3"],
  location: ["1", "2", "3"],
  jobType: ["1", "2", "3"],
  contractType: ["1", "2"],
  status: ["نشط", "غير نشط"]
};

export default function ButtonsFilters() {
  const [filters, setFilters] = useState({
    category: null,
    location: null,
    jobType: null,
    contractType: null,
    status: null
  });

  const handleChange = (key, option) => {
    setFilters((prev) => ({ ...prev, [key]: option }));
  };

  const applyFilters = () => {
    const mappedFilters = Object.entries(filters).reduce((acc, [key, val]) => {
      acc[key] = val?.value || "";
      return acc;
    }, {});
    console.log("Filters", mappedFilters);
  };

  return (
    <div className="dropmenu-filter">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {Object.entries(filtersData).map(([key, values], index) => {
          const options = values.map((value) => ({
            label: value,
            value
          }));

          const isLastItem = index === Object.entries(filtersData).length - 1;

          return (
            <div key={key} className={isLastItem ? "sm:col-span-2" : ""}>
              <SelectBox
                isShowLabel={false}
                label={getLabel(key)}
                options={options}
                placeholder={getLabel(key)}
                isSearchable={false}
                isMulti={false}
                onChange={(option) => handleChange(key, option)}
                field={{ name: key, value: filters[key] }}
                error={""}
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={applyFilters}
        className="btn-main !w-full  text-center  flex !items-center !justify-center sm:!w-max mr-auto mt-6  h-[47px] !px-[30px]"
      >
        حفظ
      </button>
    </div>
  );
}

function getLabel(key) {
  const labels = {
    category: "التصنيف",
    location: "مكان العمل",
    jobType: "نوع الوظيفة",
    contractType: "نوع العقد",
    status: "الحالة"
  };
  return labels[key] || key;
}
