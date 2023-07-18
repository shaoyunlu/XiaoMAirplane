import {wrapEventListener ,wrapRemoveEventListener ,
    clearWrapEventListener ,
    wrapSetInterval ,wrapSetTimeout} from './event'
import {addStyles ,removeStyles} from '../parse'

let originalWindowAddEventListener = window.addEventListener
let originalWindowRemoveEventListener = window.removeEventListener

class Sandbox{
    constructor(application){
        this.proxyWindow = null
        this.app = application
        this.injectKeyMap = new Map()
        this.windowEventMap = new Map()
        this.init()
    }

    init(){
        this.proxyWindow = createWindowProxy(this.injectKeyMap ,this.proxyDocument)
        this.proxyWindow.addEventListener
                    = wrapEventListener(this.windowEventMap ,originalWindowAddEventListener ,window)
        this.proxyWindow.removeEventListener 
                    = wrapRemoveEventListener(this.windowEventMap ,originalWindowRemoveEventListener ,window)

        this.proxyWindow.setInterval = wrapSetInterval(this.app)
        this.proxyWindow.setTimeout = wrapSetTimeout(this.app)
    }

    recover(){
        // 恢复绑定事件
        this.windowEventMap.forEach((handleList ,eventName)=>{
            handleList.forEach(({listener ,options}) =>{
                window.addEventListener(eventName ,listener ,options)
            })
        })

        // 恢复样式
        addStyles(this.app.styles ,this.app.pageEntry ,this.app.name)
    }

    unmount(){
        // 清除绑定的全局事件
        clearWrapEventListener(this.windowEventMap ,originalWindowRemoveEventListener ,window)

        // 删除样式
        removeStyles(this.app.name)
    }
}

export default Sandbox


function createWindowProxy(injectKeyMap ,proxyDocument){
    return new Proxy({} ,{
        get(target ,key) {
            if (Reflect.has(target ,key)){
                return Reflect.get(target ,key)
            }
            const result = window[key]

            if (isFunction(result) && needToBindOriginalWindow(result ,window)){
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

function needToBindOriginalWindow(variable ,scope){
    return scope.hasOwnProperty(variable.name)
}