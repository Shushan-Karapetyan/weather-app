import { createSlice } from "@reduxjs/toolkit";
import { 
  OneCallWeatherResponse, 
  CurrentWeather as CurrentWeatherType,
  HourlyForecast, 
  DailyForecast 
} from "../../types/type";

type WeatherState = {
  data: OneCallWeatherResponse | null;
  isLoading: boolean;
  error: {
    status: number;
    message: string;
  } | null;
};

const initialState: WeatherState  = {
  data: null, 
  isLoading: false,
  error: null,
};

export const currentWeatherSlice = createSlice({
  name: "current_weather",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default currentWeatherSlice.reducer;
