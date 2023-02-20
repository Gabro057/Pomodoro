import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
    categories: [1, 2, 3, 4, 5]
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment () {
      this.counter++
    },
    add () {
      console.log('add')
      this.categories.push('x')
    }
  }
})
