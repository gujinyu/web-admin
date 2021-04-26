<template>
  <a-result v-if="!isLogin">
    <template #icon>
      <a-spin size="large" />
    </template>
  </a-result>
  <router-view v-if="isLogin" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
// import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

interface SecurityLayoutSetupData {
  isLogin: boolean
}

export default defineComponent({
  name: 'SecurityLayout',
  setup(): SecurityLayoutSetupData {
    onMounted(() => {
      console.log(2222)
    })
    return {
      isLogin: true,
    }
  },
})
</script>
