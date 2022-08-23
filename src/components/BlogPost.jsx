// React
import React from 'react'

// 自作コンポーネント
import Layout from './Layout'
import BlogInfo from './BlogInfo'
import BlogBody from './BlogBody'
import BlogNavi from './BlogNavi'
import PhotoGallery from './PhotoGallery'
import Comment from './Comment'

// ブログリスト
const BlogPost = ({ data, pageContext }) => {
  // 記事詳細
  const blog = data.microcmsBlog
  // リターン
  return (
    <Layout pageContext={pageContext}>
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
      <PhotoGallery galleries={blog.galleries} />
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
