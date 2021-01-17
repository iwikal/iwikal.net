const path = require('path')
const rehypePrims = require('@mapbox/rehype-prism')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypePrims],
  },
})
module.exports = withMDX({
  include: path.resolve(__dirname, 'assets'),
  pageExtensions: ['mdx', 'tsx'],
})
