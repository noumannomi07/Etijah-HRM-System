import React from "react";
import { useState } from "react";

type NumberInputProps = {
  initialValue?: number;
  min?: number;
  step?: number;
  textLabel: string;
  onChange?: (value: number) => void;
};

const NumberInput: React.FC<NumberInputProps> = ({
  initialValue = 1,
  min = 1,
  step = 1,
  textLabel,
  onChange,
}) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    let newValue = parseInt(event.target.value, 10);
    if (newValue >= min) {
      if (onChange) onChange(newValue); // Notify parent component
    }
  };

  const increment: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (onChange) onChange(initialValue + step); // Notify parent component on increment
  };

  const decrement: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (onChange) onChange(Math.max(initialValue - step, min)); // Notify parent component on decrement
  };

  return (
    <div className="all-input-number">
      <label className="label-form ">{textLabel}</label>
      <div className="flex items-center mt-1 p-[10px_15px] relative border border-gray-300 rounded-[8px]">
        <button
          onClick={decrement}
          className=" bg-light-green-50  border rounded-[8px] border-gray-300 hover:bg-primaryColor hover:text-white transition-all duration-300 text-[20px] font-bold flex items-center justify-center w-[30px] h-[30px] "
        >
          -
        </button>
        <input
          type="number"
          value={initialValue}
          onChange={handleChange}
          min={min}
          step={step}
          className="w-[50px] !border-none !p-0  !text-center focus:!outline-none focus:!border-none focus:!shadow-none"
        />
        <button
          onClick={increment}
          className=" bg-light-green-50 border rounded-[8px] border-gray-300 hover:bg-primaryColor hover:text-white transition-all duration-300  text-[20px] font-bold flex items-center justify-center w-[30px] h-[30px]"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
