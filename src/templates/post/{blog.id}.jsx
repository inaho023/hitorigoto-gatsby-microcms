// React
import React from 'react'
import { Img } from 'react-image'
import { Helmet } from 'react-helmet'

// Gatsby
import { Link, graphql } from 'gatsby'

// Font Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowAltCircleLeft, faArrowAltCircleRight, faCalendarDay, faTags, faTag, faShareAltSquare, faCamera } from '@fortawesome/free-solid-svg-icons'

// その他モジュール
import moment from 'moment'

// 自作コンポーネント
import Layout from '../../components/Layout'
import Gallery from '../../components/Gallery'
import ShareButton from '../../components/ShareButton'
import Disqus from '../../components/Disqus'

// スタイルシート
import * as styles from '../../styles/{blog.id}.module.scss'
// 定数
import { THUMB_IMG_OPT_DETAIL, THUMB_IMG_OPT_NAVI, THUMB_IMG_OPT_BLUR } from '../../components/Constant'
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
  // Font Awesome Icon
  library.add(faArrowAltCircleLeft)
  library.add(faArrowAltCircleRight)
  library.add(faCalendarDay)
  library.add(faTags)
  library.add(faTag)
  library.add(faShareAltSquare)
  library.add(faCamera)
  // 記事詳細
  const blog = data.microcmsBlog
  // 記事リスト
  const list = data.allMicrocmsBlog.edges
  // 画像生成
  const image = []
  image[0] = blog.image.url + THUMB_IMG_OPT_DETAIL + (blog.image_parm && '&' + blog.image_parm) + THUMB_IMG_OPT_BLUR
  image[1] = blog.image.url + THUMB_IMG_OPT_DETAIL + (blog.image_parm && '&' + blog.image_parm)
  const imgLoad = () => <img className={styles.image} src={image[0]} />
  // 前後の記事
  const current = list.findIndex(list => list.node.blogId === blog.blogId)
  const prevArticle = current === 0 ? null : list[current - 1]
  const nextArticle = current === list.length - 1 ? null : list[current + 1]
  // 前記事の画像生成
  const prevImage = []
  if (prevArticle) {
    prevImage[0] = prevArticle.node.image.url + THUMB_IMG_OPT_NAVI + (prevArticle.node.image_parm && '&' + prevArticle.node.image_parm) + THUMB_IMG_OPT_BLUR
    prevImage[1] = prevArticle.node.image.url + THUMB_IMG_OPT_NAVI + (prevArticle.node.image_parm && '&' + prevArticle.node.image_parm)
  }
  const prevImageLoad = () => {
    prevArticle ? <Img className={styles.image} src={prevImage[0]} width={prevArticle.node.image.width} height={prevArticle.node.image.height} /> : <p></p>
  }
  // 次記事の画像生成
  const nextImage = []
  if (nextArticle) {
    nextImage[0] = nextArticle.node.image.url + THUMB_IMG_OPT_NAVI + (nextArticle.node.image_parm && '&' + nextArticle.node.image_parm) + THUMB_IMG_OPT_BLUR
    nextImage[1] = nextArticle.node.image.url + THUMB_IMG_OPT_NAVI + (nextArticle.node.image_parm && '&' + nextArticle.node.image_parm)
  }
  const nextImageLoad = () => {
    nextArticle ? <Img className={styles.image} src={nextImage[0]} width={nextArticle.node.image.width} height={nextArticle.node.image.height} /> : <p></p>
  }
  // リターン
  return (
    <Layout sitePosition={blog.title}>
      <Helmet>
        <meta property='og:type' content='article' />
        <meta property='og:title' content={blog.title} />
        <meta property='og:image' content={blog.image.url + THUMB_IMG_OPT_DETAIL + '&' + blog.image_parm} />
        <script type='text/javascript'></script>
      </Helmet>
      <div className={styles.wrapper} key={'wrapper'}>
        <section id={'PageTitle'} className={styles.pagetitle}>
          <div className={styles.info_wrapper} key={'Info'}>
            <div className={styles.title} key={'Title'}>
              <h1>{blog.title && `${blog.title}`}</h1>
            </div>
            <div className={styles.content_wrapper}>
              <div className={styles.image_wrapper}>
                <Img className={styles.image} src={image[1]} width={blog.image.width} height={blog.image.height} loader={<imgLoad />} />
              </div>
              <div className={styles.text_wrapper} key={'TextWrapper'}>
                <div className={styles.box} key={'BoxDate'}>
                  <div className={styles.icon}>
                    <FontAwesomeIcon icon={['fas', 'calendar-day']} fixedWidth />
                  </div>
                  <div className={styles.text}>
                    <Link key={moment(blog.datetime).format('YYYYMM')} to={'/archive/' + moment(blog.datetime).format('YYYYMM')}>
                      {moment(blog.datetime).format('YYYY年MM月DD日')}
                    </Link>
                  </div>
                </div>
                <div className={styles.box} key={'BoxCategory'}>
                  <div className={styles.icon}>
                    <FontAwesomeIcon icon={['fas', 'tags']} fixedWidth />
                  </div>
                  <div className={styles.text}>
                    <Link key={blog.category.categoriesId} to={'/category/' + blog.category.id}>
                      {blog.category.name}
                    </Link>
                  </div>
                </div>
                <div className={styles.box} key={'BoxTags'}>
                  <div className={styles.icon}>
                    <FontAwesomeIcon icon={['fas', 'tag']} fixedWidth />
                  </div>
                  <div className={styles.text}>
                    {blog.tags.map(tag => {
                      return (
                        <Link key={tag.tagsId} to={'/tag/' + tag.id}>
                          {tag.name}
                        </Link>
                      )
                    })}
                  </div>
                </div>
                <div className={styles.box} key={'BoxShare'}>
                  <div className={styles.icon}>
                    <FontAwesomeIcon icon={['fas', 'share-alt-square']} fixedWidth />
                  </div>
                  <ShareButton blog={blog} />
                </div>
              </div>
            </div>
          </div>
        </section>
        {
          // ポスト
        }
        <div className={styles.post} key={'Post'} dangerouslySetInnerHTML={{ __html: blog.body }} />
        {
          // ギャラリー
        }
        <div className={styles.gallery}>
          <Gallery galleries={blog.galleries} />
        </div>
      </div>
      {
        // Disqus
      }
      <div>
        <Disqus blog={blog} />
      </div>
      {
        // 前後の記事へ移動
      }
      <div className={styles.navi}>
        {prevArticle ? (
          <>
            <span className={styles.icon}>
              <Link key={prevArticle.node.blogId} to={'/post/' + prevArticle.node.blogId}>
                <FontAwesomeIcon icon={['fas', 'arrow-alt-circle-left']} alt={'前の記事へ'} />
              </Link>
            </span>
            <span className={styles.card}>
              <Link key={prevArticle.node.blogId} to={'/post/' + prevArticle.node.blogId}>
                <>
                  <div className={styles.image}>
                    <Img className={styles.image} src={prevImage[1]} width={prevArticle.node.image.width} height={prevArticle.node.image.height} loader={<prevImageLoad />} />
                  </div>
                  <span className={styles.title}>
                    <h3>{prevArticle.node.title}</h3>
                  </span>
                </>
              </Link>
            </span>
          </>
        ) : (
          <>
            <div className={styles.icon} />
            <div className={styles.nocard} />
          </>
        )}
        {nextArticle ? (
          <>
            <span className={styles.card}>
              <Link key={nextArticle.node.blogId} to={'/post/' + nextArticle.node.blogId}>
                <>
                  <div className={styles.image}>
                    <Img className={styles.image} src={nextImage[1]} width={nextArticle.node.image.width} height={nextArticle.node.image.height} loader={<nextImageLoad />} />
                  </div>
                  <span className={styles.title}>
                    <h3>{nextArticle.node.title}</h3>
                  </span>
                </>
              </Link>
            </span>
            <span className={styles.icon}>
              <Link key={nextArticle.node.blogId} to={'/post/' + nextArticle.node.blogId}>
                <FontAwesomeIcon icon={['fas', 'arrow-alt-circle-right']} alt={'次の記事へ'} />
              </Link>
            </span>
          </>
        ) : (
          <>
            <div className={styles.nocard} />
            <div className={styles.icon} />
          </>
        )}
      </div>
    </Layout>
  )
}

export default post
