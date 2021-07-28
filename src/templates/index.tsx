// React
import * as React from 'react'

// Gatsby
import { useStaticQuery, graphql } from 'gatsby'

// 自作モジュール
import Layout from '../components/Layout'
import BlogList from '../components/BlogList'
import Pager from '../components/Pager'

// インデックスページ
const blogIndex = (props: { pageContext: { list: any; name: string } }) => {
  // ポジション
  let sitePosition = ''
  var ql
  switch (props.pageContext.list) {
    // すべて
    case 'all':
      sitePosition = ''
      ql = graphql`
        query listAllQuery {
          allMicrocmsBlog(limit: 1000, sort: { fields: datetime, order: DESC }) {
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
      break
    // アーカイブ
    case 'archive':
      sitePosition = 'アーカイブ：' + props.pageContext.name
      ql = graphql`
        query listArchiveQuery {
          allMicrocmsBlog(limit: 1000, sort: { fields: datetime, order: DESC }) {
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
      break
    // カテゴリー
    case 'category':
      sitePosition = 'カテゴリー：' + props.pageContext.name
      ql = graphql`
        query listCategoryQuery {
          allMicrocmsBlog(limit: 1000, sort: { fields: datetime, order: DESC }) {
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
      break
    // タグ
    case 'tag':
      sitePosition = 'タグ：' + props.pageContext.name
      ql = graphql`
        query listTagQuery {
          allMicrocmsBlog(limit: 1000, sort: { fields: datetime, order: DESC }) {
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
      break
  }
  // クエリー実行
  const { data } = useStaticQuery(ql)
  console.log(data)
  // リターン
  return (
    <Layout sitePosition={sitePosition}>
      <BlogList title={sitePosition} blog={data.allMicrocmsBlog.nodes} />
      <Pager props={data.allMicrocmsBlog.nodes} />
    </Layout>
  )
}

export default blogIndex
