import AppStatus from './status'
import {overwriteDocumentEvent ,clearDocumentEvent ,recoverDocumentEvent} from '../dom/event'
import {overwriteEventsAndHistory} from '../route/history'
import {parseHTML ,loadSources} from '../parse'
import Sandbox from '../sandbox'

const appsMapping = {}

window.xmAirplaneGetCurrentApp = ()=>{
    return currentApp
}

let currentApp = {}

export function getCurrentApp(){
    return currentApp
}

export async function loadApps(){

    //先卸载所有失活的子应用
    const toUnMountApp = getAppsWithStatus(AppStatus.MOUNTED)

    let tmpApp
    toUnMountApp.forEach(app =>{
        if (app.activeRule(window.location)){
            tmpApp = app
        }
    })

    if (currentApp && tmpApp && tmpApp.name == currentApp.name){
        return false
    }

    await Promise.all(toUnMountApp.map(unMountApp))

    // 初始化所有刚注册的子应用
    const toLoadApp = getAppsWithStatus(AppStatus.BEFORE_BOOTSTRAP)
    await Promise.all(toLoadApp.map(bootstrapApp))
    
    // 加载所有符合条件的子应用
    const toMountApp = [
        ...getAppsWithStatus(AppStatus.BOOTSTRAPPED),
        ...getAppsWithStatus(AppStatus.UNMOUNTED)
    ]

    // 加载所有符合条件的子应用
    await Promise.all(toMountApp.map(mountApp))
}

export function registerApplication(application){
    let sandbox = new Sandbox(application)
    application.sandbox = sandbox
    appsMapping[application.name] = {
                                        application : application ,
                                        status : AppStatus.BEFORE_BOOTSTRAP,
                                        doc : null,
                                        sandbox : sandbox
                                    }
}

export function getAppsWithStatus(appStatus){
    let res = []
    let keys = Object.keys(appsMapping)
    keys.forEach((key)=>{
        if (appsMapping[key].status == appStatus){
            res.push(appsMapping[key].application)
        }
    })

    return res
}

export function start(){
    overwriteDocumentEvent()
    overwriteEventsAndHistory()
    loadApps()
}

function bootstrapApp(app){
    return new Promise((resolve ,reject)=>{
        if (appsMapping[app.name].application.activeRule(window.location)){
            currentApp = app
            parseHTML(app).then((doc)=>{
                let proxyWindow = appsMapping[app.name].sandbox.proxyWindow
                appsMapping[app.name].doc = doc
                appsMapping[app.name].status = AppStatus.BOOTSTRAPPED
                loadSources(appsMapping[app.name].doc ,app ,proxyWindow).then(()=>{
                    clearDocumentEvent(app.name)
                    resolve()
                })
            })
        }else{
            resolve()
        }
    })
}

function mountApp(app){
    return new Promise((resolve ,reject)=>{
        if (appsMapping[app.name].application.activeRule(window.location)){
            let proxyWindow = appsMapping[app.name].sandbox.proxyWindow
            appsMapping[app.name].status = AppStatus.MOUNTED
            appsMapping[app.name].sandbox.recover()
            setTimeout(()=>{
                proxyWindow['xm-airplane-'+app.name].mount()
                recoverDocumentEvent(app.name)
            } ,100)
            currentApp = app
        }
        resolve()
    })
}

export function unMountApp(app){
    return new Promise((resolve ,reject)=>{
        if (app.name){
            let proxyWindow = appsMapping[app.name].sandbox.proxyWindow
            proxyWindow['xm-airplane-' + app.name].unmount()
            appsMapping[app.name].sandbox.unmount()
            clearDocumentEvent(app.name)
            appsMapping[app.name].status = AppStatus.UNMOUNTED
            if (app.name == currentApp.name){
                currentApp = {}
            }
        }
        resolve()
    })
}