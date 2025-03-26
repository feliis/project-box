import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  // Загружаем тему из localStorage
  const isDark = ref(localStorage.getItem('theme') === 'dark')

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  watch(isDark, (newVal) => {
    const theme = newVal ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, { immediate: true })

  return { isDark, toggleTheme }
})
