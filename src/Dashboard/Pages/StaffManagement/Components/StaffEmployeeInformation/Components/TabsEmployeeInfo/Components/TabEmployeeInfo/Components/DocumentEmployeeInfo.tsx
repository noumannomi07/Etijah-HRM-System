import { useEmployeeContext } from "@/Dashboard/Pages/StaffManagement/Components/StepsAddNewEmployee/providers/EmployeeProvider";
import DownloadImagePdf from "@/Dashboard/Shared/DownloadImagePdf/DownloadImagePdf";
import {
  useCreateEmployeeFile,
  useDeleteEmployeeFile,
  useEmployeeFiles,
  useUpdateEmployeeFile
} from "@/hooks/employee/manage/files";
import { faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useCallback, useEffect } from "react";
import CustomModal from "@/Dashboard/Shared/CustomModal/CustomModal";
import CustomFileUploader from "@/Dashboard/Shared/FileUploader/CustomFileUploader";
import { useEmployeeFileCategories } from "@/hooks/employee/manage/files/useEmployeeFileCategories";
import SelectBox from "@/Dashboard/Shared/SelectBox/SelectBox";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SpinnerLoader from "@/Dashboard/Shared/SpinnerLoader/SpinnerLoader";
import { useTranslation } from "react-i18next";
import ActionData from "@/Dashboard/Shared/DataTableInfo/ActionData";
import TrashIcon from "@/Dashboard/Shared/DataTableInfo/Icons/TrashIcon";
import EditIcon from "@/Dashboard/Shared/DataTableInfo/Icons/EditIcon";

const DocumentEmployeeInfo = () => {
  const { t } = useTranslation("staffManagement");
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    code: "",
    expire_date: "",
    category_id: null as number | null,
    file: null as File | null
  });

  const { mutate: createEmployeeFile, isPending: isCreating } =
    useCreateEmployeeFile({
      onSuccess: () => {
        handleCloseModal();
        toast.success(t("messages.successAdd"));
        refetchFiles();
      },
      onError: (error) => {
        console.error("Error creating file:", error);
        toast.error(t("messages.error"));
      }
    });

  const { mutate: updateEmployeeFile, isPending: isUpdating } =
    useUpdateEmployeeFile({
      onSuccess: () => {
        handleCloseModal();
        toast.success(t("messages.successEdit"));
        refetchFiles();
      },
      onError: () => {
        toast.error(t("messages.error"));
      }
    });

  const { data: categories } = useEmployeeFileCategories();
  const { data, refetch: refetchFiles } = useEmployeeFiles();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
    setFilePreview(null);
    setFormData({
      title: "",
      code: "",
      expire_date: "",
      category_id: null,
      file: null
    });
  };

  const handleSubmit = useCallback(async () => {
    if (!id || formData.category_id === null) {
      toast.error(t("documents.fillAllFields"));
      return;
    }

    if (selectedFile) {
      updateEmployeeFile({
        id: id,
        fileId: selectedFile.id,
        title: formData.title,
        code: formData.code,
        expire_date: formData.expire_date,
        file: formData.file ?? undefined
      });
    } else {
      if (!formData.file) {
        toast.error(t("documents.fillAllFields"));
        return;
      }
      createEmployeeFile({
        id,
        title: formData.title,
        file: formData.file,
        category_id: formData.category_id,
        expire_date: formData.expire_date,
        code: formData.code
      });
    }
  }, [
    id,
    formData,
    createEmployeeFile,
    updateEmployeeFile,
    t,
    selectedFile,
    refetchFiles
  ]);

  const { mutateAsync: deleteEmployeeFileMutate } = useDeleteEmployeeFile({
    onSuccess: () => {
      toast.success(t("messages.successDelete1"));
      refetchFiles();
    },
    onError: () => toast.error(t("messages.errorDelete"))
  });

  const getMenuItems = (file: any) => {
    return [
      {
        id: 1,
        icon: <EditIcon />,
        label: t("common.edit"),
        onClick: () => {
          setSelectedFile(file);
          setFormData({
            title: file.title || "",
            code: file.code || "",
            expire_date: file.expire_date ? file.expire_date.split("T")[0] : "",
            category_id: file.category?.id || null,
            file: null
          });
          setIsModalOpen(true);
        }
      },
      {
        id: 2,
        icon: <TrashIcon />,
        label: t("common.delete"),
        onClick: () => deleteEmployeeFileMutate({ id: id!, fileId: file.id })
      }
    ];
  };

  useEffect(() => {
    if (formData.file) {
      const previewUrl = URL.createObjectURL(formData.file);
      setFilePreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else if (selectedFile && selectedFile.file) {
      setFilePreview(selectedFile.file);
    } else {
      setFilePreview(null);
    }
  }, [formData.file, selectedFile]);

  if (!id) {
    console.error("No employee ID found");
    return null;
  }
  const isSubmitting = isCreating || isUpdating;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end mb-4">
        <button
          type="button"
          onClick={() => {
            setSelectedFile(null);
            setIsModalOpen(true);
          }}
          className="btn-main height--50"
        >
          {t("documents.addNewFile")} <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        handleOpen={handleCloseModal}
        titleModal={
          selectedFile ? t("documents.editFile") : t("documents.addNewFile")
        }
        classBodyContent="!p-0"
      >
        <div className="flex flex-col">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="input-one-details">
                <label className="block text-[15px] font-medium text-font-gray mb-2">
                  {t("documents.fileName")}
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input-main w-full"
                  placeholder={t("documents.enterFileName")}
                />
              </div>

              <div className="input-one-details">
                <label className="block text-[15px] font-medium text-font-gray mb-2">
                  {t("documents.code")}
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="input-main w-full"
                  placeholder={t("documents.enterCode")}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="input-one-details">
                <label className="block text-[15px] font-medium text-font-gray mb-2">
                  {t("documents.expiryDate")}
                </label>
                <input
                  type="date"
                  name="expire_date"
                  value={formData.expire_date}
                  onChange={handleInputChange}
                  className="input-main w-full"
                  placeholder="dd/mm/yyyy"
                />
              </div>

              <div className="input-one-details">
                <label className="block text-[15px] font-medium text-font-gray mb-2">
                  {t("documents.category")}
                </label>
                <SelectBox
                  isShowLabel={false}
                  label=""
                  options={
                    categories?.map((category) => ({
                      value: category.id,
                      label: (
                        <div className="flex items-center gap-2">
                          <span>{category.title}</span>
                          {category.is_required && (
                            <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                              {t("documents.required")}
                            </span>
                          )}
                        </div>
                      )
                    })) ?? []
                  }
                  value={formData.category_id}
                  onChange={(option: any) => {
                    setFormData((prev) => ({
                      ...prev,
                      category_id: option?.value ?? null
                    }));
                  }}
                  placeholder={t("documents.selectCategory")}
                  isSearchable={true}
                  isMulti={false}
                  field={{ name: "category_id", value: formData.category_id }}
                  error={null}
                />
              </div>
            </div>

            <div className="input-one-details">
              <label className="block text-[15px] font-medium text-font-gray mb-2">
                {t("documents.attachFile")}
              </label>
              <CustomFileUploader
                textLabel=""
                name="file"
                dragDropText={t("documents.dragDropText")}
                onFileSelect={(file: File) => {
                  setFormData((prev) => ({
                    ...prev,
                    file
                  }));
                }}
              />
              {filePreview && (
                <div className="mt-4">
                  <img
                    src={filePreview}
                    alt="File Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-2 p-4 mt-4 border-t">
            <button
              type="button"
              onClick={handleCloseModal}
              className="btn-secondary height--50 !min-w-[120px]"
              disabled={isSubmitting}
            >
              {t("common.cancel")}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-main height--50 !min-w-[120px]"
              disabled={
                !formData.title || formData.category_id === null || isSubmitting
              }
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <SpinnerLoader />
                  {t("common.saving")}
                </div>
              ) : (
                t("common.save")
              )}
            </button>
          </div>
        </div>
      </CustomModal>

      {data?.missing_categories && data.missing_categories.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <FontAwesomeIcon icon={faInfoCircle} className="text-lg" />
            <h3 className="font-medium">{t("documents.missingFiles")}:</h3>
          </div>
          <ul className="list-disc list-inside text-red-700 space-y-1">
            {data.missing_categories.map((category) => (
              <li key={category.id} className="text-sm">
                {category.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(data?.files ?? []).map((file) => (
          <div
            className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 bg-white"
            key={file.id}
          >
            <div className="flex justify-between items-start">
              <DownloadImagePdf
                image={file.file ?? ""}
                typeImage={file.title}
                timeNow={file.created_at}
                newClassName=""
              />
              <ActionData menuItems={getMenuItems(file)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentEmployeeInfo;
