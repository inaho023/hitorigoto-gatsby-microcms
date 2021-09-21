// React
import React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// 自作モジュール
import Layout from '../components/Layout'

// スタイルシート
import * as styles from '../styles/{page.id}.module.scss'

// クエリー実行
export const query = graphql`
  query ProfileQuery($id: String!) {
    microcmsPage(pageId: { eq: $id }) {
      pageId
      title
      datetime(formatString: "YYYYMMDD")
      body
      image {
        url
        width
        height
      }
    }
  }
`

// /pages/profile.js
const page = ({ data }) => {
  // ポジション
  const sitePosition = data.microcmsPage.title
  // イメージ
  return (
    <Layout sitePosition={sitePosition}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>{data.microcmsPage.title && data.microcmsPage.title}</h1>
        </div>
        <img className={styles.image} src={data.microcmsPage.image.url} alt={data.microcmsPage.title} />
        <div className={styles.post} key={data.microcmsPage.pageId} dangerouslySetInnerHTML={{ __html: data.microcmsPage.body }} />
      </div>
    </Layout>
  )
}

export default page
