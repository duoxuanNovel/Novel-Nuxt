<script setup lang="ts">
import {useInfoChaptersStore} from "~/store/chapterList";
import {BookInfo, ChapterLast, HotTuiJian} from "~/types/book";
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// @ts-ignore
import { RecycleScroller } from 'vue-virtual-scroller'

const runtimeConfig = useRuntimeConfig() //运行时配置
const {SITE_NAME} = runtimeConfig.public
const router = useRouter() //路由跳转
const route = useRoute() //路由参数
const id = Number(route.params.id) //页面Id
const error = useError()

const infoChaptersStore = useInfoChaptersStore();
await infoChaptersStore.fetchData(id)
//书籍信息
const infoData = computed<BookInfo>(() => infoChaptersStore.infoDataLists[id]);
//章节列表
const chapterList = computed<ChapterLast[]>(() => infoChaptersStore.chapterLists[id]);

//相关推荐
const xiangGuangTuiJian = computed<HotTuiJian[]>(() => infoChaptersStore.xiangGuangLists[id]);
//热门推荐
const bookHotTuiJian = computed<HotTuiJian[]>(() => infoChaptersStore.hotTuiJianLists);

//注册一个异步函数，在组件实例在服务器上被渲染之前调用。
onServerPrefetch( async() =>{
  await infoChaptersStore.fetchData(id)
  if (infoData.value.articleid === 0) {
    error.value = createError({ statusCode: 404, statusMessage: 'Page Not Found', message: '书籍未找到,或接口错误。' });
  }
})

//检测到页面上有错误就404
onErrorCaptured(e => {
  //检测到页面上有错误就404
  error.value = e
})

useHead({
  title: `${infoData.value?.articlename}全部章节列表_${infoData.value?.articlename}在线阅读_${SITE_NAME}`,
  meta:[
    {
      name: 'keywords',
      content: `${infoData.value?.articlename}全部章节,${infoData.value?.articlename}章节列表,${infoData.value?.articlename}最新章节`
    },
    {
      name: 'description',
      content: `${infoData.value?.articlename}章节列表由网友提供，《${infoData.value?.articlename}》情节跌宕起伏、扣人心弦，是一本情节与文笔俱佳的${getBookShortType(infoData.value?.sortid)}小说，${SITE_NAME}免费提供${infoData.value?.articlename}最新清爽干净的文字章节在线阅读。`
    },
  ],
})
</script>

<template>
  <div class="header">
    <div class="case"> <NuxtLink to="/">首页</NuxtLink></div>
    <div class="return"> <NuxtLink to="javascript:;" @click="router.back()">返回</NuxtLink></div>
    <h2>{{ infoData?.articlename }}</h2>
  </div>

  <div class="book_last">
    <NuxtLink to="#foot" id="head">↓ 直达底部 ↓</NuxtLink>
    <dl class="list-striped">
      <ClientOnly>
      <RecycleScroller
          :items="chapterList"
          :item-size="40"
          :prerender="20"
          :buffer="200"
          key-field="chapterid"
          v-slot="{ item }"
          page-mode
      >
          <dd>
            <NuxtLink :to="`/book/${id}/${item.chapterid}.html`">{{ item.chaptername }}</NuxtLink>
          </dd>
      </RecycleScroller>
      </ClientOnly>
    </dl>
    <NuxtLink to="#head" id="foot">↑ 直达顶部 ↑</NuxtLink>
  </div>

  <div class="hot">
    <dl>
      <dt>本站推荐</dt>
      <LazyBookDdList :list="bookHotTuiJian" />
    </dl>
  </div>

  <div class="neighbor">
    <dl>
      <dt>相关推荐</dt>
      <LazyBookDdList :list="xiangGuangTuiJian" />
    </dl>
  </div>

  <LazyCommonFooter />
</template>

<style scoped>

</style>