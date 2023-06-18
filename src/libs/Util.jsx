// React
import { useEffect } from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// その他
import Prism from 'prismjs'
import * as cheerio from 'cheerio'
import { Base64 } from 'js-base64'

// 自作ライブラリー
import { imgixImageOption } from './Constant'

// 画像用ウォーターマーク
export const imgixWatermark = () => {
  // ウォーターマーク画像取得
  const data = useStaticQuery(graphql`
    query {
      microcmsPicture(pictureId: { eq: "watermark" }) {
        pictureId
        title
        picture {
          url
          width
          height
        }
        parameter
      }
    }
  `)
  // ウォーターマーク画像URLをBase64変換
  const base64Image = {
    full: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=300&h=60fm=png${data.microcmsPicture.parameter}`),
    xl: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=250&h=50&fm=png${data.microcmsPicture.parameter}`),
    l: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=200&h=40&fm=png${data.microcmsPicture.parameter}`),
    m: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=150&h=30&fm=png${data.microcmsPicture.parameter}`),
    s: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=100&h=20&fm=png${data.microcmsPicture.parameter}`),
    xs: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=50&h=10&fm=png${data.microcmsPicture.parameter}`)
  }
  return {
    full: `&mark-w=300&mark-h=60&mark-align=bottom,center&mark-alpha40&mark64=${base64Image.full}`,
    xl: `&mark-w=250&mark-h=50&mark-align=bottom,center&mark-alpha=40&mark64=${base64Image.xl}`,
    l: `&mark-w=200&mark-h=40&mark-align=bottom,center&mark-alpha=40&mark64=${base64Image.l}`,
    m: `&mark-w=150&mark-h=30&mark-align=bottom,center&mark-alpha=40&mark64=${base64Image.m}`,
    s: `&mark-w=100&mark-h=20&mark-align=bottom,center&mark-alpha=40&mark64=${base64Image.s}`,
    xs: `&mark-w=50&mark-h=10&mark-align=bottom,center&mark-alpha=40&mark64=${base64Image.xs}`
  }
}

// 画像処理関数（ImgIX）
const imageProcessor = ({ node, title, index }) => {
  // ウォーターマーク生成
  const imageWatermark = imgixWatermark()
  // 画像ソースを取得
  const imgSrc = node.attr('src')
  // レスポンシブ画像
  const srcSet =
    imgSrc +
    imgixImageOption.body.xs +
    imageWatermark.xs +
    ' 600w,' +
    imgSrc +
    imgixImageOption.body.s +
    imageWatermark.s +
    ' 900w,' +
    imgSrc +
    imgixImageOption.body.m +
    imageWatermark.m +
    ' 1200w,' +
    imgSrc +
    imgixImageOption.body.l +
    imageWatermark.l +
    ' 1500w,' +
    imgSrc +
    imgixImageOption.body.xl +
    imageWatermark.xl +
    ' 1800w'
  const sizes = '100w'
  // フォールバック画像
  const src = imgSrc + imgixImageOption.body.l + imageWatermark.l
  // Altテキスト設定
  const altText = `${title} ${(index + 1).toString()}枚目`
  // 属性削除
  node.removeAttr('src')
  // 属性設定
  node.attr('srcSet', srcSet)
  node.attr('sizes', sizes)
  node.attr('src', src)
  node.attr('alt', altText)
}

// シンタックスハイライト処理関数（Prism.js）
const syntaxHighlightProcessor = ({ node, codeClass = { user: [''] } }) => {
  // 共通設定
  node.addClass('match-braces')
  node.addClass('rainbow-braces')
  // 言語毎の処理
  switch (true) {
    case node.hasClass('language-bash'):
    case node.hasClass('language-shell'):
      if (codeClass.user[0]) {
        // コマンドラインプラグイン
        node.parent().addClass('command-line')
        node.parent().attr('data-user', codeClass.user[0])
        node.parent().attr('data-host', 'localhost')
      } else {
        // 行番号プラグイン
        node.parent().addClass('line-numbers')
      }
      break
    case node.hasClass('language-batch'):
      if (codeClass.user[0]) {
        // コマンドラインプラグイン
        node.parent().addClass('command-line')
        node.parent().attr('data-prompt', `C:\\Users\\${codeClass.user[0]}\\>`)
      } else {
        // 行番号プラグイン
        node.parent().addClass('line-numbers')
      }
      break
    case node.hasClass('language-powershell'):
      if (codeClass.user[0]) {
        // コマンドラインプラグイン
        node.parent().addClass('command-line')
        node.parent().attr('data-prompt', `PS C:\\Users\\${codeClass.user[0]}\\`)
      } else {
        // 行番号プラグイン
        node.parent().addClass('line-numbers')
      }
      break
    case node.hasClass('language-sql'):
      if (codeClass.user[0]) {
        // コマンドラインプラグイン
        node.parent().addClass('command-line')
        node.parent().attr('data-prompt', 'SQL>')
      } else {
        // 行番号プラグイン
        node.parent().addClass('line-numbers')
      }
      break
    default:
      // 行番号プラグイン
      node.parent().addClass('line-numbers')
      break
  }
}

// リッチエディター処理関数（microCMS用）
export const richEditorProcessor = ({ richEditor, title, codeClass }) => {
  // 本文をロード
  const $ = cheerio.load(richEditor)
  // シンタックスハイライト処理
  $('pre code').each((index, elm) => {
    // Prism.js ロード
    if (index === 0) {
      useEffect(() => {
        Prism.highlightAll()
      })
    }
    // シンタックスハイライト設定
    syntaxHighlightProcessor({
      node: $(elm),
      codeClass: codeClass[index]
    })
  })
  // 画像処理
  $('img').each((index, elm) => {
    imageProcessor({
      node: $(elm),
      title: title,
      index: index
    })
  })
  // リターン
  return $.html()
}
