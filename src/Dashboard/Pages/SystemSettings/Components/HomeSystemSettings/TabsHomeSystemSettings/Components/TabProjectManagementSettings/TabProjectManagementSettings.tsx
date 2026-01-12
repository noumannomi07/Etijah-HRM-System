import React from 'react'
import TableProjectManagementSettings from './Components/TableProjectManagementSettings/TableProjectManagementSettings'


const TabProjectManagementSettings = ({ permissions }: { permissions: any }) => {
  return (
    <>
      <TableProjectManagementSettings permissions={permissions} />
    </>
  )
}

export default TabProjectManagementSettings
