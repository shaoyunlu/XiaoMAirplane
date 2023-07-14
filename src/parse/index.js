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
        Promise.all(loadStyles(styles)).then(data =>{
            isStylesDone = true
            addStyles(data ,app.pageEntry)
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
        promiseArray.push(loadSourceText(url + '/' + script.getAttribute('src')))
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
            
            new Function(warpCode).call(proxyWindow)
        })
    } catch (error) {
        console.log(error)
    }
}

function loadStyles(styles){
    let promiseArray = []
    styles.forEach(style =>{
        if (style.getAttribute('rel') == 'stylesheet'){
            promiseArray.push(new Promise((resolve ,reject)=>{
              resolve(style)  
            }))
        }
    })
    return promiseArray
}

function addStyles(styles ,url){
    styles.forEach(item => {
        if (typeof item === 'string') {
            const node = createElement('style', {
                type: 'text/css',
                textContent: item,
            })

            document.head.appendChild(node)
        } else {
            const linkEl = document.createElement('link')
            linkEl.rel = 'stylesheet'
            linkEl.href = url + '/' + item.getAttribute('href')
            document.head.appendChild(linkEl)
        }
    })
}