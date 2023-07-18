import {loadApps} from '../application/apps'

const originalPushState = window.history.pushState
const originalReplaceState = window.history.replaceState

export function overwriteEventsAndHistory(){
    // window.history.pushState = (state ,title ,url)=>{
    //     const result = originalPushState.call(window.history,state,title,url)
    //     loadApps()
    //     return result
    // }

    // window.history.replaceState = (state ,title ,url)=>{
    //     const result = originalReplaceState.call(window.history ,state ,title ,url)
    //     loadApps()
    //     return result
    // }

    // window.addEventListener('popstate' ,(e)=>{
    //     e.preventDefault();
    // })

    window.addEventListener('hashchange' ,()=>{
        loadApps()
    } ,true)
}