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
  query indexTagQuery($limit: Int!, $skip: Int!, $id: String!) {
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
const blogIndex = ({ data, pageContext }) => {
  // ポジション
  const sitePosition = 'タグ：' + pageContext.name
  // OGP設定
  const ogp = {
    type: 'website',
    url: pageContext.pageNumber == 0 ? '/' + pageContext.list + '/' + pageContext.id : '/' + pageContext.list + '/' + pageContext.id + '/' + pageContext.pageNumber,
    title: sitePosition,
    description: 'トップページ',
    image: ''
  }
  // リターン
  return (
    <Layout sitePosition={sitePosition} ogp={ogp} pageContext={pageContext}>
      <BlogList title={sitePosition} blog={data.allMicrocmsBlog.edges} />
      <Pager pageContext={pageContext} />
    </Layout>
  )
}

export default blogIndex
