// React
import React from 'react'

// Gatsby
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// 自作モジュール
import Layout from '../components/Layout'
import SEO from '../components/SEO'

// スタイルシート
import * as styles from '../styles/404.module.scss'

// ページクエリー
export const query = graphql`
  query e404PageQuery {
    microcmsPicture(pictureId: { eq: "404" }) {
      pictureId
      title
      picture {
        imgixImage {
          gatsbyImageData(
            imgixParams: {
              fit: "crop"
              crop: "faces"
              q: 40
              w: 1200
              markbase: "https://images.microcms-assets.io/assets/"
              mark: "6bbffba8f6d74ebea8e8fb201b5ddd27/44ce136c755d4a91a9edecdebea58c45/Watermark.png"
              markalign: "bottom,center"
              markalpha: 40
              markscale: 25
            }
            placeholderImgixParams: { fit: "crop", crop: "faces", q: 40, w: 1200 }
            placeholder: BLURRED
            width: 1200
            srcSetMaxWidth: 1200
            layout: CONSTRAINED
          )
        }
      }
    }
  }
`
// ヘッダー
export const Head = ({ location, pageContext }) => {
  return <SEO location={location} pageContext={pageContext} />
}

// 404ページ
const E404 = ({ data }) => {
  // リターン
  return (
    <Layout>
      <div className={styles.post}>
        <GatsbyImage image={getImage(data.microcmsPicture.picture.imgixImage)} alt={'ページがありません。'} />
      </div>
    </Layout>
  )
}

export default E404
