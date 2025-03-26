import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useDark, useToggle } from '@vueuse/core'

export const useAppStore = defineStore('app', () => {
  const timeOfDay = ref('');

  const theme = computed(() => (timeOfDay.value === 'sun' ? 'light' : 'dark'));

  function updateTimeOfDay() {
    const currentHour = new Date().getHours();
    timeOfDay.value = currentHour >= 6 && currentHour < 22 ? 'sun' : 'moon';

    document.documentElement.setAttribute('data-theme', theme.value);
  }

  const isDark = useDark({
    selector: "Layout",
    attribute: "color-scheme",
    valueDark: 'dark',
    valueLight: 'light',
  })
  const toggleDark = useToggle(isDark)

  return { timeOfDay, theme, updateTimeOfDay, isDark, toggleDark };
});
