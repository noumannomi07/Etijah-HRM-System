import DownloadImagePdf from "@/Dashboard/Shared/DownloadImagePdf/DownloadImagePdf";
import image from "@assets/images/main/01.png";

const DocumentEmployeeInfo = () => {
  const documents = [
    {
      image: image,
      typeImage: "صورة الطلب 1.pdf",
      timeNow: "08/06/2024 . 08:00 ص"
    },
    {
      image: image,
      typeImage: "صورة الطلب 2.pdf",
      timeNow: "09/06/2024 . 09:00 ص"
    },
    {
      image: image,
      typeImage: "صورة الطلب 3.pdf",
      timeNow: "10/06/2024 . 10:00 ص"
    },
    {
      image: image,
      typeImage: "صورة الطلب 3.pdf",
      timeNow: "10/06/2024 . 10:00 ص"
    },
    {
      image: image,
      typeImage: "صورة الطلب 3.pdf",
      timeNow: "10/06/2024 . 10:00 ص"
    },
    {
      image: image,
      typeImage: "صورة الطلب 3.pdf",
      timeNow: "10/06/2024 . 10:00 ص"
    }
  ];
  return (
    <div className="documet-info-employee grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 padding-t-3">
      {documents.map((doc, index) => (
        <div className="border p-[0_10px_10px_10px] rounded-[10px]" key={index}>
          <DownloadImagePdf
            image={doc.image}
            typeImage={doc.typeImage}
            timeNow={doc.timeNow}
          />
        </div>
      ))}
    </div>
  );
};

export default DocumentEmployeeInfo;
