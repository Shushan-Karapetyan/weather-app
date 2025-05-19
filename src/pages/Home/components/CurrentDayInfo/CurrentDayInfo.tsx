import s from "./CurrentDayInfo.module.scss";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
  dt_txt: string;
}

interface ThisDayInfoProps {
  list: ForecastItem[];
}

const CurrentDayInfo = ({ list }: ThisDayInfoProps) => {
  const next24Hours = list.slice(0, 8);

  return (
    <div className={s.this_day_info}>
      <div className={s.this_day_info_items}>
        {next24Hours.map((item) => {
          const timeString = format(new Date(item.dt * 1000), "HH:mm", {
            locale: enUS,
          });

          return (
            <div key={item.dt} className={s.hour_item}>
              <div className={s.time}>{timeString}</div>
              <div className={s.temp}>{Math.round(item.main.temp)}°C</div>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className={s.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CurrentDayInfo;
