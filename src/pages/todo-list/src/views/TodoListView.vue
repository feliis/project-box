<script setup lang="ts">
import List from '@/pages/todo-list/src/components/List.vue'
</script>

<template>
  <div class="todo-list">
    <List />
  </div>
</template>

<style scoped lang="scss">
.todo-list {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
