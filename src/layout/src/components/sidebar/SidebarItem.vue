<script setup lang="ts">

import type {
  ISidebarItem
} from '@/layout/src/components/sidebar/misc/interfaces/sidebar.interfaces.ts'
import { useSidebarStore } from '@/layout/src/components/sidebar/store'

withDefaults(
  defineProps<{
    item: ISidebarItem;
    isCurrent?: boolean;
  }>(),
  {},
);
const sidebarStore = useSidebarStore();
</script>

<template>
    <RouterLink
      class="sidebar-item group"
      :class="{
        'sidebar-item_current': isCurrent,
        'sidebar-item_collapsed': !sidebarStore.isSidebarExpanded,
      }"
      :to="item.to"
    >
      <div class="sidebar-item__inner">
        <i  class="sidebar-item__icon" :class="`pi pi-${item.icon}`" style="font-size: 2.4rem"></i>

<!--        <SeoIcon-->
<!--          class="sidebar-item__icon"-->
<!--          :class="{ 'sidebar-item__icon_current': isCurrent, _special: item.iconColor }"-->
<!--          :name="item.icon"-->
<!--        />-->

        <span class="sidebar-item__title" v-if="sidebarStore.isSidebarExpanded">
          {{ item.title }}
        </span>
      </div>
    </RouterLink>
</template>

<style scoped lang="scss">
._collapsed {
  width: fit-content;
}
.sidebar-item-container {
  width: 100%;
}
.sidebar-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text);
  text-decoration: none;
  border-radius: 1.2rem;
  padding: 1.3rem 1.6rem;
  margin-bottom: 0.6rem;
  background-color: var(--main-bg);
  transition: var(--seo-default-animation);

  &_collapsed {
    width: 5rem;
  }

  ._collapse & {
    justify-content: center;
  }

  &.active,
  &:hover {
    color: var(--main-bg);
    background-color: var(--sidebar-item-bg);

    & .sidebar-item__icon {
      color: var(--main-bg);
    }
  }

  &__icon {
    color: var(--color-icon);
    height: 2.4rem;
    width: 2.4rem;

    &_current {
      color: var(--main-bg);
    }
  }

  &__inner {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.8rem;

    ._collapse & {
      font-size: 0;
    }
  }

  &_current {
    color: var(--main-bg);
    background-color: var(--sidebar-item-bg);
  }
}

.sidebar-item__title {
  white-space: nowrap;
  font-weight: 600;

}

@media screen and (width <= 1500px) {
  .sidebar-item {
    padding: 0.9rem 1.2rem;
  }
}
</style>
