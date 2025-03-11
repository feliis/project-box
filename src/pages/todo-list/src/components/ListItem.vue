<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import type { ITodo } from '@/pages/todo-list/src/common/intefaces'

const props = defineProps<{
  item: ITodo,
  status: any,
}>();

const emit = defineEmits(["remove"]);
</script>

<template>
  <div class="item">
    <label class="custom-checkbox">
      <input
        type="checkbox"
        :checked="status.get(props.item.id)"
        @change="status.set(props.item.id, $event.target.checked)"
      >
    </label>
    <span :class="{ done: status.get(item.id) }">{{ item.todo }}</span>
    <div class="button" @click="emit('remove', item)">
      <i class="button" :class="`pi pi-trash`" style="font-size: 1.8rem"></i>
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
  background: var(--bg-list-item);

  &:active {
    cursor: grabbing;
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

.custom-checkbox::before {
  content: "";
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 30%;
  border: 2px solid var(--primary);
  background: white;
  transition: background 0.2s;
}

.custom-checkbox input:checked + ::before {
  background: var(--primary);
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
  height: 1.8rem;
  color: var(--primary);

  &:hover{
    color: var(--primary-dark)
  }
}
</style>
