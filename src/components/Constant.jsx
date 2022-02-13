// シェアボタン用設定
export const sizeShareButton = 40 // シェアボタンサイズ
// サムネイル画像パラメーター
export const imgixImageOption = {
  list: '?fit=crop&crop=faces&fm=webp&q=20&w=270&h=180', // 記事リスト用画像オプション
  navi: '?fit=crop&crop=faces&fm=webp&q=20&w=96&h=96', // ナビゲーション用画像オプション
  ogp: '?fit=crop&crop=faces&fm=webp&q=50&w=1200&h=630', // OGP用画像オプション
  detail: {
    // 記事詳細用画像オプション
    xl: '?fit=crop&crop=faces&fm=webp&q=50&w=960&h=960',
    l: '?fit=crop&crop=faces&fm=webp&q=50&w=800&h=800',
    m: '?fit=crop&crop=faces&fm=webp&q=50&w=640&h=640',
    s: '?fit=crop&crop=faces&fm=webp&q=50&w=480&h=480',
    xs: '?fit=crop&crop=faces&fm=webp&q=50&w=320&h=320'
  },
  gallery: {
    // ギャラリー用画像オプション
    xl: '?fit=crop&crop=faces&fm=webp&q=20&w=480&h=480',
    l: '?fit=crop&crop=faces&fm=webp&q=20&w=430&h=430',
    m: '?fit=crop&crop=faces&fm=webp&q=20&w=380&h=380',
    s: '?fit=crop&crop=faces&fm=webp&q=20&w=330&h=330',
    xs: '?fit=crop&crop=faces&fm=webp&q=20&w=280&h=280'
  }
}
// 画像用コピーライト
export const imgixCopyright = {
  text: '©いなほちゅんのひとりごと',
  option: {
    full: '&txt-align=bottom,center&txt-size=96&txt-font=sans-serif,bold&txt-color=40FFFFFF&txt-line=2&txt-line-color=40332100',
    xl: '&txt-align=bottom,center&txt-size=48&txt-font=sans-serif,bold&txt-color=40FFFFFF&txt-line=2&txt-line-color=40332100',
    l: '&txt-align=bottom,center&txt-size=40&txt-font=sans-serif,bold&txt-color=40FFFFFF&txt-line=2&txt-line-color=40332100',
    m: '&txt-align=bottom,center&txt-size=32&txt-font=sans-serif,bold&txt-color=40FFFFFF&txt-line=2&txt-line-color=40332100',
    s: '&txt-align=bottom,center&txt-size=24&txt-font=sans-serif,bold&txt-color=40FFFFFF&txt-line=2&txt-line-color=40332100',
    xs: '&txt-align=bottom,center&txt-size=16&txt-font=sans-serif,bold&txt-color=40FFFFFF&txt-line=2&txt-line-color=40332100'
  }
}
// ソーシャルアカウント
export const socialAccount = { twitter: { url: 'https://twitter.com/inaho_lx/', account: '@inaho_lx' }, instagram: { url: 'https://www.instagram.com/inaho_lx/' }, twitcasting: { url: 'https://twitcasting.tv/inaho_lx/' } }
