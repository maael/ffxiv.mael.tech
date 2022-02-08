const sharp = require('sharp');
const textract = require('textract');
const fetch = require('isomorphic-fetch');

module.exports = async (req, res) => {
  console.info('hey', req.file.buffer, 'req');
  const thresholded = await sharp(req.file.buffer).resize(1000).threshold(140).toBuffer();
  textract.fromBufferWithMime(req.file.mimetype, thresholded, {
    preserveLineBreaks: true
  }, async function (error, text) {
    if (error) return res.status(500).send({error});
    const items = text.split('\n').filter((s) => s.trim()).filter(Boolean);
    const results = await getItems(items);
    res.send(results);
  });
};

async function getMarketData (server = 'Moogle', items) {
  const itemIds = items.map(({ID}) => ID).join(',');
  const url = `https://xivapi.com/market/items?servers=${server}&ids=${itemIds}`;
  console.info('hitting market url at', url);
  const res = await fetch(url);
  const json = await res.json();
  json.reduce((item, obj) => {
    const result = item[server];
    console.info('result', result.ItemID)
    // console.info('item', item);
    console.info('server', server);
    // return {...obj, [result.ItemID]: result.Prices};
    return obj;
  }, {});
  return {};
}

async function getItems (items) {
  const url = 'https://xivapi.com/search';
  const res = await fetch(url, {
    method: 'POST',
    body: getItemQueryBody(items),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const json = await res.json();
  const results = json.Results
    .filter(({_, Name}) => _ === 'item' && items.includes(Name));
  const marketData = await getMarketData(undefined, results);
  return {results, marketData};
}

function getItemQueryBody (items) {
  return JSON.stringify(
    {
      body: {
        query: {
          bool: {
            should: items.map((item) => ({
              wildcard: {
                Name_en: item.toLowerCase()
              }
            }))
          }
        },
        from: 0,
        size: 100
      },
      indexes: 'item'
    }
  );
}
