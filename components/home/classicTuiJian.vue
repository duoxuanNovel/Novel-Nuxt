<script setup lang="ts">
//经典推荐
import {ClassicTuiJian} from "~/types/home";

const { data: classicTuiJian } = await useLazyAsyncData('classicTuiJian', () => $fetch('/api/home/classicTuijian', {
  method: 'POST',
  body: {
    page: 1,
    size: 15,
  }
})) as any as {data:ClassicTuiJian[]}
</script>
<template>
  <div class="block">
    <h2>小说推荐</h2>
    <HomeLiThreeInfo :data="classicTuiJian" />
  </div>
</template>