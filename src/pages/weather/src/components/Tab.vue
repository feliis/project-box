<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { Thermometer, Wind, Droplets } from 'lucide-vue-next';

const props = defineProps<{
  icon: string;
  title: string;
  value: string | number;
  unit: string;
}>();

const iconComponent = computed(() => {
  const icons = { Thermometer, Wind, Droplets };
  return icons[props.icon] || null;
});
</script>

<template>
  <div v-if="iconComponent" class="tab-container">
    <component class="icon" :is="iconComponent" size="16" />
    <span class="title">{{ title }}</span>
    <span class="value">{{ value + ' ' + unit }}</span>
  </div>
</template>

<style scoped>
.tab-container {
  flex: 1;
  flex-wrap: nowrap;
  min-width: 16rem;
  padding: 2rem;
  display: grid;
  grid-template-areas:
    "i t t"
    "v v v";
  row-gap: 6px;
  column-gap: 4px;
  align-content: center;
  background: var(--color-background);
  border-radius: 2rem;
  align-items: center;
  justify-content: left;
  text-align: left;
}

.icon {
  grid-area: i;
  justify-self: center;
  color: gray;
}

.title {
  grid-area: t;
  font-size: 1.2rem;
  color: gray;
}

.value {
  grid-area: v;
  font-size: 2.2rem;
  font-weight: bold;
}

.value {
  color: var(--color-text-weather);
}

@media (max-width: 785px) {
  .tab-container {
    grid-template-areas:
      "i t"
      "v v";
    padding: 1.5rem;
    width: 100%;
    justify-content: start;
  }

  .title {
    font-size: 0.9rem;
  }

  .value {
    font-size: 1.4rem;
  }
}
</style>
