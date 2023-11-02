import {createRouter ,createWebHashHistory} from 'vue-router'
import introVue from '../intro.vue'

const router= createRouter({
    history : createWebHashHistory(),
    routes : [
        { path : '/',component : introVue }
    ]
})

export default router