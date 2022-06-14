// React
import React from 'react'

// Material-UI
import Paper from '@mui/material/Paper'

// 自作ライブラリー
import { richEditorProcessor } from '../libs/Util'

// スタイルシート
import * as styles from '../styles/BlogBody.module.scss'

// ブログ記事本文コンポーネント
const BlogBody = ({ blog }) => {
  // 本文処理
  const richEditor = richEditorProcessor({
    richEditor: blog.body,
    title: blog.title,
    codeClass: blog.codeClass
  })
  // リターン
  return <Paper className={styles.post} key={'Post'} dangerouslySetInnerHTML={{ __html: richEditor }} />
}

export default BlogBody
