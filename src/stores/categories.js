import { defineStore } from 'pinia'
import { useAuthState } from '@vueauth/core'
import { supabase } from '../supabase'

export const usePomodoroCategoriesStore = defineStore('counter', {
  state: () => ({
    actId: 0,
    loading: false,
    categories: [],
    form: {
      title: '',
      description: '',
      color: '',
      seconds: 0
    },
    errorMessage: '',
    successMessage: '',
    authUser: useAuthState(),
    showDialog: false,
    dialogTitle: ''
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
    // user: this.authUser.user
  },
  actions: {
    showDialogWin (mode, id, item) {
      console.log('showDialog mode=' + mode)
      console.log('id', id)
      this.showDialog = true

      if (mode === 'update') {
        this.dialogTitle = 'update'
        this.form = item
        this.actId = id
      } else {
        this.dialogTitle = 'add'
        this.form = {
          title: '',
          description: '',
          color: '',
          seconds: 0
        }
      }
    },
    async remove (id) {
      console.log('remove id', id)
      await supabase.from('pomodoro_categories').delete().eq('id', id)
      this.categories = this.categories.filter(cat => cat.id !== id)
    },
    async update () {
      console.log('update this.actId', this.actId)
      console.log('this.form', this.form)
      const { data } = await supabase.from('pomodoro_categories').update(this.form).eq('id', this.actId)

      this.categories.forEach((cat, index) => {
        if (cat.id !== data[0].id) return
        this.categories[index] = { ...data[0] }
      })
    },
    async getPomodoroCategories () {
      console.log('getPomodoroCategories ...')
      this.loading = true

      const { data, error } = await supabase
        .from('pomodoro_categories')
        .select()
        .eq('user_id', this.authUser.user.id)

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
