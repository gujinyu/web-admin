<template>
  <div id="indexlayout">
    <left
      :collapsed="collapsed"
      :topNavEnable="topNavEnable"
      :belongTopMenu="belongTopMenu"
      :selectedKeys="selectedKeys"
      :openKeys="leftOpenKeys"
      :onOpenChange="onOpenChange"
      :menuData="permissionMenuData"
    >
    </left>
    <div id="indexlayout-right" :class="{ 'fiexd-header': headFixed }">
      <right-top
        :collapsed="collapsed"
        :topNavEnable="topNavEnable"
        :belongTopMenu="belongTopMenu"
        :toggleCollapsed="toggleCollapsed"
        :breadCrumbs="breadCrumbs"
        :menuData="permissionMenuData"
      >
      </right-top>
      <div class="indexlayout-right-main">
        <div class="indexlayout-main-conent">
          <permission :roles="routeItem.roles">
            <router-view></router-view>
          </permission>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch, ref } from 'vue'
import { StateType as GlobalStateType } from '@/store/global'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import Left from '@/layout/IndexLayout/components/Left.vue'
import { mergeUnique as ArrayMergeUnique } from '@/utils/array'
import useTitle from '@/utils/useTitle'
import IndexLayoutRoutes from './routes'
import Permission from '@/components/Permission/index.vue'
import RightTop from '@/layout/IndexLayout/components/RightTop.vue'

import {
  vueRoutes,
  RoutesDataItem,
  getRouteItem,
  getSelectLeftMenuPath,
  formatRoutePathTheParents,
  getRouteBelongTopMenu,
  getBreadcrumbRoutes,
  BreadcrumbType,
  getPermissionMenuData,
} from '@/utils/routes'

interface IndexLayoutSetupData {
  collapsed: boolean
  toggleCollapsed: () => void
  topNavEnable: boolean
  belongTopMenu: string
  headFixed: boolean
  selectedKeys: string[]
  leftOpenKeys: string[]
  breadCrumbs: BreadcrumbType[]
  permissionMenuData: RoutesDataItem[]
  onOpenChange: (key: any) => void
  routeItem: RoutesDataItem
}
export default defineComponent({
  name: 'IndexLayout',
  components: {
    Left,
    Permission,
    RightTop,
  },
  setup(): IndexLayoutSetupData {
    const store = useStore<{
      global: GlobalStateType
    }>()
    const route = useRoute()

    //  所有菜单路由
    const menuData: RoutesDataItem[] = vueRoutes(IndexLayoutRoutes)
    console.log(menuData)
    // 当前路由 item
    const routeItem = computed<RoutesDataItem>(() => getRouteItem(route.path, menuData))

    // 有权限的菜单
    const permissionMenuData = computed<RoutesDataItem[]>(() =>
      // getPermissionMenuData(store.state.user.currentUser.roles, menuData)
      getPermissionMenuData(['admin'], menuData)
    )

    // 当前路由的顶部菜单path
    const belongTopMenu = computed<string>(() => getRouteBelongTopMenu(routeItem.value))

    // 当前路由的父路由path[]
    const routeParentPaths = computed<string[]>(() => formatRoutePathTheParents(routeItem.value.path))

    // 左侧选择菜单key
    const selectedKeys = computed<string[]>(() => {
      const selectedKey = getSelectLeftMenuPath(routeItem.value)
      console.log(selectedKey, 222)
      return [selectedKey]
    })

    // 收缩左侧
    const collapsed = computed<boolean>(() => store.state.global.collapsed)
    const toggleCollapsed = (): void => {
      store.commit('global/changeLayoutCollapsed', !collapsed.value)
    }

    // 左侧展开菜单keys
    const leftOpenKeys = ref<string[]>(routeParentPaths.value)
    watch([routeParentPaths, collapsed], () => {
      if (routeParentPaths.value.length && !collapsed.value) {
        leftOpenKeys.value = ArrayMergeUnique<string>(leftOpenKeys.value, routeParentPaths.value)
      } else {
        leftOpenKeys.value = []
      }
    })
    // 左侧菜单展开收起
    const onOpenChange = (key: any) => {
      leftOpenKeys.value = key
    }

    // 面包屑导航
    const breadCrumbs = computed<BreadcrumbType[]>(() =>
      getBreadcrumbRoutes(routeItem.value, routeParentPaths.value, menuData)
    )
    // 右侧顶部导航是否开启
    const topNavEnable = computed<boolean>(() => store.state.global.topNavEnable)

    // 右侧顶部是否固定
    const headFixed = computed<boolean>(() => store.state.global.headFixed)

    // 设置title
    useTitle(routeItem)
    return {
      collapsed: (collapsed as unknown) as boolean,
      toggleCollapsed,
      topNavEnable: (topNavEnable as unknown) as boolean,
      belongTopMenu: (belongTopMenu as unknown) as string,
      headFixed: (headFixed as unknown) as boolean,
      selectedKeys: (selectedKeys as unknown) as string[],
      leftOpenKeys: (leftOpenKeys as unknown) as string[],
      breadCrumbs: (breadCrumbs as unknown) as BreadcrumbType[],
      onOpenChange,
      routeItem: (routeItem as unknown) as RoutesDataItem,
      permissionMenuData: (permissionMenuData as unknown) as RoutesDataItem[],
    }
  },
})
</script>

<style lang="less">
@import '../../assets/css/variables.less';
#indexlayout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
#indexlayout-right {
  position: relative;
  flex: 1;
  overflow: auto;
  background-color: @mainBgColor;
  &.fiexd-header {
    display: flex;
    flex-direction: column;
    .indexlayout-right-main {
      flex: 1;
      overflow: auto;
    }
  }
}
.indexlayout-main-conent {
  margin: 24px;
  position: relative;
}
</style>
