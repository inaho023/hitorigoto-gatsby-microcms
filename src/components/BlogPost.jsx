// React
import React from 'react'

// Material-UI
import Paper from '@mui/material/Paper'

// 自作コンポーネント
import Layout from './Layout'
import BlogInfo from './BlogInfo'
import BlogNavi from './BlogNavi'
import Gallery from './Gallery'
import Comment from './Comment'

// スタイルシート
import * as styles from '../styles/BlogPost.module.scss'

// 定数
import { THUMB_IMG_OPT_OGP_IMAGE } from './Constant'

// ブログリスト
const BlogPost = ({ data, pageContext }) => {
  // 記事詳細
  const blog = data.microcmsBlog
  // OGP設定
  const ogp = {
    type: 'article',
    url: '/post/' + (blog.blogId ? blog.blogId : blog.id),
    title: blog.title,
    description: blog.body,
    image: blog.image && blog.image.url + THUMB_IMG_OPT_OGP_IMAGE + (blog.image_parm != 'null' && '&' + blog.image_parm)
  }
  // リターン
  return (
    <Layout sitePosition={blog.title} ogp={ogp} pageContext={pageContext}>
      {
        // 記事情報
      }
      <BlogInfo data={data} />
      {
        // ボディ
      }
      <Paper className={styles.post} key={'Post'} dangerouslySetInnerHTML={{ __html: blog.body }} />
      {
        // ギャラリー
      }
      <Gallery galleries={blog.galleries} />
      {
        // コメント欄
      }
      <Comment blog={blog} />
      {
        // 前後の記事へ移動
      }
      <BlogNavi blog={blog} />
    </Layout>
  )
}

export default BlogPost
