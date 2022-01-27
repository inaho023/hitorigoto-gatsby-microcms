// React
import React from 'react'

// 自作コンポーネント
import Layout from './Layout'
import BlogInfo from './BlogInfo'
import BlogBody from './BlogBody'
import BlogNavi from './BlogNavi'
import Gallery from './Gallery'
import Comment from './Comment'

// 定数
import { THUMB_IMG_OPT_OGP } from './Constant'

// ブログリスト
const BlogPost = ({ data, pageContext }) => {
  // 記事詳細
  const blog = data.microcmsBlog
  // OGP設定
  const ogp = {
    type: 'article',
    url: '/post/' + (blog.blogId ? blog.blogId : blog.id) + '/',
    title: blog.title,
    description: blog.body,
    image: blog.image && blog.image.url + THUMB_IMG_OPT_OGP
  }
  // ページ情報設定
  const misc = { position: blog.title, ogp: ogp }
  // リターン
  return (
    <Layout misc={misc} pageContext={pageContext}>
      {
        // 記事情報
      }
      <BlogInfo data={data} />
      {
        // ボディ
      }
      <BlogBody body={blog.body} />
      {
        // ギャラリー
      }
      <Gallery galleries={blog.galleries} />
      {
        // コメント欄
      }
      <Comment pageContext={pageContext} />
      {
        // 前後の記事へ移動
      }
      <BlogNavi pageContext={pageContext} />
    </Layout>
  )
}

export default BlogPost
