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
  let ql
  switch (props.pageContext.list) {
    // すべて
    case 'all':
      sitePosition = ''
      ql = `
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
      ql = `
        query listArchiveQuery($from: Date = "${props.pageContext.from}", $to: Date = "${props.pageContext.to}") {
          allMicrocmsBlog(limit: 1000, sort: { fields: datetime, order: DESC }, filter: {datetime: {gte: $from, lt: $to}}
            ) {
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
      ql = `
        query listCategoryQuery($id: String = "${props.pageContext.id}") {
          allMicrocmsBlog(limit: 1000, sort: { fields: datetime, order: DESC },filter: {category: {id: {eq: $id}}}) {
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
      ql = `
        query listTagQuery($id: [String] = "") {
          allMicrocmsBlog(limit: 1000, sort: { fields: datetime, order: DESC }, filter: {tags: {elemMatch: {id: {in: $id}}}}) {
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
  const { data } = useStaticQuery(graphql(ql))
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
