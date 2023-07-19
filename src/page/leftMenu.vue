<template>
    <xmv-menu :data="menuData" @nodeClick="handleNodeClick"></xmv-menu>
</template>

<script>
import {defineComponent ,nextTick,ref} from 'vue'
import {getCurrentApp ,unMountApp} from '../application/apps'
export default defineComponent({
    name:"",
    setup(props ,context) {
        const menuData = ref([
            {name : '首页' ,route : ''},
            {name : '应用一' ,route : 'app1' ,childNodes : 
                [
                    {name : '用户管理' ,route : 'app1/user' ,appName : 'app1'},
                    {name : '角色管理' ,route : 'app1/role' ,appName : 'app1'}
                ]},
            {name : '应用二' ,route : 'app2' ,appName : 'app2'}
        ])

        const handleNodeClick = (node)=>{
            let currentApp = getCurrentApp()
            if (currentApp && currentApp.name == node.appName){
                // 相同的应用，暂时先什么都不操作
            }else{
                // 不同的应用，先卸载应用
                if (currentApp){
                    unMountApp(currentApp)
                }
            }
            // 这里应该提前卸载应用，防止history被污染
            window.location.href = '/#/' + node.route
        }

        return {menuData ,handleNodeClick}
    }
})
</script>

<style lang="" scoped></style>
