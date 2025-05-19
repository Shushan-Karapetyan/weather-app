import { DailyForecast } from "../../../../types/type";
import Card from "./Card";
import s from "./Days.module.scss";

interface Props {
  dailyForecast: DailyForecast[];
  selectedDay: DailyForecast | null;
  onDaySelect: (day: DailyForecast) => void;
}

const Days = ({ dailyForecast, selectedDay, onDaySelect }: Props) => {
  
  return (
    <>
      <div className={s.days}>
        {dailyForecast.map((day) => (
          <Card
            key={day.date}
            day={day}
            onClick={() => onDaySelect(day)}
            isSelected={selectedDay?.dateISO === day.dateISO}
          />
        ))}
      </div>
    </>
  );
};

export default Days;
