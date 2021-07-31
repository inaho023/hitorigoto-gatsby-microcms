// React
import React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// 自作モジュール
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'
import Pager from '../components/Pager'

// ページクエリー
export const pageQuery = graphql`
  query blogIndexQuery($limit: Int!, $skip: Int!) {
    allMicrocmsBlog(limit: $limit, skip: $skip) {
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
const blogIndex = ({ data, pageContext, location }) => {
  // ポジション
  const sitePosition = ''
  // リターン
  return (
    <Layout sitePosition={sitePosition}>
      <BlogList title={sitePosition} blog={data.allMicrocmsBlog.edges} />
      <Pager pageContext={pageContext} location={location} />
    </Layout>
  )
}

export default blogIndex
