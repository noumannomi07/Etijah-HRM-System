import { CopyIcon } from "@radix-ui/react-icons";
import CopyToClipboard from "react-copy-to-clipboard";

const CopyFunction = ({ filteredData }) => {
  // COPY DATA
  const handleCopy = () => {
    const data = filteredData
      .map((row) => {
        return Object.values(row)
          .filter((value) => typeof value !== "object" || value === null) // FILTER OUT OF OBJECT
          .join(", ");
      })
      .join("\n");

    return data;
  };
  return (
    <CopyToClipboard text={handleCopy()}>
      <button className="button-transparent">
        <CopyIcon />
      </button>
    </CopyToClipboard>
  );
};

export default CopyFunction;
