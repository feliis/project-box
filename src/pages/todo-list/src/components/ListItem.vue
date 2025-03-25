<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { ITodo } from '@/pages/todo-list/src/common/intefaces'

const props = defineProps<{
  item: ITodo;
  status: Map<number, boolean>;
}>();

const emit = defineEmits(["remove"]);

function toggleStatus() {
  const newStatus = !props.status.get(props.item.id);
  props.status.set(props.item.id, newStatus);
}
</script>

<template>
  <div class="item">
    <label class="custom-checkbox">
      <input
        type="checkbox"
        :checked="status.get(item.id)"
        @change="toggleStatus"
      >
      <span class="checkmark"></span>
    </label>
    <span :class="{ done: status.get(item.id) }">{{ item.todo }}</span>
    <div class="button" @click="emit('remove', item)">
      <i class="pi pi-trash" style="font-size: 1.8rem"></i>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  gap: 0.8rem;
  padding: 2rem;
  border-radius: 1.2rem;
  background: var(--bg-component-item);

  &:active {
    cursor: grabbing;
  }

  &:hover {
    .button {
      display: flex;
    }
  }
}

.custom-checkbox {
  position: relative;
  width: 18px;
  height: 18px;
}

.custom-checkbox input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.custom-checkbox .checkmark {
  content: "";
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 30%;
  border: 2px solid var(--primary);
  background: var(--bg-input);
  transition: background 0.2s, border-color 0.2s;
}

.custom-checkbox input:checked + .checkmark {
  background: var(--primary);
}

.custom-checkbox input:checked + .checkmark::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 5px;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  transform: translate(-50%, -50%) rotate(-45deg);
}

span {
  color: var(--color-text);
  font-weight: 600;
  line-height: 1.8rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.done {
  color: gray;
  text-decoration: line-through;
}

.button {
  display: none;
  height: 1.8rem;
  color: var(--primary);

  &:hover {
    color: var(--primary-dark);
  }
}
</style>
