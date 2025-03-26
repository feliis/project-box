<script setup>
import { ref } from 'vue'
import TreeItem from '../components/Item.vue'
import { tree } from '@/pages/tree/constants/index.js'

const buildTree = (items) => {
  const tree = []
  const map = new Map()

  items.forEach(item => map.set(item.id, { ...item, children: [] }))

  items.forEach(item => {
    if (item.parentId !== null) {
      map.get(item.parentId)?.children.push(map.get(item.id))
    } else {
      tree.push(map.get(item.id))
    }
  })

  return tree
}

const treeData = ref(buildTree(tree))
</script>

<template>
  <div class="container">
    <TreeItem v-for="item in treeData" :key="item.id" :model="item"></TreeItem>
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
