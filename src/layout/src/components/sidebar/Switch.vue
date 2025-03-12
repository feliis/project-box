<script setup lang="ts">
import { computed } from 'vue';

const model = defineModel<boolean>();

const toggle = () => {
  model.value = !model.value;
};

const icon = computed(() => (model.value ? 'moon' : 'sun'));
</script>

<template>
  <div
    class="toggle-switch"
    :class="{ checked: model }"
    @click="toggle"
  >
    <i class="icon" :class="`pi pi-${icon}`" style="font-size: 1.7rem"></i>
  </div>
</template>

<style scoped>
.toggle-switch {
  background: #ddd;
  border-radius: 1em;
  box-shadow: 0.0625em 0.0625em 0.0625em rgba(0, 0, 0, 0.08) inset;
  cursor: pointer;
  flex: none;
  height: 2em;
  position: relative;
  transition: background-color 150ms;
  width: 3.4em;
}

.toggle-switch:hover {
  box-shadow: inset 0 0 0 1px var(--primary);
}

.toggle-switch::before {
  background: var(--white);
  border-radius: 50%;
  box-shadow: 0.0625em 0.0625em 0.0625em rgba(0, 0, 0, 0.08);
  content: "";
  display: block;
  height: 1.7em;
  width: 1.7em;
  left: 0.125em;
  position: absolute;
  top: 0.125em;
  transition: left 150ms;
}

.checked {
  background-color: var(--divider-dark-1);
}

.checked::before {
  left: 1.55em;
  background: var(--black);
}

.icon {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
  top: 50%;
  left: 0.6rem;
  transform: translateY(-50%);
  transition: left 150ms, color 150ms;
  color: var(--black);
}

.checked .icon {
  left: 2.76rem;
  color: var(--white);
}
</style>
