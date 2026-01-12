import React from 'react';
import { Modal, Box, Avatar, CircularProgress, Tooltip } from "@mui/material";
import { usePayrollTransactionDetails } from '@/hooks/payroll/usePayrollTransactionDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faEye, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { formatDateToYmd } from '@/utils/date';
import { Button } from 'flowbite-react';
import { toast } from 'react-toastify';
import endpoints from '@/api/endpoints';
import axiosInstance from '@/utils/axios';
import { useTranslation } from 'react-i18next';

interface EmployeeDetailsModalProps {
  open: boolean;
  onClose: () => void;
  transactionId: number | null;
}

const EmployeeDetailsModal = ({ open, onClose, transactionId }: EmployeeDetailsModalProps) => {
  const { t, i18n } = useTranslation('financialTransactions');
  const isRTL = i18n.language === 'ar';
  const { data: transaction, isLoading } = usePayrollTransactionDetails(transactionId);

  const hasEmployees = (transaction?.employees ?? []).length > 0;
 
  const handleDownloadExcel = () => {
    const downloadExcel = async () => {
      try {
        // Ensure transactionId is a string, as required by the endpoint
        if (!transactionId) {
          toast.error(t('modal.download.missingId'));
          return;
        }

        const  response  = await axiosInstance.get(
          endpoints.payroll.transactions.excel(String(transactionId))
        );
        
        const data = response.data;

        const { file_url, file_name } = data;

        if (file_url) {
          window.open(file_url, '_blank');
        } else {
          toast.error(t('modal.download.missingUrl'));
        }

  
        toast.success(t('modal.download.success'));
        
      } catch (error) {
        console.error("Error downloading excel:", error);
        toast.error(t('modal.download.error'));
      }
    };
  
    downloadExcel();
  };
  

  const theadTrContent = [
  
    t('modal.employeeDetails.headers.employee'),
    t('modal.employeeDetails.headers.basicSalary'),
    t('modal.employeeDetails.headers.bonuses'),
    t('modal.employeeDetails.headers.deductions'),
    t('modal.employeeDetails.headers.additions'),
    t('modal.employeeDetails.headers.net'),
    t('modal.employeeDetails.headers.total'),
    t('modal.employeeDetails.headers.createdAt'),
  ];

  const tbodyContent = transaction?.employees?.map((item) => [

    <div key={`employee-${item.id}`} className="flex items-center gap-2">
      <Avatar
        src={item.employee.image}
        sx={{ width: 32, height: 32 }}
      >
        {item.employee.name?.substring(0, 2) || item.employee.first_name?.substring(0, 1) + item.employee.last_name?.substring(0, 1) || '??'}
      </Avatar>
      <span>{item.employee.name || `${item.employee.first_name} ${item.employee.last_name}`}</span>
    </div>,
    <div key={`salary-${item.id}`} className="text-sm">
      {item.salary}
    </div>,
    <div key={`bonus-${item.id}`} className="text-sm text-green-600">
      {item.bonus}
    </div>,
    <div key={`cut-${item.id}`} className="text-sm text-red-600">
      -{item.cut}
    </div>,
    <div key={`extra-${item.id}`} className="text-sm text-blue-600">
      {item.extra}
    </div>,
    <div key={`net-${item.id}`} className="text-sm text-purple-600">
      {item.net_salary}
    </div>,
    <div key={`total-${item.id}`} className="text-sm font-medium">
      {item.total}
    </div>,
    <div key={`created-${item.id}`} className="flex flex-col items-start">
    <div className="text-sm font-medium text-black">
      {formatDateToYmd(new Date(item.created_at))}
    </div>
  </div>
  ]) || [];

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="employee-details-modal-title"
      aria-describedby="employee-details-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "90%",
        maxHeight: '80vh',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        overflow: 'auto',
        direction: isRTL ? 'rtl' : 'ltr'
      }}>
        {isLoading ? (
          <div className="flex justify-center items-center p-10">
            <CircularProgress />
          </div>
        ) : transaction ? (
          <>
          
            <div className="flex justify-between items-center border-b-2 pb-3">
              <h2 className="text-2xl font-medium">{t('modal.employeeDetails.title')} - {transaction.employees_count} {t('modal.employeeDetails.employeesCount')}</h2>
              <Button color="gray" onClick={handleDownloadExcel} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
               {t('modal.employeeDetails.downloadWPS')}
              </Button>
            </div>

            {/* Table View */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {theadTrContent.map((header, index) => (
                      <th
                        key={index}
                        className={`px-6 py-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 uppercase tracking-wider`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tbodyContent.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="px-6 py-4 whitespace-nowrap">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {t('modal.employeeDetails.footer.approvedBy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {t('modal.employeeDetails.footer.approvedAt')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {t('modal.employeeDetails.footer.totalSalaries')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {t('modal.employeeDetails.footer.totalBonuses')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {t('modal.employeeDetails.footer.totalDeductions')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {t('modal.employeeDetails.footer.totalAdditions')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {t('modal.employeeDetails.footer.totalNet')}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                     {transaction.approved_by?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDateToYmd(new Date(transaction.approved_at))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.salary}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.bonus}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.cut}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.extra}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaction.total}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

 
          </>
        ) : (
          <div className="text-center p-10">
            {t('modal.employeeDetails.noData')}
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-5 rounded transition-colors"
          >
            {t('modal.employeeDetails.close')}
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default EmployeeDetailsModal; 