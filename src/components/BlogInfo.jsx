// React
import React from 'react'

// Gatsby
import { Link } from 'gatsby'

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
import { imgixWatermark } from './Util'

// スタイルシート
import * as styles from '../styles/BlogInfo.module.scss'

// 定数
import { imgixImageOption } from './Constant'

// 記事詳細
const BlogInfo = ({ blog }) => {
  // ウォーターマークURL取得
  const imageWatermark = imgixWatermark()
  // 画像URL生成
  const src = blog.image.url + imgixImageOption.detail.m + imageWatermark.m
  const srcSet =
    `${blog.image.url}${imgixImageOption.detail.xs}${imageWatermark.xs} 320w,` +
    `${blog.image.url}${imgixImageOption.detail.s}${imageWatermark.s} 480w,` +
    `${blog.image.url}${imgixImageOption.detail.m}${imageWatermark.m} 640w,` +
    `${blog.image.url}${imgixImageOption.detail.l}${imageWatermark.l} 800w,` +
    `${blog.image.url}${imgixImageOption.detail.xl}${imageWatermark.xl} 960w`
  const sizes = '(max-width:900px) 100vw, 50vw'
  // リターン
  return (
    <Grid container className={styles.info} key={'Info'} spacing={0}>
      <Grid item className={styles.title} xs={12}>
        <h1>{blog.title}</h1>
      </Grid>
      <Grid item className={styles.wrapper} xs={12}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <img className={styles.image} srcSet={srcSet} sizes={sizes} src={src} alt={blog.title} />
          </Grid>
          <Grid item className={styles.wrapper} xs={12} md={6}>
            <Grid item className={styles.box} key={'BoxDate'} xs={12}>
              <Icon className={styles.icon} path={mdiCalendarToday} size={3} title={'日付'} />
              <Box>
                <Link key={dayjs(blog.datetime).format('YYYYMM')} to={`/archive/${dayjs(blog.datetime).format('YYYYMM')}/`}>
                  <Button className={styles.button}>{dayjs(blog.datetime).format('YYYY年MM月DD日')}</Button>
                </Link>
              </Box>
            </Grid>
            <Grid item className={styles.box} key={'BoxCategory'} xs={12}>
              <Icon className={styles.icon} path={mdiShape} size={3} title={'カテゴリー'} />
              <Box>
                <Link key={blog.category.categoriesId} to={`/category/${blog.category.id}/`}>
                  <Button className={styles.button}>{blog.category.name}</Button>
                </Link>
              </Box>
            </Grid>
            <Grid item className={styles.box} key={'BoxTags'} xs={12}>
              <Icon className={styles.icon} path={mdiTag} size={3} title={'タグ'} />
              <Box>
                {blog.tags.map(tag => {
                  return (
                    <Link key={tag.id} to={`/tag/${tag.id}/`}>
                      <Button className={styles.button}>{tag.name}</Button>
                    </Link>
                  )
                })}
              </Box>
            </Grid>
            <Grid item className={styles.box} key={'BoxShare'} xs={12}>
              <Icon className={styles.icon} path={mdiShareVariant} size={3} title={'シェア'} />
              <Box>
                <ShareButton blog={blog} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default BlogInfo
