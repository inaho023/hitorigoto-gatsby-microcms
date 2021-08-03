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
  query indexCategoryQuery($limit: Int!, $skip: Int!, $id: String!) {
    allMicrocmsBlog(limit: $limit, skip: $skip, sort: { fields: datetime, order: DESC }, filter: { category: { id: { eq: $id } } }) {
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
  const sitePosition = 'カテゴリー：' + pageContext.name
  // リターン
  return (
    <Layout sitePosition={sitePosition}>
      <BlogList title={sitePosition} blog={data.allMicrocmsBlog.edges} />
      <Pager pageContext={pageContext} />
    </Layout>
  )
}

export default blogIndex
