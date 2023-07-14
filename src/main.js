import {registerApplication ,start} from './application/apps'


document.getElementById('btn').addEventListener('click' ,()=>{
    window.location.hash = ''
})

document.getElementById('btn1').addEventListener('click' ,()=>{
    window.location.hash = '#/vue1'
})

document.getElementById('btn2').addEventListener('click' ,()=>{
    window.location.hash = '#/vue2'
})

registerApplication({
    name : 'vue1',
    pageEntry : 'http://localhost:4173',
    activeRule : (location) => location.hash === '#/vue1',
    container : 'xm-airplane'
})

registerApplication({
    name : 'vue2',
    pageEntry : 'http://localhost:5000',
    activeRule : (location) => location.hash === '#/vue2',
    container : 'xm-airplane'
})

start()