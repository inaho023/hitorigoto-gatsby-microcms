// React
import * as React from 'react'

// Gatsby
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// 自作モジュール
import Layout from '../components/Layout'

// スタイルシート
import styles from '../styles/Profile.module.scss'

// 定数
import { THUMB_IMG_OPT_DETAIL } from '../components/Constant'

// /pages/profile.js
const profile = ({ data }) => {
  const sitePosition = data.microcmsPage.title
  const image = data.microcmsPage.image && getImage(data.microcmsPage.image.url)
  return (
    <Layout sitePosition={sitePosition}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>{data.title && data.title}</h1>
        </div>
        <div className={styles.image}>
          <GatsbyImage image={image} alt={data.microcmsPage.title} />
        </div>
        <div className={styles.post} key={data.microcmsPage.pageId} dangerouslySetInnerHTML={{ __html: data.microcmsPage.body }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    microcmsPage(pageId: { eq: "profile" }) {
      pageId
      title
      datetime
      image {
        url
        width
        height
      }
      body
    }
  }
`

export default profile
