<template>
  <h1>{{ msg }}</h1>
  <h2>count is: {{ count }}</h2>
  <h2>doubleCount is: {{ doubleCount }}</h2>
  <button @click="handleIncrement">count++</button>
</template>

<script setup>
import { useStore } from '@/store'
import { storeToRefs } from 'pinia'

defineProps({
  msg: {
    type: String,
    default: 'HelloWorld',
  },
})

const store = useStore()

const { count, doubleCount } = storeToRefs(store)

const handleIncrement = () => {
  store.increment()
}
</script>

<style scoped></style>
