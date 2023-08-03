<script setup lang="ts">
import {SortData, SortList, SortListData} from "~/types/sort";
import {getBookType} from "~/utils/utils";
import {HotTuiJian} from "~/types/book";

const router = useRouter()
const runtimeConfig = useRuntimeConfig() //运行时配置
const {SITE_NAME} = runtimeConfig.public
//分类列表
const { data: sortArr } = await useLazyAsyncData<SortData[]>('sortArr', () => $fetch('/api/sort/sort')) as any as {data:SortData[]}

const activeSortId = ref(1)
const page = ref(1)
const size = ref(10)

//书籍列表
const { data: bookSortList } = await useLazyAsyncData<SortListData>('bookSortList', () => $fetch(`/api/book/sort/listData`,{
  method: 'POST',
  body: {
    sortId: activeSortId.value,
    status: 2,
    page: page.value,
    size:size.value,
  }
}),{
  watch: [activeSortId,page,size]
}) as any as {data:SortListData}

useHead({
  title: `小说列表_小说书库_${SITE_NAME}`,
  meta:[
    {
      name: 'keywords',
      content: `小说书库,小说列表`
    },
    {
      name: 'description',
      content: `${SITE_NAME}提供最新的小说书库,包含广泛的网络小说资源，涵盖各种题材和类型，满足不同读者的阅读需求。无论是言情小说、玄幻仙侠、都市生活、历史架空、科幻未来、游戏竞技等等。`
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
    <h2>{{ getBookType(activeSortId) }}</h2>
  </div>

  <CommonSearch />
  <el-tabs type="border-card"
           v-model="activeSortId"
  >
  <el-tab-pane v-for="sort in sortArr"
               :key="sort.id"
               :label="sort.name"
               :name="sort.id"
  ><div class="wrap" >
    <div class="block">
      <h2>{{ getBookType(activeSortId) }}</h2>
      <div class="slide">
        <div class="slide-con4">
          <div class="slide-item">

            <div class="hot_sale"
                 v-for="book in bookSortList?.list"
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

  </el-tab-pane>
    <div class="pagination">
      <el-pagination
          small
          background
          layout="prev, pager, next"
          v-model:currentPage="page"
          v-model:page-size="size"
          :total="bookSortList ? bookSortList?.count || 0 : 0"
          class="mt-4"
      />
    </div>
  </el-tabs>

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
}
</style>