import { crawlPage } from "./crawl.js"

async function main(){
    if (process.argv.length < 3){
        console.log('No website given')}
    if(process.argv.length > 3){
        console.log('Too many arguments given')}

    const baseURL = process.argv[2]
    console.log(`Starting crawl of: ${baseURL}`)
    const p = await crawlPage(baseURL)
    console.log('crawled pages =', p)
}
main()