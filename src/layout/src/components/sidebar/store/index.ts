import { computed, type Ref } from 'vue'
import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', () => {
  const isExpanded = useLocalStorage('sidebar-expanded', false) as Ref<boolean>;
  const isSidebarExpanded = computed({
    get() {
      return isExpanded.value;
    },
    set(val: boolean) {
      isExpanded.value = val;
    },
  }) as Ref<boolean>;
  const activeItemrRef = useLocalStorage('routerActiveItem', 0) as Ref<number>;

  const activeItem = computed({
    get() {
      return activeItemrRef.value;
    },
    set(val: number) {
      activeItemrRef.value = val;
    },
  }) as Ref<number>;

  const toggleSidebar = (): void => {
    isSidebarExpanded.value = !isSidebarExpanded.value;
  };

  return { isSidebarExpanded, toggleSidebar, activeItem };
});
