// React
import React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// 自作モジュール
import Layout from '../components/Layout'

// スタイルシート
import * as styles from '../styles/404.module.scss'

// 定数
import { imgixImageOption } from '../components/Constant'

// ページクエリー
export const query = graphql`
  query e404PageQuery {
    microcmsPicture(pictureId: { eq: "404" }) {
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
`

// 404ページ
const E404 = ({ data }) => {
  // 画像取得
  const src = data.microcmsPicture.picture.url + imgixImageOption.e404.m
  const srcSet = data.microcmsPicture.picture.url + imgixImageOption.e404.s + ' 600w,' + data.microcmsPicture.picture.url + imgixImageOption.e404.m + ' 900w,' + data.microcmsPicture.picture.url + imgixImageOption.e404.l + ' 1200w'
  const sizes = '100w'
  // OGP設定
  const ogpInfo = {
    type: 'article',
    title: '404',
    description: 'ページがありません。',
    image: data.microcmsPicture.picture.url + imgixImageOption.e404.l
  }
  // ページ情報設定
  const misc = { position: '404', crumbLabel: '404', ogpInfo: ogpInfo }
  // リターン
  return (
    <Layout misc={misc}>
      <div className={styles.post}>
        <img srcSet={srcSet} sizes={sizes} src={src} alt={'ページがありません。'} loading={'lazy'} />
      </div>
    </Layout>
  )
}

export default E404
