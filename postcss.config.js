/*
 * @Author: bluelife
 * @Date:   2020-09-01 22:46:08
 * @Last Modified by:   bluelife
 * @Last Modified time: 2020-09-01 23:05:25
 */
module.exports = {
  plugins: {
    autoprefixer: {
      browsers: [
        'Android >= 4.0',
        'iOS >= 8',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8',
        'last 10 versions' // 所有主流浏览器最近10版本用],
      ],
      grid: true
    },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  }
}
