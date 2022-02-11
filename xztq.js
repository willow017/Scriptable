const key = 'SKZNpwsvUIC47MDri'
const dizhi = 'Zunyi'
const imgurl = 'https://pic.netbian.com/uploads/allimg/210317/001935-1615911575642b.jpg'

async function getdata() {
    const url = 'https://api.seniverse.com/v3/weather/now.json?key=' + key + '&location=' + dizhi + '&language=zh-Hans&unit=c'
    const req = new Request(url)
    req.method = 'get'
    req.headers = {}
    const res = await req.loadJSON()
    return res
}

async function tqyb() {
    const url = 'https://api.seniverse.com/v3/weather/daily.json?key=' + key + '&location=' + dizhi + '&language=zh-Hans&unit=c&start=0&days=5'
    const req = new Request(url)
    req.method = 'get'
    req.headers = {}
    const res = await req.loadJSON()
    return res
}

async function getImage(url) {
  const req = new Request(url)
  req.method = 'get'
  return await req.loadImage()
}

async function renderSmall(data, yubao, img) {
  if(data && yubao && img) {
    const widget = new ListWidget()
    widget.backgroundImage = img
    const header = widget.addStack()
    const title = header.addText(`         willow weather`)
    title.font = Font.boldSystemFont(25)
    title.centerAlignText()
    const body = widget.addStack()
    const difang = body.addText(`${data.results[0].location.name}`)
    difang.leftAlignText()
    const kg = body.addText("                                     ")
    const zt = body.addText(`${data.results[0].now.text}`)
    const tem = body.addText(`${data.results[0].now.temperature}℃`)
    for(let i=0; i<3; i++){
      let yugao = widget.addStack()
      let date = yugao.addText(`${yubao.results[0].daily[i].date.slice(5, 10)} `)
      let yzt = yugao.addText(`${yubao.results[0].daily[i].text_day}  ${yubao.results[0].daily[i].text_night}  `)
      yzt.font = Font.boldSystemFont(13)
      let wd = yugao.addText(`  ${yubao.results[0].daily[i].high}℃～${yubao.results[0].daily[i].low}℃`)
    }
    
    return widget
  } else {
    console.log("没用数据")
  }
    
}

try {
  const data = await getdata()
  const yubao = await tqyb()
  const img = await getImage(imgurl)
  const widget = await renderSmall(data, yubao, img)
  widget.presentMedium()
  
} catch (error) {
  console.log(error);
}
