import React from "react";
import { Table } from "flowbite-react";
import { useTranslation } from "react-i18next";

function Details({ selectedItem }) {
  const { t } = useTranslation("systemSettings");

  return (
    <div className="overflow-x-auto">
      <Table striped hoverable>
        <Table.Head className="text-center">
          <Table.HeadCell>
            {t("workplaceManagement.form.fields.title_ar")}
          </Table.HeadCell>
          <Table.HeadCell>
            {t("workplaceManagement.form.fields.title_en")}
          </Table.HeadCell>
          <Table.HeadCell>
            {t("lettersManagement.form.all_nationalities")}
          </Table.HeadCell>
          <Table.HeadCell>
            {t("lettersManagement.form.Specific_nationalities")}
          </Table.HeadCell>
        </Table.Head>
        <Table.Body>
          <Table.Row className="text-center">
            <Table.Cell>
              {selectedItem.ar_title || (
                <span className="text-red-500">
                  {t("lettersManagement.not_available")}
                </span>
              )}
            </Table.Cell>
            <Table.Cell>
              {selectedItem.en_title || (
                <span className="text-red-500">
                  {t("lettersManagement.not_available")}
                </span>
              )}
            </Table.Cell>
            <Table.Cell>
              {!selectedItem.all_nationality ? (
                <span className="text-red-500">
                  {t("lettersManagement.no")}
                </span>
              ) : (
                <span className="text-red-500">
                  {t("lettersManagement.yes")}
                </span>
              )}
            </Table.Cell>
            <Table.Cell>
              {selectedItem.all_nationality === 1 ? (
                <span className="text-gray-500">
                  {t("lettersManagement.form.all_nationalities")}
                </span>
              ) : selectedItem.nationalaties?.length > 0 ? (
                <div className="flex flex-wrap justify-center">
                  {selectedItem.nationalaties
                    ?.map((nat) => nat.title)
                    .join(" | ")}
                </div>
              ) : (
                <span className="text-red-500">
                  {t("lettersManagement.no_nationalities_selected")}
                </span>
              )}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export default Details;
