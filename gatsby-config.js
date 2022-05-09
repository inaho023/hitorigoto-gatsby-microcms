const env = process.env.NODE_ENV || 'development'
require('dotenv').config({ path: `./.env.${env}` })

const path = require('path')

const gatsbyRequiredRules = path.join(process.cwd(), 'node_modules', 'gatsby', 'dist', 'utils', 'eslint-rules')

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
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/favicon.png'
      }
    },
    {
      resolve: 'gatsby-plugin-breadcrumb',
      options: {
        useAutoGen: true,
        autoGenHomeLabel: 'ホーム',
        crumbLabelUpdates: [
          {
            pathname: '/page',
            crumbLabel: 'インデックス'
          },
          {
            pathname: '/archive',
            crumbLabel: 'アーカイブ'
          },
          {
            pathname: '/category',
            crumbLabel: 'カテゴリー'
          },
          {
            pathname: '/tag',
            crumbLabel: 'タグ'
          },
          {
            pathname: '/post',
            crumbLabel: '記事'
          },
          {
            pathname: '/category/jmb3nm402',
            crumbLabel: 'ブログ'
          },
          {
            pathname: '/category/xwqou2tki',
            crumbLabel: 'ライブフォト'
          },
          {
            pathname: '/category/vdovwx_81',
            crumbLabel: '撮影会フォト'
          },
          {
            pathname: '/category/f1-nlwxxe',
            crumbLabel: 'その他フォト'
          },
          {
            pathname: '/tag/TwbCIwQm',
            crumbLabel: 'AWX'
          },
          {
            pathname: '/tag/6ogaa84ra',
            crumbLabel: 'AZUMA HITOMI'
          },
          {
            pathname: '/tag/jwJxXoVe',
            crumbLabel: 'Ansible'
          },
          {
            pathname: '/tag/wtflztj69',
            crumbLabel: 'Debian'
          },
          {
            pathname: '/tag/2qg6XY4Z',
            crumbLabel: 'Docker'
          },
          {
            pathname: '/tag/rcq_sh1ag',
            crumbLabel: 'EMOLVA撮影会'
          },
          {
            pathname: '/tag/0xft3r1a6',
            crumbLabel: 'Fight Sparkle'
          },
          {
            pathname: '/tag/yioMfLU3',
            crumbLabel: 'FreeRADIUS'
          },
          {
            pathname: '/tag/34oglp-gp',
            crumbLabel: 'Fresh!フォトセッション'
          },
          {
            pathname: '/tag/tp0i2d3rsu',
            crumbLabel: 'Fresh!プレミアム撮影会'
          },
          {
            pathname: '/tag/5ccwgxbgo',
            crumbLabel: 'Fresh!屋外大撮影会'
          },
          {
            pathname: '/tag/6BOCamPb',
            crumbLabel: 'Kea DHCP Server'
          },
          {
            pathname: '/tag/nu7n--9x_6',
            crumbLabel: 'PC'
          },
          {
            pathname: '/tag/x3fpN6pn',
            crumbLabel: 'ProxmoxVE'
          },
          {
            pathname: '/tag/vjl_lceruz1',
            crumbLabel: 'Raspberry Pi'
          },
          {
            pathname: '/tag/ehlj5e4s0k',
            crumbLabel: 'Raspbian'
          },
          {
            pathname: '/tag/pQNjHdTI',
            crumbLabel: 'Samba'
          },
          {
            pathname: '/tag/ypi1p8vhhr',
            crumbLabel: 'Server'
          },
          {
            pathname: '/tag/yafoxuxyp',
            crumbLabel: 'S→gexte'
          },
          {
            pathname: '/tag/a06jcu--jz8y',
            crumbLabel: 'TA女子'
          },
          {
            pathname: '/tag/y0bkt72_7z',
            crumbLabel: 'Ubuntu'
          },
          {
            pathname: '/tag/qhhodxcqe',
            crumbLabel: 'hitomebore（片目惚れ）'
          },
          {
            pathname: '/tag/exlpwvs6m',
            crumbLabel: 'yucat'
          },
          {
            pathname: '/tag/8pxfs1b2b',
            crumbLabel: 'お散歩'
          },
          {
            pathname: '/tag/nd_d0f77v',
            crumbLabel: 'トイトニック'
          },
          {
            pathname: '/tag/bap2s1z0t',
            crumbLabel: 'ミスFLASH2018'
          },
          {
            pathname: '/tag/6k9i8ait1',
            crumbLabel: 'ミスジェニック'
          },
          {
            pathname: '/tag/vcf27qylc',
            crumbLabel: 'ワンエイト撮影会'
          },
          {
            pathname: '/tag/q9uxi559-7',
            crumbLabel: '七瀬ちさと'
          },
          {
            pathname: '/tag/l1g1hjplf',
            crumbLabel: '個人撮影会'
          },
          {
            pathname: '/tag/4u9mimygm',
            crumbLabel: '優木萌々花'
          },
          {
            pathname: '/tag/djw_pdvwe',
            crumbLabel: '平林萌愛'
          },
          {
            pathname: '/tag/hjdf2p49do',
            crumbLabel: '新津由衣'
          },
          {
            pathname: '/tag/vjbhuuj3p',
            crumbLabel: '月乃ゆき'
          },
          {
            pathname: '/tag/dhyeciqc7',
            crumbLabel: '月陽れい'
          },
          {
            pathname: '/tag/ktclwpgbk',
            crumbLabel: '有村瞳'
          },
          {
            pathname: '/tag/lisfriepl',
            crumbLabel: '東京Lily Session'
          },
          {
            pathname: '/tag/c48kuvhqy',
            crumbLabel: '東京写真連盟'
          },
          {
            pathname: '/tag/35lldq_t6',
            crumbLabel: '桜'
          },
          {
            pathname: '/tag/yzyzibuo7',
            crumbLabel: '永野愛佳'
          },
          {
            pathname: '/tag/xn58n38ea',
            crumbLabel: '藍田麻利衣'
          },
          {
            pathname: '/tag/navj7yild',
            crumbLabel: '都華乃'
          }
        ]
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
