// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// スタイルシート
import styles from '../styles/BlogList.module.scss'

const BlogList = props => {
  // リストタイトル
  const listTitle = props.title
  // リターン
  return (
    <>
      {listTitle && (
        <div className={styles.list_title}>
          <h2>{listTitle}</h2>
        </div>
      )}
      <div className={styles.wrapper}>
        {props.blog.map(blog => {
          const image = blog.node.image && getImage(blog.node.image.url)
          return (
            <Link key={blog.node.blogId} to={'/blog/post/' + blog.node.blogId}>
              <div className={styles.grid}>
                <GatsbyImage className={styles.image} image={image} alt={blog.node.title} loading={'lazy'} />
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

export default BlogList
