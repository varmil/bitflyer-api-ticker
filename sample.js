const _ = require('lodash')
const request = require('request')
const rp = require('request-promise')
const crypto = require('crypto')
const mysql = require('mysql')


const DB_NAME = 'bitflyer'
const TABLE_NAME = 'tickers'
const conn  = mysql.createConnection({
  host            : '192.168.99.100',
  user            : 'root',
  password        : '',
  database        : DB_NAME,
});
const BASE_URI = 'https://api.bitflyer.jp'


// GET ticker API
async function fetchTicker() {
  const path = '/v1/ticker'
  const query = '?product_code=FX_BTC_JPY'
  const url = BASE_URI + path + query
  try {
    const json = await rp({ uri: url, json: true })
    const data = [ json.timestamp, json.total_bid_depth, json.total_ask_depth, json.ltp, json.volume_by_product ]
    return data
  } catch (e) {
    console.error(e)
  }
}

// GET board API
async function fetchBoard() {
  const path = '/v1/board'
  const query = '?product_code=FX_BTC_JPY'
  const url = BASE_URI + path + query
  try {
    const { mid_price, bids, asks } = await rp({ uri: url, json: true })
    const data = [ JSON.stringify(_.take(bids, 11)), JSON.stringify(_.take(asks, 11)) ]
    return data
  } catch (e) {
    console.error(e)
  }
}


// insert data
function insertRow(data) {
  const query = `INSERT INTO ${TABLE_NAME}
                  (timestamp, total_bid_depth, total_ask_depth, ltp, volume_by_product, bids, asks) VALUES
                  (?, ?, ?, ?, ?, ?, ?)`
  conn.query(query, data, (error, results, fields) => {
    if (error) return console.error(error)
    console.log('SUCCESS::', data)
  })
}


// TASK
async function fetchAndSave() {
  // Call API
  const p1 = fetchTicker()
  const p2 = fetchBoard()
  const result = await Promise.all([ p1, p2 ])

  // concat placeholder
  const data = result[0].concat(result[1])

  // insert
  insertRow(data)
}

// RUN repeatedly
// const INTERVAL_MS = 60 * 1000
// setInterval(fetchAndSave, INTERVAL_MS)

// RUN once
(async () => {
  conn.connect()
  await fetchAndSave()
  conn.end()
})()
