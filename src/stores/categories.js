import { defineStore } from 'pinia'
import { useAuthState } from '@vueauth/core'
import { supabase } from '../supabase'

export const usePomodoroCategoriesStore = defineStore('counter', {
  state: () => ({
    loading: false,
    removing: false,
    categories: [],
    form: {
      title: '',
      description: '',
      color: '',
      seconds: 0
    },
    errorMessage: '',
    successMessage: '',
    authUser: useAuthState()

  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
    // user: this.authUser.user
  },
  actions: {
    add () {
      console.log('add')
      this.categories.push('x')
    },
    async remove (id) {
      console.log('remove id', id)
      console.log(this.categories)
      this.removing = true
      await supabase.from('pomodoro_categories').delete().eq('id', id)
      this.categories = this.categories.filter(cat => cat.id !== id)
      console.log(this.categories)
      this.removing = false
    },
    async getPomodoroCategories () {
      console.log('getPomodoroCategories ...')
      this.loading = true

      const { data, error } = await supabase
        .from('pomodoro_categories')
        .select()

      console.log('data', data)
      console.log('error', error)
      this.loading = false
      this.categories = data
    },
    async create () {
      console.log('create ...')
      this.loading = true

      const { data, error } = await supabase.from('pomodoro_categories').insert({
        // id: this.attr(null),
        title: this.form.title,
        description: this.form.description,
        color: this.form.color,
        seconds: this.form.seconds,
        user_id: this.authUser.user.id // this.number()
      })

      console.log('data', data)
      console.log('error', error)

      this.loading = false
      if (error) {
        this.errorMessage = error
        return
      }
      this.successMessage = 'Uloženo'
      this.categories.push(data[0])
    }
  }
})
