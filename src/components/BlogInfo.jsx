// React
import React from 'react'
import { Img } from 'react-image'

// Gatsby
import { Link } from 'gatsby'

// Material-UI
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

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
import { THUMB_IMG_OPT_DETAIL, THUMB_IMG_OPT_BLUR } from './Constant'

// 記事詳細
const BlogInfo = ({ data }) => {
  // 記事詳細
  const blog = data.microcmsBlog
  // 画像URL生成
  const src = blog.image.url + THUMB_IMG_OPT_DETAIL + (blog.image_parm != 'null' && '&' + blog.image_parm)
  const imgLoader = () => {
    return <img src={blog.image.url + THUMB_IMG_OPT_DETAIL + THUMB_IMG_OPT_BLUR + (blog.image_parm != 'null' && '&' + blog.image_parm)} alt={blog.node.title} width={960} height={960} />
  }
  // リターン
  return (
    <Grid container className={styles.info} key={'Info'} spacing={0}>
      <Grid item className={styles.title} xs={12}>
        <h1>{blog.title}</h1>
      </Grid>
      <Grid item className={styles.wrapper} xs={12}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            <Img className={styles.image} src={src} alt={blog.title} width={960} height={960} loader={imgLoader} />
          </Grid>
          <Grid item className={styles.wrapper} xs={12} md={6}>
            <Grid item className={styles.box} key={'BoxDate'} xs={12}>
              <Icon className={styles.icon} path={mdiCalendarToday} size={3} title={'日付'} />
              <Box className={styles.text}>
                <Link key={moment(blog.datetime).format('YYYYMM')} to={'/archive/' + moment(blog.datetime).format('YYYYMM')}>
                  {moment(blog.datetime).format('YYYY年MM月DD日')}
                </Link>
              </Box>
            </Grid>
            <Grid item className={styles.box} key={'BoxCategory'} xs={12}>
              <Icon className={styles.icon} path={mdiShape} size={3} title={'カテゴリー'} />
              <Box className={styles.text}>
                <Link key={blog.category.categoriesId} to={'/category/' + blog.category.id}>
                  {blog.category.name}
                </Link>
              </Box>
            </Grid>
            <Grid item className={styles.box} key={'BoxTags'} xs={12}>
              <Icon className={styles.icon} path={mdiTag} size={3} title={'タグ'} />
              <Box className={styles.text}>
                {blog.tags.map(tag => {
                  return (
                    <Link key={tag.tagsId} to={'/tag/' + tag.id}>
                      {tag.name}
                    </Link>
                  )
                })}
              </Box>
            </Grid>
            <Grid item className={styles.box} key={'BoxShare'} xs={12}>
              <Icon className={styles.icon} path={mdiShareVariant} size={3} title={'シェア'} />
              <Box className={styles.text}>
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
