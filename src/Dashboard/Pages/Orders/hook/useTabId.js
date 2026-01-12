import { useSearchParams } from "react-router-dom";

const useTabId = (defaultTabId = 0) => {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  return parseInt(tab || `${defaultTabId}`, 10);
};

export default useTabId;
