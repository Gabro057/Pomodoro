<template>
  <q-page class="flex flex-center">
    <q-btn label="login" to="/login" class="q-ma-sm" />
    <q-btn label="register" to="/register" class="q-ma-sm" />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
