import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PdfIcon from "../Icons/iconsFilter/PdfIcon";
const PdfButtonFunction = () => {
  // DOWNLOAD AS PDF
  const handleDownloadPDF = () => {
    const tables = document.querySelectorAll("table");

    tables.forEach((table, index) => {
      html2canvas(table)
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF();
          const imgWidth = pdf.internal.pageSize.getWidth();
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          pdf.save(`exported_page_${index}.pdf`);
        })
        .catch((error) => {
          console.error("Error exporting table:", error);
        });
    });
  };

  return (
    <button
      onClick={handleDownloadPDF}
      className="button-transparent"
    >
      <PdfIcon />
    </button>
  );
};

export default PdfButtonFunction;
