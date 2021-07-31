const env = process.env.NODE_ENV || 'development'
require('dotenv').config({ path: `./.env.${env}` })

module.exports = {
  siteMetadata: {
    siteUrl: 'https://blog.inaho.space',
    title: 'いなほちゅんのひとりごと',
    subtitle: 'Gatsby版',
    description: '私のメモ帳を公開してみる。',
    lang: 'ja'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: process.env.GA_TRACKING_ID,
        head: true
      }
    },
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.png'
      }
    },
    'gatsby-plugin-fontawesome-css',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: ['Kosugi Maru'],
        display: 'swap'
      }
    },
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$|\.ts$|\.tsx$/,
        exclude: /(.cache|.vscode|node_modules|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false
        }
      }
    },
    {
      resolve: 'gatsby-source-microcms',
      options: {
        apiKey: process.env.MICROCMS_API_KEY,
        serviceId: 'inaho',
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
            endpoint: 'categories'
          },
          {
            endpoint: 'tags'
          }
        ]
      }
    }
  ]
}
