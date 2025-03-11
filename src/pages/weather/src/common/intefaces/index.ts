export interface IWeatherResponse extends IWeatherLocation {
  current_weather_units: ICurrentWeatherUnits;
  current_weather: ICurrentWeather;
  daily_units: IDailyWeatherUnits;
  daily: IDailyWeather;
  hourly: IHourlyWeather;
}

interface IWeatherLocation {
  latitude: number; // Широта
  longitude: number; // Долгота
  elevation: number; // Высота над уровнем моря
  timezone: any; // Часовой пояс
  timezone_abbreviation: string; // Аббревиатура часового пояса
  utc_offset_seconds: number; // Смещение UTC в секундах
}

// src/common/interfaces.ts
export interface ICurrentWeather {
  temperature: number; // Фактическая температура
  feels_like: number; // Ощущаемая температура
  windspeed: number; // Скорость ветра
  winddirection: number; // Направление ветра
  humidity: number; // Влажность (%)
  weathercode: number;
  dew_point: number; // Точка росы (°C)
  heat_index?: number; // Индекс жары (если применимо)
  wind_chill?: number; // Охлаждение ветром (если применимо)
}

export interface IHourlyWeather {
  time: string[];
  apparent_temperature: number[]; // Ощущаемая температура
}

interface IWeatherUnits {
  time: string; // Формат времени (ISO 8601)
}

export interface ICurrentWeatherUnits extends IWeatherUnits {
  interval: string; // Интервал обновления (в секундах)
  temperature: string; // Единица измерения температуры (°C)
  windspeed: string; // Единица измерения скорости ветра (км/ч)
  winddirection: string; // Единица измерения направления ветра (градусы)
  humidity: string; // Единица измерения влажности (%)
}

interface IDailyWeatherUnits extends IWeatherUnits {
  temperature_2m_max: string; // Единица измерения максимальной температуры (°C)
  temperature_2m_min: string; // Единица измерения минимальной температуры (°C)
  relative_humidity_2m_max: string; // Максимальная влажность (%)
  relative_humidity_2m_min: string; // Минимальная влажность (%)
}

export interface IDailyWeather {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  relative_humidity_2m_max: number[]; // Максимальная влажность (%)
  relative_humidity_2m_min: number[]; // Минимальная влажность (%)
}
