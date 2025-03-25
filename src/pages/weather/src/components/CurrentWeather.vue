<script setup lang="ts">
import { computed, defineProps, onMounted } from 'vue'
import type { ICurrentWeather, ICurrentWeatherUnits, IDailyWeather } from '@/pages/weather/src/common/intefaces';
import Tab from '@/pages/weather/src/components/Tab.vue';
import {
  statusColors,
  weatherLabels,
  windSpeedUnitsTranslation
} from '@/pages/weather/src/common/constants'
import { useAppStore } from '@/stores/appStore.ts'

const store = useAppStore();
const props = defineProps<{
  city: string;
  currentWeather: ICurrentWeather | null;
  currentWeatherUnits: ICurrentWeatherUnits | null;
  daily: IDailyWeather | null;
  feelsLikeTemperature: string;
  status: string;
}>();

const temperature = computed(() => Math.ceil(props.currentWeather.temperature));

const feelsLikeTemperature = computed(() => Math.ceil(props.feelsLikeTemperature));

const windSpeed = computed(() => {
  if (!props.currentWeather?.windspeed || !props.currentWeatherUnits?.windspeed) return null;

  return props.currentWeatherUnits.windspeed === 'km/h'
    ? Math.ceil(props.currentWeather.windspeed / 3.6)
    : Math.ceil(props.currentWeather.windspeed);
});

const windSpeedUnit = computed(() => {
  return props.currentWeatherUnits?.windspeed === 'km/h' ? 'м/с' : translateWindSpeedUnit(props.currentWeatherUnits?.windspeed);
});


const weatherStatus = computed(() => weatherLabels[props.currentWeather.weathercode] || 'Неизвестная погода');

const humidity = computed(() => {
  const [max, min] = [props.daily?.relative_humidity_2m_max?.[0], props.daily?.relative_humidity_2m_min?.[0]];
  return max !== undefined && min !== undefined ? Math.ceil((max + min) / 2) : null;
});
const statusColor = computed(() => statusColors[props.status.toLowerCase()] || statusColors.default);

const translateWindSpeedUnit = (unit: string): string => {
  return windSpeedUnitsTranslation[unit] || unit;
};

const weatherTabs = [
  { icon: 'Thermometer', title: 'Ощущается как', value: feelsLikeTemperature.value, unit: '°' },
  { icon: 'Wind', title: 'Скорость ветра', value: windSpeed.value, unit: windSpeedUnit.value },
  { icon: 'Droplets', title: 'Влажность', value: humidity.value, unit: '%' },
];
</script>

<template>
  <div class="container">
    <div class="current-weather">
      <div class="city-and-temperature">
        <span class="Montserrat_32_ExtraBold city">{{ city }}</span>
        <span class="Montserrat_96_ExtraBold temp">{{ temperature }}°</span>
        <span class="weather-status" :style="{ color: statusColor }">{{ weatherStatus }}</span>
      </div>
      <div class="image">
        <img alt="weather" :src="`/src/pages/weather/src/assets/svg/${store.timeOfDay}/${status}.svg`" />
      </div>
    </div>
    <div class="tabs">
      <Tab v-for="tab in weatherTabs" :key="tab.title" v-bind="tab" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
}

.current-weather {
  background: var(--color-background);
  width: 100%;
  max-width: 80rem;
  display: flex;
  border-radius: 3.2rem;
  padding: 0 2rem 0 6rem;
  justify-content: space-between;
}

.city-and-temperature {
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.weather-status {
  font-size: 1.4rem;
  font-weight: bold;
}

.image {
  width: 30rem;
  height: 30rem;
  animation: moveUpDown 2s ease-in-out infinite;
}

.image img {
  width: 100%;
  height: 100%;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  width: 100%;
  max-width: 80rem;
  align-items: stretch;
}

@media (max-width: 486px) {
  .current-weather {
    flex-direction: column;
    text-align: center;
    padding: 1.5rem;
    place-items: center;
  }

  .image {
    width: 8rem;
    height: 8rem;
  }

  .tabs {
    flex-direction: column;
    align-items: center;
  }

  .city {
    font-size: 2rem;
    text-align: center;
  }

  .temp {
    font-size: 7.2rem;
    text-align: center;
  }
}

@keyframes moveUpDown {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
</style>

