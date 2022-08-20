// React
import React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// 自作モジュール
import SEO from '../../components/SEO'
import BlogList from '../../components/BlogList'

// ページクエリー
export const pageQuery = graphql`
  query archiveIndexQuery($limit: Int!, $skip: Int!, $from: Date!, $to: Date!) {
    allMicrocmsBlog(
      limit: $limit
      skip: $skip
      sort: { fields: datetime, order: DESC }
      filter: { datetime: { gte: $from, lt: $to } }
    ) {
      edges {
        node {
          blogId
          title
          datetime(formatString: "YYYY.MM.DD")
          category {
            id
            name
          }
          image {
            url
            width
            height
          }
        }
      }
    }
  }
`

// ヘッダー
export const Head = ({ location, pageContext }) => {
  return <SEO location={location} pageContext={pageContext} />
}

// ページテンプレート
const PageTemplate = ({ data, pageContext }) => {
  // リターン
  return <BlogList data={data} pageContext={pageContext} />
}

export default PageTemplate
