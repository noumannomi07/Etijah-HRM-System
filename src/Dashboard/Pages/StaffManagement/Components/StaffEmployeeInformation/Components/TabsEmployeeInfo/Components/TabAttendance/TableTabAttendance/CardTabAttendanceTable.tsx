import PropTypes from "prop-types";
import React from "react";

type CardTabAttendanceTableProps = {
  timeDate: string;
  allTimeDate: string;
};

const CardTabAttendanceTable = (props: CardTabAttendanceTableProps) => {
  const { allTimeDate, timeDate } = props;
  return (
    <div className="card-border overflow-hidden 
    bg-orangeLightColor text-right 
    relative after:content after:absolute 
    after:bg-orangeColor after:w-[6px] after:h-[100%] after:start-0 after:top-0">
      <h2 className="time-date text-font-dark text-[16px]">{timeDate}</h2>
      <p className="time-date text-font-gray text-[16px]">{allTimeDate}</p>
    </div>
  );
};

CardTabAttendanceTable.propTypes = {
  timeDate: PropTypes.string.isRequired,
  allTimeDate: PropTypes.string.isRequired,
};

export default CardTabAttendanceTable;
