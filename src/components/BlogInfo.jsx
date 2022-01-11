// React
import React from 'react'
import { Img } from 'react-image'

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
import { Base64 } from 'js-base64'

// 自作コンポーネント
import ShareButton from './ShareButton'

// スタイルシート
import * as styles from '../styles/BlogInfo.module.scss'

// 定数
import { THUMB_IMG_OPT_DETAIL, THUMB_IMG_OPT_BLUR, IMGIX_COPYRIGHT_TEXT, IMGIX_COPYRIGHT_OPT_LARGE } from './Constant'

// 記事詳細
const BlogInfo = ({ data }) => {
  // 記事詳細
  const blog = data.microcmsBlog
  // コピーライトテキスト生成
  const b64Text = Base64.encodeURI(IMGIX_COPYRIGHT_TEXT)
  const paramText = IMGIX_COPYRIGHT_OPT_LARGE + '&txt64=' + b64Text
  // 画像URL生成
  const src = blog.image.url + THUMB_IMG_OPT_DETAIL + paramText + (blog.image_parm != 'null' && '&' + blog.image_parm)
  const imgLoader = () => {
    return <img src={blog.image.url + THUMB_IMG_OPT_DETAIL + paramText + THUMB_IMG_OPT_BLUR + (blog.image_parm != 'null' && '&' + blog.image_parm)} alt={blog.node.title} width={960} height={960} />
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
                    <Link key={tag.tagsId} to={'/tag/' + tag.id + '/'}>
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
