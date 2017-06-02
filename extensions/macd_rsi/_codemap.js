module.exports = {
  _ns: 'zenbot',

  'strategies.macd_rsi': require('./strategy'),
  'strategies.list[]': '#strategies.macd_rsi'
}
