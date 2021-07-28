// React
import * as React from 'react'

// Gatsby
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// 自作モジュール
import Layout from '../components/Layout'

// スタイルシート
import styles from '../styles/Profile.module.scss'

// /pages/profile.js
const profile = props => {
  const sitePosition = props.data.microcmsPage.title
  const image = props.data.microcmsPage.image && getImage(props.data.microcmsPage.image.url)
  return (
    <Layout sitePosition={sitePosition}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>{props.data.title && props.data.title}</h1>
        </div>
        <GatsbyImage className={styles.image} image={image} alt={props.data.microcmsPage.title} />
        <div className={styles.post} key={props.data.microcmsPage.pageId} dangerouslySetInnerHTML={{ __html: props.data.microcmsPage.body }} />
      </div>
    </Layout>
  )
}

export default profile
