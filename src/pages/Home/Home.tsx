import { useEffect, useState } from "react";
import s from "./Home.module.scss";
import ThisDay from "./components/ThisDay/ThisDay";
import Days from "./components/Days/Days";
import {
  useGetCurrentWeatherQuery,
  useGetForecastQuery,
} from "../../services/WeatherService";
import { skipToken } from "@reduxjs/toolkit/query/react";
import CurrentDayInfo from "./components/CurrentDayInfo/CurrentDayInfo";
import { groupForecastByDay } from "../../utils/groupForecastByDay";
import { DailyForecast } from "../../types/type";

export const Home = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );

  const { data: currentWeather } = useGetCurrentWeatherQuery(
    coords ?? skipToken,
    { skip: !coords }
  );
  const { data: forecast } = useGetForecastQuery(coords ?? skipToken, {
    skip: !coords,
  });

  const [selectedDay, setSelectedDay] = useState<DailyForecast | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error.message);
      }
    );
  }, []);

  useEffect(() => {
    if (forecast) {
      const groupForecast = groupForecastByDay(forecast.list);
      const currentDayStr = new Date().toISOString().slice(0, 10);
      const currentDayForecast = groupForecast.find(
        (day) => day.dateISO === currentDayStr
      );
      setSelectedDay(currentDayForecast || groupForecast[0]);
    }
  }, [forecast]);

  if (!coords) return <div>Getting your location...</div>;
  if (!currentWeather || !forecast) return <div>Loading...</div>;

  return (
    <div className={s.home}>
      <div className={s.wrapper}>
        <ThisDay data={selectedDay} city={currentWeather.name}/>
        <CurrentDayInfo
          list={forecast.list.filter((item) =>
            item.dt_txt.startsWith(selectedDay?.dateISO ?? "")
          )}
        />
      </div>
      <Days
        dailyForecast={groupForecastByDay(forecast.list)}
        selectedDay={selectedDay}
        onDaySelect={setSelectedDay}
      />
    </div>
  );
};
