// React
import React from 'react'
import { Helmet } from 'react-helmet'

// Gatsby
import { Link, graphql } from 'gatsby'

// Material-UI
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import Box from '@material-ui/core/Box'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiCalendarToday, mdiShape, mdiTag, mdiShareVariant } from '@mdi/js'

// その他モジュール
import moment from 'moment'

// 自作コンポーネント
import Layout from '../../components/Layout'
import Gallery from '../../components/Gallery'
import ShareButton from '../../components/ShareButton'
import Comment from '../../components/Comment'

// スタイルシート
import * as styles from '../../styles/{blog.id}.module.scss'
// 定数
import { THUMB_IMG_OPT_DESKTOP_DETAIL, THUMB_IMG_OPT_MOBILE_DETAIL, THUMB_IMG_OPT_NAVI } from '../../components/Constant'
// クエリー
export const pageQuery = graphql`
  query postDetailQuery($id: String!) {
    microcmsBlog(blogId: { eq: $id }) {
      blogId
      title
      datetime(formatString: "YYYYMMDD")
      category {
        id
        name
      }
      tags {
        id
        name
      }
      image {
        url
        width
        height
      }
      image_parm
      body
      galleries {
        gallery {
          id
          name
          display_name
          images {
            image {
              url
              width
              height
            }
          }
        }
      }
    }
    allMicrocmsBlog(limit: 1000, sort: { fields: datetime, order: DESC }) {
      edges {
        node {
          blogId
          title
          image {
            url
            width
            height
          }
          image_parm
        }
      }
    }
  }
`
// 記事詳細
const post = ({ data }) => {
  // 記事詳細
  const blog = data.microcmsBlog
  // 記事リスト
  const list = data.allMicrocmsBlog.edges
  // 画像生成
  const image = []
  image[0] = blog.image.url + THUMB_IMG_OPT_MOBILE_DETAIL + (blog.image_parm && '&' + blog.image_parm)
  image[1] = blog.image.url + THUMB_IMG_OPT_DESKTOP_DETAIL + (blog.image_parm && '&' + blog.image_parm)
  // 前後の記事
  const current = list.findIndex(list => list.node.blogId === blog.blogId)
  const prevArticle = current === 0 ? null : list[current - 1]
  const nextArticle = current === list.length - 1 ? null : list[current + 1]
  // 前記事の画像生成
  const prevImage = prevArticle ? prevArticle.node.image.url + THUMB_IMG_OPT_NAVI + (prevArticle.node.image_parm && '&' + prevArticle.node.image_parm) : null
  // 次記事の画像生成
  const nextImage = nextArticle ? nextArticle.node.image.url + THUMB_IMG_OPT_NAVI + (nextArticle.node.image_parm && '&' + nextArticle.node.image_parm) : null
  // リターン
  return (
    <Layout sitePosition={blog.title}>
      <Helmet>
        <meta property='og:type' content='article' />
        <meta property='og:title' content={blog.title} />
        <meta property='og:image' content={blog.image.url + THUMB_IMG_OPT_DESKTOP_DETAIL + '&' + blog.image_parm} />
      </Helmet>
      <Box className={styles.wrapper} key={'wrapper'}>
        <section id={'PageTitle'} className={styles.title}>
          <Grid container className={styles.info} key={'Info'} spacing={0}>
            <Grid item className={styles.title} xs={12}>
              <h1>{blog.title}</h1>
            </Grid>
            <Grid item className={styles.wrapper} xs={12}>
              <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                  <img src={image[0]} srcSet={image[0] + ' 600w,' + image[1]} alt={blog.title} />
                </Grid>
                <Grid item className={styles.wrapper} xs={12} md={6}>
                  <Grid item className={styles.box} key={'BoxDate'} xs={12}>
                    <Icon className={styles.icon} path={mdiCalendarToday} size={3} />
                    <Box className={styles.text}>
                      <Link key={moment(blog.datetime).format('YYYYMM')} to={'/archive/' + moment(blog.datetime).format('YYYYMM')}>
                        {moment(blog.datetime).format('YYYY年MM月DD日')}
                      </Link>
                    </Box>
                  </Grid>
                  <Grid item className={styles.box} key={'BoxCategory'} xs={12}>
                    <Icon className={styles.icon} path={mdiShape} size={3} />
                    <Box className={styles.text}>
                      <Link key={blog.category.categoriesId} to={'/category/' + blog.category.id}>
                        {blog.category.name}
                      </Link>
                    </Box>
                  </Grid>
                  <Grid item className={styles.box} key={'BoxTags'} xs={12}>
                    <Icon className={styles.icon} path={mdiTag} size={3} />
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
                    <Icon className={styles.icon} path={mdiShareVariant} size={3} />
                    <Box className={styles.text}>
                      <ShareButton blog={blog} />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </section>
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
      </Box>
      {
        // 前後の記事へ移動
      }
      <nav className={styles.nav}>
        <Grid container className={styles.wrapper} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
          {prevArticle ? (
            <Grid item className={styles.prev} xs={12} md={5}>
              <Tooltip title={'前の記事へ'} arrow>
                <Link key={prevArticle.node.blogId} to={'/post/' + prevArticle.node.blogId}>
                  <Box className={styles.box}>
                    <h5>{prevArticle.node.title}</h5>
                  </Box>
                  <img className={styles.image} src={prevImage} alt={prevArticle.node.title} />
                </Link>
              </Tooltip>
            </Grid>
          ) : (
            <Grid item className={styles.nocard} xs={12} md={5} />
          )}
          {nextArticle ? (
            <Grid item className={styles.next} xs={12} md={5}>
              <Tooltip title={'次の記事へ'} arrow>
                <Link key={nextArticle.node.blogId} to={'/post/' + nextArticle.node.blogId}>
                  <img className={styles.image} src={nextImage} alt={nextArticle.node.title} />
                  <Box className={styles.box}>
                    <h5>{nextArticle.node.title}</h5>
                  </Box>
                </Link>
              </Tooltip>
            </Grid>
          ) : (
            <Grid item className={styles.nocard} xs={12} md={5} />
          )}
        </Grid>
      </nav>
    </Layout>
  )
}

export default post
