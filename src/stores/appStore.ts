import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', () => {
  const timeOfDay = ref('');

  const theme = computed(() => (timeOfDay.value === 'sun' ? 'light' : 'dark'));

  function updateTimeOfDay() {
    const currentHour = new Date().getHours();
    timeOfDay.value = currentHour >= 6 && currentHour < 22 ? 'sun' : 'moon';

    document.documentElement.setAttribute('data-theme', theme.value);
  }

  return { timeOfDay, theme, updateTimeOfDay };
});
