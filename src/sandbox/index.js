import {wrapEventListener ,clearWrapEventListener ,
    wrapSetInterval ,clearWrapSetInterval ,wrapSetTimeout ,clearWrapSetTimeout} from './event'

class Sandbox{
    constructor(){
        this.proxyWindow = null
        this.injectKeySet = new Set()
        this.windowEventMap = new Map()
        this.timeoutSet = new Set()
        this.intervalSet = new Set()
        this.init()
    }

    init(){
        this.proxyWindow = createWindowProxy(this.injectKeySet)
        this.proxyWindow.addEventListener = wrapEventListener(this.windowEventMap)
        this.proxyWindow.setInterval = wrapSetInterval(this.intervalSet)
        this.proxyWindow.setTimeout = wrapSetTimeout(this.timeoutSet)
    }

    unmount(){
        for (let key of this.injectKeySet){
            Reflect.defineProperty(this.proxyWindow ,key)
        }
        clearWrapEventListener(this.windowEventMap)
        clearWrapSetInterval(this.intervalSet)
        clearWrapSetTimeout(this.timeoutSet)
    }
}

export default Sandbox


function createWindowProxy(injectKeySet){
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
            injectKeySet.add(key)
            return Reflect.set(target ,key ,value)
        }
    })
}

function isFunction(variable){
    return (typeof variable === 'function')
}

function needToBindOriginalWindow(){
    return window.hasOwnProperty(variable.name)
}