<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import SidebarItem from './SidebarItem.vue';
import type {
  ISidebarItem
} from '@/layout/src/components/sidebar/misc/interfaces/sidebar.interfaces.ts'
import { useSidebarStore } from '@/layout/src/components/sidebar/store'

defineProps<{
  items: ISidebarItem[];
  title: string;
}>();

const sidebarStore = useSidebarStore();

const route = useRoute();
const currentPath = computed(() => route.path);

function isCurrent(currentUrl: string, name: string) {
  return route.name?.toString().includes(name);
}
</script>

<template>
  <div class="sidebar-list">
    <div v-show="sidebarStore.isSidebarExpanded" class="sidebar-list__title">
      {{ title }}
    </div>

    <div
      class="sidebar-list__item"
      :class="{ 'sidebar-list__item': !sidebarStore.isSidebarExpanded }"
    >
      <SidebarItem
        v-for="(item, index) in items"
        :key="item.title"
        :is-current="isCurrent(currentPath, item.to.name)"
        :item
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar-list {
  &__title {
    color: var(--vt-c-text-light-2);
    font-size: 1.4rem;
    line-height: 1.8rem;
    font-weight: 500;
    margin-bottom: 1.2rem;
  }

  &__item {
    margin-bottom: 3.2rem;
    transition: padding 0.3s;

    .layout_sidebar-expanded & {
      padding: 0;
    }
  }

  & + & {
    .sidebar-list__item {
      margin-bottom: 0;
    }
  }
}

@media screen and (width <= 1500px) {
  .sidebar-list {
    &__item {
      margin-bottom: 4.8rem;
      padding: 0;
    }
  }
}
</style>
