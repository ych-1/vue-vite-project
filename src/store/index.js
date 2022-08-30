import { createPinia, defineStore } from 'pinia'

const store = createPinia()

export const useStore = defineStore('index', {
  state: () => ({
    count: 1,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})

export default store
