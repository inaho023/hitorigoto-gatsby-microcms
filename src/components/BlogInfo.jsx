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
import moment from 'moment'

// 自作コンポーネント
import ShareButton from './ShareButton'

// スタイルシート
import * as styles from '../styles/BlogInfo.module.scss'

// 定数
import { imgixImageOption, imgixCopyright } from './Constant'

// 記事詳細
const BlogInfo = ({ blog }) => {
  // 画像URL生成
  const src = blog.image.url + imgixImageOption.detail.m + imgixCopyright.m
  let srcSet = ''
  srcSet = blog.image.url + imgixImageOption.detail.xs + imgixCopyright.xs + ' 320w'
  srcSet = srcSet + ',' + blog.image.url + imgixImageOption.detail.s + imgixCopyright.s + ' 480w'
  srcSet = srcSet + ',' + blog.image.url + imgixImageOption.detail.m + imgixCopyright.m + ' 640w'
  srcSet = srcSet + ',' + blog.image.url + imgixImageOption.detail.l + imgixCopyright.l + ' 800w'
  srcSet = srcSet + ',' + blog.image.url + imgixImageOption.detail.xl + imgixCopyright.xl + ' 960w'
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
            <img className={styles.image} src={src} srcSet={srcSet} sizes={sizes} alt={blog.title} />
          </Grid>
          <Grid item className={styles.wrapper} xs={12} md={6}>
            <Grid item className={styles.box} key={'BoxDate'} xs={12}>
              <Icon className={styles.icon} path={mdiCalendarToday} size={3} title={'日付'} />
              <Box>
                <Link key={moment(blog.datetime).format('YYYYMM')} to={'/archive/' + moment(blog.datetime).format('YYYYMM') + '/'}>
                  <Button className={styles.button}>{moment(blog.datetime).format('YYYY年MM月DD日')}</Button>
                </Link>
              </Box>
            </Grid>
            <Grid item className={styles.box} key={'BoxCategory'} xs={12}>
              <Icon className={styles.icon} path={mdiShape} size={3} title={'カテゴリー'} />
              <Box>
                <Link key={blog.category.categoriesId} to={'/category/' + blog.category.id + '/'}>
                  <Button className={styles.button}>{blog.category.name}</Button>
                </Link>
              </Box>
            </Grid>
            <Grid item className={styles.box} key={'BoxTags'} xs={12}>
              <Icon className={styles.icon} path={mdiTag} size={3} title={'タグ'} />
              <Box>
                {blog.tags.map(tag => {
                  return (
                    <Link key={tag.id} to={'/tag/' + tag.id + '/'}>
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
