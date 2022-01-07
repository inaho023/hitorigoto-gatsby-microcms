// React
import React from 'react'
import { Img } from 'react-image'

// Gatsby
import { Link } from 'gatsby'

// Material-UI
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

// スタイルシート
import * as styles from '../styles/BlogNavi.module.scss'

// 定数
import { THUMB_IMG_OPT_NAVI, THUMB_IMG_OPT_BLUR } from './Constant'

// ブログリスト
const BlogNavi = ({ pageContext }) => {
  // 前記事の画像
  const prev = pageContext.prev
  const prevImage = prev ? prev.node.image.url + THUMB_IMG_OPT_NAVI : null
  const prevLoader = () => {
    return <img src={prev.node.image.url + THUMB_IMG_OPT_NAVI + THUMB_IMG_OPT_BLUR} alt={prev.node.node.title} width={96} height={96} />
  }
  // 次記事の画像
  const next = pageContext.next
  const nextImage = next ? next.node.image.url + THUMB_IMG_OPT_NAVI : null
  const nextLoader = () => {
    return <img src={next.node.image.url + THUMB_IMG_OPT_NAVI + THUMB_IMG_OPT_BLUR} alt={next.node.node.title} width={96} height={96} />
  }
  // リターン
  return (
    <nav className={styles.nav}>
      <Grid container className={styles.wrapper} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
        {pageContext.prev ? (
          <Grid item xs={12} md={6}>
            <Link key={prev.node.blogId} to={'/post/' + prev.node.blogId} title={'前の記事へ'}>
              <Card className={styles.prev}>
                <Box className={styles.box}>
                  <h5>{prev.node.title}</h5>
                </Box>
                <Img className={styles.image} src={prevImage} alt={prev.node.title} width={96} height={96} loader={prevLoader} />
              </Card>
            </Link>
          </Grid>
        ) : (
          <Grid item className={styles.nocard} xs={12} md={6} />
        )}
        {pageContext.next ? (
          <Grid item xs={12} md={6}>
            <Link key={next.node.blogId} to={'/post/' + next.node.blogId} title={'次の記事へ'}>
              <Card className={styles.next}>
                <Img className={styles.image} src={nextImage} alt={next.node.title} width={96} height={96} loader={nextLoader} />
                <Box className={styles.box}>
                  <h5>{next.node.title}</h5>
                </Box>
              </Card>
            </Link>
          </Grid>
        ) : (
          <Grid item className={styles.nocard} xs={12} md={6} />
        )}
      </Grid>
    </nav>
  )
}

export default BlogNavi
