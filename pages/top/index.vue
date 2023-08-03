<script setup lang="ts">
import {ClassicTuiJian} from "~/types/home";

const router = useRouter() //路由跳转
const route = useRoute() //路由参数
const runtimeConfig = useRuntimeConfig() //运行时配置
const {SITE_NAME} = runtimeConfig.public

const { data: rankUpData } = await useLazyAsyncData<ClassicTuiJian[]>('postUpData', () => $fetch('/api/home/updateList', {
  method: 'POST',
  body: {
    order:3,
    page: 1,
    size: 50,
  }
})) as any as {data:ClassicTuiJian[]}

useHead({
  title: `小说排行榜_精品小说排行_${SITE_NAME}`,
  meta:[
    {
      name: 'keywords',
      content: `小说排行榜,小说排行`
    },
    {
      name: 'description',
      content: `${SITE_NAME}提供本站前50的优秀书籍,根据用户的喜好来排名的精品书籍。`
    }
  ],
})
</script>

<template>
  <div class="header">
    <div class="case"><NuxtLink to="/">首页</NuxtLink></div>
    <div class="return"><NuxtLink to="javascript:;" @click="router.back()">返回</NuxtLink></div>
    <h2>排行榜</h2>
  </div>
  <div class="container">
    <div class="row row-rank">
      <div class="layout layout-col1">
        <div class="layout-tit">
          <strong>热门排行(50本)</strong>
        </div>
        <div class="tab-bd">
          <ul class="txt-list txt-list-row3">
            <li
                v-for="(book,index) in rankUpData"
                :key="book.articleid"
            >
              <span class="s1">{{index+1}}</span>
              <span class="s2"><NuxtLink :to="`/book/${book.articleid}/`">{{ book.articlename }}</NuxtLink></span>
              <span class="s5">{{ book.author }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
 <CommonFooter />
</template>

<style scoped>
.container {
  position: relative;
  margin-right: auto;
  margin-left: auto;
}

.row {
  position: relative;
  margin: 10px auto 20px;
  padding: 0;
}

.container:before,
.container:after,
.row:before,
.row:after,


.none {
  display: none;
}

ul,
ol {
  list-style: none;
}

a:focus,
a:hover,
a:active {
  text-decoration: none;
}

.container {
  width: 1024px;
}

.layout,
.layout2 {
  background: #FEF9EF;
  border: 3px solid #C3DFEA;
  overflow: hidden;
  width: 100%;
  padding: 0 0 0px;
}

.layout2 {
  border: 3px solid #88C6E5;
  background: #E1ECED;
}

.row .layout-col1 {
  width: 29%;
}

.row .layout-col2 {
  width: 70%;
}

.row .layout-col3 {
  width: 100%;
}

.footer{
  border-top: 0 solid #DDDDDD;
  overflow: inherit!important;
}
.layout-col2 .item {
  width: 50%;
  padding: 5px 0 5px 10px;
  float: left;
}

.layout-col2 .item .image {
  width: 124px;
  max-height: 154px;
  overflow: hidden;
  float: left;
}

.layout-col2 .item .image img {
  background-color: #FFF;
  border: 1px solid #DDD;
  padding: 1px;
  width: 124px;
  height: 154px;
}

.layout-col2 .item dl {
  float: right;
  width: 200px;
  padding: 0 10px;
}

.layout-col2 .item dl dt {
  border-bottom: 1px dotted #A6D3E8;
  font-size: 14px;
  font-weight: 700;
  height: 26px;
  line-height: 26px;
  overflow: hidden;
}

.layout-col2 .item dl dt span {
  color: #B3B3B3;
  float: right;
  font-weight: 400;
}

.layout-col2 .item dl dd {
  line-height: 20px;
  overflow: hidden;
  text-indent: 2em;
  padding: 7px 0 0;
}

.layout-col3 .item {
  width: 33.33%;
  padding: 10px 0 10px 10px;
  float: left;
}
.layout-col3 .item:nth-child(n + 4) {
  padding-top: 0;
}

.layout-col3 .item .image {
  width: 114px;
}

.layout-tit {
  background-color: #E1ECED;
  border-bottom: 1px solid #DDD;
  font-size: 14px;
  font-weight: 700;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  margin: 0;
  padding: 0 10px;
}

.layout2 .layout-tit {
  margin: 0px;
  overflow: hidden;
  padding: 0px 0px 0px 10px;
  background-color: #A6D3E8;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  font-weight: bold;
  border-bottom: solid 1px #DDDDDD;
}

.txt-list {
  padding: 4px 10px;
}

.txt-list li {
  border-bottom: 1px solid #DDDDDD;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
}

.txt-list li span {
  float: left;
}


.txt-list .s1 {
  width: 60px;
}

.txt-list .s5 {
  float: right;
}

.txt-list-row5 .s1 {
  width: 75px;
}

.txt-list-row5 .s2 {
  width: 165px;
}

.txt-list-row5 .s3 {
  width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.txt-list-row5 .s4 {
  color: #B3B3B3;
  width: 90px;
  text-align: right;
}

.txt-list-row5 .s5 {
  color: #B3B3B3;
}


/* 小于1024适配 */
@media (max-width: 1024px) {
  .row {
    margin: 0 auto;
  }

  .header,
  .nav,
  .container {
    width: 100%;
  }

  .container {
    margin: 5px auto;
  }

  .layout-col2 .item {
    width: 100%;
    display: flex;
    padding: 0 0 10px 10px;
  }

  .layout-col2 .item .image {
    width: 90px;
    max-height: none;
  }

  .layout-col2 .item .image img {
    height: 118px;
  }

  .layout-col2 .item dl {
    flex: 1 1 auto;
  }

  .tp-box {
    width: 100%;
    float: none;
    border-right: 0 none;
  }

  .tp-box .top {
    display: flex;
  }

  .tp-box .top dl {
    flex: 1 1 auto;
  }

  .tp-box h2 {
    border-top: solid 1px #A6D3E8;
    margin-top: 10px;
  }

  .layout .tp-box:first-child h2 {
    border-top: 0 none;
    margin-top: 0;
  }

  .layout,
  .layout2 {
    float: none;
    border: 0 none !important;
    background: none;
  }

  .row .layout-col1,
  .row .layout-col2 {
    width: 100% !important;
    margin: 0 auto;
  }

  .row .layout-col1 {
    margin-top: 0px;
  }

  .row-rank .layout-col1 {
    margin-top: 0px;
  }

  .txt-list-row5 .s1 {
    width: 20%;
  }

  .txt-list-row5 .s2,
  .txt-list-row5 .s3 {
    width: 40%;
  }

  .txt-list li:last-child {
    border-bottom: 0 none;
  }
}

/* 排行榜 */
.row-rank .layout-col1,
.row-detail .layout-col1,
.row-section .layout-col1 {
  width: 100%;
  margin-right: 4px;
  margin-bottom: 10px;
  padding-bottom: 0;
  border: 2px solid #88C6E5;
}

.row-rank .mr0 {
  margin-right: 0;
}

.row-rank .layout-tit,
.row-detail .layout-tit {
  border-bottom: 1px solid #88C6E5;
}

.tab-hd {
  float: right;
  margin: 0 !important;
  padding: 0 !important;
}

.tab-hd li {
  font-weight: normal;
  cursor: pointer;
  float: left;
  height: 31px;
  line-height: 31px;
  overflow: hidden;
  color: #999;
  padding: 0 8px;
}

.tab-hd .active {
  color: #333;
  border-bottom: 2px solid #88C6E5;
}

.row-rank .txt-list li {
  border-bottom: 0 none;
}

.row-rank .txt-list .s1 {
  max-width: 26px;
  font-style: italic;
  color: #999;
}

.row-rank .txt-list .s2 {
  width: 142px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.row-rank .txt-list .s5 {
  width: 120px;
  color: #999;
  text-align: right;
}

/* 小于980适配 */
@media (max-width: 1024px) {
  .row-rank .txt-list .s1 {
    width: 10%;
  }

  .row-rank .txt-list .s2 {
    width: 70%;
  }

  .row-rank .txt-list .s5 {
    width: 20%;
  }
}
</style>