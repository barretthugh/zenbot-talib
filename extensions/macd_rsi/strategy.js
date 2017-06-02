var z = require('zero-fill')
  , n = require('numbro')
  , t = require('talib')
  , talib = require('ta-lib')
  , _ = require('lodash')

module.exports = function container (get, set, clear) {
  return {
    name: 'macd_rsi',
    description: 'Buy when MACD signal trending up, sell when trending down, using RSI',

    getOptions: function () {
      this.option('period', 'period length', String, '1h')
      this.option('min_periods', 'min. number of history periods', Number, 36)
      this.option('ema_periods', 'number of periods for trend EMA', Number, 34)
      this.option('dema_periods', 'number of periods for trend DEMA', Number, 34)
      this.option('macd_periods', 'number of periods for MACD', Number, 26)
      this.option('buy_rate', 'buy if trend EMA rate between neutral_rate and this positive float', Number, 0)
      this.option('sell_rate', 'sell if trend EMA rate between neutral_rate * -1 and this negative float', Number, 0)
      this.option('neutral_ema_rate', 'avoid signals when trend EMA rate is under this absolute value', Number, 'auto')
      this.option('neutral_dema_rate', 'avoid signals when trend DEMA rate is under this absolute value', Number, 'auto')
      this.option('max_buy_duration', 'avoid buy if trend duration over this number', Number, 0)
      this.option('max_sell_duration', 'avoid sell if trend duration over this number', Number, 0)
      this.option('rsi_periods', 'number of periods for oversold RSI', Number, 26)
      this.option('oversold_rsi', 'buy when RSI reaches this value', Number, 20)
      this.option('overbought_rsi', 'sell when RSI reaches this value', Number, 80)
      this.option('auto_rsi', 'use dynamic RSI values', Number, 0)
      this.option('stoch_osc_periods', 'number of periods for Stochastic Oscillator', Number, 14)
      this.option('overbought_stoch_osc', 'overbought value for Stochastic Oscillator', Number, 80)
      this.option('oversold_stoch_osc', 'oversold value for Stochastic Oscillator', Number, 20)
      this.option('auto_stoch_osc', 'use dynamic stochastic oscillator values', Number, 0)
      this.option('cci_periods', 'number of periods for CCI', Number, 20)
      this.option('auto_cci', 'use dynamic CCI thresholds', Number, 0)
      this.option('typ_price_periods', 'number of periods to get typical price', Number, 3)
    },

    calculate: function (s) {
      // initialize indicators
      // var indicators = get('indicators.list')
      // for (var indicator in indicators) {
      //   var name = indicators[indicator].name
      //   get('indicators.' + name)(s, name, s.options[name + '_periods'])
      //   if (s.lookback.length > s.options.min_periods) {
      //     // <indicator>_stddev - standard deviation of indicator over its range
      //     get('lib.stddev')(s, name + '_stddev', s.options[name + '_periods'], name)
      //     // <indicator>_rate - % change from last period of each indicator
      //     s.period[name + '_rate'] = (s.period[name] - s.lookback[0][name]) / s.lookback[0][name] * 100
      //     // <indicator>_rate_stddev - std dev of % change over half range
      //     get('lib.stddev')(s, name + '_rate_stddev', Math.floor(s.options[name + '_periods'] / 2), name + '_rate')
      //   }
      // }

    },
    onPeriod: function (s, cb) {
      for (var key in s.data) {
        s.data[key].push(s.period[key])
        if (s.data[key].length > 100) {
          s.data[key].splice(0,1)
        }
      }
      get('indicators.macd')(s)
      get('indicators.adx')(s)
      get('indicators.rsi')(s)
      get('indicators.ema')(s)
      console.log(s.period.ema)
      s.period.macd_macd = s.period.macd ? s.period.macd.outMACD.slice(-1)[0] : 0
      s.period.macd_signal = s.period.macd ? s.period.macd.outMACDSignal.slice(-1)[0] : 0
      s.period.macd_hist = s.period.macd ? s.period.macd.outMACDHist.slice(-1)[0] : 0
      if (s.period.macd){
        get('lib.stddev')(s, 'macd_macd_stddev', 26, 'macd_macd')
        get('lib.stddev')(s, 'macd_signal_stddev', 9, 'macd_signal')
        get('lib.stddev')(s, 'macd_hist_stddev', 14, 'macd_hist')

        // console.log(s.period.macd_hist, s.period.macd_hist_stddev)
      }
      if (s.period.adx) {
        get('lib.stddev')(s, 'adx_stddev', 20, 'adx')
        var sum1 = 0;
        var sum2 = 0;
        s.period.adx.slice(0, 2).forEach(function(adx){
          sum1 += adx
        })
        s.period.adx.slice(2, 4).forEach(function(adx){
          sum2+= adx
        })
        s.period.adx_direction = sum1 > sum2 ? 'up' : 'down'
        var adx = s.period.adx[s.period.adx.length - 1]
        if (adx < 25) {
          if (s.period.adx_direction === 'up') {
            s.period.adx_trend = 'sideways'
          }
          else {
            s.period.adx_trend = '    dead'
          }
        }
        else if (adx > 50) {
          if (s.period.adx_direction === 'up') {
            if (s.adx_trend !== '  strong') {
              s.acted_on_asx_trend = false
              s.adx_trend_duration = 0
            }
            s.adx_trend_duration++
            s.period.adx_trend = '  strong'
          }
          else {
            s.period.adx_trend = 'trending'
          }
        }
        else {
          if (s.period.adx_direction === 'up') {
            s.period.adx_trend = 'trending'
          } else {
            s.period.adx_trend = '  waning'
          }
        }
      }
      var rsi = s.period.rsi
      var rsi_overbought = (rsi > s.options.overbought_rsi)
      var rsi_oversold = (rsi < s.options.oversold_rsi)
      // console.log(rsi, s.options.overbought_rsi, rsi_overbought)
      if (s.period.macd && s.period.adx_trend) {
          if (s.trend !== 'up') {
            s.acted_on_trend = false
            s.trend_duration = 0
          }
          s.trend_duration++
        if (adx > 25) {

        }


        if(Math.abs(s.period.macd_hist) > (.75 * s.period.macd_hist_stddev) && (s.period.adx_trend === 'strong')) {
          if (rsi_oversold && s.period.macd_hist < 0 ) {
            s.signal = 'buy'
            s.position = 'bought'
            s.acted_on_trend = true
          }
          else if (rsi_overbought && s.period.macd_hist > 0 && s.period.adx_trend === 'strong') {
            s.signal = 'sell'
            s.position = 'sold'
            s.acted_on_trend = true
          }
        }
        else if (s.period.adx_direction === 'down'){

        }
      }
      cb()
    },

    onReport: function (s) {
      var cols = []
      if (s.period.adx_trend) {
        var color = 'grey'
        if (s.adx_direction === 'up') {
          color = 'green'
        }
        else if (s.adx_direction === 'down') {
          color = 'red'
        }
        cols.push(z(8, s.period.adx_trend, ' ')[color])
      }
      else {
        cols.push('         ')
      }
      if (s.options.neutral_dema_rate) {
        if (s.period.dema_rate_stddev) {
          cols.push(z(8, n(s.period.dema_rate_stddev).format('0.0000'), ' ').grey)
        }
        else {
          cols.push('         ')
        }
      }
      return cols
    }
  }
}
