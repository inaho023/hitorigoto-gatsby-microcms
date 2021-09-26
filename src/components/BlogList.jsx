// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'

// Material-UI
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

// スタイルシート
import * as styles from '../styles/BlogList.module.scss'

// 定数
import { THUMB_IMG_OPT_LIST } from './Constant'

// ブログリスト
const BlogList = ({ title, blog }) => {
  // リターン
  return (
    <Box>
      {title && <h2 className={styles.list}>{title}</h2>}
      <Grid container spacing={1}>
        {blog.map(blog => {
          // リターン
          return (
            <Grid key={blog.node.blogId} item xs={12} md={6} lg={4} xl={3}>
              <Link key={blog.node.blogId} to={'/post/' + blog.node.blogId}>
                <Card className={styles.card}>
                  <CardMedia key={blog.node.blogId} className={styles.image} component={'img'} image={blog.node.image.url + THUMB_IMG_OPT_LIST + (blog.node.image_parm && '&' + blog.node.image_parm)} alt={blog.node.title} width={200} height={200} />
                  <CardContent className={styles.content}>
                    <p className={styles.title}>{blog.node.title && blog.node.title}</p>
                    <Box className={styles.box}>
                      <p className={styles.date}>{blog.node.datetime && blog.node.datetime}</p>
                      <p className={styles.category}>{blog.node.category && blog.node.category.name}</p>
                    </Box>
                  </CardContent>
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
