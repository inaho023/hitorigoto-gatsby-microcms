// React
import { useEffect, useState } from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// その他
import Prism from 'prismjs'
import * as cheerio from 'cheerio'
import { Base64 } from 'js-base64'

// 自作ライブラリー
import { imgixImageOption, serviceEndpoint } from './Constant'

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
const syntaxHighlightProcessor = ({ node, codeClass = { class: ['none'], user: [] } }) => {
  // 言語設定
  node.addClass('language-' + codeClass.class[0])
  // 共通設定
  node.addClass('match-braces')
  node.addClass('rainbow-braces')
  // 言語毎の処理
  switch (codeClass.class[0]) {
    case 'bash':
    case 'shell':
      if (codeClass.user) {
        // コマンドラインプラグイン
        node.parent().addClass('command-line')
        node.parent().attr('data-user', codeClass.user[0])
        node.parent().attr('data-host', 'localhost')
      } else {
        // 行番号プラグイン
        node.parent().addClass('line-numbers')
      }
      break
    case 'batch':
      if (codeClass.user) {
        // コマンドラインプラグイン
        node.parent().addClass('command-line')
        node.parent().attr('data-prompt', `C:\\Users\\${codeClass.user[0]}\\>`)
      } else {
        // 行番号プラグイン
        node.parent().addClass('line-numbers')
      }
      break
    case 'powershell':
      if (codeClass.user) {
        // コマンドラインプラグイン
        node.parent().addClass('command-line')
        node.parent().attr('data-prompt', `PS C:\\Users\\${codeClass.user[0]}\\`)
      } else {
        // 行番号プラグイン
        node.parent().addClass('line-numbers')
      }
      break
    case 'sql':
      if (codeClass.user) {
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

// リッチリンク処理関数（Iframely）
const richLinkProcessor = ({ node }) => {
  // 定数定義
  const href = node.attr('href')
  // エンドポイント設定
  const url =
    `${serviceEndpoint.iframely.url}` +
    `?key=${serviceEndpoint.iframely.key}` +
    `&url=${encodeURI(href)}` +
    `${serviceEndpoint.iframely.parameter}`
  // エンドポイントアクセス
  const [data, setData] = useState(null)
  useEffect(() => {
    // フェッチ関数
    const getIframely = async url => {
      await fetch(url)
        .then(res => {
          return res.json()
        })
        .then(res => {
          return setData(res)
        })
        .catch(() => {
          return setData(null)
        })
    }
    getIframely(url)
  }, [])
  // データーが取得できたら置き換える
  if (data?.html) {
    // リンクを置換
    node.replaceWith(data.html)
  }
}

// リッチエディター処理関数（microCMS用）
export const richEditorProcessor = ({ richEditor, title, codeClass }) => {
  // 本文をロード
  const $ = cheerio.load(richEditor)
  // リッチリンク処理
  $('a').each((index, elm) => {
    // リッチリンク処理
    richLinkProcessor({
      node: $(elm)
    })
  })
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
