<script setup lang="ts">
import Item from '@/pages/masonry/src/components/Item.vue'
</script>

<template>
  <div class="wrapper">
    <div class="container">
      <div class="masonry">
        <Item class="items" v-for="i in 100" :numbering="i" :key="i"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  height: 100%;
  overflow: hidden;
}

.container {
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.container::-webkit-scrollbar {
  display: none;
}

.masonry {
  column-gap: 2rem;
}

@media screen and (max-width: 600px) {
  .masonry {
    column-count: 1;
  }
}

@media screen and (max-width: 768px) {
  .masonry {
    column-count: 2;
  }
}
@media screen and (min-width: 769px) {
  .masonry {
    column-count: 4;
  }
}
@media screen and (min-width: 1080px) {
  .masonry {
    column-count: 5;
  }
}
@media screen and (min-width: 1200px) {
  .masonry {
    column-count: 6;
  }
}
</style>
