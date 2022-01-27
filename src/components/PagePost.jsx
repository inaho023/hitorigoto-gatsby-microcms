// React
import React from 'react'
import { Img } from 'react-image'

// Material-UI
import Box from '@mui/material/Box'

// 自作モジュール
import Layout from './Layout'

// スタイルシート
import * as styles from '../styles/PagePost.module.scss'

// 定数
import { THUMB_IMG_OPT_DETAIL, THUMB_IMG_OPT_OGP, THUMB_IMG_OPT_BLUR } from './Constant'

const PagePost = ({ data, pageContext }) => {
  // OGP設定
  const ogp = {
    type: 'article',
    url: '/' + (data.microcmsPage.pageId ? data.microcmsPage.pageId : data.microcmsPage.id),
    title: data.microcmsPage.title,
    description: data.microcmsPage.body,
    image: data.microcmsPage.image && data.microcmsPage.image.url + THUMB_IMG_OPT_OGP
  }
  // ページ情報設定
  const misc = { position: data.microcmsPage.title, ogp: ogp }
  // 画像URL生成
  const src = data.microcmsPage.image.url + THUMB_IMG_OPT_DETAIL
  const imgLoader = () => {
    return <img src={data.microcmsPage.image.url + THUMB_IMG_OPT_DETAIL + THUMB_IMG_OPT_BLUR} alt={data.microcmsPage.title} width={960} height={960} />
  }
  // イメージ
  return (
    <Layout misc={misc} pageContext={pageContext}>
      <Box className={styles.title}>
        <h1>{data.microcmsPage.title && data.microcmsPage.title}</h1>
      </Box>
      <Img className={styles.image} src={src} alt={data.microcmsPage.title} width={960} height={960} loader={imgLoader} />
      <Box className={styles.post} key={data.microcmsPage.pageId} dangerouslySetInnerHTML={{ __html: data.microcmsPage.body }} />
    </Layout>
  )
}

export default PagePost
