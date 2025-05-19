import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { DailyForecast } from "../types/type";

export function groupForecastByDay(list: any[]): DailyForecast[] {
  const grouped: { [date: string]: any[] } = {};

  list.forEach((item) => {
    const dateISO = format(new Date(item.dt * 1000), "yyyy-MM-dd");
    if (!grouped[dateISO]) {
      grouped[dateISO] = [];
    }
    grouped[dateISO].push(item);
  });

  return Object.entries(grouped)
    .slice(0, 5)
    .map(([dateISO, items]) => {
      const temps = items.map((i) => i.main.temp);
      const min = Math.min(...temps);
      const max = Math.max(...temps);

      return {
        dateISO,
        date: format(new Date(dateISO), "dd.MM"),
        weekDay: format(new Date(dateISO), "EEEE", { locale: enUS }),
        temp_day: Math.round(max) + "°",
        temp_night: Math.round(min) + "°",
        icon_id: items[0].weather[0].icon, 
        info: items[0].weather[0].description,
      };
    });
}
