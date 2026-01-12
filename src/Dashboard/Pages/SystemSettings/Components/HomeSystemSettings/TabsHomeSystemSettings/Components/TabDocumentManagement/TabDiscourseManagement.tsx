import TableDocumentManagement from "./Components/TableDiscourseManagement/TableDiscourseManagement";

const TabDocumentManagement = ({ permissions }: { permissions: any }) => {
  return (
    <>
      <TableDocumentManagement permissions={permissions} />
    </>
  );
};

export default TabDocumentManagement;
