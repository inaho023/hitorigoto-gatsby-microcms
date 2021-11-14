// React
import React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// 自作モジュール
import BlogList from '../components/BlogList'

// ページクエリー
export const pageQuery = graphql`
  query blogIndexQuery($limit: Int!, $skip: Int!) {
    allMicrocmsBlog(limit: $limit, skip: $skip, sort: { fields: datetime, order: DESC }) {
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
const PageTemplate = ({ data, pageContext }) => {
  // リターン
  return <BlogList data={data} pageContext={pageContext} />
}

export default PageTemplate
