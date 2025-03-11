<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { weatherCodes, weatherLabels } from '../common/constants'
import { useAppStore } from '@/stores/appStore.ts'

const store = useAppStore();
const props = defineProps<{
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
}>();

const formatDay = (dateString: string): string => {
  const date = new Date(dateString);
  const options = { weekday: 'short' };
  return new Intl.DateTimeFormat('ru-RU', options).format(date);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options = { day: 'numeric', month: 'long' };
  return new Intl.DateTimeFormat('ru-RU', options).format(date);
};

const days = computed(() => {
  return props.daily?.time.map((date, index) => ({
    day: formatDay(date),
    date: formatDate(date),
    maxTemp: props.daily.temperature_2m_max[index],
    minTemp: props.daily.temperature_2m_min[index],
  }));
});
const dailyWeatherCodes = computed(() => props.daily?.weathercode ?? []);
const getWeatherStatus = (index: number) => weatherCodes[dailyWeatherCodes.value[index]] ?? '';
const getWeatherLabel = (index: number) => weatherLabels[dailyWeatherCodes.value[index]] ?? 'Неизвестная погода';

const getImageSrc = (index) => {
  const status = getWeatherStatus(index);
  return ['snow', 'thunderstorm'].includes(status) ? status : `${store.timeOfDay}-${status}`;
}
</script>

<template>
  <div class="days-slider">
    <div v-for="(day, index) in days" :key="index" class="day-item">
      <div class="day-name">{{ day.day }}</div>
      <div class="day-date">{{ day.date }}</div>
      <img
        alt="weather"
        :src="`/src/pages/weather/src/assets/svg/mini-icon/${getImageSrc(index)}.svg`"
      />
      <div class="temperature">
        <span class="max-temp">{{ Math.ceil(day.maxTemp) }}°</span>
        <span class="min-temp">{{ Math.ceil(day.minTemp) }}°</span>
      </div>
      <div class="day-weather">{{getWeatherLabel(index)}}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.days-slider {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  align-items: stretch;
}

.day-item {
  flex: 1;
  min-width: 10rem;
  max-width: 13rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: stretch;
  background: var(--color-background);
  border-radius: 2.2rem;
  padding: 2rem;
  gap: 0.5rem;
}

.day-name {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
  text-transform: capitalize;
}

.day-date {
  font-size: 1.2rem;
  color: gray;
  margin-bottom: 0.5rem;
}

.day-weather {
  font-size: 1.2rem;
  color: grey;
}

.temperature {
  display: flex;
  flex-direction: column;
  color: #333;
}

.max-temp {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-text-weather);
}

.min-temp {
  font-size: 1.2rem;
  color: gray;
}
</style>

