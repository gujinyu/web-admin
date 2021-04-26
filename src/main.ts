import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import store from '@/config/store'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
// 全局样式
import '@/assets/css/global.less'
// import { Button, message } from 'ant-design-vue'

const app = createApp(App)

/* ant-ui 按需引入 */
app.use(Antd)
app.use(store)
app.use(router)
app.mount('#app')
