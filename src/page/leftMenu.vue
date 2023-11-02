<template>
    <xmv-menu :data="menuData" @nodeClick="handleNodeClick" ref="menuRef"></xmv-menu>
</template>

<script>
import {defineComponent ,nextTick,onMounted,ref} from 'vue'
import {getCurrentApp ,unMountApp} from '../application/apps'
export default defineComponent({
    name:"",
    setup(props ,context) {

        const menuRef = ref(null)

        const menuData = ref([
            {name : '首页' ,route : '' ,value : ''},
            {name : '系统自身' ,route : 'self' ,value : 'self'},
            {name : '应用一' ,route : 'app1' , value : 'app1' ,children : 
                [
                    {name : '用户管理' ,route : 'app1/user' ,value : 'app1/user' ,appName : 'app1'},
                    {name : '角色管理' ,route : 'app1/role' ,value : 'app1/role' ,appName : 'app1'}
                ]},
            {name : '应用二' ,route : 'app2' ,value : 'app2' ,children : 
                [
                    {name : '用户管理' ,route : 'app2/user' ,value : 'app2/user' ,appName : 'app2'},
                    {name : '角色管理' ,route : 'app2/role' ,value : 'app2/role' ,appName : 'app2'}
                ]
            }
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

        onMounted(()=>{
            let hash = window.location.hash.slice(2)
            menuRef.value.activeNode(hash)
        })

        return {menuData ,handleNodeClick ,menuRef}
    }
})
</script>

<style lang="" scoped></style>
