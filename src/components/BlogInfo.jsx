// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// Material-UI
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// Material Design Icons
import Icon from '@mdi/react'
import { mdiCalendarToday, mdiShape, mdiTag, mdiShareVariant } from '@mdi/js'

// その他モジュール
import dayjs from 'dayjs'

// 自作コンポーネント
import ShareButton from './ShareButton'

// スタイルシート
import * as styles from '../styles/BlogInfo.module.scss'

// ブログ記事情報コンポーネント
const BlogInfo = ({ blog }) => {
  // リターン
  return (
    <Grid container className={styles.info} key={'Info'} spacing={0}>
      <Grid className={styles.title} size={12}>
        <h1>{blog.title && blog.title}</h1>
      </Grid>
      <Grid className={styles.wrapper} size={12}>
        <Grid container spacing={0}>
          <Grid
            size={{
              xs: 12,
              md: 6
            }}>
            <GatsbyImage className={styles.image} image={getImage(blog.image.imgixImage)} alt={blog.title} />
          </Grid>
          <Grid
            className={styles.wrapper}
            size={{
              xs: 12,
              md: 6
            }}>
            <Grid className={styles.box} key={'BoxDate'} size={12}>
              <Icon className={styles.icon} path={mdiCalendarToday} size={3} title={'日付'} />
              <Box>
                <Link key={dayjs(blog.datetime).format('YYYYMM')} to={`/archive/${dayjs(blog.datetime).format('YYYYMM')}/`}>
                  <Button className={styles.buttonLarge}>{dayjs(blog.datetime).format('YYYY年MM月DD日')}</Button>
                </Link>
              </Box>
            </Grid>
            <Grid className={styles.box} key={'BoxCategory'} size={12}>
              <Icon className={styles.icon} path={mdiShape} size={3} title={'カテゴリー'} />
              <Box>
                <Link key={blog.category.categoriesId} to={`/category/${blog.category.id}/`}>
                  <Button className={styles.buttonLarge}>{blog.category.name}</Button>
                </Link>
              </Box>
            </Grid>
            <Grid className={styles.box} key={'BoxTags'} size={12}>
              <Icon className={styles.icon} path={mdiTag} size={3} title={'タグ'} />
              <Box>
                {blog.tags.map(tag => {
                  return (
                    <Link key={tag.id} to={`/tag/${tag.id}/`}>
                      <Button className={styles.buttonSmall}>{tag.name}</Button>
                    </Link>
                  )
                })}
              </Box>
            </Grid>
            <Grid className={styles.box} key={'BoxShare'} size={12}>
              <Icon className={styles.icon} path={mdiShareVariant} size={3} title={'シェア'} />
              <Box>
                <ShareButton blog={blog} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default BlogInfo
