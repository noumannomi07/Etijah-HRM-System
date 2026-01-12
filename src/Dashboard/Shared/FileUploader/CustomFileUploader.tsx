import { DragEventHandler, useRef, useState } from "react";
import PropTypes from "prop-types";
import React from "react";

type CustomFileUploaderProps = {
  textLabel?: string;
  name: string;
  onFileSelect: (file: File) => void;
  dragDropText?: string;
};

const CustomFileUploader = (props: CustomFileUploaderProps) => {
  const { textLabel, name, onFileSelect, dragDropText } = props;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | undefined>();

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
      setSelectedFile(file);
    }
  };

  const handleDrag: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onFileSelect(file);
    }
  };

  const handleClick = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      {textLabel && (
        <label className="block text-[15px] font-['Baloo_Bhaijaan_2'] text-[#767D88]">
          {textLabel}
        </label>
      )}
      <div
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-blue-500"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          name={name}
          accept="image/*,.pdf,.doc,.docx"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          {selectedFile ? (
            <div className="p-4 w-full">
              <p className="text-sm text-gray-700">{selectedFile.name}</p>
            </div>
          ) : (
            <>
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="text-sm text-gray-500">
                {dragDropText || "اضغط هنا لرفع الملف أو اسحب الملف وأفلته هنا"}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

CustomFileUploader.propTypes = {
  textLabel: PropTypes.string,
  name: PropTypes.string.isRequired,
  onFileSelect: PropTypes.func.isRequired,
  dragDropText: PropTypes.string,
};

export default CustomFileUploader;
