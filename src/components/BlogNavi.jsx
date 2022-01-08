// React
import React from 'react'
import { Img } from 'react-image'

// Gatsby
import { Link } from 'gatsby'

// Material-UI
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'

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
                <CardActionArea className={styles.area}>
                  <CardContent className={styles.content}>
                    <h5>{prev.node.title}</h5>
                  </CardContent>
                  <CardMedia className={styles.media}>
                    <Img src={prevImage} alt={prev.node.title} width={96} height={96} loader={prevLoader} />
                  </CardMedia>
                </CardActionArea>
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
                <CardActionArea className={styles.area}>
                  <CardMedia className={styles.media}>
                    <Img src={nextImage} alt={next.node.title} width={96} height={96} loader={nextLoader} />
                  </CardMedia>
                  <CardContent className={styles.content}>
                    <h5>{next.node.title}</h5>
                  </CardContent>
                </CardActionArea>
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
