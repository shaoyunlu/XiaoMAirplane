import {wrapEventListener ,clearWrapEventListener ,
    wrapSetInterval ,clearWrapSetInterval ,wrapSetTimeout ,clearWrapSetTimeout} from './event'
import {addStyles ,removeStyles} from '../parse'

class Sandbox{
    constructor(application){
        this.proxyWindow = null
        this.app = application
        this.injectKeyMap = new Map()
        this.windowEventMap = new Map()
        this.timeoutSet = new Set()
        this.intervalSet = new Set()
        this.init()
    }

    init(){
        this.proxyWindow = createWindowProxy(this.injectKeyMap)
        this.proxyWindow.addEventListener = wrapEventListener(this.windowEventMap)
        this.proxyWindow.setInterval = wrapSetInterval(this.intervalSet)
        this.proxyWindow.setTimeout = wrapSetTimeout(this.timeoutSet)
    }

    recover(){
        // 恢复绑定事件
        this.windowEventMap.forEach((handleList ,eventName)=>{
            handleList.forEach(({listener ,options}) =>{
                window.addEventListener(eventName ,listener ,options)
            })
        })

        // 恢复全局变量
        this.injectKeyMap.forEach((value ,key)=>{
            if (key.indexOf('xm-airplane') < 0){
                this.proxyWindow[key] = value
            }
        })

        // 恢复样式
        addStyles(this.app.styles ,this.app.pageEntry ,this.app.name)
    }

    unmount(){
        if (this.proxyWindow){
            this.injectKeyMap.forEach((value ,key)=>{
                if (key.indexOf('xm-airplane') < 0){
                    delete this.proxyWindow[key]
                }
            })
        }
        clearWrapEventListener(this.windowEventMap)
        clearWrapSetInterval(this.intervalSet)
        clearWrapSetTimeout(this.timeoutSet)

        // 删除样式
        removeStyles(this.app.name)
    }
}

export default Sandbox


function createWindowProxy(injectKeyMap){
    return new Proxy({} ,{
        get(target ,key) {
            if (Reflect.has(target ,key)){
                return Reflect.get(target ,key)
            }

            const result = window[key]
            if (isFunction(result) && needToBindOriginalWindow(result)){
                return result.bind(window)
            }else{
                return result
            }
        },
        set(target ,key ,value){
            injectKeyMap.set(key ,value)
            return Reflect.set(target ,key ,value)
        }
    })
}

function isFunction(variable){
    return (typeof variable === 'function')
}

function needToBindOriginalWindow(variable){
    return window.hasOwnProperty(variable.name)
}