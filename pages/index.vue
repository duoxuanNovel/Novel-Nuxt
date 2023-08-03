<script setup lang="ts">
import {ClassicTuiJian, HotTuiJian, LinkData} from "~/types/home";
const runtimeConfig = useRuntimeConfig() //运行时配置
const {SITE_NAME,NO_HTTP_URL} = runtimeConfig.public

const { data: hotTuiJian } = await useLazyAsyncData<HotTuiJian[]>('hotTuiJian', () => $fetch('/api/home/hotTuijian', {
  method: 'POST',
  body: {
    ids: ["1", "2", "3", "4", "5"],
  }
})) as any as { data: HotTuiJian[] };

const { data: classicTuiJian } =await useLazyAsyncData<ClassicTuiJian[]>('classicTuiJian', () => $fetch('/api/home/classicTuijian', {
  method: 'POST',
  body: {
    page: 1,
    size: 15,
  }
})) as any as { data: ClassicTuiJian[] };

const { data: postUpData } =await useLazyAsyncData<ClassicTuiJian[]>('postUpData', () => $fetch('/api/home/updateList', {
  method: 'POST',
  body: {
    order: 2,
    page: 1,
    size: 15,
  }
})) as any as { data: ClassicTuiJian[] };

const { data: lastUpDate } = await useLazyAsyncData<ClassicTuiJian[]>('lastUpDate', () => $fetch('/api/home/updateList', {
  method: 'POST',
  body: {
    order: 1,
    page: 1,
    size: 15,
  }
})) as any as { data: ClassicTuiJian[] };


useHead({
  title: `${SITE_NAME}_书友们的无尽精彩网络小说收藏天地`,
  meta:[
    {
      name: 'keywords',
      content: `${SITE_NAME},小说网,${NO_HTTP_URL},${SITE_NAME}小说站`
    },
    {
      name: 'description',
      content: `${SITE_NAME}是一个汇聚书友们无尽精彩网络小说的收藏天地。这个网站提供广泛的网络小说资源，涵盖各种题材和类型，满足不同读者的阅读需求。无论是言情小说、玄幻仙侠、都市生活、历史架空、科幻未来、游戏竞技等等，${SITE_NAME}都能为书友们提供丰富多彩的选择。`
    },
  ],
})
</script>

<template>
  <CommonHeader />
  <div class="nav">
    <ul>
      <li>
        <NuxtLink to="/">首页</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/sort/">分类</NuxtLink>
      </li>
      <li>
        <NuxtLink href="/quanben/">完本</NuxtLink>
      </li>
      <li>
        <NuxtLink href="/top/">排行</NuxtLink>
      </li>
    </ul>
  </div>
  <CommonSearch />
  <div class="wrap" >
    <div class="block">
    <h2>热门推荐</h2>
    <div class="slide">
      <div class="slide-con4">
        <div class="slide-item">

          <div class="hot_sale"
               v-for="book in hotTuiJian"
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
        </div>
      </div>
    </div>

    <div class="block">
      <h2>小说推荐</h2>
      <LazyHomeLiThreeInfo :data="classicTuiJian" />
    </div>

    <div class="block">
      <h2>最新入库小说</h2>
      <LazyHomeLiThreeInfo :data="postUpData" />
    </div>
    <div class="block">
      <h2>最新更新小说</h2>
      <LazyHomeLiThreeInfo :data="lastUpDate" />
    </div>
  </div>


  <LazyHomeLinkData />

  <LazyCommonFooter />
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