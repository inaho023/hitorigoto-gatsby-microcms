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
import { CardActionArea } from '@mui/material'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiCalendarToday, mdiShape } from '@mdi/js'

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
      <Grid container spacing={1} justifyContent={'center'} alignItems={'center'}>
        {blog.map(blog => {
          // 画像URL生成
          const image = blog.node.image.url + THUMB_IMG_OPT_LIST + (blog.node.image_parm && '&' + blog.node.image_parm)
          // リターン
          return (
            <Grid key={blog.node.blogId} item xs={12} sm={6} ms={6} lg={4} xl={3}>
              <Link key={blog.node.blogId} to={'/post/' + blog.node.blogId}>
                <Card className={styles.card} title={blog.node.title}>
                  <CardActionArea>
                    <CardMedia component={'img'} height={250} image={image} title={blog.node.title} />
                    <CardContent className={styles.content}>
                      <Grid container spacing={1} justifyContent={'center'}>
                        <Grid item xs={12}>
                          <Box className={styles.title}>
                            <h3>{blog.node.title && blog.node.title}</h3>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box className={styles.box}>
                            <span className={styles.icon}>
                              <Icon path={mdiCalendarToday} size={1} title={'日付'} />
                            </span>
                            <span className={styles.text}>{blog.node.datetime && blog.node.datetime}</span>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box className={styles.box}>
                            <span className={styles.icon}>
                              <Icon path={mdiShape} size={1} title={'カテゴリー'} />
                            </span>
                            <span className={styles.text}>{blog.node.category && blog.node.category.name}</span>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </CardActionArea>
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
