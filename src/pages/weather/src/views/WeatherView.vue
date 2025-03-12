<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import WeatherService from '@/pages/weather/src/common/services/weather.service.ts';
import CurrentWeather from '@/pages/weather/src/components/CurrentWeather.vue';
import { weatherCodes } from '@/pages/weather/src/common/constants'
import HourlyChart from '@/pages/weather/src/components/HourlyChart.vue'
import DailySlider from '@/pages/weather/src/components/DailySlider.vue'
import MonthlyChart from '@/pages/weather/src/components/MonthlyChart.vue'

const weatherData = ref<any>(null);
const historicalWeatherData = ref<any>(null);
const city = ref<string>('');
const loading = ref(true);

async function fetchWeather(): Promise<void> {
  try {
    weatherData.value = await WeatherService.getWeather();
  } catch (error) {
    console.error("Ошибка загрузки погоды:", error);
  } finally {
    loading.value = false;
  }
}

async function fetchHistoricalWeather(): Promise<void> {
  try {
    historicalWeatherData.value = await WeatherService.getHistoricalWeather();
  } catch (error) {
    console.error("Ошибка загрузки погоды:", error);
  } finally {
    loading.value = false;
  }
}

const fetchCity = async () => {
  try {
    city.value = await WeatherService.getCityFromGeolocation();
  } catch (error) {
    city.value = 'Не удалось определить город';
    console.error(error);
  }
};

function getWeatherCode(code: number): string {
  return weatherCodes[code] || "Unknown weather";
}

onBeforeMount(() => {
  fetchCity();
  fetchWeather();
  fetchHistoricalWeather();
});

const currentWeatherData = computed(() => weatherData.value?.current_weather ?? null);
const currentWeatherUnits = computed(() => weatherData.value?.current_weather_units ?? null);
const daily = computed(() => weatherData.value?.daily ?? null);
const monthly = computed(() => historicalWeatherData.value?.daily ?? null);
const weatherCode = computed(() => currentWeatherData?.value.weathercode ?? null);

const feelsLikeTemperature = computed(() => {
  const time = weatherData.value?.hourly?.time;
  const temp = weatherData.value?.hourly?.apparent_temperature;
  if (!time || !temp) return null;
  const index = time.findIndex(t => t.startsWith(new Date().toISOString().slice(0, 13)));
  return index !== -1 ? temp[index] : null;
});

const hourly = computed(() => weatherData.value?.hourly ?? null);
</script>

<template>
  <div class="view-container">
    <div class="weather-scroll-container">
      <div class="weather-container">
        <div v-if="loading">
          <span>Загрузка данных...</span>
        </div>
        <CurrentWeather
          v-if="currentWeatherData"
          :city="city"
          :current-weather="currentWeatherData"
          :current-weather-units="currentWeatherUnits"
          :feels-like-temperature="feelsLikeTemperature"
          :daily="daily"
          :status="getWeatherCode(weatherCode)"
        />
        <HourlyChart v-if="hourly" :hourly="hourly" />
        <DailySlider :daily="daily" />
        <MonthlyChart v-if="monthly" :monthly="monthly"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view-container {
  background: var(--bg-component);
  border-radius: 4rem;
  padding: 2rem;
  display: grid;
  place-items: center;
  overflow: hidden;
  height: 100%;
  width: fit-content;
}

.weather-scroll-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.weather-scroll-container::-webkit-scrollbar {
  display: none;
}

.weather-container {
  display: grid;
  grid-template-columns: auto;
  align-items: start;
  max-height: 80vh;
  width: 100%;
  max-width: 80rem;
  gap: 1.5rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.25rem;
  margin-top: 1rem;
}

span {
  display: block;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .weather-container {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .weather-container {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  h2 {
    font-size: 1rem;
  }

  h3 {
    font-size: 0.875rem;
  }
}
</style>
