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
import { IMGIX_IMG_OPT_DETAIL_L, IMGIX_IMG_OPT_DETAIL_M, IMGIX_IMG_OPT_DETAIL_S, IMGIX_COPYRIGHT_OPT_L, IMGIX_COPYRIGHT_OPT_M, IMGIX_COPYRIGHT_OPT_S, IMGIX_COPYRIGHT_TEXT, IMGIX_IMG_OPT_OGP } from './Constant'

const PagePost = ({ data, pageContext }) => {
  // ページ詳細
  const page = data.microcmsPage
  // OGP設定
  const ogp = {
    type: 'article',
    url: '/' + (page.pageId ? page.pageId : page.id),
    title: page.title,
    description: page.body,
    image: page.image && page.image.url + IMGIX_IMG_OPT_OGP
  }
  // ページ情報設定
  const misc = { position: page.title, ogp: ogp }
  // コピーライトテキスト生成
  const b64Text = Base64.encodeURI(IMGIX_COPYRIGHT_TEXT)
  const copyrightText = '&txt64=' + b64Text
  // 画像URL生成
  const src = page.image.url + IMGIX_IMG_OPT_DETAIL_M + IMGIX_COPYRIGHT_OPT_M + copyrightText
  let srcSet = ''
  srcSet = page.image.url + IMGIX_IMG_OPT_DETAIL_S + IMGIX_COPYRIGHT_OPT_S + copyrightText + ' 480w'
  srcSet = srcSet + ',' + page.image.url + IMGIX_IMG_OPT_DETAIL_M + IMGIX_COPYRIGHT_OPT_M + copyrightText + ' 640w'
  srcSet = srcSet + ',' + page.image.url + IMGIX_IMG_OPT_DETAIL_L + IMGIX_COPYRIGHT_OPT_L + copyrightText + ' 960w'
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
