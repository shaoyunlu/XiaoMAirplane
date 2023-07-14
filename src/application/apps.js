import AppStatus from './status'
import {overwriteEventsAndHistory} from '../route/history'
import {parseHTML ,loadSources} from '../parse'
import Sandbox from '../sandbox'

const appsMapping = {}

export async function loadApps(){
    //先卸载所有失活的子应用
    const toUnMountApp = getAppsWithStatus(AppStatus.MOUNTED)
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
    let sandbox = new Sandbox()
    appsMapping[application.name] = {
                                        application : application ,
                                        status : AppStatus.BEFORE_BOOTSTRAP,
                                        doc : null,
                                        sandbox : sandbox,
                                        isInit : false
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
    overwriteEventsAndHistory()
    loadApps()
}

function bootstrapApp(app){
    return new Promise((resolve ,reject)=>{
        parseHTML(app).then((doc)=>{
            appsMapping[app.name].doc = doc
            appsMapping[app.name].status = AppStatus.BOOTSTRAPPED
            resolve()
        })
    })
}

function mountApp(app){
    return new Promise((resolve ,reject)=>{
        if (appsMapping[app.name].application.activeRule(window.location)){
            let proxyWindow = appsMapping[app.name].sandbox.proxyWindow
            // 首次挂载需要先加载资源
            if (!appsMapping[app.name].isInit){
                appsMapping[app.name].isInit = true
                loadSources(appsMapping[app.name].doc ,app ,proxyWindow).then(()=>{
                    proxyWindow['xm-airplane-'+app.name].mount()
                    resolve()
                })
            }else{
                proxyWindow['xm-airplane-'+app.name].mount()
                resolve()
            }
            appsMapping[app.name].status = AppStatus.MOUNTED
        }else{
            resolve()
        }
    })
}

function unMountApp(app){
    return new Promise((resolve ,reject)=>{
        if (!appsMapping[app.name].application.activeRule(window.location)){
            let proxyWindow = appsMapping[app.name].sandbox.proxyWindow
            proxyWindow['xm-airplane-' + app.name].unmount()
            appsMapping[app.name].sandbox.unmount()
            appsMapping[app.name].status = AppStatus.UNMOUNTED
        }
        resolve()
    })
}