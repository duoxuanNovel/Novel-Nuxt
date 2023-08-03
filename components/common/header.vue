<script setup lang="ts">
import {useUserStore} from "~/store/user";

const runtimeConfig = useRuntimeConfig() //运行时配置
const {SITE_NAME} = runtimeConfig.public
const userStore = useUserStore()

</script>

<template>
  <div class="header">
    <div class="case" v-if="!userStore.getIsLogin">
      <NuxtLink to="/user/register/">注册</NuxtLink>
    </div>
    <div class="case" v-if="!userStore.getIsLogin">
      <NuxtLink to="/user/login/">登陆</NuxtLink>
    </div>
    <div class="case" v-if="userStore.getIsLogin" >
    <NuxtLink to="/user/bookcase/">书架</NuxtLink>
    </div>
<!--    <div class="case">-->
<!--      <NuxtLink to="/history/">历史</NuxtLink>-->
<!--    </div>-->
    <div class="logo"><h2>{{SITE_NAME}}</h2></div>
  </div>
</template>

<style scoped>

</style>