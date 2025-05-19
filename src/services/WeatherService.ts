import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CurrentWeatherResponse,
  OneCallWeatherResponse,
} from "../types/type";
import { Geolocation } from "../types/type";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query<
      CurrentWeatherResponse,
      { lat: number; lon: number }
    >({
      query: ({ lat, lon }) => ({
        url: `weather`,
        method: "GET",
        params: {
          lat,
          lon,
          units: "metric",
          lang: "en",
          appid: import.meta.env.VITE_APP_API_KEY,
        },
      }),
    }),

    getForecast: builder.query<
      OneCallWeatherResponse, 
      { lat: number; lon: number }
    >({
      query: ({ lat, lon }) => ({
        url: `forecast`,
        method: "GET",
        params: {
          lat,
          lon,
          units: "metric",
          lang: "en",
          appid: import.meta.env.VITE_APP_API_KEY,
        },
      }),
    }),

    searchCity: builder.query<Geolocation[], string>({
      query: (cityName) => ({
        url: `geo/1.0/direct`,
        params: {
          q: cityName,
          limit: 5,
          appid: import.meta.env.VITE_APP_API_KEY,
        },
      }),
    }),
  }),
});

export const {
  useGetCurrentWeatherQuery,
  useGetForecastQuery,
  useSearchCityQuery,
} = weatherApi;
