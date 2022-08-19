// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'

// Material-UI
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { CardActionArea } from '@mui/material'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiCalendarToday, mdiShape } from '@mdi/js'

// 自作コンポーネント
import Layout from './Layout'
import Minibar from './Minibar'
import Pager from './Pager'

// 自作ライブラリー
import { imgixWatermark } from '../libs/Util'
import { imgixImageOption } from '../libs/Constant'

// スタイルシート
import * as styles from '../styles/BlogList.module.scss'

// ブログ記事リストコンポーネント
const BlogList = ({ data, pageContext }) => {
  // 定数定義
  const blog = data.allMicrocmsBlog.edges
  // ウォーターマークURL取得
  const imageWatermark = imgixWatermark()
  // リターン
  return (
    <Layout pageContext={pageContext}>
      <Minibar pageContext={pageContext} />
      <Grid container spacing={2} alignItems={'center'} justifyItems={'center'}>
        {blog.map((blog, index) => {
          // 画像URL生成
          const src = blog.node.image.url + imgixImageOption.list.m + imageWatermark.s
          const srcSet =
            `${blog.node.image.url}${imgixImageOption.list.xs}${imageWatermark.s} 120w,` +
            `${blog.node.image.url}${imgixImageOption.list.s}${imageWatermark.s} 240w,` +
            `${blog.node.image.url}${imgixImageOption.list.m}${imageWatermark.s} 360w,` +
            `${blog.node.image.url}${imgixImageOption.list.l}${imageWatermark.s} 480w,` +
            `${blog.node.image.url}${imgixImageOption.list.xl}${imageWatermark.s} 600w,`
          const sizes = '(min-width: 1536px) 25vw, (min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw'
          const loading = index < 7 ? 'eager' : 'lazy'
          // リターン
          return (
            <Grid key={blog.node.blogId} item xs={12} sm={6} md={4} lg={3} xl={3}>
              <Link key={blog.node.blogId} to={`/post/${blog.node.blogId}/`}>
                <Card className={styles.card} title={blog.node.title} elevation={4}>
                  <CardActionArea className={styles.area}>
                    <CardMedia className={styles.media}>
                      <img
                        width={600}
                        height={400}
                        srcSet={srcSet}
                        sizes={sizes}
                        src={src}
                        alt={blog.node.title}
                        loading={loading}
                      />
                      <Box className={styles.info}>
                        <Grid container spacing={1} alignItems={'center'} justifyContent={'space-around'}>
                          <Grid item className={styles.box} xs={6}>
                            <span className={styles.icon}>
                              <Icon path={mdiCalendarToday} size={0.75} />
                            </span>
                            <span className={styles.text}>
                              <p>{blog.node.datetime}</p>
                            </span>
                          </Grid>
                          <Grid item className={styles.box} xs={6}>
                            <span className={styles.icon}>
                              <Icon path={mdiShape} size={0.75} />
                            </span>
                            <span className={styles.text}>
                              <p>{blog.node.category.name}</p>
                            </span>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardMedia>
                    <CardContent className={styles.content}>
                      <Box className={styles.title}>
                        <h4>{blog.node.title}</h4>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          )
        })}
      </Grid>
      <Pager pageContext={pageContext} />
    </Layout>
  )
}

export default BlogList
