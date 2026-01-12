
import { Outlet } from 'react-router-dom'
import { withPermissions } from '@/hoc'

const CompanyDocuments = () => {
  return (
    <>
    <Outlet />
    </>
  )
}

export default withPermissions(CompanyDocuments, "files");