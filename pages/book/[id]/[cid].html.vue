<script setup lang="ts">
import {BookInfo, ChapterLast, HotTuiJian} from "~/types/book";
import {useUserStore} from "~/store/user";
import {useBgThemeStore} from "~/store/read";
import { useInfoChaptersStore} from "~/store/chapterList";

const runtimeConfig = useRuntimeConfig() //运行时配置
const {SITE_NAME} = runtimeConfig.public
const router = useRouter() //路由跳转
const route = useRoute() //路由参数
const id = Number(route.params.id) //页面Id
const cid = Number(route.params.cid) //页面Id
const userStore = useUserStore()
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

//章节内容
const {data: chapterContext} = await useLazyAsyncData('chapterContext', () => $fetch('/api/book/chapter/contextData', {
  method: 'POST',
  body: {
    id: id,
    cid: cid,
  }
}),{
  default: () => "文本内容加载中..." as string,
}) as any as { data: string }


// 查找当前章节的索引
const currentChapterIndex = chapterList.value.findIndex((item: ChapterLast) => item.chapterid === cid)
// 当前章节
const currentChapter: ChapterLast = chapterList.value[currentChapterIndex]
// 上一章
const prevChapter: ChapterLast = currentChapterIndex > 0 ? chapterList.value[currentChapterIndex - 1] : undefined as any
// 下一章
const nextChapter: ChapterLast = currentChapterIndex < chapterList.value.length - 1 ? chapterList.value[currentChapterIndex + 1] : undefined as any
// 上一章的url
const prevChapterUrl = prevChapter ? `/book/${id}/${prevChapter.chapterid}.html` : `/book/${id}/`
// 下一章的url
const nextChapterUrl = nextChapter ? `/book/${id}/${nextChapter.chapterid}.html` : `/book/${id}/`

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
    const {data: bookCaseData} = await useFetch('/api/user/addBookCase', {
      method: 'POST',
      body: {
        articleid: id,
        articlename: infoData.value?.articlename,
        userid: userStore.getUid,
        username: userStore.getUname,
        chapterid: currentChapter?.chapterid,
        chaptername: currentChapter?.chaptername,
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

const bgThemeStore =  useBgThemeStore() || { darkMode: 'no' };

// 使用ref来创建一个响应式的引用
let reactiveSelectedFontSize = ref(bgThemeStore.selectedFontSize);

// 按钮的数组，可以根据需要添加更多的按钮
const buttons: { name: 'big' | 'middle' | 'small', label: string }[] = [
  { name: 'big', label: '大' },
  { name: 'middle', label: '中' },
  { name: 'small', label: '小' },
];


const setFontSize = (size: 'big' | 'middle' | 'small') => {
  bgThemeStore.setSelectedFontSize(size);
  reactiveSelectedFontSize.value = size;
};

const toggleDarkMode = () => {
  bgThemeStore.setDarkMode(bgThemeStore.darkMode === 'yes' ? 'no' : 'yes')
  bgThemeStore.changeDarkMode()
}

const setEyeProtectionMode = () => {
  bgThemeStore.setDarkMode(bgThemeStore.darkMode === 'huyan' ? 'no' : 'huyan')
  bgThemeStore.changeDarkMode()
}

//注册一个异步函数，在组件实例在服务器上被渲染之前调用。
onServerPrefetch( async() =>{
  await infoChaptersStore.fetchData(id)
  if (infoData.value.articleid === 0) {
    error.value = createError({ statusCode: 404, statusMessage: 'Page Not Found', message: '书籍未找到,或接口错误。' });
  }else if (currentChapterIndex === -1 ) {
    error.value = createError({ statusCode: 404, statusMessage: 'Page Not Found', message: '当前章节未找到,或当前章节不存在。' })
  }
})

onMounted(async () => {
  bgThemeStore.setSelectedFontSize(bgThemeStore.selectedFontSize)
  bgThemeStore.changeDarkMode()
})

onBeforeUnmount(() => {
  bgThemeStore.clearDocumentStyle()
})

onErrorCaptured(e => {
  error.value = e
})

useHead({
  title: `${currentChapter?.chaptername}_${infoData.value?.articlename}_${SITE_NAME}`,
  meta: [
    {
      name: 'keywords',
      content: `${currentChapter?.chaptername},${infoData.value?.articlename}${currentChapter?.chaptername}`
    },
    {
      name: 'description',
      content: `${SITE_NAME}提供了${infoData.value?.author}创作的${getBookShortType(infoData.value?.sortid)}小说《${infoData.value?.articlename}》干净清爽无错字的文字章节：${currentChapter?.chaptername}在线阅读。`
    },
  ],
})
</script>

<template>
  <div id="tophead" class="header">
    <div class="case">
      <NuxtLink to="/">首页</NuxtLink>
    </div>
    <div class="return">
      <NuxtLink to="javascript:;" @click="router.back()">返回</NuxtLink>
    </div>
    <h2>{{ infoData?.articlename }}</h2>
  </div>
  <div class="nr_set">
    <!--div class="set1">报错</div-->
    <ElButton class="set1" @click="toggleDarkMode">{{bgThemeStore?.darkMode === 'yes' ? "开灯" : "关灯"}}</ElButton>
    <ElButton class="set1" @click="setEyeProtectionMode">护眼</ElButton>
    <div class="set2">
      <ElButton
          v-for="button in buttons"
          :key="button.name"
          :class="button.name === reactiveSelectedFontSize ? 'selected' : ''"
          @click="setFontSize(button.name)" >
        {{ button.label }}
      </ElButton>
    </div>
  </div>
  <div class="nr_title" id="nr_title" v-html="currentChapter?.chaptername"></div>
  <div class="nr_page">
    <table cellpadding="0" cellspacing="0">
      <tbody>
      <tr>
        <td class="prev">
          <NuxtLink id="pt_prev" :to="prevChapterUrl">上章</NuxtLink>
        </td>
        <td class="mulu">
          <NuxtLink id="pt_mulu" :to="`/book/${id}/`">目录</NuxtLink>
        </td>
        <td class="next">
          <NuxtLink id="pt_next" :to="nextChapterUrl">下章</NuxtLink>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <div id="nr" class="nr_nr">
    <div id="nr1">
      <div v-html="chapterContext"></div>
      <div class="bookmark">
        <NuxtLink to="javascript:;" @click="addBookCase" class="book-mark">&#43;&nbsp;加入书签&nbsp;&#43;</NuxtLink>
      </div>
    </div>
  </div>

  <div class="nr_page">
    <table cellpadding="0" cellspacing="0">
      <tbody>
      <tr>
        <td class="prev">
          <NuxtLink id="pb_prev" :to="prevChapterUrl">上章</NuxtLink>
        </td>
        <td class="mulu">
          <NuxtLink id="pb_mulu" :to="`/book/${id}/`">目录</NuxtLink>
        </td>
        <td class="next">
          <NuxtLink id="pb_next" :to="nextChapterUrl">下章</NuxtLink>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <div class="hot">
    <dl>
      <dt>本站推荐</dt>
      <LazyBookDdList :list="bookHotTuiJian"/>
    </dl>
  </div>

  <div class="neighbor">
    <dl>
      <dt>相关推荐</dt>
      <LazyBookDdList :list="xiangGuangTuiJian"/>
    </dl>
  </div>

  <LazyCommonFooter/>
</template>

<style scoped>
.selected {
  background-color: #409eff; /* Or any color you prefer */
  color: cornsilk;
}
</style>