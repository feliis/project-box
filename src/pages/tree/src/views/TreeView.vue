<script setup>
import { ref } from 'vue'
import TreeItem from '../components/Item.vue'

const flatTree = ref([
  { name: 'dolor sit', parent: null },
  { name: 'amet consectetur', parent: null },
  { name: 'adipiscing elit', parent: 'dolor sit' },
  { name: 'lorem ipsum', parent: 'amet consectetur' },
  { name: 'sed do', parent: 'adipiscing elit' },
  { name: 'eiusmod tempor', parent: 'adipiscing elit' },
  { name: 'incididunt ut', parent: 'amet consectetur' },
  { name: 'labore et dolore', parent: 'amet consectetur' },
  { name: 'magna aliqua', parent: 'amet consectetur' },
  { name: 'ut enim', parent: 'magna aliqua' },
  { name: 'ad minim veniam', parent: 'magna aliqua' }
])

const buildTree = (items) => {
  const tree = []
  const map = new Map()

  items.forEach(item => map.set(item.name, { ...item, children: [] }))

  items.forEach(item => {
    if (item.parent) {
      map.get(item.parent)?.children.push(map.get(item.name))
    } else {
      tree.push(map.get(item.name))
    }
  })

  return tree
}

const treeData = ref(buildTree(flatTree.value))
</script>

<template>
  <div class="container">
    <TreeItem v-for="item in treeData" :key="item.name" :model="item"></TreeItem>
  </div>
</template>

<style scoped>
.container{
  background: var(--bg-component);
  border-radius: 4rem;
  padding: 2rem;
  overflow: hidden;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: thin;
}
</style>
