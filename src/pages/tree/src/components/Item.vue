<script setup>
import { ref, computed, nextTick } from 'vue'

const props = defineProps({
  model: {
    name: String,
    children: Array,
  }
})

const isOpen = ref(false)
const isFolder = computed(() => props.model.children && props.model.children.length)
const isEditing = ref(false)
const editableRef = ref(null)

function toggle() {
  isOpen.value = !isOpen.value
}

function changeType() {
  if (!isFolder.value) {
    props.model.children = []
    addChild()
    isOpen.value = true
  }
}

function addChild() {
  props.model.children.push({ name: 'Новый узел', parent: props.model.name })
}

function startEditing(event) {
  event.preventDefault()
  isEditing.value = true
  nextTick(() => {
    editableRef.value.focus();
    moveCursorToEnd(editableRef.value);
  })
}

function stopEditing() {
  isEditing.value = false
}

function onRightClick(event) {
  event.preventDefault()
  startEditing(event)
}

function handleKeyDown(event) {
  if (event.key === 'Enter') {
    stopEditing()
  }
}

function moveCursorToEnd(element) {
  const range = document.createRange()
  const selection = window.getSelection()

  range.selectNodeContents(element)
  range.collapse(false)
  selection.removeAllRanges()
  selection.addRange(range)
}
</script>

<template>
  <div class="tree-item">
    <div class="tree-node" @click="toggle" @dblclick="changeType" @contextmenu="onRightClick">
      <i v-if="isFolder" :class="`pi pi-${ isOpen ? 'minus' : 'plus' }`"
         style="font-size: 1.2rem; color: gray"></i>

      <span v-if="!isEditing" class="tree-node title">{{ model.name }}</span>
      <span
        v-else
        ref="editableRef"
        class="tree-node title edit"
        contenteditable
        @blur="stopEditing()"
        @keydown="handleKeyDown()"
        :text-content="model.name"
        spellcheck="false"
      >
        {{ model.name }}
      </span>
    </div>

    <Transition name="folder-transition">
      <div v-show="isOpen" v-if="isFolder" class="children">
        <Item
          class="item"
          v-for="model in model.children"
          :key="model.name"
          :model="model"
        />
        <div class="add" @click="addChild">
          <i class="sidebar-item__icon pi pi-plus" style="font-size: 1.2rem"></i>
          Новый узел
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.tree-item {
  width: fit-content;
  padding-left: 1.6rem;
  margin-bottom: 0.5rem;
}

.tree-node {
  cursor: pointer;
  width: fit-content;
  line-height: 1.5;
  color: var(--color-text);
  display: flex;
  column-gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
}

.title {
  padding: 0.5rem 1rem;
  border-radius: 0.8rem;
  background-color: var(--sidebar-item-bg);
}

.add {
  cursor: pointer;
  padding-left: 1.6rem;
  color: gray;
  margin-top: 4px;
}

.edit {
  outline: none;
  user-select: text;
  -webkit-appearance: none
}

.folder-transition-enter-active, .folder-transition-leave-active {
  transition: max-height 0.5s ease-out, opacity 0.3s ease;
}

.folder-transition-enter, .folder-transition-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
