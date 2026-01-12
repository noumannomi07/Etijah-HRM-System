let theDateObj = {
  months: [
    "يناير",
    "فبراير",
    "مارس",
    "إبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ],
  days: [
    "السبت",
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
  ],
  formatDataFunctionAR: (dateString) => {
    const months = [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  },
  formatDataFunctionEN: (dateString) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  },

  // formatTo12Hour: (time) => {
  //   const [hours, minutes] = time?.split(":").map(Number); // تقسيم الوقت إلى ساعات ودقائق
  //   const period = hours >= 12 ? "م" : "ص"; // تحديد إذا كان صباحًا أم مساءً
  //   const formattedHours = hours % 12 || 12; // تحويل الساعات إلى 12 ساعة
  //   return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  // },
};

export default theDateObj;
