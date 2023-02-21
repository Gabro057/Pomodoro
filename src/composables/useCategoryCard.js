import { ref } from 'vue'
import { usePomodoroCategoriesStore } from '../stores/categories'

export default () => {
  const categoryStore = usePomodoroCategoriesStore()
  const updating = ref(false)
  const removing = ref(false)

  const update = (item) => {
    updating.value = true
    categoryStore.showDialogWin('update', item.id, { ...item })
    updating.value = false
  }
  const remove = (item) => {
    removing.value = true
    categoryStore.remove(item.id)
    removing.value = false
  }

  return {
    update,
    updating,
    remove,
    removing
  }
}
