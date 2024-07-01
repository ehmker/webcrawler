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

function getLinksFromHTML(htmlBody, baseURL){
    // console.log(htmlBody)
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

async function getPageHTML(url){
        if(!url.startsWith('https://')){
            url = 'https://' + url
        }
        try{
            const response = await fetch(url)
            if (!response.ok){
                console.error(`HTTP Error. Status: ${response.status}`)
                return
            }
            const contentType = response.headers.get('content-type')
            if (!contentType.includes('text/html')){
                console.error(`Unsupported Content-Type: ${contentType}`)
                console.error(url)
                return
            }

            let html = await response.text()
            return html

        }catch (err) {
            console.error('Fetch Error: ', err)
        }
        return
}

async function crawlPage(baseURL, currentURL='', pages={}){
    if (currentURL === ''){
        currentURL = baseURL
    }
    if (!currentURL.includes(normalizeURL(baseURL))){
        return pages
    }
    const norm_url = normalizeURL(currentURL)

    if (pages[norm_url]){
        pages[norm_url]++
        return pages
    }else{
        pages[norm_url] = 1
    }

    let html = await getPageHTML(norm_url)

    let url_links = getLinksFromHTML(html, baseURL)

    for (let i = 0; i < url_links.length; i++){
        pages = await crawlPage(baseURL, url_links[i], pages)
    }
    
    // console.log('url_links =',url_links)

    return pages

    
}


export{ normalizeURL, getLinksFromHTML, crawlPage }