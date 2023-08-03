<script setup lang="ts">
import {SortList} from "~/types/sort";

const route = useRoute()
const router = useRouter()
const name = route.params.name as string

const runtimeConfig = useRuntimeConfig() //运行时配置
const {SITE_NAME} = runtimeConfig.public
//书籍列表
const { data: authorAllData } = await useLazyAsyncData<SortList[]>('authorAllData', () => $fetch(`/api/book/author/listData`,{
  method: 'POST',
  body: {
    name: name,
  }
})) as any as {data:SortList[]}

useHead({
  title: `${name}作品全部列表_${name}作者相关小说在线阅读_${SITE_NAME}`,
  meta:[
    {
      name: 'keywords',
      content: `${name}作者,${name}写的小说`
    },
    {
      name: 'description',
      content: `${name}的作品列表由网友提供，${SITE_NAME}免费提供作者(${name})全部作品集最新清爽干净的文字章节在线阅读。`
    },
  ],
})
</script>

<template>
  <div class="header">
    <div class="case"> <NuxtLink to="/">首页</NuxtLink></div>
    <div class="return"> <NuxtLink to="javascript:;" @click="router.back()">返回</NuxtLink></div>
    <h2>{{ name }}</h2>
  </div>
  <CommonSearch/>
  <div class="cover">
    <el-card class="book-item">
      <template #header>
        <div class="card-header">
          <h2>{{ name }}作品全部列表</h2>
        </div>
      </template>
      <div class="line-container">

        <div class="hot_sale"
             v-for="book in authorAllData"
             :key="book.articleid"
        >
          <NuxtLink :to="`/book/${book.articleid}/`">
            <ElImage
                :src="book.cover"
                :alt="book.articlename"
                fit="cover"
                loading="lazy"
            ><template #placeholder>
              <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"  alt="none"/>
            </template>
              <template #error>
                <img src="/images/nocover.jpg"  alt="error"/>
              </template>
            </ElImage>
          </NuxtLink>
          <p class="titles"><NuxtLink :to="`/book/${book.articleid}/`">{{ book.articlename }}</NuxtLink></p>
          <p class="author">作者：{{ book.author }}</p>
          <p class="review">简介： {{ book.intro }}</p>
        </div>
      </div>
    </el-card>
  </div>
  <LazyCommonFooter/>
</template>

<style scoped>
.el-image {
  /* 重写默认样式，将所有需要修改的属性设置为你想要的值 */
  position: static;
  display: block; /* 或者其他你希望的 display 值，如果需要 */
  overflow: visible; /* 或者其他你希望的 overflow 值，如果需要 */
  /* 添加其他样式属性 */
}
</style>