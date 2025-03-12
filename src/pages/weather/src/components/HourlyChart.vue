<script setup lang="ts">
import { computed, defineProps, ref, onMounted, nextTick, watchEffect, watch } from 'vue'
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js'

const store = useThemeStore();
const { isDark } = storeToRefs(store);

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler);

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useThemeStore } from '@/stores/themeStore.ts'
import { storeToRefs } from 'pinia'
ChartJS.register(ChartDataLabels);

const props = defineProps<{
  hourly: {
    time: string[];
    apparent_temperature: number[];
  };
}>();

const chartRef = ref(null);
const textColor = ref('#000');

const updateTextColor = () => {
  textColor.value = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim() || '#000';
};

const chartData = computed(() => {
  const currentDate = new Date();

  const startOfInterval = new Date(currentDate);
  startOfInterval.setMinutes(0, 0, 0);
  startOfInterval.setHours(startOfInterval.getHours() + 1);

  const endOfInterval = new Date(startOfInterval);
  endOfInterval.setHours(startOfInterval.getHours() + 24);

  const filteredData = props.hourly.time
    .map((t, i) => {
      const timeInMs = new Date(t).getTime();
      return {
        time: t.split('T')[1].substring(0, 5),
        temp: props.hourly.apparent_temperature[i],
        timeInMs,
      };
    })
    .filter(({ timeInMs }) => timeInMs >= startOfInterval.getTime() && timeInMs <= endOfInterval.getTime());

  return {
    labels: filteredData.map(d => d.time),
    datasets: [
      {
        label: 'Temperature',
        data: filteredData.map(d => d.temp),
        borderColor: '#4E8DB1',
        fill: false,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        datalabels: {
          display: true,
          align: 'top',
          color: textColor.value,
          font: { weight: 'bold', size: 14 },
          formatter: (value: number) => `${Math.ceil(value)}°`,
        },
      },
    ],
  };
});


const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: (context) => `${context.raw}°C`,
      },
    },
    legend: { display: false },
  },
  scales: {
    x: {
      type: 'category',
      labels: chartData.value.labels,
      ticks: {
        maxRotation: 0,
        autoSkip: false,
      },
      grid: {
        color: isDark.value ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
      },
    },
    y: {
      beginAtZero: true,
      display: false,
      ticks: {
        display: false,
      },
    },
  },
}));
onMounted(() => {
  updateTextColor();
  nextTick(() => {
    if (chartRef.value) {
      chartRef.value.chart.resize();
    }
  });
});

watch(isDark, (val) => {
  updateTextColor();
}, { immediate: true })
</script>

<template>
  <div class="container">
    <div class="chart-scroll-container">
      <div class="chart-container">
        <Line ref="chartRef" :data="chartData" :options="chartOptions" />
      </div>
    </div>
  </div>
</template>


<style scoped>
.container {
  width: 100%;
  height: 35rem;
  background: var(--color-background);
  border-radius: 3.2rem;
  padding: 2rem;
  overflow-x: auto;
}

.chart-scroll-container {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  display: flex;
  align-items: center;
}

.chart-scroll-container::-webkit-scrollbar {
  display: none;
}

.chart-container {
  min-width: 1600px;
  height: 100%;
  display: flex;
}
</style>
