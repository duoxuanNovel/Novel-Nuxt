<script setup lang="ts">
import {LinkData} from "~/types/home";

const { data: linkData } =await useLazyAsyncData<LinkData[]>('linkData', () => $fetch('/api/common/link')) as any as { data: LinkData[] };

</script>

<template>
  <div class="link">友链：
    <NuxtLink
        v-for="link in linkData"
        :key="link.id"
        :to="link.url"
    >
      {{ link.name }}
    </NuxtLink>
  </div>
</template>

<style scoped>

</style>