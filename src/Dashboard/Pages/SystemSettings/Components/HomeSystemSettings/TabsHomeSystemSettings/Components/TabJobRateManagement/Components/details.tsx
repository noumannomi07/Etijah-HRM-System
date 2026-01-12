import React from "react";
import { Table } from "flowbite-react";
import { useTranslation } from "react-i18next";

function Details({ selectedItem }: { selectedItem: any }) {
    const { t } = useTranslation("systemSettings");

    return (
        <div className="overflow-x-auto">
            <Table striped hoverable>
                <Table.Head className="text-center">
                    <Table.HeadCell>{t("jobRateManagement.tableHeaders.nameArabic")}</Table.HeadCell>
                    <Table.HeadCell>{t("jobRateManagement.tableHeaders.nameEnglish")}</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    <Table.Row className="text-center">
                        <Table.Cell>
                            {selectedItem.ar_title || (
                                <span className="text-red-500">{t("common.notAvailable")}</span>
                            )}
                        </Table.Cell>
                        <Table.Cell>
                            {selectedItem.en_title || (
                                <span className="text-red-500">{t("common.notAvailable")}</span>
                            )}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}

export default Details;
