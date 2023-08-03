<script setup lang="ts">
const runtimeConfig = useRuntimeConfig() //运行时配置
const {SITE_NAME,NO_HTTP_URL,SITE_URL} = runtimeConfig.public
</script>

<template>
  <div class="footer">
    <p class="version channel">
      <span>所有小说由蜘蛛程序自动抓取自网络公开资源，本站严格准守国家法律法规，拒绝任何色情、政治小说，一经发现，即作删除。</span>
      <br>
      Copyright
      © 2023 <span>{{ SITE_NAME }}</span>
      <NuxtLink :to="SITE_URL">{{ NO_HTTP_URL }}</NuxtLink>
    </p>
    <el-backtop :right="30" :bottom="50" />
  </div>
</template>

<style scoped>

</style>