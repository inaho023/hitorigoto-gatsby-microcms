// React
import React from 'react'

// Gatsby
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// Material-UI
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

// 自作モジュール
import Layout from './Layout'

// 自作ライブラリー
import { richEditorProcessor } from '../libs/Util'

// スタイルシート
import * as styles from '../styles/PagePost.module.scss'

// ページ記事詳細コンポーネント
const PagePost = ({ data, pageContext }) => {
  // ページ記事詳細
  const page = data.microcmsPage
  // 本文処理
  const richEditor = richEditorProcessor({ richEditor: page.body, title: page.title })
  // リターン
  return (
    <Layout pageContext={pageContext}>
      {
        // タイトル
      }
      <Box className={styles.title}>
        <h1>{page.title && page.title}</h1>
      </Box>
      {
        // タイトル画像
      }
      <Box className={styles.imagewapper}>
        <GatsbyImage className={styles.image} image={getImage(page.image.imgixImage)} alt={page.title} />
      </Box>
      {
        // 記事本文
      }
      <Paper className={styles.post} key={page.pageId} dangerouslySetInnerHTML={{ __html: richEditor }} />
    </Layout>
  )
}

export default PagePost
