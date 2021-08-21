// React
import React from 'react'
import { Img } from 'react-image'

// Gatsby
import { Link } from 'gatsby'

// Material-UI
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

// スタイルシート
import * as styles from '../styles/BlogList.module.scss'

// 定数
import { THUMB_IMG_OPT_LIST, THUMB_IMG_OPT_BLUR } from './Constant'

// ブログリスト
const BlogList = ({ title, blog }) => {
  // リターン
  return (
    <div className={styles.wrapper}>
      {title && (
        <div className={styles.list}>
          <h2>{title}</h2>
        </div>
      )}
      <Grid container spacing={1}>
        {blog.map(blog => {
          // 画像生成
          const image = []
          image[0] = blog.node.image.url + THUMB_IMG_OPT_LIST + (blog.node.image_parm && '&' + blog.node.image_parm) + THUMB_IMG_OPT_BLUR
          image[1] = blog.node.image.url + THUMB_IMG_OPT_LIST + (blog.node.image_parm && '&' + blog.node.image_parm)
          const imgLoad = () => <img className={styles.image} src={image[0]} />
          // リターン
          return (
            <Grid key={blog.node.blogId} item xs={12} md={6} lg={4} xl={3}>
              <Link key={blog.node.blogId} to={'/post/' + blog.node.blogId}>
                <Card className={styles.card}>
                  <div className={styles.image}>
                    <Img key={blog.node.blogId} src={image[1]} alt={blog.node.title} width={200} height={200} loader={<imgLoad />} />
                  </div>
                  <div className={styles.title}>
                    <h3>{blog.node.title && blog.node.title}</h3>
                  </div>
                  <div className={styles.category}>
                    <p>{blog.node.category && blog.node.category.name}</p>
                  </div>
                  <div className={styles.date}>
                    <p>{blog.node.datetime && blog.node.datetime}</p>
                  </div>
                </Card>
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default BlogList
