<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import PomodoroCategoryForm from 'components/PomodoroCategoryForm.vue'
import CategoryCard from 'components/CategoryCard.vue'

import { usePomodoroCategoriesStore } from 'stores/categories'
const categoryStore = usePomodoroCategoriesStore()
const { form, categories, errorMessage, loading, showDialog, dialogTitle } = storeToRefs(
  categoryStore
)
const search = ref('')
const onBtnClicked = async () => {
  dialogTitle.value === 'update' ? categoryStore.update() : categoryStore.create()
  if (!errorMessage.value) showDialog.value = false
}

categoryStore.getPomodoroCategories()
</script>

<template>
  <q-card class="fit card">
    <q-toolbar class="toolbar bg-primary text-white">
      <q-toolbar-title>Category</q-toolbar-title>
      <q-input
        v-model="search"
        outlined
        class="gt-sm"
        color="white"
        bg-color="white"
        dense
        clearable
      >
        <template #prepend>
          <q-icon
            name="mdi-magnify"
            color="grey"
          />
        </template>
      </q-input>
      <q-btn
        icon="mdi-plus"
        unelevated
        dense
        color="primary"
        class="q-ml-sm"
        @click="categoryStore.showDialogWin('add', '', null)"
      />
    </q-toolbar>
    <div
      v-if="!loading"
      class="card-wrapper row q-pa-sm content-start"
    >
      <div
        v-for="item in categories"
        :key="item"
        class="col-6"
      >
        <q-responsive
          :ratio="1"
          class="q-ma-sm"
        >
          <CategoryCard :item="item" />
        </q-responsive>
      </div>
    </div>
    <div
      v-else
      class="spinner"
    >
      <q-spinner
        size="lg"
        color="primary"
      />
    </div>
  </q-card>

  <q-dialog v-model="showDialog">
    <q-card
      class="full-width"
      style="max-width: 360px"
    >
      <q-card-section>
        <PomodoroCategoryForm
          v-model:title="form.title"
          v-model:description="form.description"
          v-model:color="form.color"
          v-model:seconds="form.seconds"
        />
      </q-card-section>
      <q-btn
        unelevated
        color="primary"
        :label="dialogTitle"
        class="full-width"
        @click="onBtnClicked()"
      />
    </q-card>
  </q-dialog>
</template>

<style scoped>
.card-wrapper {
  height: calc(100vh - 160px);
  overflow-y: auto;
  overflow-x: hidden;
}
/*.card {
  max-height: calc(100vh - 90px);
}*/
.toolbar {
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
  width: inherit;
}
</style>
