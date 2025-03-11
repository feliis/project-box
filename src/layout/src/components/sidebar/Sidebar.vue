<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useWindowSize } from '@vueuse/core';
import { useSidebarStore } from '@/layout/src/components/sidebar/store'
import { mainLinks } from '@/layout/src/components/sidebar/constants/LinkList.ts'
import SidebarList from '@/layout/src/components/sidebar/SidebarList.vue'

const { width } = useWindowSize();
const emit = defineEmits<{ (e: 'sidebar-toggled', state: boolean): void }>();
const sidebarStore = useSidebarStore();
const iconLogoName = computed(() =>
  sidebarStore.isSidebarExpanded ? 'logo-full' : 'logo-collapsed',
);
const sidebarClass = computed(() => ({
  _collapse: !sidebarStore.isSidebarExpanded,
}));

function handleMouseEnter() {
  sidebarStore.isSidebarExpanded = true;
}

function handleMouseLeave() {
  if (!sidebarStore.isSidebarExpanded) return;
  sidebarStore.isSidebarExpanded = false;
}
</script>

<template>
  <aside
    class="sidebar"
    :class="sidebarClass"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="sidebar__inner">
      <div class="sidebar__head">
        <RouterLink class="sidebar__link-home" to="/">
        </RouterLink>
      </div>

      <div class="sidebar__navs">
        <SidebarList :items="mainLinks" title="Проекты"/>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: relative;
  width: 29rem;
  border-radius: 4rem;
  flex-shrink: 0;
  padding: 4rem 2.8rem 4rem 2.6rem;
  transition: width 0.5s;
  overflow: hidden;
  border-left: none;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--sidebar-bg);
    backdrop-filter: blur(1rem);
    z-index: -1;
  }


  &._collapse {
    width: 10.4rem;
    border-radius: 5rem;
  }



  &__inner {
    position: relative;
    z-index: 1;
  }

  &__head {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;
    margin-bottom: 6.4rem;

    ._collapse & {
      gap: 1rem;
      padding-left: 1.4rem;
    }
  }

  &__logo {
    width: 20.4rem;
    height: 3.2rem;
    transition: width 0.3s;

    ._collapse & {
      width: 4rem;
    }
  }

  &__toggle {
    background-color: transparent;
    border: none;
    cursor: pointer;

    &-icon {
      width: 2.8rem;
      aspect-ratio: 1 / 1;
      flex-shrink: 0;
      transform: rotate(180deg);

      &._rotate {
        transform: rotate(0);
      }
    }
  }

  &__navs {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }
}


@media screen and (width <= 1500px) {
  .sidebar__head {
    flex-direction: column;
    margin-bottom: 4.8rem;
  }
  .sidebar {
    padding: 1.6rem;

    &__toggle {
      display: none;
    }

    &._collapse {
      width: 8rem;
    }

    &__head {
      ._collapse & {
        padding-left: 0;
      }
    }

    &__link-home {
      width: fit-content;
      height: 2rem;
    }
  }
}
</style>
