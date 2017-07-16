// Node.js のサンプル
var request = require('request')
var crypto = require('crypto')

var key = '6nfnuzKts9K7tHSV8ktixD'
var secret = '5LtF3PaihHlaKXyewwfHIyKw7CIkm+ntx0fni4kZ2WQ='


var path = '/v1/ticker'
var query = '?product_code=FX_BTC_JPY'
var url = 'https://api.bitflyer.jp' + path + query
request(url, function (err, response, payload) {
    console.log(payload)
})
