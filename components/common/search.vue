<script setup lang="ts">
const searchKey = ref('')
const router = useRouter()
const searchBook = () => {
  if (searchKey.value) {
    router.push(`/search/${searchKey.value}/`)
  } else {
    ElMessage({
      message: '请输入搜索内容',
      type: 'warning',
      showClose: true,
      center: true,
    })
  }
}
//监听回车事件
const keyup = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    searchBook()
  }
}
</script>

<template>
  <div class="search">
    <el-input
        v-model="searchKey"
        placeholder="按书名、作者名搜索"
        @keyup.enter="keyup"
    >
      <template #append>
        <el-button  @click="searchBook" :icon="ElIconSearch" />
      </template>
    </el-input>
  </div>
</template>

<style scoped>
.el-input {
  font-size: 16px;
}
</style>