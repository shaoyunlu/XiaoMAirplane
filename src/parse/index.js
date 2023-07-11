export function loadSourceText(url){
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

export async function parseHTMLandLoadSources(app){
    const pageEntry = app.pageEntry
    const html = await loadSourceText(pageEntry)
}