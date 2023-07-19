import {loadApps} from '../application/apps'

export function overwriteEventsAndHistory(){
    window.addEventListener('hashchange' ,()=>{
        loadApps()
    } ,true)
}