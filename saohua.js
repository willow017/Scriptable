async function saohua() {
  let url = 'https://api.vvhan.com/api/sao?type=json'
  let req = new Request(url)
  req.method = 'get'
  req.headers = {}
  let res = await req.loadJSON()
  console.log(res)
  return res
}

async function erciyuan() {
  let url = 'https://api.vvhan.com/api/acgimg?type=json'
  let req = new Request(url)
  req.method = 'get'
  req.headers = {}
  let res = await req.loadJSON()
  console.log(res.imgurl)
  return res.imgurl
}

async function getImge(imgurl) {
  const req = new Request(imgurl)
  req.method = 'get'
  return await req.loadImage()
}

async function small(imgurl, sao) {
  if(imgurl && sao){
    const widget = new ListWidget()
    const header = widget.addStack()
    const img = header.addImage(await getImge(imgurl))
    img.imageSize = new Size(300, 120)
    const body = widget.addStack()
    const yy = body.addText(`${sao.ishan}`)
    yy.centerAlignText()
    yy.font = Font.boldSystemFont(15)
    
    return widget
  } else {
    console.log("没有数据")
  }

}

try {
  const sao = await saohua()
  const imgurl = await erciyuan()
  const widget = await small(imgurl, sao)
  widget.presentMedium()
} catch (error) {
  console.log(error)
}