// React
import React from 'react'

// Material-UI
import Box from '@mui/material/Box'

// 自作モジュール
import Layout from './Layout'
import { imgixWatermark } from './Util'

// スタイルシート
import * as styles from '../styles/PagePost.module.scss'

// 定数
import { imgixImageOption } from './Constant'

const PagePost = ({ data, pageContext }) => {
  // ページ詳細
  const page = data.microcmsPage
  // ウォーターマークURL取得
  const imageWatermark = imgixWatermark()
  // OGP設定
  const ogp = {
    type: 'article',
    url: `/${page.pageId ? page.pageId : page.id}`,
    title: page.title,
    description: page.body,
    image: page.image && page.image.url + imgixImageOption.ogp + imageWatermark.xl
  }
  // ページ情報設定
  const misc = { position: page.title, ogp: ogp }
  // 画像URL生成
  const src = page.image.url + imgixImageOption.detail.m + imageWatermark.m
  const srcSet = `${page.image.url + imgixImageOption.detail.xs + imageWatermark.xs} 320w,
                  ${page.image.url}${imgixImageOption.detail.s}${imageWatermark.s} 480w,
                  ${page.image.url}${imgixImageOption.detail.m}${imageWatermark.m} 640w,
                  ${page.image.url}${imgixImageOption.detail.l}${imageWatermark.l} 800w,
                  ${page.image.url}${imgixImageOption.detail.xl}${imageWatermark.xl} 960w`
  const sizes = '100vw'
  // イメージ
  return (
    <Layout misc={misc} pageContext={pageContext} crumbLabel={page.title}>
      <Box className={styles.title}>
        <h1>{data.microcmsPage.title && data.microcmsPage.title}</h1>
      </Box>
      <img className={styles.image} src={src} srcSet={srcSet} sizes={sizes} alt={page.title} />
      <Box className={styles.post} key={data.microcmsPage.pageId} dangerouslySetInnerHTML={{ __html: data.microcmsPage.body }} />
    </Layout>
  )
}

export default PagePost
