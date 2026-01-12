import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TableComparePackages.css";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
const TableComparePackages = () => {
  const { t } = useTranslation('packages');
  
  return (
    <div className="table-container-details">
      <table className="comparison-table">
        <thead>
          <tr>
            <th className="!text-start">{t('comparison.table.comparisonAspect')}</th>
            <th>{t('comparison.table.basicPackage')}</th>
            <th className="flex items-center justify-center gap-3">
              {t('comparison.table.premiumPackage')}{" "}
              <div className="badge-bestseller bg-orangeColor   rounded-[12px] p-[0.65rem_0.85rem] text-font-white text-[14px]  max-w-max">
                {t('comparison.table.bestsellerBadge')}
              </div>
            </th>
            <th>{t('comparison.table.professionalPackage')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="category-title" colSpan="4">
              {t('comparison.table.categories.employees')}
            </td>
          </tr>
          <tr>
            <td>{t('comparison.table.features.employeeManagement')}</td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
            <td>
              <div className="icon-style-box x-mark">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </td>
          </tr>
          <tr>
            <td>{t('comparison.table.features.employeeManagement')}</td>
            <td>
              <div className="icon-style-box x-mark">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
          </tr>
          <tr>
            <td>{t('comparison.table.features.employeeManagement')}</td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
            <td>
              <div className="icon-style-box x-mark">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
          </tr>

          <tr>
            <td className="category-title" colSpan="4">
              {t('comparison.table.categories.financial')}
            </td>
          </tr>
          <tr>
            <td>{t('comparison.table.features.employeeManagement')}</td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
            <td>
              <div className="icon-style-box x-mark">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </td>
          </tr>
          <tr>
            <td>{t('comparison.table.features.employeeManagement')}</td>
            <td>
              <div className="icon-style-box x-mark">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
          </tr>
          <tr>
            <td>{t('comparison.table.features.employeeManagement')}</td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
            <td>
              <div className="icon-style-box x-mark">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
          </tr>
          <tr>
            <td className="category-title" colSpan="4">
              {t('comparison.table.categories.management')}
            </td>
          </tr>
          <tr>
            <td>{t('comparison.table.features.employeeManagement')}</td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
            <td>
              <div className="icon-style-box x-mark">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </td>
          </tr>
          <tr>
            <td>{t('comparison.table.features.employeeManagement')}</td>
            <td>
              <div className="icon-style-box x-mark">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
          </tr>
          <tr>
            <td>{t('comparison.table.features.employeeManagement')}</td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
            <td>
              <div className="icon-style-box x-mark">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </td>
            <td>
              <div className="icon-check-box icon-style-box">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableComparePackages;
