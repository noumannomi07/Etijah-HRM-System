import { Dropzone, ExtFile, FileMosaic } from "@files-ui/react";
import * as React from "react";
import PropTypes from "prop-types";
import "./FileUploader.css";
import { Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useFormikContext } from "formik";
import { useTranslation } from "react-i18next";

export default function FileUploader({
  textLabel,
  name,
  error,
  ...props
}: {
  textLabel: string;
  name: string;
  error: string;
}) {
  const { t } = useTranslation("main");
  const { setFieldValue, values } = useFormikContext();
  const [loading, setLoading] = React.useState(false);

  const updateFiles = (incomingFiles: ExtFile[]) => {
    setLoading(true);
    setFieldValue(name, incomingFiles); // تحديث قيمة Formik بالملف الجديد

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    setTimeout(() => {
      toast.success(t("Added successfully"));
    }, 1050);
  };

  const removeFile = (id) => {
    const updatedFiles = values[name]?.filter((file) => file.id !== id) || [];
    setFieldValue(name, updatedFiles); // تحديث Formik بعد الحذف
    toast.success("تم الحذف بنجاح.");
  };

  return (
    <div>
      <label className="text-font-gray">{textLabel}</label>
      <Dropzone
        className="all-files-upload"
        onChange={updateFiles}
        value={values[name] || []}
        {...props}
        label={
          <div className="file-pond-file flex flex-col gap-2 justify-center items-center">
            <div className="icon-svg-icon">
              {props?.imagePreview ? (
                <>
                  <img
                    src={props?.imagePreview}
                    className="w-20 h-20"
                    alt="preview"
                  />
                  <h2 className="text-font-dark">{t("Attach the file")}</h2>
                </>
              ) : (
                <div className="flex flex-col justify-center items-center ">
                  <svg
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      width="32"
                      height="32"
                      rx="8"
                      fill="#4C6CB2"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.9697 9.46967C11.6768 9.76257 11.6768 10.2374 11.9697 10.5303C12.2626 10.8232 12.7374 10.8232 13.0303 10.5303L15.75 7.81067L15.75 20C15.75 20.4142 16.0858 20.75 16.5 20.75C16.9142 20.75 17.25 20.4142 17.25 20V7.81065L19.9697 10.5303C20.2626 10.8232 20.7374 10.8232 21.0303 10.5303C21.3232 10.2374 21.3232 9.76256 21.0303 9.46967L17.0303 5.46967C16.8896 5.32902 16.6989 5.25 16.5 5.25C16.301 5.25 16.1103 5.32902 15.9696 5.46967L11.9697 9.46967ZM10.8398 13.4691C11.0989 13.1459 11.0469 12.6739 10.7237 12.4148C10.4005 12.1558 9.92852 12.2077 9.66944 12.5309C8.46871 14.0288 7.75 15.9315 7.75 18C7.75 22.8325 11.6675 26.75 16.5 26.75C21.3325 26.75 25.25 22.8325 25.25 18C25.25 15.9315 24.5313 14.0288 23.3306 12.5309C23.0715 12.2077 22.5995 12.1558 22.2763 12.4148C21.9531 12.6739 21.9011 13.1459 22.1602 13.4691C23.1553 14.7105 23.75 16.2848 23.75 18C23.75 22.0041 20.5041 25.25 16.5 25.25C12.4959 25.25 9.25 22.0041 9.25 18C9.25 16.2848 9.84472 14.7105 10.8398 13.4691Z"
                      fill="white"
                    />
                  </svg>
                  <h2 className="text-font-dark mt-3">
                    {t("Attach the file")}
                  </h2>
                  <h2 className="text-font-gray">
                    {t("Available formula")} : JPG/PNG
                  </h2>
                </div>
              )}
            </div>
          </div>
        }
        behaviour={"add"}
      >
        {loading ? (
          <div className="loader">
            <Spinner color="red" className="h-12 w-12" />
          </div>
        ) : (
          (values[name] || []).map((file) => (
            <FileMosaic
              key={file.id}
              {...file}
              onDelete={() => removeFile(file.id)}
              info
              preview
            />
          ))
        )}
      </Dropzone>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

FileUploader.propTypes = {
  textLabel: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
