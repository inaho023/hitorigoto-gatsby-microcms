// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'

// Material-UI
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'

// 自作ライブラリー
import { imgixWatermark } from '../libs/Util'
import { imgixImageOption } from '../libs/Constant'

// スタイルシート
import * as styles from '../styles/BlogNavi.module.scss'

// ブログ記事ナビゲーションコンポーネント
const BlogNavi = ({ pageContext }) => {
  // ウォーターマーク生成
  const imageWatermark = imgixWatermark()
  // 前記事の画像
  const prev = pageContext?.prev && pageContext.prev
  const prevImage = prev ? prev.node.image.url + imgixImageOption.navi + imageWatermark.xs : null
  // 次記事の画像
  const next = pageContext?.next && pageContext.next
  const nextImage = next ? next.node.image.url + imgixImageOption.navi + imageWatermark.xs : null
  // リターン
  return (
    <nav className={styles.nav}>
      <Grid container className={styles.wrapper} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
        {prev ? (
          <Grid item xs={12} md={6}>
            <Link key={prev.node.blogId} to={`/post/${prev.node.blogId}/`} title={'前の記事へ'}>
              <Card className={styles.prev}>
                <CardActionArea className={styles.area}>
                  <CardContent className={styles.content}>
                    <h5>{prev.node.title}</h5>
                  </CardContent>
                  <CardMedia className={styles.media}>
                    <img src={prevImage} alt={prev.node.title} width={96} height={96} />
                  </CardMedia>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
        ) : (
          <Grid item className={styles.nocard} xs={12} md={6} />
        )}
        {next ? (
          <Grid item xs={12} md={6}>
            <Link key={next.node.blogId} to={`/post/${next.node.blogId}/`} title={'次の記事へ'}>
              <Card className={styles.next}>
                <CardActionArea className={styles.area}>
                  <CardMedia className={styles.media}>
                    <img src={nextImage} alt={next.node.title} width={96} height={96} />
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
