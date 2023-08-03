<script setup lang="ts">
const runtimeConfig = useRuntimeConfig() //运行时配置
const {SITE_NAME} = runtimeConfig.public
</script>

<template>
  <div class="header">
    <div class="case"><NuxtLink to="/">首页</NuxtLink></div>
    <div class="logo"><h2>{{ SITE_NAME }}</h2></div>
  </div>
</template>

<style scoped>

</style>