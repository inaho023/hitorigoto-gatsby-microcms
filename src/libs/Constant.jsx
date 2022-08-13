// シェアボタン用設定
export const sizeShareButton = 36
// 画像用パラメーター
export const imgixImageOption = {
  // 記事リスト用画像オプション
  list: {
    xl: '?fit=crop&crop=faces&fm=webp&q=20&w=600&h=400',
    l: '?fit=crop&crop=faces&fm=webp&q=20&w=480&h=320',
    m: '?fit=crop&crop=faces&fm=webp&q=20&w=360&h=240',
    s: '?fit=crop&crop=faces&fm=webp&q=20&w=240&h=160',
    xs: '?fit=crop&crop=faces&fm=webp&q=20&w=120&h=80'
  },
  // ナビゲーション用画像オプション
  navi: '?fit=crop&crop=faces&fm=webp&q=20&w=96&h=96',
  // OGP用画像オプション
  ogp: '?fit=crop&crop=faces&fm=webp&q=50&w=1200&h=630',
  // 記事詳細用画像オプション
  detail: {
    xl: '?fit=crop&crop=faces&fm=webp&q=40&w=960&h=720',
    l: '?fit=crop&crop=faces&fm=webp&q=40&w=800&h=600',
    m: '?fit=crop&crop=faces&fm=webp&q=40&w=640&h=480',
    s: '?fit=crop&crop=faces&fm=webp&q=40&w=480&h=360',
    xs: '?fit=crop&crop=faces&fm=webp&q=40&w=320&h=240'
  },
  // ギャラリー用画像オプション
  gallery: {
    xl: '?fit=crop&crop=faces&fm=webp&q=15&w=480&h=480',
    l: '?fit=crop&crop=faces&fm=webp&q=15&w=430&h=430',
    m: '?fit=crop&crop=faces&fm=webp&q=15&w=380&h=380',
    s: '?fit=crop&crop=faces&fm=webp&q=15&w=330&h=330',
    xs: '?fit=crop&crop=faces&fm=webp&q=15&w=280&h=280'
  },
  // 記事本文用画像オプション
  body: {
    xl: '?fm=webp&q=50&w=1920',
    l: '?fm=webp&q=50&w=1536',
    m: '?fm=webp&q=50&w=1200',
    s: '?fm=webp&q=50&w=900',
    xs: '?fm=webp&q=50&w=600'
  },
  // 404ページ用画像オプション
  e404: {
    l: '?fm=webp&q=20&w=1200',
    m: '?fm=webp&q=20&w=900',
    s: '?fm=webp&q=20&w=600'
  }
}
// ソーシャルアカウント
export const socialAccount = {
  twitter: {
    url: 'https://twitter.com/inaho_lx/',
    account: '@inaho_lx'
  },
  twilog: {
    url: 'https://twilog.org/inaho_lx'
  },
  instagram: {
    url: 'https://www.instagram.com/inaho_lx/'
  },
  twitcasting: {
    url: 'https://twitcasting.tv/inaho_lx/'
  }
}

// エンドポイント
export const serviceEndpoint = {
  microCMSBlog: {
    url: 'https://inaho.microcms.io/api/v1/blog'
  },
  microCMSPage: {
    url: 'https://inaho.microcms.io/api/v1/page'
  },
  iframely: {
    url: 'https://iframe.ly/api/iframely',
    key: 'ed2561c3c4c71d4dece262554ddd48b8',
    parameter: '&iframe=1,card&media=0&omit_script=1&omit_css=0&language=ja'
  }
}
