// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'

// Material-UI
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

// スタイルシート
import * as styles from '../styles/BlogList.module.scss'

// 定数
import { THUMB_IMG_OPT_LIST } from './Constant'

// ブログリスト
const BlogList = ({ title, blog }) => {
  // リターン
  return (
    <Box className={styles.wrapper}>
      {title && (
        <Box className={styles.list}>
          <h2>{title}</h2>
        </Box>
      )}
      <Grid container spacing={1}>
        {blog.map(blog => {
          // リターン
          return (
            <Grid key={blog.node.blogId} item xs={12} md={6} lg={4} xl={3}>
              <Link key={blog.node.blogId} to={'/post/' + blog.node.blogId}>
                <Card className={styles.card}>
                  <Box className={styles.image}>
                    <img key={blog.node.blogId} src={blog.node.image.url + THUMB_IMG_OPT_LIST + (blog.node.image_parm && '&' + blog.node.image_parm)} alt={blog.node.title} width={200} height={200} />
                  </Box>
                  <Box className={styles.title}>
                    <h3>{blog.node.title && blog.node.title}</h3>
                  </Box>
                  <Box className={styles.category}>
                    <p>{blog.node.category && blog.node.category.name}</p>
                  </Box>
                  <Box className={styles.date}>
                    <p>{blog.node.datetime && blog.node.datetime}</p>
                  </Box>
                </Card>
              </Link>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default BlogList
