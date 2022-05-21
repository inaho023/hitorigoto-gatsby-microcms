// React
import React from 'react'

// Material-UI
import Paper from '@mui/material/Paper'

// 自作ライブラリー
import { richEditorProcessor } from '../libs/Util'

// スタイルシート
import 'highlight.js/styles/base16/windows-10.css'
import * as styles from '../styles/BlogBody.module.scss'

// ブログ記事本文コンポーネント
const BlogBody = ({ blog }) => {
  // 本文処理
  const richEditor = richEditorProcessor({ title: blog.title, richEditor: blog.body })
  // リターン
  return <Paper className={styles.post} key={'Post'} dangerouslySetInnerHTML={{ __html: richEditor }} />
}

export default BlogBody
