const path = require('path')
const rehypePrism = require('@mapbox/rehype-prism')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypePrism],
  },
})
module.exports = withMDX({
  include: path.resolve(__dirname, 'assets'),
  pageExtensions: ['mdx', 'tsx'],
  poweredByHeader: false,
})
