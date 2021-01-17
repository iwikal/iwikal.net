const path = require('path')
const rehypePrism = require('@mapbox/rehype-prism')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypePrism],
  },
})
module.exports = withMDX({
  pageExtensions: ['mdx', 'tsx'],
  poweredByHeader: false,
})
