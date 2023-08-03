<script setup lang="ts">
import {BookInfo, ChapterLast, HotTuiJian} from "~/types/book";
import {useUserStore} from "~/store/user";
import {useInfoChaptersStore} from "~/store/chapterList";

const runtimeConfig = useRuntimeConfig() //运行时配置
const {SITE_NAME} = runtimeConfig.public
const router = useRouter() //路由跳转
const route = useRoute() //路由参数
const id = Number(route.params.id) //页面Id
const error = useError()
const userStore = useUserStore()

const infoChaptersStore = useInfoChaptersStore();
await infoChaptersStore.fetchData(id)
//书籍信息
const infoData =  computed<BookInfo>(() =>(infoChaptersStore.infoDataLists[id]));
//章节列表
const chapterList = computed<ChapterLast[]>(() => infoChaptersStore.chapterLists[id]);
//取得章节列表最后15章 为最新章节
const lastChapterList = computed<ChapterLast[]>(() => chapterList.value.slice(-15).reverse());
//相关推荐
const xiangGuangTuiJian = computed<HotTuiJian[]>(() => infoChaptersStore.xiangGuangLists[id]);
//热门推荐
const bookHotTuiJian = computed<HotTuiJian[]>(() => infoChaptersStore.hotTuiJianLists);

const addBookCase = async () => {
  //判断是否登录
  if (!userStore.getIsLogin) {
    ElMessage({
      showClose: true,
      message: "请登录后再加入书架！",
      type: 'warning',
      center: true,
    })
  } else {
    //加入书架
    const {data:bookCaseData} = await useFetch('/api/user/addBookCase', {
      method: 'POST',
      body: {
        articleid: id,
        articlename: infoData.value?.articlename,
        userid: userStore.getUid,
        username:userStore.getUname,
        chapterid: 0,
        chaptername: '',
      },
    })
      ElMessage({
        showClose: true,
        message: bookCaseData.value.message,
        type: 'success',
        center: true,
      })
  }
}
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
  title: `${infoData.value?.articlename}_${infoData.value?.articlename}最新章节免费阅读_${infoData.value?.author}_${SITE_NAME}`,
  meta:[
    {
      name: 'keywords',
      content: `${infoData.value?.articlename},${infoData.value?.articlename}最新章节,${infoData.value?.articlename}${SITE_NAME}`,
    },
    {
      name: 'description',
      content: `${infoData.value?.articlename}无弹窗最新章节由网友提供，《${infoData.value?.articlename}》情节跌宕起伏、扣人心弦，是一本情节与文笔俱佳的${getBookShortType(infoData.value?.sortid)}小说，${SITE_NAME}免费提供${infoData.value?.articlename}最新清爽干净的文字章节在线阅读。`
    },
    {
      property: 'og:title',
      content: `${infoData.value?.articlename}`,
    },
    {
      property: 'og:description',
      //去空格
      content: `${infoData.value?.intro.replace(/\s*/g,"")}`,
    },
    {
      property: 'og:url',
      content: `/book/${id}/`,
    },
    {
      property: 'og:type',
      content: 'novel',
    },
    {
      property: 'og:image',
      content: `${infoData.value?.cover}`,
    },{
      property: 'og:novel:category',
      content: `${getBookType(infoData.value?.sortid)}`,
    },{
      property: 'og:novel:author',
      content: `${infoData.value?.author}`,
    },{
      property: 'og:novel:book_name',
      content: `${infoData.value?.articlename}`,
    },{
      property: 'og:novel:read_url',
      content: `/all/${id}/`,
    },{
      property: 'og:novel:status',
      content: `${getBookFinish(infoData.value?.fullflag)}`,
    },{
      property: 'og:novel:author_link',
      content: `/author/${infoData.value?.author}/`,
    },{
      property: 'og:novel:update_time',
      content: `${timestampToTime(infoData.value?.lastupdate)}`,
    },{
      property: 'og:novel:latest_chapter_url',
      content: `/book/${id}/${infoData.value?.lastchapterid}.html`,
    },{
      property: 'og:novel:latest_chapter_name',
      content: `${infoData.value?.lastchapter}`,
    }
  ],
})

</script>

<template>
  <div class="header">
    <div class="case">
      <NuxtLink to="/">首页</NuxtLink>
    </div>
    <div class="return">
      <NuxtLink to="javascript:;" @click="router.back()">返回</NuxtLink>
    </div>
    <h2>{{ SITE_NAME }}</h2>
  </div>

  <CommonSearch />
  <div class="book_info">
    <div class="book_box">
      <div class="fm">
        <ElImage
            :src="infoData?.cover as string"
            :alt="infoData?.articlename"
            fit="cover"
            loading="lazy"
        ><template #placeholder>
          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"  alt="none"/>
        </template>
          <template #error>
              <img src="/images/nocover.jpg"  alt="error"/>
          </template>
        </ElImage>
      </div>
      <div class="xx">
        <dl>
          <dt>{{ infoData?.articlename }}</dt>
          <dd>分类：{{ getBookType(infoData?.sortid) }}</dd>
          <dd>作者：<NuxtLink :to="`/author/${infoData?.author}/`">{{ infoData?.author }}</NuxtLink></dd>
          <dd>状态：{{ getBookFinish(infoData?.fullflag) }}</dd>
          <dd>更新：{{timestampToTime(infoData?.lastupdate)}}</dd>
        </dl>
      </div>
    </div>
    <div class="book_box">
      <p class="intro">{{ infoData?.intro }}</p>
    </div>
  </div>
  <div class="readlink">
    <NuxtLink to="javascript:;" @click="addBookCase" class="rl book-shelf">加入书架</NuxtLink>
    <NuxtLink :to="`/all/${id}/`">开始阅读</NuxtLink>
  </div>

  <div class="book_last">
    <dl class="list-striped">
      <dt>{{ infoData?.articlename }}最新章节</dt>
      <dd v-for="chapter in lastChapterList"
          :key="chapter.chapterid"
      >
        <NuxtLink :to="`/book/${id}/${chapter.chapterid}.html`">{{ chapter.chaptername }}</NuxtLink>
      </dd>
   </dl>
  </div>
  <div class="book_more">
    <NuxtLink :to="`/all/${id}/`" :title="`查看《${infoData?.articlename}》全部章节列表`">&gt;&gt;&nbsp;查看全部章节列表&nbsp;&lt;&lt;</NuxtLink>
  </div>
  <div style="text-align:center; font-size:12px; color:#666; margin: 15px 0;">注：为节省您的流量其他章节已被折叠</div>

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
.el-image {
  /* 重写默认样式，将所有需要修改的属性设置为你想要的值 */
  position: static;
  display: block; /* 或者其他你希望的 display 值，如果需要 */
  overflow: visible; /* 或者其他你希望的 overflow 值，如果需要 */
  /* 添加其他样式属性 */
}
</style>