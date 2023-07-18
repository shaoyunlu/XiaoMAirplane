<template>
    <xmv-menu :data="menuData" @nodeClick="handleNodeClick"></xmv-menu>
</template>

<script>
import {defineComponent ,nextTick,ref} from 'vue'
export default defineComponent({
    name:"",
    setup(props ,context) {
        const menuData = ref([
            {name : '首页' ,route : ''},
            {name : '应用一' ,route : 'app1' ,childNodes : 
                [
                    {name : '用户管理' ,route : 'app1/user'},
                    {name : '角色管理' ,route : 'app1/role'}
                ]},
            {name : '应用二' ,route : 'app2'}
        ])

        const handleNodeClick = (node)=>{
            //window.history.pushState({}, '', '/#/' + node.route);
            window.location.href = '/#/' + node.route
        }

        return {menuData ,handleNodeClick}
    }
})
</script>

<style lang="" scoped></style>
