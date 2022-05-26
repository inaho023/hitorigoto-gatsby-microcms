// React
import { useEffect, useState } from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// シンタックスハイライト
import { load } from 'cheerio'
import Prism from 'prismjs'
// その他
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
    full: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=400&h=80fm=png${data.microcmsPicture.parameter}`),
    xl: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=250&h=50&fm=png${data.microcmsPicture.parameter}`),
    l: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=200&h=40&fm=png${data.microcmsPicture.parameter}`),
    m: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=150&h=30&fm=png${data.microcmsPicture.parameter}`),
    s: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=100&h=20&fm=png${data.microcmsPicture.parameter}`),
    xs: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=50&h=10&fm=png${data.microcmsPicture.parameter}`)
  }
  return {
    full: `&mark-w=400&mark-h=80&mark-align=bottom,center&mark-alpha=50&mark64=${base64Image.full}`,
    xl: `&mark-w=250&mark-h=50&mark-align=bottom,center&mark-alpha=50&mark64=${base64Image.xl}`,
    l: `&mark-w=200&mark-h=40&mark-align=bottom,center&mark-alpha=50&mark64=${base64Image.l}`,
    m: `&mark-w=150&mark-h=30&mark-align=bottom,center&mark-alpha=50&mark64=${base64Image.m}`,
    s: `&mark-w=100&mark-h=20&mark-align=bottom,center&mark-alpha=50&mark64=${base64Image.s}`,
    xs: `&mark-w=50&mark-h=10&mark-align=bottom,center&mark-alpha=50&mark64=${base64Image.xs}`
  }
}

// リッチリンク処理関数（Iframely）
const richLinkProcessor = ({ cheerio }) => {
  // ステート設定
  const [data, setData] = useState(null)
  // エンドポイント設定
  const url =
    `${serviceEndpoint.iframely.url}` +
    `?key=${serviceEndpoint.iframely.key}` +
    `&url=${encodeURI(cheerio.attr('href'))}` +
    `${serviceEndpoint.iframely.parameter}`
  // エンドポイントへアクセス
  useEffect(() => {
    fetch(url)
      .then(res => {
        return res.json()
      })
      .then(res => {
        return setData(res)
      })
      .catch(() => {
        return setData(null)
      })
  }, [])
  // データーがなければNULLを返す
  if (!data?.html) {
    return null
  }
  // 出力確認
  // console.log(data)
  // HTMLを返す
  return data.html
}

// リッチエディター処理関数（microCMS用）
export const richEditorProcessor = ({ title, codeClass, richEditor }) => {
  // ウォーターマーク生成
  const imageWatermark = imgixWatermark()
  // 本文をロード
  const cheerio = load(richEditor)
  // リッチリンク処理
  cheerio('a').map((index, elm) => {
    const result = richLinkProcessor({ cheerio: cheerio(elm) })
    if (result !== null) {
      cheerio(elm).html(result)
    }
  })
  // シンタックスハイライト処理
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  if (codeClass) {
    cheerio('pre code').map((index, elm) => {
      if (codeClass[index].class[0]) {
        // 言語設定
        cheerio(elm).addClass('language-' + codeClass[index].class[0])
        // 行番号設定
        cheerio(elm).parent().addClass('line-numbers')
      }
    })
  }
  // 画像処理
  cheerio('img').map((index, elm) => {
    // 画像ソースを取得
    const imgSrc = cheerio(elm).attr('src')
    // Altテキスト設定
    const altText = `${title} ${(index + 1).toString()}枚目`
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
      ' 1536w,' +
      imgSrc +
      imgixImageOption.body.xl +
      imageWatermark.xl +
      ' 1920w'
    const sizes = '100w'
    // フォールバック画像
    const src = imgSrc + imgixImageOption.body.l + imageWatermark.l
    // 属性削除
    cheerio(elm).removeAttr('src')
    cheerio(elm).removeAttr('width')
    cheerio(elm).removeAttr('height')
    // 属性設定
    cheerio(elm).attr('srcSet', srcSet)
    cheerio(elm).attr('sizes', sizes)
    cheerio(elm).attr('src', src)
    cheerio(elm).attr('alt', altText)
  })
  // 出力確認
  // console.log(cheerio.html())
  // リターン
  return cheerio.html()
}
