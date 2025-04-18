<script setup>
import { onMounted, ref, computed, defineProps, watch } from 'vue'
import { useThemeStore } from '@/stores/themeStore.js'
import { storeToRefs } from 'pinia'

const store = useThemeStore();
const { isDark } = storeToRefs(store);

const props = defineProps({
  monthly: {
    time: Array,
    temperature_2m_max: Array,
    temperature_2m_min: Array,
  },
});

const monthNames = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const textColor = ref('#000');
const canvasRef = ref(null);

const updateTextColor = () => {
  textColor.value = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim() || '#000';
};

const aggregateMonthlyData = () => {
  if (!props.monthly || !props.monthly.time || props.monthly.time.length === 0) {
    return [];
  }

  const monthlyData = {};
  props.monthly.time.forEach((dateStr, index) => {
    const date = new Date(dateStr);
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${year}-${month + 1}`;

    if (!monthlyData[key]) {
      monthlyData[key] = {
        label: monthNames[month],
        maxSum: 0,
        minSum: 0,
        count: 0
      };
    }
    monthlyData[key].maxSum += props.monthly.temperature_2m_max[index] || 0;
    monthlyData[key].minSum += props.monthly.temperature_2m_min[index] || 0;
    monthlyData[key].count++;
  });

  return Object.values(monthlyData).map(data => ({
    label: data.label,
    maxTemp: (Math.round(data.maxSum / data.count * 10) / 10).toFixed(1),
    minTemp: (Math.round(data.minSum / data.count * 10) / 10).toFixed(1)
  }));
};

const aggregatedData = computed(() => aggregateMonthlyData());
const labels = computed(() => aggregatedData.value.map(data => data.label));
const maxTempValues = computed(() => aggregatedData.value.map(data => parseFloat(data.maxTemp)));
const minTempValues = computed(() => aggregatedData.value.map(data => parseFloat(data.minTemp)));

const maxTemp = computed(() => Math.ceil(Math.max(...maxTempValues.value) / 10) * 10);
const minTemp = computed(() => Math.floor(Math.min(...minTempValues.value) / 10) * 10);
const tempRange = computed(() => maxTemp.value - minTemp.value);

const width = 1000;
const height = 400;
const padding = 50;
const pointSpacing = computed(() => (width - padding * 2) / (labels.value.length - 1));

const tempToY = (temp) => height - padding - ((temp - minTemp.value) / tempRange.value) * (height - padding * 2);
const leftPadding = padding - 10;

const drawChart = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, width, height);

  const drawAxis = () => {
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 0.5;

    for (let t = 0; t <= Math.floor(tempRange.value / 10); t++) {
      const y = tempToY(minTemp.value + t * 10);
      ctx.beginPath();
      ctx.moveTo(leftPadding, y);
      ctx.lineTo(width - leftPadding, y);
      ctx.stroke();

      ctx.fillStyle = textColor.value;
      ctx.font = '14px Arial';
      ctx.textAlign = 'end';
      ctx.fillText(`${minTemp.value + t * 10}°`, padding - 20, y + 4);
    }
  };

  const drawTemperatureRectangles = () => {
    aggregatedData.value.forEach((data, index) => {
      const x = padding + index * pointSpacing.value - 15;
      const yMax = tempToY(data.maxTemp);
      const yMin = tempToY(data.minTemp);
      const heightTemp = yMax - yMin;

      const gradient = ctx.createLinearGradient(0, yMax, 0, yMin);
      gradient.addColorStop(0.5, '#FFD358');
      gradient.addColorStop(0.5, '#4E8DB1');

      ctx.fillStyle = gradient;
      ctx.beginPath();

      const radius = 10;
      ctx.moveTo(x + radius, yMax);
      ctx.lineTo(x + 30 - radius, yMax);
      ctx.arcTo(x + 30, yMax, x + 30, yMax + radius, radius);
      ctx.lineTo(x + 30, yMin - radius);
      ctx.arcTo(x + 30, yMin, x + 30 - radius, yMin, radius);
      ctx.lineTo(x + radius, yMin);
      ctx.arcTo(x, yMin, x, yMin - radius, radius);
      ctx.lineTo(x, yMax + radius);
      ctx.arcTo(x, yMax, x + radius, yMax, radius);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = textColor.value;
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${data.maxTemp === "-0.0" ? "0.0" : Math.ceil(data.maxTemp)}°`, x + 15, yMax - 5);
      ctx.fillText(`${data.minTemp === "-0.0" ? "0.0" : Math.ceil(data.minTemp)}°`, x + 15, yMin + 15);
      ctx.font = '16px Arial';
      ctx.fillText(data.label, x + 15, height - padding + 40);
    });
  };

  drawAxis();
  drawTemperatureRectangles();
};

onMounted(() => {
  updateTextColor();
  drawChart();
});

watch([isDark, textColor], () => {
  updateTextColor();
  drawChart();
}, { immediate: true });

</script>

<template>
  <div class="container">
    <div class="chart-scroll-container">
      <div class="chart-container">
        <canvas ref="canvasRef" :width="width" :height="height"></canvas>
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
  min-width: fit-content;
  height: 100%;
  display: flex;
}
</style>
