import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import ElementPlus from 'element-plus'; // 正常来说需要按需引入，时间原因，先暂时全局引入
import 'element-plus/dist/index.css'; // 引入样式

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VXETable)
app.use(ElementPlus);

app.mount('#app')
