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
const blogIndex = ({ data, pageContext }) => {
  // ポジション
  const sitePosition = ''
  // OGP設定
  const ogp = {
    type: 'website',
    title: sitePosition,
    image: ''
  }
  // リターン
  return (
    <Layout sitePosition={sitePosition} ogp={ogp}>
      <BlogList title={sitePosition} blog={data.allMicrocmsBlog.edges} />
      <Pager pageContext={pageContext} />
    </Layout>
  )
}

export default blogIndex
