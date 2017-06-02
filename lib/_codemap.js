module.exports = {
  _ns: 'zenbot',
  _folder: 'lib',
  _maps: [
    require('./indicators/_codemap')
  ],
  // 'ema': require('./indicators/ema'),
  // 'dema': require('./indicators/dema'),
  // 'macd': require('./indicators/macd'),
  // 'macd_signal': require('./indicators/macd_signal'),
  // 'typ_price': require('./indicators/typ_price'),
  // 'cci': require('./indicators/cci'),
  // 'rsi': require('./indicators/rsi'),
  // 'stoch_osc': require('./indicators/stoch_osc'),
  'engine': require('./engine'),
  'normalize-selector': require('./normalize-selector'),
  'stddev': require('./stddev')
  }
