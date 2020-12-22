import fs, { read } from 'fs'

let begDate = new Date('2017-01-21')
let endDate = new Date('2020-12-21')


function readData (d) {
    let jsonData = []
    let nextDate = null
    let currDate = d
    
    while (currDate.toISOString() !== endDate.toISOString()) {
        let currPath = './TeddyTwistersSlack/general/' + currDate.toISOString().slice(0,10) + '.json'
        if (fs.existsSync(currPath)) {
            jsonData.push(JSON.parse(fs.readFileSync(currPath, 'utf-8')))
        }
        nextDate=new Date(currDate.setDate(currDate.getDate()+1))
        currDate=nextDate
    }
    return jsonData;
}

function parseMessageText(dayMessages) {
    let parsedData = dayMessages.reduce((string, item)=>{
        if(item.type=='message' && !item.subtype) {
            string += ' ' + item.text;
        }
        return string
    }, '')
    return parsedData
}

function parseDays(data) {
    let finalString = data.reduce((string, day) => {
        return string += parseMessageText(day)
    }, '')
    return finalString
}

function writeFile(text) {
    fs.writeFileSync('words.txt', text)
}

writeFile(parseDays(readData(begDate)))
