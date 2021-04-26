<template>
  <div class="home">
    {{ count }}
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
export default {
  setup() {
    const count = ref(2)
    return {
      count,
    }
  },
}
</script>
