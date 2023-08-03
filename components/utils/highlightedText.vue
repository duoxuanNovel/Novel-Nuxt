<template>
  <div>
    <span v-for="(item, index) in highlightedItems" :key="index" :class="{ 'highlight': item.isKeyword }">
      {{ item.text }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  text: string,
  keyword: string
}>(), {
  text: '',
  keyword: ''
})

const highlightedItems = computed(() => {
  const items: {text: string, isKeyword: boolean}[] = []
  let position = 0
  let index = 0

  while ((index = props.text.indexOf(props.keyword, position)) !== -1) {
    if (index > position) {
      items.push({ text: props.text.slice(position, index), isKeyword: false })
    }
    items.push({ text: props.keyword, isKeyword: true })
    position = index + props.keyword.length
  }

  if (position < props.text.length) {
    items.push({ text: props.text.slice(position), isKeyword: false })
  }

  return items
})
</script>

<style scoped>
.highlight {
  color: red;
}
</style>