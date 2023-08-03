<script setup lang="ts">
import {useUserStore} from "~/store/user";
import {BookCaseData} from "~/types/user";

const runtimeConfig = useRuntimeConfig() //运行时配置

const router = useRouter() //路由跳转

const userStore = useUserStore()

const {SITE_NAME} = runtimeConfig.public
const {user} = userStore;

const { data: bookCaseData } = await useAsyncData('bookCaseData', () => $fetch('/api/user/queryBookCase', {
  method: 'POST',
  body: {
    uid: user.uid,
  }
})) as any as {data:BookCaseData[]}

const deleteBook = async (caseid: number) => {
  //删除书架
  const { data: delBookCaseData } = await useAsyncData('delBookCaseData', () => $fetch('/api/user/delBookCase', {
    method: 'POST',
    body: {
      caseId: caseid,
    }
  }))
  if (delBookCaseData.value.code === 200) {
    ElMessage({
      showClose: true,
      message: delBookCaseData.value.message,
      type: 'success',
    })
    //延迟刷新页面
    setTimeout(() => {
      router.go(0)
    }, 1000)
  }else{
    ElMessage({
      showClose: true,
      message: delBookCaseData.value.message,
      type: 'error',
    })
  }
}
const logout = async () => {
  //退出登录
  await userStore.logout()
  //跳转到首页
  await router.push('/')
}

//中间件 没登录就跳转到login
definePageMeta({
  middleware: 'bookcase',
})

useHead({
  title: `我的书架_${SITE_NAME}`,
  meta: [
    {
      name: 'keywords',
      content: `我的书架,${SITE_NAME},${SITE_NAME}书架`
    },
    {
      name: 'description',
      content: `${SITE_NAME}提供我的书架功能，有个人中心，书架，书签等功能。`
    }
  ],
})
</script>

<template>
  <div class="header">
    <div class="case"><NuxtLink @click="logout" to="javascript:;">退出</NuxtLink></div>
    <div class="case"><NuxtLink to="/">首页</NuxtLink></div>
    <div class="logo"><h2>{{ SITE_NAME }}</h2></div>
  </div>
  <CommonSearch />
  <div class="wrap" >
    <div class="block">
      <h2>你好，{{user.uname}}！</h2>
      <div class="slide">
        <div class="slide-con4">
          <div class="slide-item">

            <div class="user-bookcase">

              <div v-if="bookCaseData.length == 0" class="noBook">暂无书籍</div>

              <dl v-for="book in bookCaseData"
                  :key="book.articleid"
              >
                <dt>
                  <NuxtLink :to="`/book/${book.articleid}/`" class="bookcase_title">{{ book.articlename }}</NuxtLink>
                  <NuxtLink href="javascript:;" @click="deleteBook(book.caseid)" class="fa-trash-alt" >移出</NuxtLink>
                </dt>
                <dd>
                  <p>
                    最新：
                    <NuxtLink :to="`/book/${book.articleid}/${book.lastchapterid}.html`" :title="book.lastchapter">
                    {{book.lastchapter }}</NuxtLink>
                  </p>
                  <p v-if="book.chapterid != 0">
                    书签：
                    <NuxtLink :to="`/book/${book.articleid}/${book.chapterid}.html`">{{ book.chaptername }}</NuxtLink>
                  </p>
                </dd>
              </dl>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-bookcase { min-height: 320px; }
.user-bookcase dl {border-bottom: 1px dashed #c7e4f3; padding: 10px;margin: 0}
.user-bookcase dl:nth-child(even) {background: #edfaff;}
.user-bookcase dt { display: flex;}
.user-bookcase dt .bookcase_title {flex: 1}
.user-bookcase dt .fa-trash-alt { font-size: 14px; color: red;}
.user-bookcase dd { font-size: 14px; }
.user-bookcase dd p{ margin: 5px 0; color: #666; }
.user-bookcase dd a {word-wrap: normal;text-overflow: ellipsis;white-space: nowrap; color: #333;}
.noBook{
  text-align: center;
  padding: 20px;
  font-size: 16px;
  color: #666;
}
</style>