// React
import React from 'react'

// Material-UI
import Paper from '@mui/material/Paper'

// シンタックスハイライト
import cheerio from 'cheerio'
import hljs from 'highlight.js'

// 自作モジュール
import { imgixWatermark } from './Util'

// スタイルシート
import 'highlight.js/styles/base16/windows-10.css'
import * as styles from '../styles/BlogBody.module.scss'

// ブログ本文処理
const BlogBody = ({ body }) => {
  // ウォーターマーク生成
  const imageWatermark = imgixWatermark()
  // 本文をロード
  const cheerioBody = cheerio.load(body)
  // シンタックスハイライト処理
  cheerioBody('pre code').each((_, elm) => {
    const result = hljs.highlightAuto(cheerioBody(elm).text())
    cheerioBody(elm).html(result.value)
    cheerioBody(elm).addClass('hljs')
  })
  // 画像に透かしを追加
  cheerioBody('img').replaceWith((_, elm) => {
    const src = cheerioBody(elm).attr('src')
    const img = `${src}?fm=webp&q=50${imageWatermark.l}`
    return cheerioBody(elm).attr('src', img)
  })

  // リターン
  return <Paper className={styles.post} key={'Post'} dangerouslySetInnerHTML={{ __html: cheerioBody.html() }} />
}

export default BlogBody
