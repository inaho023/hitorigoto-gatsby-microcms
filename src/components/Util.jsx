// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// その他
import { Base64 } from 'js-base64'

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
  const b64Image = {
    full: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=400&h=80fm=png`),
    xl: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=250&h=50&fm=png`),
    l: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=200&h=40&fm=png`),
    m: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=150&h=30&fm=png`),
    s: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=100&h=20&fm=png`),
    xs: Base64.encodeURI(`${data.microcmsPicture.picture.url}?w=50&h=10&fm=png`)
  }
  return {
    full: `&mark-w=400&mark-h=80&mark-align=bottom,center&mark-alpha=50&mark64=${b64Image.full}`,
    xl: `&mark-w=250&mark-h=50&mark-align=bottom,center&mark-alpha=50&mark64=${b64Image.xl}`,
    l: `&mark-w=200&mark-h=40&mark-align=bottom,center&mark-alpha=50&mark64=${b64Image.l}`,
    m: `&mark-w=150&mark-h=30&mark-align=bottom,center&mark-alpha=50&mark64=${b64Image.m}`,
    s: `&mark-w=100&mark-h=20&mark-align=bottom,center&mark-alpha=50&mark64=${b64Image.s}`,
    xs: `&mark-w=50&mark-h=10&mark-align=bottom,center&mark-alpha=50&mark64=${b64Image.xs}`
  }
}
