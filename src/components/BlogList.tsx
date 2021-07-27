// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// 定数
import { THUMB_IMG_OPT_LIST } from './Constant'

// スタイルシート
import styles from '../styles/BlogList.module.scss'

export default function BlogList(props) {
  // リストタイトル
  let listTitle
  switch (props.pageContext.list) {
    case 'archive':
      listTitle = 'アーカイブ：' + props.pageContext.name
      break
    case 'category':
      listTitle = 'カテゴリー：' + props.pageContext.name
      break
    case 'tag':
      listTitle = 'タグ：' + props.pageContext.name
      break
    default:
      listTitle = ''
      break
  }
  // 出力
  return (
    <>
      {listTitle && (
        <div className={styles.list_title}>
          <h2>{listTitle}</h2>
        </div>
      )}
      <div className={styles.wrapper}>
        {props.data.allMicrocmsBlog.edges.map(blog => {
          const image = blog.node.image && getImage(blog.node.image.url)
          return (
            <Link key={blog.node.blogId} to={'/blog/post/' + blog.node.blogId}>
              <div className={styles.grid}>
                <GatsbyImage className={styles.image} image={image} alt={blog.node.title} loading={'lazy'} layout={'fixed'} width={blog.node.image.width} height={blog.node.image.height} formats={'webp'} quality={'25'} />
                <div className={styles.title}>
                  <h3>{blog.node.title && blog.node.title}</h3>
                </div>
                <div className={styles.category}>
                  <p>{blog.node.category && blog.node.category.name}</p>
                </div>
                <div className={styles.date}>
                  <p>{blog.node.datetime && blog.node.datetime}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}
