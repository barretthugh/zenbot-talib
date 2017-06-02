var t = require('talib')
module.exports = function container (get, set, clear) {
  return function ema (s, options) {
    if (!options) {
      var options = 0
    }
    t.execute({
        name: "EMA",
        startIdx: 0,
        endIdx: s.data.close.length - 1,
        inReal: s.data.close,
        optInTimePeriod: options.ema_periods ? options.ema_periods: 34,
    }, function (err, result) {
      s.period.ema = result.result.outReal.slice(-1)[0]
    })
  }
}
