<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import { computed, nextTick, onMounted, ref } from 'vue'
import Spinner from '@/pages/todo-list/src/components/Spinner.vue'
import ListItem from '@/pages/todo-list/src/components/ListItem.vue'
import type { ITodo } from '@/pages/todo-list/src/common/intefaces'
import TodoService from '@/pages/todo-list/src/common/services/todo.service.ts'

let id = 0;
const newTodo = ref("");
const hideCompleted = ref(false);
const list = ref<ITodo[]>([]);

const loading = ref(true);
const error = ref<string | null>(null);

const el = ref<HTMLElement | null>(null);

const todoStatus = ref(new Map<number, boolean>());

async function loadTodos() {
  loading.value = true;
  try {
    list.value = await TodoService.getTodos();
    todoStatus.value = new Map(list.value.map(item => [item.id, item.completed]));
  } catch (err) {
    error.value = "Failed to load todos";
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await loadTodos();
  nextTick(() => {
    useSortable(el, list)
  });
});

const filteredTodos = computed(() => {
  return hideCompleted.value
    ? list.value.filter((t) => !todoStatus.value.get(t.id))
    : list.value;
});

function addTodo() {
  const item = { id: id++, todo: newTodo.value };
  list.value.unshift(item);
  todoStatus.value.set(item.id, false);
  newTodo.value = "";
}

function removeTodo(todo: ITodo) {
  list.value = list.value.filter((t) => t !== todo);
  todoStatus.value.delete(todo.id);
}
</script>

<template>
  <div class="list">
    <form @submit.prevent="addTodo">
      <input class="input" v-model="newTodo" required placeholder="Add a new task">
      <button class="primary-button">
        <i :class="`pi pi-plus`" style="color: var(--color-background); font-size: 2rem"></i>
      </button>
    </form>
    <div v-if="loading" class="empty">
      <Spinner />
    </div>
    <div v-else>
      <div ref="el" v-if="filteredTodos.length > 0" class="items">
        <div v-for="todo in filteredTodos" :key="todo.id" class="todo-item">
          <ListItem :item="todo" :status="todoStatus" @remove="removeTodo" />
        </div>
      </div>
      <div v-else class="empty">
        It's empty :(
      </div>
    </div>

    <span class="hide" @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? 'Show all' : 'Hide completed' }}
  </span>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 60rem;
  border-radius: 4rem;
  background: var(--bg-component);
  padding: 4rem;
}

form {
  display: grid;
  grid-template-columns: 1fr 4rem;
  gap: 0.8rem;
}

.input {
  font-size: 1.4rem;
  height: 4rem;
  border-radius: 1.2rem;
  color: var(--color-text);
  background: var(--bg-input);;
  border: 0.1rem solid var(--primary);
  outline: none;
  padding: 2rem;

  &::placeholder {
    color: gray;
  }
}

.items {
  height: 40vh;
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  gap: 1.2rem;
  padding-right: 0.8rem;
  scrollbar-width: thin;
  scrollbar-color: var(--primary) var(--bg-component-item);
}

.empty {
  height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: gray;
}

.primary-button {
  width: 4rem;
  height: 4rem;
  align-items: center;
  border: none;
  border-radius: 1.2rem;
  background: var(--primary);

  &:hover {
    background: var(--primary-dark);
  }
}

.hide {
  font-size: 1.4rem;
  text-align: right;
  color: var(--primary);

  &:hover {
    color: var(--primary-dark);
  }
}
</style>
