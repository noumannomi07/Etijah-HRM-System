interface LocaleData {
  months: string[];
  weekDays: {
    name: string;
    short: string;
    isWeekend?: boolean;
  }[];
  weekStartingIndex: number;
  getToday: (gregorianTodayObject: any) => any;
  toNativeDate: (date: { year: number; month: number; day: number }) => Date;
  getMonthLength: (date: { year: number; month: number }) => number;
  transformDigit: (digit: string | number) => string | number;
  nextMonth: string;
  previousMonth: string;
  openMonthSelector: string;
  openYearSelector: string;
  closeMonthSelector: string;
  closeYearSelector: string;
  defaultPlaceholder: string;
  from: string;
  to: string;
  digitSeparator: string;
  yearLetterSkip: number;
  isRtl: boolean;
}

const locales: Record<string, LocaleData> = {
  ar: {
    // ARABIC MONTH
    months: [
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
    ],

    // ARABIC WEEKS
    weekDays: [
      {
        name: "الأحد",
        short: "احد",
        isWeekend: true,
      },
      {
        name: "الاثنين",
        short: "اثنين",
      },
      {
        name: "الثلاثاء",
        short: "ثلاثاء",
      },
      {
        name: "الأربعاء",
        short: "اربعاء",
      },
      {
        name: "الخميس",
        short: "خميس",
      },
      {
        name: "الجمعة",
        short: "جمعة",
      },
      {
        name: "السبت",
        short: "سبت",
        isWeekend: true,
      },
    ],

    weekStartingIndex: 0,

    getToday(gregorianTodayObject) {
      return gregorianTodayObject;
    },

    toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day);
    },

    getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
    },

    transformDigit(digit) {
      return digit;
    },

    nextMonth: "الشهر التالي",
    previousMonth: "الشهر السابق",
    openMonthSelector: "فتح اختيار الشهر",
    openYearSelector: "فتح اختيار السنة",
    closeMonthSelector: "إغلاق اختيار الشهر",
    closeYearSelector: "إغلاق اختيار السنة",
    defaultPlaceholder: "اختر...",

    from: "من",
    to: "إلى",

    digitSeparator: ",",

    yearLetterSkip: 0,

    isRtl: true,
  },

  en: {
    // ENGLISH MONTHS
    months: [
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
    ],

    // ENGLISH WEEK DAYS
    weekDays: [
      {
        name: "Sunday",
        short: "Sun",
        isWeekend: true,
      },
      {
        name: "Monday",
        short: "Mon",
      },
      {
        name: "Tuesday",
        short: "Tue",
      },
      {
        name: "Wednesday",
        short: "Wed",
      },
      {
        name: "Thursday",
        short: "Thu",
      },
      {
        name: "Friday",
        short: "Fri",
      },
      {
        name: "Saturday",
        short: "Sat",
        isWeekend: true,
      },
    ],

    weekStartingIndex: 0,

    getToday(gregorianTodayObject) {
      return gregorianTodayObject;
    },

    toNativeDate(date) {
      return new Date(date.year, date.month - 1, date.day);
    },

    getMonthLength(date) {
      return new Date(date.year, date.month, 0).getDate();
    },

    transformDigit(digit) {
      return digit;
    },

    nextMonth: "Next Month",
    previousMonth: "Previous Month",
    openMonthSelector: "Open Month Selector",
    openYearSelector: "Open Year Selector",
    closeMonthSelector: "Close Month Selector",
    closeYearSelector: "Close Year Selector",
    defaultPlaceholder: "Select...",

    from: "From",
    to: "To",

    digitSeparator: ",",

    yearLetterSkip: 0,

    isRtl: false,
  }
};

const getLocale = (language: string = 'ar'): LocaleData => {
  return locales[language] || locales.ar;
};

export default getLocale;
