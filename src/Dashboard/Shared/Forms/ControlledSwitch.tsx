import React from "react";
import { useFormikContext } from "formik";

type ControlledSwitchProps<T> = {
  fieldName: keyof T;
  label: string;
};

const ControlledSwitch = <T extends Record<string, any>>({
  fieldName,
  label,
}: ControlledSwitchProps<T>) => {
  const formik = useFormikContext<T>();

  const handleChange = () => {
    formik.setFieldValue(fieldName as string, !formik.values[fieldName]);
  };

  return (
    <div className="flex items-center gap-4">
      <label className="mr-2">{label}</label>
      <label className="flex items-center cursor-pointer justify-center">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={formik.values[fieldName]}
          onChange={handleChange}
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#32a8405c] dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-greenColor01"></div>
      </label>
    </div>
  );
};

export default ControlledSwitch;
