import React from 'react'
import TableBankManagement from './Components/TableBankManagement/TableBankManagement'

const TabBankManagement = ({ permissions }: { permissions: any }) => {
  return (
    <TableBankManagement permissions={permissions} />
  )
}

export default TabBankManagement