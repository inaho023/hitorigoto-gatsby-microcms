// React
import * as React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// 自作モジュール
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'
import Pager from '../components/Pager'

// インデックスページ
const blogIndex = props => {
  // ポジション
  let sitePosition = ''
  switch (props.pageContext.list) {
    // すべて
    case 'all':
      sitePosition = ''
      break
    // アーカイブ
    case 'archive':
      sitePosition = 'アーカイブ：' + props.pageContext.name
      break
    // カテゴリー
    case 'category':
      sitePosition = 'カテゴリー：' + props.pageContext.name
      break
    // タグ
    case 'tag':
      sitePosition = 'タグ：' + props.pageContext.name
      break
    default:
      sitePosition = ''
      break
  }
  //
  return (
    <Layout sitePosition={sitePosition}>
      <BlogList title={sitePosition} blog={props.data.allMicrocmsBlog.edges} />
      <Pager props={props} />
    </Layout>
  )
}

export default blogIndex
