import {getCurrentApp} from '../application/apps'


export function wrapEventListener(eventMap ,oriEventListener ,scope){
    return (type ,listener ,options)=>{
        if (!eventMap.get(type)){
            eventMap.set(type ,[])
        }
        eventMap.get(type).push({listener ,options})
        return oriEventListener.call(scope ,type ,listener ,options)
    }
}

export function wrapRemoveEventListener(eventMap ,oriEventListener ,scope){
    return (type ,listener ,options)=>{
        if (eventMap.get(type)){
            let handleList = eventMap.get(type)
            let indexToRemove = handleList.indexOf(listener)
            handleList.splice(indexToRemove ,1)
        }
        return oriEventListener.call(scope ,type ,listener ,options)
    }
}

export function clearWrapEventListener(eventMap ,oriRemoveEventListener ,scope){
    for(let [type ,arr] of eventMap){
        for (let item of arr){
            oriRemoveEventListener.call(scope ,type , item.listener, item.options)
        }
    }
}

export function wrapSetTimeout(app ,timeoutMap){
    return (callback, timeout, ...args)=>{
        const fn = ()=>{
            let currentApp = getCurrentApp()
            if (currentApp.name == app.name){
                callback && callback()
            }
        }
        const timer = window.setTimeout(fn ,timeout ,...args)
        timeoutMap.set(timer ,timer)
        return timer
    }
}

export function wrapClearTimeout(map){
    return (timeouter)=>{
        map.delete(timeouter)
        window.clearTimeout(timeouter)
    }
}

export function wrapSetInterval(app ,intervalMap){
    return (callback ,interval ,...args)=>{
        const fn = ()=>{
            let currentApp = getCurrentApp()
            if (currentApp.name == app.name){
                callback && callback()
            }
        }
        const intervaler = window.setInterval(fn ,interval ,...args)
        intervalMap.set(intervaler ,intervaler)
        return intervaler
    }
}

export function wrapClearInterval(map){
    return (intervaler)=>{
        map.delete(intervaler)
        window.clearInterval(intervaler)
    }
}

