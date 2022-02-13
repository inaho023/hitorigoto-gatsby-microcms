// React
import React from 'react'

// Material-UI
import Box from '@mui/material/Box'

// その他モジュール
import { Base64 } from 'js-base64'

// 自作モジュール
import Layout from './Layout'

// スタイルシート
import * as styles from '../styles/PagePost.module.scss'

// 定数
import { imgixImageOption, imgixCopyright } from './Constant'

const PagePost = ({ data, pageContext }) => {
  // ページ詳細
  const page = data.microcmsPage
  // OGP設定
  const ogp = {
    type: 'article',
    url: '/' + (page.pageId ? page.pageId : page.id),
    title: page.title,
    description: page.body,
    image: page.image && page.image.url + imgixImageOption.ogp
  }
  // ページ情報設定
  const misc = { position: page.title, ogp: ogp }
  // コピーライトテキスト生成
  const b64Text = Base64.encodeURI(imgixCopyright.text)
  const copyrightText = '&txt64=' + b64Text
  // 画像URL生成
  const src = page.image.url + imgixImageOption.detail.m + imgixCopyright.option.m + copyrightText
  let srcSet = ''
  srcSet = page.image.url + imgixImageOption.detail.xs + imgixCopyright.option.xs + copyrightText + ' 320w'
  srcSet = srcSet + ',' + page.image.url + imgixImageOption.detail.s + imgixCopyright.option.s + copyrightText + ' 480w'
  srcSet = srcSet + ',' + page.image.url + imgixImageOption.detail.m + imgixCopyright.option.m + copyrightText + ' 640w'
  srcSet = srcSet + ',' + page.image.url + imgixImageOption.detail.l + imgixCopyright.option.l + copyrightText + ' 800w'
  srcSet = srcSet + ',' + page.image.url + imgixImageOption.detail.xl + imgixCopyright.option.xl + copyrightText + ' 960w'
  const sizes = '100vw'
  // イメージ
  return (
    <Layout misc={misc} pageContext={pageContext}>
      <Box className={styles.title}>
        <h1>{data.microcmsPage.title && data.microcmsPage.title}</h1>
      </Box>
      <img className={styles.image} src={src} srcSet={srcSet} sizes={sizes} alt={page.title} />
      <Box className={styles.post} key={data.microcmsPage.pageId} dangerouslySetInnerHTML={{ __html: data.microcmsPage.body }} />
    </Layout>
  )
}

export default PagePost
