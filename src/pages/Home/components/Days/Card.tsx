import s from "./Days.module.scss";
import GlobalSVGSelector from "../../../../asstets/icons/global/GlobalSVGSelector";
import { DailyForecast } from "../../../../types/type";
import clsx from "clsx";

interface Props {
  day: DailyForecast;
  onClick: () => void;
  isSelected: boolean;
}

const Card = ({ day, onClick, isSelected }: Props) => {
  const { weekDay, date, icon_id, temp_day, temp_night, info } = day;

  return (
    <div className={clsx(s.card, isSelected && s.selected)} onClick={onClick}>
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