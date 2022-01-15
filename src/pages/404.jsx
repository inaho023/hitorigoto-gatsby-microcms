// React
import React from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// 自作モジュール
import Layout from '../components/Layout'

// スタイルシート
import * as styles from '../styles/404.module.scss'

// 404ページ
const E404 = () => {
  // クエリー実行
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
          title
          subtitle
          description
          lang
        }
      }
      microcmsPicture(pictureId: { eq: "ogp-no-picture" }) {
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
  const pageContext = { info: { site: data.site.siteMetadata, image: data.microcmsPicture } }
  // OGP設定
  const ogp = {
    type: 'article',
    title: '404',
    description: 'ページがありません。'
  }
  // ページ情報設定
  const misc = { position: '404', ogp: ogp }
  // リターン
  return (
    <Layout misc={misc} pageContext={pageContext}>
      <div className={styles.post}>
        <h2>404 | ページがありません</h2>
      </div>
    </Layout>
  )
}

export default E404
