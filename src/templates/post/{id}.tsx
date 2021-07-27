// React
import * as React from 'react'
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
import styles from '../../styles/{id}.module.scss'

// 定数
import { THUMB_IMG_OPT_DETAIL, THUMB_IMG_OPT_PREV_NEXT } from '../../components/Constant'

// 記事詳細
const post = props => {
  // Font Awesome Icon
  library.add(faArrowAltCircleLeft)
  library.add(faArrowAltCircleRight)
  library.add(faCalendarDay)
  library.add(faTags)
  library.add(faTag)
  library.add(faShareAltSquare)
  library.add(faCamera)
  // 記事詳細
  const blog = props.data.microcmsBlog
  // 記事リスト
  const list = props.data.allMicrocmsBlog.nodes
  // 前後の記事
  const current = list.findIndex(list => list.blogId === blog.blogId)
  const prevArticle = current === 0 ? null : list[current - 1]
  const nextArticle = current === list.length - 1 ? null : list[current + 1]
  return (
    <Layout sitePosition={blog.title}>
      <Helmet>
        <meta property='og:type' content='article' />
        <meta property='og:title' content={blog.title} />
        <meta property='og:image' content={blog.image ? blog.image.url + THUMB_IMG_OPT_DETAIL + (blog.image_parm && '&' + blog.image_parm) : '/noimage-large.png'} />
      </Helmet>
      <div className={styles.wrapper} key={'wrapper'}>
        <section id={'PageTitle'} className={styles.pagetitle}>
          <div className={styles.info_wrapper} key={'Info'}>
            <div className={styles.title} key={'Title'}>
              <h1>{blog.title && `${blog.title}`}</h1>
            </div>
            <div className={styles.content_wrapper}>
              <div className={styles.image_wrapper} key={'InfoWrapper'}>
                <img className={styles.image} key={blog.id} src={blog.image ? blog.image.url + THUMB_IMG_OPT_DETAIL + (blog.image_parm && '&' + blog.image_parm) : '/noimage-large.png'} width={640} height={640} quality={50} alt={blog.title} />
              </div>
              <div className={styles.text_wrapper} key={'TextWrapper'}>
                <div className={styles.box} key={'BoxDate'}>
                  <div className={styles.icon}>
                    <FontAwesomeIcon icon={['fas', 'calendar-day']} fixedWidth />
                  </div>
                  <div className={styles.text}>
                    <Link key={moment(blog.datetime).format('YYYYMM')} to={'/archive/' + moment(blog.datetime).format('YYYYMM')}>
                      <a>{moment(blog.datetime).format('YYYY年MM月DD日')}</a>
                    </Link>
                  </div>
                </div>
                <div className={styles.box} key={'BoxCategory'}>
                  <div className={styles.icon}>
                    <FontAwesomeIcon icon={['fas', 'tags']} fixedWidth />
                  </div>
                  <div className={styles.text}>
                    <Link key={blog.category.categoriesId} to={'/category/' + blog.category.categoriesId}>
                      <a>{blog.category.name}</a>
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
                        <Link key={tag.tagsId} to={'/tag/' + tag.tagsId}>
                          <a>{tag.name}</a>
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
          <Gallery blogGalleries={blog.galleries} />
        </div>
      </div>
      {
        // Disqus
      }
      <div className={styles.disqus}>
        <Disqus blog={blog} />
      </div>
      {
        // 前後の記事へ移動
      }
      <div className={styles.navi}>
        {prevArticle == null ? (
          <>
            <span className={styles.icon}></span>
            <span className={styles.nocard}></span>
          </>
        ) : (
          <>
            <span className={styles.icon}>
              <Link key={prevArticle.id} to={'/'}>
                <FontAwesomeIcon icon={['fas', 'arrow-alt-circle-left']} alt={'前の記事へ'} />
              </Link>
            </span>
            <Link key={prevArticle.id} to={'/'}>
              <span className={styles.card}>
                <>
                  <span className={styles.image}>
                    <img src={prevArticle.image ? prevArticle.image.url + THUMB_IMG_OPT_PREV_NEXT + (prevArticle.image_parm && '&' + prevArticle.image_parm) : '/noimage-large.png'} alt={prevArticle.title} />
                  </span>
                  <span className={styles.title}>
                    <h3>{prevArticle.title}</h3>
                  </span>
                </>
              </span>
            </Link>
          </>
        )}
        {nextArticle == null ? (
          <>
            <span className={styles.icon}></span>
            <span className={styles.nocard}></span>
          </>
        ) : (
          <>
            <Link key={nextArticle.id} to={'/'}>
              <span className={styles.card}>
                <>
                  <span className={styles.image}>
                    <img src={nextArticle.image ? nextArticle.image.url + THUMB_IMG_OPT_PREV_NEXT + (nextArticle.image_parm && '&' + nextArticle.image_parm) : '/noimage-large.png'} alt={nextArticle.title} />
                  </span>
                  <span className={styles.title}>
                    <h3>{nextArticle.title}</h3>
                  </span>
                </>
              </span>
            </Link>
            <span className={styles.icon}>
              <Link key={nextArticle.id} to={'/'}>
                <FontAwesomeIcon icon={['fas', 'arrow-alt-circle-right']} alt={'次の記事へ'} />
              </Link>
            </span>
          </>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    microcmsBlog {
      blogId
      title
      datetime
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
    allMicrocmsBlog(limit: 1024) {
      nodes {
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
`

export default post
