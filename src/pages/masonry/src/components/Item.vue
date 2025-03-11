<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  numbering: number;
}>();

const randomStyle = computed(() => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const randomWidth = `150px`;
  const randomHeight = `${Math.floor(Math.random() * 150) + 50}px`;

  return {
    backgroundColor: randomColor,
    width: randomWidth,
    height: randomHeight,
  };
});
</script>

<template>
  <div class="item" :style="randomStyle">
    {{ numbering }}
  </div>
</template>

<style scoped>
.item {
  display: grid;
  place-items: center;
  border-radius: 2rem;
  font-size: 1.6rem;
  border: 1px solid gray;
  break-inside: avoid;
  margin: 0 0 2rem;
}
</style>
