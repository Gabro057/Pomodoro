<script setup>
import { storeToRefs } from 'pinia'
import { toRefs } from 'vue'
//import { supabase } from '../supabase'
import { usePomodoroCategoriesStore } from '../stores/categories'
const categoryStore = usePomodoroCategoriesStore()
const { removing } = storeToRefs(categoryStore)

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const { item } = toRefs(props)
// const removing = ref(false)
/* watchEffect(() => {
  console.log("watchEffect item.id", item.id)
}) */
</script>

<template>
  <q-card class="shadow-2 relative-position">
    <q-card-section>
      <p>{{ item.title }}</p>
      <p>{{ item.description }}</p>
    </q-card-section>
    <q-btn
      :loading="removing"
      icon="mdi-delete"
      flat
      round
      size="sm"
      class="absolute-bottom-right q-mr-sm q-mb-sm"
      @click="() => categoryStore.remove(item.id)"
    />
  </q-card>
</template>

<style scoped>
p {
  user-select: none;
}
</style>
