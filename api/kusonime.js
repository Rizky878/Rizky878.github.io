
var router = require('express').Router(),    
{ checkApiKey } = require('./')       
const cheerio = require('cheerio')
const axios = require('axios')

const kusonime = async (query) => {
 const ling = await axios.get(`https://kusonime.com/?s=${query}&post_type=post`)
const $ = cheerio.load(ling.data)
const hasil = []

const link = $('div.venz > ul > div.kover > div.detpost > div.content > h2.episodeye > a').attr('href')
const judul = $('div.venz > ul > div.kover > div.detpost > div.content > h2.episodeye > a').attr('title')


const lling = await axios.get(`${link}`) 
const $$ = cheerio.load(lling.data)
const img = $$('div.venser > div.post-thumb > img').attr('src')
const title_japanese = $$('div.venser > div.venutama > div.lexot > div.info > p').eq(0).text().replace('Japanese: ','')
const genre = $$('div.venser > div.venutama > div.lexot > div.info > p').eq(1).text().replace('Genre : ','')
const season =  $$('div.venser > div.venutama > div.lexot > div.info > p').eq(2).text().replace('Seasons : ','')
const producer =  $$('div.venser > div.venutama > div.lexot > div.info > p').eq(3).text().replace('Producers: ','')
const tipe =  $$('div.venser > div.venutama > div.lexot > div.info > p').eq(4).text().replace('Type: ','')
const status = $$('div.venser > div.venutama > div.lexot > div.info > p').eq(5).text().replace('Status: ','')
const total_eps =  $$('div.venser > div.venutama > div.lexot > div.info > p').eq(6).text().replace('Total Episode: ','')
const score =  $$('div.venser > div.venutama > div.lexot > div.info > p').eq(7).text().replace('Score: ','')
const duration =  $$('div.venser > div.venutama > div.lexot > div.info > p').eq(8).text().replace('Duration: ','')
const rilis =  $$('div.venser > div.venutama > div.lexot > div.info > p').eq(9).text().replace('Released on: ','')
const tigaDrive = $$('div.venser > div.venutama > div.lexot > div.dlbod > div.smokeddl > div.smokeurl > a').eq(2).attr('href')
const empatDrive = $$('div.venser > div.venutama > div.lexot > div.dlbod > div.smokeddl > div.smokeurl > a').eq(7).attr('href')
hasil.push({
  status: 200,
  creator: "Fajar, Iky Badut",
  result: { link, judul, img, title_japanese, genre, season, producer, tipe, status, total_eps, score, duration, rilis, tigaDrive, empatDrive }
  })
return hasil
}

  router.get('/', async(req, res) => {
      if (!req.query.q) return res.json({ code: 403, status: false, msg: 'Please input query: q' })
    	kusonime(req.query.q).then(respon => res.json(respon)).catch(err => res.json(err))})
    	
    	module.exports = router
