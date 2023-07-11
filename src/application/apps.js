import AppStatus from './status'
import {overwriteEventsAndHistory} from '../route/history'

const appsMapping = {}

export async function loadApps(){
    //先卸载所有失活的子应用
    // const toUnMountApp = getAppsWithStatus(AppStatus.MOUNTED)
    // await Promise.all(toUnMountApp.map(unMountApp))

    // 初始化所有刚注册的子应用
    const toLoadApp = getAppsWithStatus(AppStatus.BEFORE_BOOTSTRAP)
    toLoadApp.forEach(app =>{
        bootstrapApp(app)
    })
    //await Promise.all(toLoadApp.map(bootstrapApp))

    // 加载所有符合条件的子应用
    // const toMountApp = [
    //     ...getAppsWithStatus(AppStatus.BOOTSTRAPPED),
    //     ...getAppsWithStatus(AppStatus.UNMOUNTED)
    // ]

    // 加载所有符合条件的子应用
    //await Promise.all(toMountApp.map(mountApp))
}

export function registerApplication(application){
    appsMapping[application.name] = {
                                        application : application ,
                                        status : AppStatus.BEFORE_BOOTSTRAP,
                                        sources : {
                                            js : null,
                                            css : null,
                                            html : null
                                        }
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
    console.log(app)
    // app.then(tmp =>{
    //     tmp.bootstrap()
    //     // 状态置为BOOTSTRAP
    //     appsMapping[tmp.name].status = AppStatus.BOOTSTRAPPED
    // })
}

function mountApp(app){
    // 判断当前url
    app.then(tmp =>{
        if (appsMapping[tmp.name].application.activeRule(window.location)){
            tmp.mount()
            // 状态设置为MOUNTED
            appsMapping[tmp.name].status = AppStatus.MOUNTED
        }
    })
}

function unMountApp(app){
    // 判断当前url
    app.then(tmp =>{
        if (!appsMapping[tmp.name].application.activeRule(window.location)){
            tmp.unmount()
            // 状态设置为UNMOUNTED
            appsMapping[tmp.name].status = AppStatus.UNMOUNTED
        }
    })
}