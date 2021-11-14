// React
import React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// 自作モジュール
import BlogList from '../../components/BlogList'

// ページクエリー
export const pageQuery = graphql`
  query tagIndexQuery($limit: Int!, $skip: Int!, $id: String!) {
    allMicrocmsBlog(limit: $limit, skip: $skip, sort: { fields: datetime, order: DESC }, filter: { tags: { elemMatch: { id: { eq: $id } } } }) {
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
