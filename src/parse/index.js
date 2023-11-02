import {getCurrentApp} from '../application/apps'

export function parseHTML(app){
    return new Promise(async (resolve ,reject)=>{
        const pageEntry = app.pageEntry
        const html = await loadSourceText(pageEntry)
        const domparser = new DOMParser()
        const doc = domparser.parseFromString(html, 'text/html')
        resolve(doc)
    })
}

export function loadSources(doc ,app ,proxyWindow){
    let isStylesDone = false, isScriptsDone = false
    return new Promise((resolve ,reject)=>{
        const { scripts, styles } = extractScriptsAndStyles(doc ,app.pageEntry)
        document.getElementById(app.container).innerHTML = doc.body.innerHTML
        Promise.all(loadStyles(styles ,app.pageEntry)).then(data =>{
            isStylesDone = true
            app.styles = data
            //addStyles(data ,app.pageEntry ,app.name)
            if (isScriptsDone && isStylesDone) resolve()
        })
        Promise.all(loadScripts(scripts ,app.pageEntry)).then(data =>{
            isScriptsDone = true
            executeScripts(data ,proxyWindow)
            if (isScriptsDone && isStylesDone) resolve()
        })
    })
}

function loadSourceText(url){
    return new Promise((resolve ,reject) =>{
        const xhr = new XMLHttpRequest()
        xhr.onload = (res)=>{
            resolve(res.target.response)
        }

        xhr.onerror = reject
        xhr.onabort = reject
        xhr.open('get' ,url)
        xhr.send()
    })
}

function extractScriptsAndStyles(doc){
    const parsedDocument = doc.documentElement;
    const scriptElements = parsedDocument.querySelectorAll('script');
    const styleElements = parsedDocument.querySelectorAll('link')

    return {scripts : scriptElements ,styles : styleElements}
}

function loadScripts(scriptElements ,url){
    let promiseArray = []
    scriptElements.forEach(script =>{
        let scriptSrc = script.getAttribute('src')
        if (scriptSrc.indexOf('http') >= 0){
            promiseArray.push(loadSourceText(scriptSrc));
        }else{
            promiseArray.push(loadSourceText(url + '/' + scriptSrc));
        }
    })
    return promiseArray
}

function executeScripts(scripts ,proxyWindow){
    try {
        scripts.forEach(code =>{
            const warpCode = `
                ;(function(proxyWindow){
                    with (proxyWindow) {
                        (function(window){${code}\n}).call(proxyWindow, proxyWindow)
                    }
                })(this);
            `
            const replacedCode = warpCode.replace(/\/static\//g, getCurrentApp().pageEntry +'/static/');
            new Function(replacedCode).call(proxyWindow ,proxyWindow)
        })
    } catch (error) {
        console.log(error)
    }
}

function loadStyles(styles ,url){
    let promiseArray = []
    styles.forEach(style =>{
        if (style.getAttribute('rel') == 'stylesheet'){
            promiseArray.push(new Promise((resolve ,reject)=>{
              resolve(style)
            }))
            //promiseArray.push(loadSourceText(url + '/' + style.getAttribute('href')))
        }
    })
    return promiseArray
}

export function addStyles(styles ,url ,appName){
    styles.forEach(item => {
        if (typeof item === 'string') {
            const node = document.createElement('style', {
                type: 'text/css'
            })
            node.innerHTML = item
            node.setAttribute('xm-airplane'+appName ,'')
            document.head.appendChild(node)
        } else {
            const linkEl = document.createElement('link')
            linkEl.rel = 'stylesheet'
            linkEl.href = url + '/' + item.getAttribute('href')
            linkEl.setAttribute('xm-airplane-'+appName ,'')
            document.head.appendChild(linkEl)
        }
    })
}

export function removeStyles(appName){
    const links = document.querySelectorAll(`link[xm-airplane-${appName}]`)

    links.forEach(linkNode => {
        linkNode.remove()
    })
}