import {JSDOM} from 'jsdom'

function normalizeURL(urlString){
    let url = new URL(urlString)
    if (url.pathname.endsWith('/')){
        return url.hostname + url.pathname.slice(0,-1)
    }
    else{
        return url.hostname + url.pathname
    }
}

function getURLFromHTML(htmlBody, baseURL){
    let dom = new JSDOM(htmlBody)
    let anchor_list = dom.window.document.querySelectorAll('a')
    const url_arr = []
    anchor_list.forEach(anchor => {
        if (anchor.href[0] === '/'){
            url_arr.push(baseURL + anchor.href)
        }else{
            url_arr.push(anchor.href)
        }
    
    });

    return url_arr
}


async function crawlPage(url){
    try {
        const response = await fetch(url)//.then(response => response.text())
    } catch(error){
        console.error('error occured: ', error)
    }

    if (response.status > 399){
        console.log(`bad response: ${response.status} - ${response.statusText}`)
        return
    }

    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')){
        console.log(`non-HTML response: ${contentType}`)
    }

    const responseText = await response.text()
    console.log(responseText)
    
}

const url = 'https://wagslane.dev'
crawlPage(url)
export{ normalizeURL, getURLFromHTML, crawlPage }