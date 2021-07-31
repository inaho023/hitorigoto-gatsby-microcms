// React
import React from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// 自作モジュール
import Layout from '../components/Layout'

// スタイルシート
import * as styles from '../styles/{pade.id}.module.scss'

// /pages/profile.js
const page = props => {
  // クエリー組立
  var ql = `
    {
      microcmsPage(pageId: {eq: "profile"}) {
        pageId
        title
        body
        image {
          url
          width
          height
        }
      }
    }
  `
  // クエリー実行
  const { data } = useStaticQuery(graphql(ql))
  // ポジション
  const sitePosition = props.data.microcmsPage.title
  // イメージ
  const image = data.microcmsPage.image && getImage(data.microcmsPage.image.url)
  return (
    <Layout sitePosition={sitePosition}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>{data.microcmsPage.title && data.microcmsPage.title}</h1>
        </div>
        <GatsbyImage className={styles.image} image={image} alt={data.microcmsPage.title} />
        <div className={styles.post} key={data.microcmsPage.pageId} dangerouslySetInnerHTML={{ __html: data.microcmsPage.body }} />
      </div>
    </Layout>
  )
}

export default page
