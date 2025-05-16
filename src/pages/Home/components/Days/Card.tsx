import s from "./Days.module.scss";
import GlobalSVGSelector from "../../../../asstets/icons/global/GlobalSVGSelector";
import { DailyForecast } from "../../../../types/type";

interface Props {
  day: DailyForecast;
}

const Card = ({ day }: Props) => {
  const { weekDay, date, icon_id, temp_day, temp_night, info } = day;

  return (
    <div className={s.card}>
      <div className={s.dayName}>{weekDay}</div>
      <div className={s.day_info}>{date}</div>
      <div className={s.img}>
        <GlobalSVGSelector id={icon_id} />
      </div>
      <div className={s.temp_day}>{temp_day}</div>
      <div className={s.temp_night}>{temp_night}</div>
      <div className={s.info}>{info}</div>
    </div>
  );
};

export default Card;