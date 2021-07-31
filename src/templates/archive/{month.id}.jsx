// React
import React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// 自作モジュール
import Layout from '../../components/Layout'
import BlogList from '../../components/BlogList'
import Pager from '../../components/Pager'

// ページクエリー
export const pageQuery = graphql`
  query blogArchiveQuery($limit: Int = 1000, $skip: Int = 10, $from: Date!, $to: Date!) {
    allMicrocmsBlog(limit: $limit, skip: $skip, filter: { datetime: { gte: $from, lt: $to } }) {
      edges {
        node {
          blogId
          title
          datetime(formatString: "YYYY.MM.DD")
          category {
            name
          }
          image {
            url
            width
            height
          }
          image_parm
        }
      }
    }
  }
`

// インデックスページ
const blogIndex = ({ data, pageContext }) => {
  // ポジション
  const sitePosition = 'アーカイブ：' + pageContext.name
  // リターン
  return (
    <Layout sitePosition={sitePosition}>
      <BlogList title={sitePosition} blog={data.allMicrocmsBlog.edges} />
      <Pager pageContext={pageContext} />
    </Layout>
  )
}

export default blogIndex
