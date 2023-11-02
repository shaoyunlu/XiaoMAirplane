import { createApp } from "vue";
import register from 'xiaomeng-vue-ui'
import 'xiaomeng-vue-ui/dist/xmv-ui.css'
import './page/style/index.less'
import App from './page/index.vue'
import router from './page/route/index.js'


const app = createApp(App)
app.use(register)
app.use(router)
app.mount("#xm-airplane")