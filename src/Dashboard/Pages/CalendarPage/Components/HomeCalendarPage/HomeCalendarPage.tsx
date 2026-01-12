import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./HomeCalendarPage.css";
import arLocale from "@fullcalendar/core/locales/ar";
import EmployeeSelect from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/EmployeeSelect";
import SelectTypeVacation from "@/Dashboard/Pages/Orders/Components/AllSelectsForm/SelectTypeVacation";
import axiosInstance from "@/utils/axios";
import { EventInput, EventContentArg, EventClickArg } from "@fullcalendar/core";
import VacationDetailsModal from "../VacationDetailsModal/VacationDetailsModal";
import {
  FaPlaneDeparture,
  FaHospital,
  FaHome,
  FaCalendarAlt
} from "react-icons/fa";
import { IconType } from "react-icons";

interface VacationConfig {
  bgColor: string;
  textColor: string;
  icon: IconType;
}

type VacationTypesConfig = {
  [key: number]: VacationConfig;
};

// تكوين الألوان والأيقونات حسب نوع الإجازة
const VACATION_TYPES_CONFIG: VacationTypesConfig = {
  1: {
    // إجازة سنوية
    bgColor: "#E8F8EC",
    textColor: "#34C759",
    icon: FaCalendarAlt
  },
  2: {
    // إجازة مرضية
    bgColor: "#FEF5F5",
    textColor: "#FE4D4F",
    icon: FaHospital
  },
  3: {
    // #4C6CB2
    bgColor: "#F2F7FF",
    textColor: "#4C6CB2",
    icon: FaPlaneDeparture
  },
  4: {
    // عمل من المنزل
    bgColor: "#FDEDFD",
    textColor: "#800080",
    icon: FaHome
  }
};

const getVacationConfig = (vacationTypeId: number): VacationConfig => {
  return (
    VACATION_TYPES_CONFIG[vacationTypeId] || {
      bgColor: "#FFF0F0",
      textColor: "#fe4d4f",
      icon: FaCalendarAlt
    }
  );
};

const HomeCalendarPage = () => {
  const [events, setEvents] = useState<EventInput[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventInput[]>([]);
  const [error, setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedVacationType, setSelectedVacationType] = useState<any>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/calendar");
        const data = response.data.data;
        const formattedEvents: EventInput[] = data.map((item: any) => {
          const vacationTypeId = item.vacation_type?.id;
          const { bgColor, textColor } = getVacationConfig(vacationTypeId);

          return {
            ...item,
            id: item.id.toString(),
            title: item.employee?.name || "إجازة موظف",
            start: item.start_date,
            end: item.end_date,
            backgroundColor: bgColor,
            borderColor: bgColor,
            textColor: textColor,
            extendedProps: {
              jobTitle: item.employee?.jobtitle?.title,
              vacationType: item.vacation_type?.ar_title,
              vacationTypeId: vacationTypeId,
              note: item.note,
              status: item.status,
              days: item.days,
              employeeId: item.employee?.id
            }
          };
        });
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
      } catch (err: any) {
        setError(err.response?.data?.message || "حدث خطأ أثناء جلب البيانات");
      }
    };

    fetchEvents();
  }, []);

  const [selectedOption, setSelectedOption] = useState<any>(null);

  const handleFilter = () => {
    let filtered = events;

    if (selectedEmployee) {
      filtered = filtered.filter(
        (event) => event.extendedProps?.employeeId === selectedEmployee.value
      );
    }

    if (selectedVacationType) {
      filtered = filtered.filter(
        (event) => event.extendedProps?.vacationTypeId === selectedVacationType
      );
    }

    setFilteredEvents(filtered);
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const vacationType = eventInfo.event.extendedProps?.vacationType;
    const vacationTypeId = eventInfo.event.extendedProps?.vacationTypeId;
    const jobTitle = eventInfo.event.extendedProps?.jobTitle;
    const { icon: VacationIcon, textColor } = getVacationConfig(vacationTypeId);

    return (
      <div className="fc-event-main-content h-full flex flex-col justify-center items-center">
        <div className="fc-event-title text-center w-full">
          <div className="text-[16px] font-bold mb-1">
            {eventInfo.event.title}
            {jobTitle && (
              <span className="text-[16px] font-[600] mr-2">- {jobTitle}</span>
            )}
          </div>
          {vacationType && (
            <div
              className="text-lg font-semibold rounded-lg flex items-center justify-center gap-2 px-3 py-1"
              style={{ color: textColor }}
            >
              <VacationIcon className="w-5 h-5" />
              {vacationType}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    console.log({ clickInfo });

    setSelectedEvent(clickInfo.event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="all-calendar-data pt-8" data-aos="fade-up">
      <div className="flex items-end gap-4 mb-8">
        <div className="flex-1">
          <EmployeeSelect
            labelText="الموظف"
            setFieldValue={(name, value) => {
              setSelectedEmployee(value);
              setSelectedOption(value);
            }}
            field={{ name: "employee", value: selectedOption }}
            error={error}
          />
        </div>
        <div className="flex-1">
          <SelectTypeVacation
            setFieldValue={(name, value) => {
              setSelectedVacationType(value);
            }}
            field={{
              name: "vacation_type",
              value: selectedVacationType
            }}
            error={error}
          />
        </div>
        <button onClick={handleFilter} className="btn-main h-[50px] w-[120px]">
          التصفية
        </button>
      </div>

      {error && <div className="text-red-500 mb-4 text-center">{error}</div>}

      {/* FullCalendar */}
      <FullCalendar
        initialView="dayGridMonth"
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay"
        }}
        buttonText={{
          today: "اليوم",
          month: "الشهر",
          week: "الأسبوع",
          day: "اليوم",
          list: "قائمة"
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        editable={true}
        droppable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={filteredEvents}
        locale={arLocale}
        eventContent={renderEventContent}
        direction="rtl"
        height="auto"
        firstDay={6}
        eventClick={handleEventClick}
      />

      {/* send title "محمد" */}
      {selectedEvent && (
        <VacationDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          event={selectedEvent}
        />
      )}
    </div>
  );
};

export default HomeCalendarPage;
