/**
 * @file: rtpl loader (rt 没起作用 待研究。。)
 */
module.exports = function (context) {
  context = context.replace(/\'/g, '\\\'')
  context = context.replace(/\n/g, '\\n')
  return "module.exports = '" + context + "'"
}
