import type { IWeatherResponse } from '../intefaces';

const API_URL = 'https://api.open-meteo.com/v1/forecast';
const ARCHIVE_API_URL = 'https://archive-api.open-meteo.com/v1/archive';

const getCoordinates = async (): Promise<{ latitude: number; longitude: number }> => {
  if (!navigator.geolocation) throw new Error("Геолокация не поддерживается этим браузером");

  return new Promise<{ latitude: number; longitude: number }>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => resolve({ latitude, longitude }),
      () => reject(new Error("Не удалось получить геолокацию")),
      { enableHighAccuracy: true }
    )
  );
};

export default class WeatherService {
  static async getWeather(): Promise<IWeatherResponse> {
    try {
      const { latitude, longitude } = await getCoordinates();
      const url = `${API_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=apparent_temperature&daily=weathercode,temperature_2m_max,temperature_2m_min,relative_humidity_2m_max,relative_humidity_2m_min&monthly=temperature_2m_max,temperature_2m_min&timezone=auto`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Ошибка загрузки данных');

      const data = await response.json();
      return data as IWeatherResponse;
    } catch (error) {
      throw error;
    }
  }

  static async getHistoricalWeather(): Promise<IWeatherResponse> {
    try {
      const { latitude, longitude } = await getCoordinates();
      const url = `${ARCHIVE_API_URL}?latitude=${latitude}&longitude=${longitude}&start_date=2024-01-01&end_date=2024-12-31&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Ошибка загрузки исторических данных');

      const data = await response.json();
      return data as IWeatherResponse;
    } catch (error) {
      throw error;
    }
  }

  static async getCityFromGeolocation(): Promise<string> {
    try {
      const { latitude, longitude } = await getCoordinates();
      const reverseGeocodeOpenStreetMap = async (latitude: number, longitude: number): Promise<string> => {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
        const data = await response.json();
        return data.address.city || "Неизвестный город";
      };

      const city = await reverseGeocodeOpenStreetMap(latitude, longitude);
      return city;
    } catch (error) {
      console.error(error);
      return "Не удалось определить город";
    }
  }
}
