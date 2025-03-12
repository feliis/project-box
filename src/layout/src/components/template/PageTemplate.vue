<script setup lang="ts">
import Sidebar from '@/layout/src/components/sidebar/Sidebar.vue'
import { useThemeStore } from '@/stores/themeStore.ts'

const store = useThemeStore();
</script>

<template>
  <div class="layout" :data-theme="store.isDark ? 'dark' : 'light'">
    <Sidebar class="sidebar" />
    <main class="main">
      <div class="body">
        <slot name="default" />
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.layout {
  background: var(--bg-app);
  width: 100%;
  height: 100vh;
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  isolation: isolate;
}
.sidebar {
  left: 1.2rem;
  margin: 2rem 0 2rem 0;
  position: sticky;
}
.main {
  display: grid;
  padding: 2.4rem 1.2rem;
  height: 100%;
  overflow: hidden;
  &._no-header {
    grid-template-rows: minmax(0%, 100%);
  }
}
.body {
  height: 100%;
  width: 100%;
  padding-left: 1.2rem;
}
</style>
