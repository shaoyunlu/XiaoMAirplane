import AppStatus from './status'

const apps = {
    [AppStatus.MOUNTED] : [],
    [AppStatus.UNMOUNTED] : [],
    [AppStatus.BEFORE_BOOTSTRAP] : [],
    [AppStatus.BOOTSTRAPPED] : []
}

export async function loadApps(){
    // 先卸载所有失活的子应用

    // 初始化所有刚注册的子应用

    // 加载所有符合条件的子应用


    console.log('loadApps')
}

export function registerApplication(application){
    application.loadApp().then(app =>{
        // bootstrap ,mount ,unmount
        apps[AppStatus.BEFORE_BOOTSTRAP].push(app)
    })
}

export function getAppsWithStatus(appStatus){

}

export function start(){

}