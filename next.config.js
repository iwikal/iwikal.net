const path = require('path')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})
module.exports = withMDX({
  include: path.resolve(__dirname, 'assets'),
  pageExtensions: ['mdx', 'tsx'],
})
