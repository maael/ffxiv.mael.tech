const router = require('express').Router()
const mongoose = require('mongoose')
const debounce = require('lodash.debounce')
const Mount = require('./models/Mount')
const CachedRequest = require('./models/CachedRequest')

const {MONGO_URI} = process.env

console.info('connecting to', MONGO_URI)

const db = mongoose.connection;
const mongooseOptions = {auto_reconnect:true, reconnectInterval: 10000, useNewUrlParser: true};


db.on('connecting', () => {
  console.log('connecting to MongoDB...');
});
db.on('error', (error) => {
  console.error('Error in MongoDb connection: ' + error);
  mongoose.disconnect();
});
db.on('connected', () => {
  console.log('MongoDB connected!');
});
db.once('open', () => {
  console.log('MongoDB connection opened!');
});
db.on('reconnected', () => {
  console.log('MongoDB reconnected!');
});
db.on('disconnected', debounce(() => {
  console.log('MongoDB disconnected!');
  mongoose.connect(MONGO_URI, mongooseOptions);
}, mongooseOptions.reconnectInterval, {leading: true}));

const conn = mongoose.connect(MONGO_URI, mongooseOptions)

router.get('/mount', async (_, res) => {
  const items = await Mount.find({})
  res.send({items})
})

router.post('/mount', async (req, res) => {
  console.info('posting body', req.body)
  const item = new Mount(req.body)
  await item.save()
  res.send({item})
})

router.get('/xivapi/*', async (req, res) => {
  const endpoint = req.url.slice('/xivapi'.length)
  const query = req.query
  const existing = await CachedRequest.findOne({
    url: endpoint,
    querystring: query
  })
  if (existing) {
    return res.send(existing)
  }
  console.info('proxying', endpoint)
  const request = new CachedRequest({url: endpoint})
  const saved = await request.save()
  res.send(saved)
})

module.exports = router;
