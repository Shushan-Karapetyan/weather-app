import { DailyForecast } from "../../../../types/type";
import Card from "./Card";
import s from "./Days.module.scss";

interface Props {
  dailyForecast: DailyForecast[];
}


const Days = ({dailyForecast}: Props) => {
  return (
    <>
      <div className={s.days}>
      {dailyForecast.map((day) => (
          <Card key={day.date} day={day} />
        ))}
      </div>
    </>
  );
};

export default Days;
