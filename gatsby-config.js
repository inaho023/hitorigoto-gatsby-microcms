//
const env = process.env.NODE_ENV || 'development'
require('dotenv').config({ path: `./.env.${env}` })
//
const path = require('path')
//
const gatsbyRequiredRules = path.join(process.cwd(), 'node_modules', 'gatsby', 'dist', 'utils', 'eslint-rules')
//
module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: 'https://blog.inaho.space',
    title: 'いなほちゅんのひとりごと',
    subtitle: 'ブログ版',
    description: '私のメモ帳を公開してみる。',
    lang: 'ja'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [process.env.GA_TRACKING_ID],
        pluginConfig: {
          head: true
        }
      }
    },
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    {
      resolve: '@imgix/gatsby',
      options: {
        domain: 'images.microcms-assets.io',
        defaultImgixParams: { auto: ['format', 'compress'] },
        fields: [
          {
            nodeType: 'MicrocmsBlogImage',
            fieldName: 'imgixImage',
            rawURLKey: 'url'
          },
          {
            nodeType: 'MicrocmsPageImage',
            fieldName: 'imgixImage',
            rawURLKey: 'url'
          },
          {
            nodeType: 'MicrocmsPicturePicture',
            fieldName: 'imgixImage',
            rawURLKey: 'url'
          },
          {
            nodeType: 'MicrocmsBlogGalleriesGalleryImagesImage',
            fieldName: 'imgixImage',
            rawURLKey: 'url'
          }
        ]
      }
    },
    'gatsby-plugin-material-ui',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.png'
      }
    },
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.GATSBY_MICROCMS_API_KEY,
        serviceId: process.env.MICROCMS_SERVICE_ID,
        apis: [
          {
            endpoint: 'blog',
            query: {
              depth: 3
            }
          },
          {
            endpoint: 'page'
          },
          {
            endpoint: 'category'
          },
          {
            endpoint: 'tag'
          },
          {
            endpoint: 'picture'
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-disqus',
      options: {
        shortname: process.env.DISQUS_SHORTNAME
      }
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        // Gatsby required rules directory
        rulePaths: [gatsbyRequiredRules],
        // Default settings that may be ommitted or customized
        stages: ['develop'],
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: ['node_modules', 'bower_components', '.cache', 'public']
        // Any additional eslint-webpack-plugin options below
        // ...
      }
    }
  ]
}
