// React
import React from 'react'

// Material-UI
import Paper from '@mui/material/Paper'

// シンタックスハイライト
import cheerio from 'cheerio'
import hljs from 'highlight.js'

// スタイルシート
import 'highlight.js/styles/base16/windows-10.css'
import * as styles from '../styles/BlogBody.module.scss'

// ブログ本文処理
const BlogBody = ({ body }) => {
  // シンタックスハイライト処理
  const $ = cheerio.load(body)
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })
  // リターン
  return <Paper className={styles.post} key={'Post'} dangerouslySetInnerHTML={{ __html: $.html() }} />
}

export default BlogBody
