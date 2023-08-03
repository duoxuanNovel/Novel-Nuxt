<script setup lang="ts">
import {getBookShortType} from "~/utils/utils";
import {ClassicTuiJian} from "~/types/home";
defineProps({
  data: {
    type: Array as PropType<ClassicTuiJian[]>,
    default: () => []
  }
})
</script>

<template>
  <ul class="lis sort-striped">
    <li
        v-for="book in data"
        :key="book.articleid"
    >
      <span class="s1">[{{ getBookShortType(book.sortid) }}]</span>
      <span class="s2"><NuxtLink :to="`/book/${book.articleid}/`">{{ book.articlename }}</NuxtLink></span>
      <span class="s3">{{ book.author }}</span>
    </li>
  </ul>
</template>

<style scoped>

</style>