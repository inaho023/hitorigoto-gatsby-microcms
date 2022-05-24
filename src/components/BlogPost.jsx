// React
import React from 'react'

// Iframely
import Iframely from './Iframely'

// 自作コンポーネント
import Layout from './Layout'
import BlogInfo from './BlogInfo'
import BlogBody from './BlogBody'
import BlogNavi from './BlogNavi'
import Gallery from './Gallery'
import Comment from './Comment'

// 自作ライブラリー
import { imgixWatermark } from '../libs/Util'
import { imgixImageOption } from '../libs/Constant'

// ブログリスト
const BlogPost = ({ data, pageContext }) => {
  // 記事詳細
  const blog = data.microcmsBlog
  // ウォーターマーク取得
  const imageWatermark = imgixWatermark()
  // OGP設定
  const ogpInfo = {
    type: 'article',
    url: '/post/' + (blog.blogId ? blog.blogId : blog.id) + '/',
    title: blog.title,
    description: blog.body,
    image: blog.image && blog.image.url + imgixImageOption.ogp + imageWatermark.l
  }
  // ページ情報設定
  const misc = { position: blog.title, crumbLabel: blog.title, ogpInfo: ogpInfo }
  // リターン
  return (
    <Layout misc={misc} pageContext={pageContext}>
      {
        // Iframely
      }
      <Iframely />
      {
        // 記事情報
      }
      <BlogInfo blog={blog} />
      {
        // ボディ
      }
      <BlogBody blog={blog} />
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
      <BlogNavi pageContext={pageContext} />
    </Layout>
  )
}

export default BlogPost
