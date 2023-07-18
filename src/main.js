import { createApp } from "vue";
import register from 'xiaomeng-vue-ui'
import 'xiaomeng-vue-ui/dist/xmv-ui.css'
import './page/style/index.less'
import App from './page/index.vue'


const app = createApp(App)
app.use(register)
app.mount("#xm-airplane")