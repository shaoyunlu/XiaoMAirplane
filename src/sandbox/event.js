let originalWindowAddEventListener = window.addEventListener
let originalWindowRemoveEventListener = window.removeEventListener


export function wrapEventListener(windowEventMap){
    return (type ,listener ,options)=>{
        if (!windowEventMap.get(type)){
            windowEventMap.set(type ,[])
        }
        windowEventMap.get(type).push({listener ,options})
        return originalWindowAddEventListener.call(window ,type ,listener ,options)
    }
}

export function clearWrapEventListener(windowEventMap){
    for(let [type ,arr] of windowEventMap){
        for (let item of arr){
            originalWindowRemoveEventListener.call(window ,type , item.listener, item.options)
        }
    }
}

export function wrapSetTimeout(timeoutSet){
    return (callback, timeout, ...args)=>{
        const timer = window.setTimeout(callback ,timeout ,...args)
        timeoutSet.add(timer)
        return timer
    }
}

export function clearWrapSetTimeout(timeoutSet){
    for (const tmp of timeoutSet) {
        window.clearTimeout(tmp)
    }
}

export function wrapSetInterval(intervalSet){
    return (callback ,interval ,...args)=>{
        const intervaler = window.setInterval(callback ,interval ,...args)
        intervalSet.add(intervaler)
        return intervaler
    }
}

export function clearWrapSetInterval(intervalSet){
    for (const tmp of intervalSet) {
        window.clearInterval(tmp)
    }
}

