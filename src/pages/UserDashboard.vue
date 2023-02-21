<script setup>
import ManagePomodoroCategoriesCard from 'components/ManagePomodoroCategoriesCard.vue'
</script>

<template>
  <q-page
    padding
    class="row no-wrap"
  >
    <div class="col-lg-4 col-4 q-pr-md">
      <ManagePomodoroCategoriesCard />
    </div>
    <div class="bg-green col-lg-3 col-3">
      two
    </div>
    <div class="bg-red col-lg-5 col-5">
      three
    </div>
  </q-page>
</template>
