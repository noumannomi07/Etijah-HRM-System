import InfoSection from "@/Website/Shared/BannerLayout/InfoSection";

const ContentRightSmartRange = () => {
  return (
    <div className="content-right-smart-header">
      <InfoSection
        dataAos="fade-left"
        newClassInfoSection={"info-details-smart-header"}
        title={"تحقيق التميز من خلال تقييم المهام"}
        description={`تسعى مؤسستنا إلى تعزيز أداء الموظفين من خلال خدمة متابعة الأداء الشاملة. تتضمن هذه الخدمة تقييم أداء الموظفين بناءً على تنفيذ المهام المحددة وفقًا لمعايير متعددة، مثل تحقيق الأهداف وجودة العمل، مما يساهم في تحسين الإنتاجية وتعزيز النجاح المؤسسي.`}
        hideButtonSendRequest={false}
      />
    </div>
  );
};

export default ContentRightSmartRange;
