<script setup>
import { toRefs } from 'vue'
import useCategoryCards from '../composables/useCategoryCard'

const {
  update,
  updating,
  remove,
  removing
} = useCategoryCards()

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})
const { item } = toRefs(props)
</script>

<template>
  <q-card class="shadow-2 relative-position">
    <q-card-section v-if="!updating">
      <q-input
        v-model="item.title"
        dense
        borderless
      />
      <q-input
        v-model="item.description"
        dense
        borderless
      />
    </q-card-section>
    <div
      v-else
      class="spinner"
    >
      <q-spinner
        size="md"
        color="primary"
      />
    </div>

    <q-btn
      :loading="updating"
      icon="mdi-pencil"
      flat
      round
      size="md"
      class="absolute-bottom-right q-mr-sm q-mb-sm"
      @click="() => update(item)"
    />

    <q-btn
      :loading="removing"
      icon="mdi-delete"
      flat
      round
      size="md"
      class="absolute-bottom-left q-mr-sm q-mb-sm"
      @click="() => remove(item)"
    />
  </q-card>
</template>

<style scoped>
p {
  user-select: none;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  width: inherit;
}
</style>
