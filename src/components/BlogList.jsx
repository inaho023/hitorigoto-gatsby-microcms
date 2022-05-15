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

// その他コンポーネント
import moment from 'moment'

// 自作コンポーネント
import Layout from './Layout'
import Pager from './Pager'
import { imgixWatermark } from './Util'

// スタイルシート
import * as styles from '../styles/BlogList.module.scss'

// 定数
import { imgixImageOption } from './Constant'

// ブログリスト
const BlogList = ({ data, pageContext }) => {
  // 定数定義
  const blog = data.allMicrocmsBlog.edges
  // ウォーターマークURL取得
  const imageWatermark = imgixWatermark()
  // 変数定義
  let misc = {}
  // 記事リスト種別による場合分け
  switch (pageContext.list) {
    case 'archive':
    case 'category':
    case 'tag':
      misc = {
        // ポジション
        position: pageContext.name,
        // パンくずラベル
        crumbLabel: pageContext.pageNumber == 0 ? pageContext.name : `${pageContext.humanPageNumber}ページ目`,
        // OGP設定
        ogpInfo: {
          type: 'website',
          url: pageContext.pageNumber == 0 ? `/${pageContext.list}/${pageContext.id}/` : `/${pageContext.list}/${pageContext.id}/${pageContext.pageNumber}/`,
          title: pageContext.name,
          description: 'トップページ',
          image: ''
        }
      }
      break
    default:
      misc = {
        // ポジション
        position: '',
        // パンくずラベル
        crumbLabel: pageContext.pageNumber == 0 ? 'ホーム' : `${pageContext.humanPageNumber}ページ目`,
        // OGP設定
        ogpInfo: {
          type: 'website',
          url: pageContext.pageNumber == 0 ? '/' : `/page/${pageContext.pageNumber}/`,
          title: '',
          description: 'トップページ',
          image: ''
        }
      }
      break
  }
  // リターン
  return (
    <Layout misc={misc} pageContext={pageContext}>
      <Grid container spacing={3} alignItems={'center'} justifyItems={'center'}>
        {blog.map(blog => {
          // 画像URL生成
          const src = blog.node.image.url + imgixImageOption.list.m + imageWatermark.s
          const srcSet = `${blog.node.image.url}${imgixImageOption.list.s}${imageWatermark.s} 270w,` + `${blog.node.image.url}${imgixImageOption.list.m}${imageWatermark.s} 360w,` + `${blog.node.image.url}${imgixImageOption.list.l}${imageWatermark.s} 480w,`
          const sizes = '(max-width: 600px) 100w, (min-width: 900px) 50w, (max-width: 1536px) 33w, 25w'
          // リターン
          return (
            <Grid key={blog.node.blogId} item xs={12} sm={6} md={4} lg={3} xl={3}>
              <Link key={blog.node.blogId} to={`/post/${blog.node.blogId}/`}>
                <Card className={styles.card} title={blog.node.title} elevation={8}>
                  <CardActionArea className={styles.area}>
                    <CardMedia className={styles.media}>
                      <img srcSet={srcSet} sizes={sizes} src={src} alt={blog.node.title} loading={'lazy'} />
                    </CardMedia>
                    <CardContent className={styles.content}>
                      <Grid container spacing={1} justifyContent={'center'} alignItems={'center'}>
                        <Grid item xs={12}>
                          <Box className={styles.title}>
                            <h3>{blog.node.title}</h3>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box className={styles.box}>
                            <span className={styles.icon}>
                              <Icon path={mdiCalendarToday} size={0.8} title={moment(blog.node.datetime, 'YYYY.MM.DD').format('YYYY年MM月DD日')} />
                            </span>
                            <span className={styles.text}>{blog.node.datetime}</span>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box className={styles.box}>
                            <span className={styles.icon}>
                              <Icon path={mdiShape} size={0.8} title={blog.node.category.name} />
                            </span>
                            <span className={styles.text}>{blog.node.category.name}</span>
                          </Box>
                        </Grid>
                      </Grid>
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
