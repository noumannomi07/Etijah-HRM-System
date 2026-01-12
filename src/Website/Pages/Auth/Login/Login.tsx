import "./Login.css";
import AllContentInfoAuth from "./Components/AllContentInfoAuth/AllContentInfoAuth";
import HelmetInfo from "@components/HelmetInfo/HelmetInfo";
import { useTranslation } from "react-i18next";
const Login = () => {
  const { t } = useTranslation('login');
  
  return (
    <>
      <HelmetInfo titlePage={t('pageTitle')} />
      <div className="page-login  flex  items-center min-h[100vh]  p-[50px_20px]">
        <AllContentInfoAuth />
      </div>
    </>
  );
};

export default Login;
