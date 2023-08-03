<script setup lang="ts">
import {SortListData} from "~/types/sort";

const router = useRouter()
const runtimeConfig = useRuntimeConfig() //运行时配置
const {SITE_NAME} = runtimeConfig.public
const page = ref(1)
const size = ref(10)
//书籍列表
const { data: quanBookSortList } = await useLazyAsyncData<SortListData>('quanBookSortList', () => $fetch(`/api/book/sort/listData`,{
  method: 'POST',
  body: {
    sortId: 0,
    status: 1,
    page: page.value,
    size:size.value,
  }
}),{
  watch: [page,size]
}) as any as {data:SortListData};

useHead({
  title: `全本小说列表_完结小说书库_${SITE_NAME}`,
  meta:[
    {
      name: 'keywords',
      content: `全本小说列表,完结小说,完本小说`
    },
    {
      name: 'description',
      content: `${SITE_NAME}提供最新的完结小说列表。`
    },
  ]
})
</script>

<template>
  <div class="header">
    <div class="case"><NuxtLink to="/">首页</NuxtLink></div>
    <div class="return">
      <NuxtLink to="javascript:;" @click="router.back()">返回</NuxtLink>
    </div>
    <h2>完本小说</h2>
  </div>

  <CommonSearch />
 <div class="wrap" >
      <div class="block">
        <h2>完本小说</h2>
        <div class="slide">
          <div class="slide-con4">
            <div class="slide-item">

              <div class="hot_sale"
                   v-for="book in quanBookSortList?.list"
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
    </div>

    <div class="pagination">
      <el-pagination
          small
          background
          layout="prev, pager, next"
          v-model:currentPage="page"
          v-model:page-size="size"
          :total="quanBookSortList ? quanBookSortList?.count || 0 : 0"
          class="mt-4"
      />
    </div>

  <CommonFooter />
</template>

<style scoped>
.el-image {
  /* 重写默认样式，将所有需要修改的属性设置为你想要的值 */
  position: static;
  display: block; /* 或者其他你希望的 display 值，如果需要 */
  overflow: visible; /* 或者其他你希望的 overflow 值，如果需要 */
  /* 添加其他样式属性 */
}
.pagination{
  display: flex;
  justify-content: center;
  margin: 15px;
}
</style>