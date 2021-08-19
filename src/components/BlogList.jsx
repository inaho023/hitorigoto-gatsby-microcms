// React
import React from 'react'
import { Img } from 'react-image'

// Gatsby
import { Link } from 'gatsby'

// Material-UI
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

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
        <div className={styles.list_title}>
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
            <Grid key={blog.node.blogId} item xs={12} sm={6} md={4} lg={3}>
              <Link key={blog.node.blogId} to={'/post/' + blog.node.blogId}>
                <Paper className={styles.paper}>
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
                </Paper>
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}

export default BlogList
