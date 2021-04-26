<template>
  <a-dropdown>
    <a class="indexlayout-top-usermenu ant-dropdown-link" @click="e => e.preventDefault()">
      {{ '大鱼' }} <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item key="userinfo">
          {{ '用户名' }}
        </a-menu-item>
        <a-menu-item key="logout">
          {{ '退出' }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script lang="ts">
import { DownOutlined } from '@ant-design/icons-vue'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { StateType as UserStateType, CurrentUser } from '@/store/user'
interface RightTopUserSetupData {
  currentUser: CurrentUser
  onMenuClick: (event: any) => Promise<void>
}
export default defineComponent({
  name: 'RightTopUser',
  components: {
    DownOutlined,
  },
  setup(): RightTopUserSetupData {
    const store = useStore<{ user: UserStateType }>()
    const router = useRouter()

    // 获取当前登录用户信息
    const currentUser = computed<CurrentUser>(() => store.state.user.currentUser)

    // 点击菜单
    const onMenuClick = async (event: any) => {
      const { key } = event

      if (key === 'logout') {
        const res: boolean = await store.dispatch('user/logout')
        if (res === true) {
          router.replace({
            path: '/user/login',
            query: {
              redirect: router.currentRoute.value.path,
              ...router.currentRoute.value.query,
            },
          })
        }
      }
    }

    return {
      currentUser: (currentUser as unknown) as CurrentUser,
      onMenuClick,
    }
  },
})
</script>
