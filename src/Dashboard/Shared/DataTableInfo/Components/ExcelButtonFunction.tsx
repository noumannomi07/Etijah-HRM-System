import * as XLSX from "xlsx";
import ExcelIcon from "../Icons/iconsFilter/ExcelIcon";
const ExcelButtonFunction = () => {
    // DOWNLOAD AS EXCEL
    const handleDownloadExcel = () => {
        const tables = document.querySelectorAll("table");

        tables.forEach((table, index) => {
            const ws = XLSX.utils.table_to_sheet(table);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, `exported_table_${index}.xlsx`);
        });
    };

    return (
        <button
            onClick={handleDownloadExcel}
            className="button-transparent"
        >
            <ExcelIcon />
        </button>
    )
}

export default ExcelButtonFunction
