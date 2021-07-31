// React
import React from 'react'

// Gatsby
import { Link, graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// スタイルシート
import * as styles from '../styles/BlogList.module.scss'

// 定数
import { THUMB_IMG_OPT_LIST } from './Constant'

// ブログリスト
const BlogList = ({ title, blog }) => {
  const data = useStaticQuery(graphql`
    {
      allFile(filter: { relativePath: { eq: "noimage.png" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(width: 200, height: 200, quality: 25, formats: AUTO, placeholder: NONE)
            }
          }
        }
      }
    }
  `)
  // イメージ画像取得
  const image = data.allFile.edges.map(edge => getImage(edge.node.childImageSharp.gatsbyImageData))
  // リターン
  return (
    <div className={styles.wrapper}>
      {title && (
        <div className={styles.list_title}>
          <h2>{title}</h2>
        </div>
      )}
      {blog.map(blog => {
        return (
          <Link className={styles.grid} key={blog.node.blogId} to={'/post/' + blog.node.blogId}>
            {
              // 画像表示
              blog.node.image ? (
                <div className={styles.image}>
                  <img key={blog.node.id} src={blog.node.image.url + THUMB_IMG_OPT_LIST + (blog.node.image_parm && '&' + blog.node.image_parm)} alt={blog.node.title} />
                </div>
              ) : (
                <GatsbyImage ClassName={styles.image} image={image[0]} loading={'eager'} />
              )
            }
            <div className={styles.title}>
              <h3>{blog.node.title && blog.node.title}</h3>
            </div>
            <div className={styles.category}>
              <p>{blog.node.category && blog.node.category.name}</p>
            </div>
            <div className={styles.date}>
              <p>{blog.node.datetime && blog.node.datetime}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default BlogList
