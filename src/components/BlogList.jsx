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
import Pager from './Pager'

// スタイルシート
import * as styles from '../styles/BlogList.module.scss'

// 定数
import { imgixImageOption, imgixCopyright } from './Constant'

// ブログリスト
const BlogList = ({ data, pageContext }) => {
  // 定数定義
  const blog = data.allMicrocmsBlog.edges
  // 変数定義
  let sitePosition
  let ogp
  // 記事リスト種別による場合分け
  switch (pageContext.list) {
    case 'archive':
      // ポジション
      sitePosition = 'アーカイブ：' + pageContext.name
      // OGP設定
      ogp = {
        type: 'website',
        url: pageContext.pageNumber == 0 ? `/${pageContext.list}/${pageContext.id}/` : `/${pageContext.list}/${pageContext.id}/${pageContext.pageNumber}/`,
        title: sitePosition,
        description: 'トップページ',
        image: ''
      }
      break
    case 'category':
      // ポジション
      sitePosition = 'カテゴリー：' + pageContext.name
      // OGP設定
      ogp = {
        type: 'website',
        url: pageContext.pageNumber == 0 ? `/${pageContext.list}/${pageContext.id}/` : `/${pageContext.list}/${pageContext.id}/${pageContext.pageNumber}/`,
        title: sitePosition,
        description: 'トップページ',
        image: ''
      }
      break
    case 'tag':
      // ポジション
      sitePosition = 'タグ：' + pageContext.name
      // OGP設定
      ogp = {
        type: 'website',
        url: pageContext.pageNumber == 0 ? `/${pageContext.list}/${pageContext.id}/` : `/${pageContext.list}/${pageContext.id}/${pageContext.pageNumber}/`,
        title: sitePosition,
        description: 'トップページ',
        image: ''
      }
      break
    default:
      // ポジション
      sitePosition = ''
      // OGP設定
      ogp = {
        type: 'website',
        url: pageContext.pageNumber == 0 ? '/' : `/page/${pageContext.pageNumber}/`,
        title: sitePosition,
        description: 'インデックス',
        image: ''
      }
      break
  }
  const misc = { position: sitePosition, ogp: ogp }
  // リターン
  return (
    <Layout misc={misc} pageContext={pageContext}>
      {sitePosition && <h2 className={styles.list}>{sitePosition}</h2>}
      <Grid container spacing={2} alignItems={'center'} justifyItems={'center'}>
        {blog.map(blog => {
          // 画像生成
          const src = blog.node.image.url + imgixImageOption.list + imgixCopyright.xs
          // リターン
          return (
            <Grid key={blog.node.blogId} item xs={12} sm={6} md={4} lg={3} xl={3}>
              <Link key={blog.node.blogId} to={`/post/${blog.node.blogId}/`}>
                <Card className={styles.card} title={blog.node.title} elevation={8}>
                  <CardActionArea className={styles.area}>
                    <CardMedia className={styles.media}>
                      <img src={src} alt={blog.node.title} width={270} height={180} loading={'lazy'} />
                    </CardMedia>
                    <CardContent className={styles.content}>
                      <Grid container spacing={1} justifyContent={'center'}>
                        <Grid item xs={12}>
                          <Box className={styles.title}>
                            <h3>{blog.node.title}</h3>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box className={styles.box}>
                            <span className={styles.icon}>
                              <Icon path={mdiCalendarToday} size={0.75} title={'日付'} />
                            </span>
                            <span className={styles.text}>{blog.node.datetime}</span>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box className={styles.box}>
                            <span className={styles.icon}>
                              <Icon path={mdiShape} size={0.75} title={'カテゴリー'} />
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
