// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// Material-UI
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'

// スタイルシート
import * as styles from '../styles/BlogNavi.module.scss'

// ブログ記事ナビゲーションコンポーネント
const BlogNavi = ({ pageContext }) => {
  // 前記事の画像
  const prev = pageContext?.prev && pageContext.prev
  const prevImage = prev ? getImage(prev.node.image.imgixImage) : null
  // 次記事の画像
  const next = pageContext?.next && pageContext.next
  const nextImage = next ? getImage(next.node.image.imgixImage) : null
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
                    <p>{prev.node.title}</p>
                  </CardContent>
                  <CardMedia className={styles.media}>
                    <GatsbyImage image={prevImage} alt={prev.node.title} />
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
                    <GatsbyImage image={nextImage} alt={next.node.title} />
                  </CardMedia>
                  <CardContent className={styles.content}>
                    <p>{next.node.title}</p>
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
