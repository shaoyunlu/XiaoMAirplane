<template>
    <xmv-layout headHval="100px" lWval="200px">
        <template #top>
            <div class="airplane-center">这是一个微前端框架哦</div>
        </template>
        <template #left>
            <left-menu></left-menu>
        </template>
        <template #right>
            <div id="xm-airplane-container"></div>
        </template>

    </xmv-layout>
</template>

<script>
import {defineComponent, onMounted, ref} from 'vue'
import {registerApplication ,start} from '../application/apps'
import LeftMenu from './leftMenu.vue'
export default defineComponent({
    name:"",
    components:{LeftMenu},
    setup(props ,context) {

        onMounted(()=>{
            registerApplication({
                name : 'app1',
                pageEntry : 'http://localhost:4000',
                activeRule : (location) => location.hash.indexOf('#/app1') >= 0,
                container : 'xm-airplane-container'
            })

            registerApplication({
                name : 'app2',
                pageEntry : 'http://localhost:5000',
                activeRule : (location) => location.hash.indexOf('#/app2') >= 0,
                container : 'xm-airplane-container'
            })

            start()
        })

        return {}
    }
})
</script>

<style lang="" scoped>

</style>
