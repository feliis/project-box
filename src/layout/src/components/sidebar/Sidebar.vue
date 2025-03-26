<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSidebarStore } from '@/layout/src/components/sidebar/store'
import { mainLinks } from '@/layout/src/components/sidebar/constants/LinkList.ts'
import Switch from '@/layout/src/components/sidebar/Switch.vue'
import SidebarList from '@/layout/src/components/sidebar/SidebarList.vue'
import { useThemeStore } from '@/stores/themeStore.ts'
import { storeToRefs } from 'pinia'

const emit = defineEmits<{ (e: 'sidebar-toggled', state: boolean): void }>();
const store = useThemeStore();
const { isDark } = storeToRefs(store);

const sidebarStore = useSidebarStore();

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
        <div class="sidebar__navs-bottom">
          <Switch v-model="isDark" />
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: relative;
  width: 29rem;
  border-radius: 4.5rem;
  flex-shrink: 0;
  padding: 6rem 2.8rem 4rem 2.6rem;
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
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__head {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;
    margin-bottom: 6.4rem;
  }

  &__logo {
    width: 20.4rem;
    height: 3.2rem;
    transition: width 0.3s;
  }

  &__navs {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 0;
    padding-bottom: 4rem;
  }
}

.sidebar__navs-bottom {
  position: absolute;
  display: flex;
  justify-content: start;
  bottom: 3rem;
  width: 100%;
  padding-top: 1rem;
}

@media screen and (max-width: 1500px) {
  .sidebar__head {
    flex-direction: column;
    margin-bottom: 3rem;
  }

  .sidebar {
    padding: 0 1.6rem;
    &._collapse {
      width: 8.2rem;
    }

    &__link-home {
      width: fit-content;
      height: 2rem;
    }
  }
}
</style>
