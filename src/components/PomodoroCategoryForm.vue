<script setup>
import { useVModels } from "@vueuse/core";
//import { ref, reactive } from "vue";
//import { supabase } from "../supabase";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  seconds: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits([
  "update:title",
  "update:description",
  "update:color",
  "update:seconds",
]);

const { title, description, color, seconds } = useVModels(props, emit);
</script>

<template>
  <q-card>
    <q-card-section>
      <q-form>
        <q-input v-model="title" label="title" class="q-mb-md" outlined />
        <q-input
          v-model="description"
          label="description"
          type="textarea"
          class="q-mb-md"
          outlined
        />
        <q-color v-model="color" format-model="hex" class="q-mb-md" />
        <q-input
          v-model="seconds"
          type="number"
          label="seconds"
          outlined
          class="q-mb-md"
        />
        <!-- <q-btn
          label="Create"
          @click="create"
          color="primary"
          class="full-width"
          unevelated
        /> -->
        <!-- <q-banner v-if="errorMessage" class="rounded bg-red-8 text-white q-mt-md">
          {{ errorMessage }}
        </q-banner>
        <q-banner v-if="successMessage" class="rounded bg-green-8 text-white q-mt-md">
          {{ successMessage }}
        </q-banner> -->
      </q-form>
    </q-card-section>
  </q-card>
  <!-- <div v-else class="spinner">
    <q-spinner />
  </div> -->
</template>

<style scoped>
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85vh;
  width: inherit;
}
</style>
