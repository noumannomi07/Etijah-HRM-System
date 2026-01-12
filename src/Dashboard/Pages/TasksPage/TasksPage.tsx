import { Outlet } from "react-router-dom"
import { withPermissions } from "@/hoc";

const TasksPage = () => {
  return (
    <>
    <Outlet />
    </>
  )
}

export default withPermissions(TasksPage, "tasks");