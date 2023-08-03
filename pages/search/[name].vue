<script setup lang="ts">
import {SerachData} from "~/types/serach";

const router = useRouter()
const route = useRoute()
const runtimeConfig = useRuntimeConfig() //运行时配置
const {SITE_NAME} = runtimeConfig.public
const name = String(route.params.name)

const page = ref(1)
const size = ref(10)

const { data: soBookData } = await useLazyAsyncData<SerachData>('soBookData', () => $fetch('/api/serach/zsData', {
  method: 'POST',
  body: {
    key:name,
    page: page.value,
    size:size.value,
  }
}),{
  watch: [page,size]
}) as any as {data:SerachData}

useHead({
  title: `有关${name}的搜索结果_${SITE_NAME}`,
  meta:[
    {
      name: 'keywords',
      content: `${name},有关${name}的小说,${name}的搜索结果`
    },
    {
      name: 'description',
      content: `${SITE_NAME}提供与${name}的相关小说。${name}的的搜索结果。`
    },
  ],
})
</script>

<template>
  <div class="header">
    <div class="case" >
      <NuxtLink to="/">首页</NuxtLink>
    </div>
    <div class="logo"><h2>{{SITE_NAME}}</h2></div>
  </div>
  <CommonSearch/>
  <div class="cover">
    <el-card class="book-item">
     <template #header>
      <div class="card-header">
        <UtilsHighlightedText :text="`有关${name}的搜索结果,共有${soBookData ? soBookData.total?.value || 0 : 0}本！`" :keyword="name" />
      </div>
    </template>
      <div class="line-container">
          <div class="hot_sale"
               v-for="book in soBookData ? soBookData?.hits : []"
               :key="book._source.id"
          >
            <NuxtLink :to="`/book/${book._source.id}/`">
              <ElImage
                  :src="book._source.cover"
                  :alt="book._source.name"
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
            <p class="titles"><NuxtLink :to="`/book/${book._source.id}/`">{{ book._source.name }}</NuxtLink></p>
            <p class="author">作者：{{ book._source.author }}</p>
            <p class="review">简介： {{ book._source.intro }}</p>
          </div>
      </div>
    </el-card>
    <div class="pagination">
    <el-pagination
        small
        background
        layout="prev, pager, next"
        v-model:currentPage="page"
        v-model:page-size="size"
        :total="soBookData ? soBookData.total?.value || 0 : 0"
        class="mt-4"
    />
    </div>
  </div>
  <CommonFooter/>
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
.cover {
min-height: 320px;
margin: 0 10px;
font-size: 14px;
}

.cover .line {
border-bottom: 1px dashed #ccc;
margin: 0 0 10px 0;
height: 25px;
line-height: 1.6;
overflow: hidden;
}

.gray {
color: gray;
}

.red {
color: red;
}

.blue {
color: #007BB1;
font-size: 16px;
margin-left: 5px;
}

.search_tip {
margin-bottom: 10px;
padding: 0 10px;
}
</style>