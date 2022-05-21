// React
import React from 'react'

// Material-UI
import Paper from '@mui/material/Paper'

// シンタックスハイライト
import { load } from 'cheerio'
import hljs from 'highlight.js'

// 自作モジュール
import { imgixWatermark } from './Util'
import { imgixImageOption } from './Constant'

// スタイルシート
import 'highlight.js/styles/base16/windows-10.css'
import * as styles from '../styles/BlogBody.module.scss'

// ブログ本文処理
const BlogBody = ({ blog }) => {
  // ウォーターマーク生成
  const imageWatermark = imgixWatermark()
  // 本文をロード
  const $ = load(blog.body)
  // シンタックスハイライト処理
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  })
  // 画像処理
  $('img').each((_, elm) => {
    // 画像ソースを取得
    const imgSrc = $(elm).attr('src')
    // レスポンシブ画像
    const srcSet =
      imgSrc +
      imgixImageOption.body.xs +
      imageWatermark.xs +
      ' 600w,' +
      imgSrc +
      imgixImageOption.body.s +
      imageWatermark.s +
      ' 900w,' +
      imgSrc +
      imgixImageOption.body.m +
      imageWatermark.m +
      ' 1200w,' +
      imgSrc +
      imgixImageOption.body.l +
      imageWatermark.l +
      ' 1536w,' +
      imgSrc +
      imgixImageOption.body.xl +
      imageWatermark.xl +
      ' 1920w'
    const sizes = '100w'
    // フォールバック画像
    const src = imgSrc + imgixImageOption.body.m + imageWatermark.m
    // 属性削除
    $(elm).removeAttr('src')
    $(elm).removeAttr('width')
    $(elm).removeAttr('height')
    // 属性設定
    $(elm).attr('srcSet', srcSet)
    $(elm).attr('sizes', sizes)
    $(elm).attr('src', src)
    $(elm).attr('alt', blog.title)
  })

  // リターン
  return <Paper className={styles.post} key={'Post'} dangerouslySetInnerHTML={{ __html: $.html() }} />
}

export default BlogBody
