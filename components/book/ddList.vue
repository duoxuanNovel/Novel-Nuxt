<script setup lang="ts">
import {HotTuiJian} from "~/types/book";
defineProps({
  list: {
    type: Array as PropType<HotTuiJian[]>,
    default: () => [],
  },
})
</script>

<template>
  <dd>
    <NuxtLink v-for="book in list"
              :key="book.articleid"
              :to="`/book/${book.articleid}/`
        ">
      {{ book.articlename }}
    </NuxtLink>
  </dd>
</template>

<style scoped>

</style>