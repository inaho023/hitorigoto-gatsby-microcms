// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

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

// 自作コンポーネント
import Layout from './Layout'
import Minibar from './Minibar'
import Pager from './Pager'

// スタイルシート
import * as styles from '../styles/BlogList.module.scss'

// ブログ記事リストコンポーネント
const BlogList = ({ data, pageContext }) => {
  // 定数定義
  const blog = data.allMicrocmsBlog.edges
  // リターン
  return (
    <Layout pageContext={pageContext}>
      <Minibar pageContext={pageContext} />
      <Grid container spacing={2} alignItems={'center'} justifyItems={'center'}>
        {blog.map(blog => {
          // リターン
          return (
            <Grid
              key={blog.node.blogId}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
                xl: 3
              }}
            >
              <Link key={blog.node.blogId} to={`/post/${blog.node.blogId}/`}>
                <Card className={styles.card} title={blog.node.title} elevation={4}>
                  <CardActionArea className={styles.area}>
                    <CardMedia className={styles.media}>
                      <GatsbyImage image={getImage(blog.node.image.imgixImage)} alt={blog.node.title} />
                      <Box className={styles.info}>
                        <Grid container spacing={1} alignItems={'center'} justifyContent={'space-around'}>
                          <Grid className={styles.box} size={6}>
                            <span className={styles.icon}>
                              <Icon path={mdiCalendarToday} size={1} />
                            </span>
                            <span className={styles.text}>
                              <p>{blog.node.datetime}</p>
                            </span>
                          </Grid>
                          <Grid className={styles.box} size={6}>
                            <span className={styles.icon}>
                              <Icon path={mdiShape} size={1} />
                            </span>
                            <span className={styles.text}>
                              <p>{blog.node.category.name}</p>
                            </span>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardMedia>
                    <CardContent className={styles.content}>
                      <Box className={styles.title}>
                        <h2>{blog.node.title}</h2>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          )
        })}
      </Grid>
      <Pager pageContext={pageContext} />
    </Layout>
  )
}

export default BlogList
