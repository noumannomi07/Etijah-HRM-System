import React from "react";
import { useState, useEffect } from "react";

type ToggleSwitchCheckProps = {
  id: string;
  state?: boolean;
  onChange?: (state: boolean) => void;
}

const ToggleSwitchCheck = ({ id, state, onChange }: ToggleSwitchCheckProps) => {
  const [isChecked, setIsChecked] = useState(() => {
    const saved = localStorage.getItem(`toggleSwitchState-${id}`);
    return saved ? JSON.parse(saved) : state ?? false;
  });

  useEffect(() => {
    localStorage.setItem(`toggleSwitchState-${id}`, JSON.stringify(isChecked));
  }, [isChecked, id]);

  // HANDLE TOGGLE
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked);
    onChange?.(e.target.checked);
  };

  return (
    <label className="flex items-center cursor-pointer justify-center">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isChecked}
        onChange={handleToggle}
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#32a8405c] dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-greenColor01"></div>
    </label>
  );
};

export default ToggleSwitchCheck;
