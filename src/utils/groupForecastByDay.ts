import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { DailyForecast } from "../types/type";

export function groupForecastByDay(list: any[]): DailyForecast[] {
  const grouped: { [date: string]: any[] } = {};

  list.forEach((item) => {
    const date = format(new Date(item.dt * 1000), "yyyy-MM-dd");
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  return Object.entries(grouped)
    .slice(0, 5)
    .map(([date, items]) => {
      const temps = items.map((i) => i.main.temp);
      const min = Math.min(...temps);
      const max = Math.max(...temps);

      return {
        date: format(new Date(date), "dd.MM"),
        weekDay: format(new Date(date), "EEEE", { locale: ru }),
        temp_day: Math.round(max) + "°",
        temp_night: Math.round(min) + "°",
        icon_id: items[0].weather[0].icon, 
        info: items[0].weather[0].description,
      };
    });
}
