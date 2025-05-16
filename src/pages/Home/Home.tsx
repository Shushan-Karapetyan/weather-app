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

export const Home = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  );

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


  const { data: currentWeather } = useGetCurrentWeatherQuery(
    coords ?? skipToken,
    { skip: !coords }
  );
  const { data: forecast } = useGetForecastQuery(coords ?? skipToken, {
    skip: !coords,
  });

  if (!coords) return <div>Getting your location...</div>;
  if (!currentWeather || !forecast) return <div>Loading...</div>;

  return (
    <div className={s.home}>
      <div className={s.wrapper}>
        <ThisDay data={currentWeather} />
        <CurrentDayInfo list={forecast.list}  />
      </div>
      <Days dailyForecast={groupForecastByDay(forecast.list)}/>
    </div>
  );
};
