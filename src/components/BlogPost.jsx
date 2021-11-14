// React
import React from 'react'
import { Img } from 'react-image'

// Gatsby
import { Link } from 'gatsby'

// Material-UI
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiCalendarToday, mdiShape, mdiTag, mdiShareVariant } from '@mdi/js'

// その他モジュール
import moment from 'moment'

// 自作コンポーネント
import Layout from './Layout'
import BlogNavi from './BlogNavi'
import Gallery from './Gallery'
import ShareButton from './ShareButton'
import Comment from './Comment'

// スタイルシート
import * as styles from '../styles/BlogPost.module.scss'

// 定数
import { THUMB_IMG_OPT_DETAIL, THUMB_IMG_OPT_OGP_IMAGE, THUMB_IMG_OPT_BLUR } from './Constant'

// ブログリスト
const BlogPost = ({ data, pageContext }) => {
  // 記事詳細
  const blog = data.microcmsBlog
  // 画像URL生成
  const src = blog.image.url + THUMB_IMG_OPT_DETAIL + (blog.image_parm != 'null' && '&' + blog.image_parm)
  const imgLoader = () => {
    return <img src={blog.image.url + THUMB_IMG_OPT_DETAIL + THUMB_IMG_OPT_BLUR + (blog.image_parm != 'null' && '&' + blog.image_parm)} alt={blog.node.title} width={960} height={960} />
  }
  // OGP設定
  const ogp = {
    type: 'article',
    url: '/post/' + blog.blogId,
    title: blog.title,
    description: blog.body,
    image: blog.image && blog.image.url + THUMB_IMG_OPT_OGP_IMAGE + (blog.image_parm != 'null' && '&' + blog.image_parm)
  }
  // 前後の記事
  const list = data.allMicrocmsBlog.edges
  const current = list.findIndex(list => list.node.blogId === blog.blogId)
  const prevArticle = current === 0 ? null : list[current - 1]
  const nextArticle = current === list.length - 1 ? null : list[current + 1]
  // リターン
  return (
    <Layout sitePosition={blog.title} ogp={ogp} pageContext={pageContext}>
      <Box className={styles.wrapper} key={'wrapper'}>
        <Grid container className={styles.info} key={'Info'} spacing={0}>
          <Grid item className={styles.title} xs={12}>
            <h1>{blog.title}</h1>
          </Grid>
          <Grid item className={styles.wrapper} xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={12} md={6}>
                <Img className={styles.image} src={src} alt={blog.title} width={960} height={960} loader={imgLoader} />
              </Grid>
              <Grid item className={styles.wrapper} xs={12} md={6}>
                <Grid item className={styles.box} key={'BoxDate'} xs={12}>
                  <Icon className={styles.icon} path={mdiCalendarToday} size={3} title={'日付'} />
                  <Box className={styles.text}>
                    <Link key={moment(blog.datetime).format('YYYYMM')} to={'/archive/' + moment(blog.datetime).format('YYYYMM')}>
                      {moment(blog.datetime).format('YYYY年MM月DD日')}
                    </Link>
                  </Box>
                </Grid>
                <Grid item className={styles.box} key={'BoxCategory'} xs={12}>
                  <Icon className={styles.icon} path={mdiShape} size={3} title={'カテゴリー'} />
                  <Box className={styles.text}>
                    <Link key={blog.category.categoriesId} to={'/category/' + blog.category.id}>
                      {blog.category.name}
                    </Link>
                  </Box>
                </Grid>
                <Grid item className={styles.box} key={'BoxTags'} xs={12}>
                  <Icon className={styles.icon} path={mdiTag} size={3} title={'タグ'} />
                  <Box className={styles.text}>
                    {blog.tags.map(tag => {
                      return (
                        <Link key={tag.tagsId} to={'/tag/' + tag.id}>
                          {tag.name}
                        </Link>
                      )
                    })}
                  </Box>
                </Grid>
                <Grid item className={styles.box} key={'BoxShare'} xs={12}>
                  <Icon className={styles.icon} path={mdiShareVariant} size={3} title={'シェア'} />
                  <Box className={styles.text}>
                    <ShareButton blog={blog} />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {
          // ポスト
        }
        <Paper className={styles.post} key={'Post'} dangerouslySetInnerHTML={{ __html: blog.body }} />
        {
          // ギャラリー
        }
        <Gallery galleries={blog.galleries} />
        {
          // コメント欄
        }
        <Comment blog={blog} />
        {
          // 前後の記事へ移動
        }
        <BlogNavi prev={prevArticle} next={nextArticle} />
      </Box>
    </Layout>
  )
}

export default BlogPost
