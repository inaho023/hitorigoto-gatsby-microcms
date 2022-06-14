// React
import React from 'react'

// Material-UI
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

// Iframely
import Iframely from './Iframely'

// 自作モジュール
import Layout from './Layout'

// 自作ライブラリー
import { imgixWatermark, richEditorProcessor } from '../libs/Util'
import { imgixImageOption } from '../libs/Constant'

// スタイルシート
import * as styles from '../styles/PagePost.module.scss'

// ページ記事詳細コンポーネント
const PagePost = ({ data, pageContext }) => {
  // ページ記事詳細
  const page = data.microcmsPage
  // ウォーターマークURL取得
  const imageWatermark = imgixWatermark()
  // OGP設定
  const ogpInfo = {
    type: 'article',
    url: `/${page.pageId ? page.pageId : page.id}`,
    title: page.title,
    description: page.body,
    image: page.image && page.image.url + imgixImageOption.ogp + imageWatermark.xl
  }
  // ページ情報設定
  const misc = { position: page.title, crumbLabel: page.title, ogpInfo: ogpInfo }
  // 画像URL生成
  const src = page.image.url + imgixImageOption.detail.m + imageWatermark.m
  const srcSet =
    `${page.image.url}${imgixImageOption.detail.xs}${imageWatermark.xs} 320w,` +
    `${page.image.url}${imgixImageOption.detail.s}${imageWatermark.s} 480w,` +
    `${page.image.url}${imgixImageOption.detail.m}${imageWatermark.m} 640w,` +
    `${page.image.url}${imgixImageOption.detail.l}${imageWatermark.l} 800w,` +
    `${page.image.url}${imgixImageOption.detail.xl}${imageWatermark.xl} 960w`
  const sizes = '100vw'
  // 本文処理
  const richEditor = richEditorProcessor({ richEditor: page.body, title: page.title })
  // リターン
  return (
    <Layout misc={misc} pageContext={pageContext}>
      {
        // Iframely
      }
      <Iframely />
      {
        // タイトル
      }
      <Box className={styles.title}>
        <h1>{page.title && page.title}</h1>
      </Box>
      {
        // タイトル画像
      }
      <img className={styles.image} srcSet={srcSet} sizes={sizes} src={src} alt={page.title} />
      {
        // 記事本文
      }
      <Paper className={styles.post} key={page.pageId} dangerouslySetInnerHTML={{ __html: richEditor }} />
    </Layout>
  )
}

export default PagePost
