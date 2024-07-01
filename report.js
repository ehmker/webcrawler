function printReport(pages){
    console.log('Crawled Page Report')
    const sorted_pages = sortObject(pages)
    console.log('sorted pages=',sorted_pages)
    for (let i = 0; i < sorted_pages.length; i++)
        console.log(`Found ${sorted_pages[i]['value']} internal links to ${sorted_pages[i]['key']}`) 

}
function sortObject(obj){
    let arr = []
    for (let prop in obj){
        if(obj.hasOwnProperty(prop)){
            arr.push({
                'key': prop,
                'value': obj[prop]
            })
        }
    }
    arr.sort(function(a, b) {return b.value - a.value})
    return arr
}

export {printReport}