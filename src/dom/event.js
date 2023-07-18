import {getCurrentApp} from '../application/apps'

const originalDocumentAddEventListener = window.document.addEventListener
const originalDocumentRemoveEventListener = window.document.removeEventListener

const globalAppEventMap = new Map()

export function overwriteDocumentEvent(){
    window.document.addEventListener = (type ,listener ,options)=>{
        // 记录各个子系统的全局点击事件
        let currentApp = getCurrentApp()
        if (!globalAppEventMap.get(currentApp.name)){
            globalAppEventMap.set(currentApp.name ,new Map())
        }
        let eventMap = globalAppEventMap.get(currentApp.name)
        if (!eventMap.get(type)){
            eventMap.set(type ,[])
        }
        eventMap.get(type).push({listener ,options})
        const result = originalDocumentAddEventListener.call(window.document ,type ,listener ,options)
        return result
    }

    window.document.removeEventListener = (type ,__listener ,options)=>{
        let currentApp = getCurrentApp()
        let eventMap = globalAppEventMap.get(currentApp.name)
        let handleList = eventMap.get(type)
        let indexToRemove = 0
        handleList.forEach(({listener ,options} ,i)=>{
            if (listener === __listener)
                indexToRemove = i
        })
        handleList.splice(indexToRemove ,1)
        const result = originalDocumentRemoveEventListener.call(window.document ,type ,__listener ,options)
        return result
    }

}

export function recoverDocumentEvent(appName){
    let eventMap = globalAppEventMap.get(appName)
    if (!eventMap){
        return false
    }
    eventMap.forEach((handleList ,key)=>{
        handleList.forEach(({listener ,options}) =>{
            originalDocumentAddEventListener.call(window.document ,key ,listener ,options)
        })
    })
}

export function clearDocumentEvent(appName){
    let eventMap = globalAppEventMap.get(appName)
    if (!eventMap){
        return false
    }
    eventMap.forEach((handleList ,key)=>{
        handleList.forEach(({listener ,options}) =>{
            originalDocumentRemoveEventListener.call(window.document ,key ,listener ,options)
        })
    })
}