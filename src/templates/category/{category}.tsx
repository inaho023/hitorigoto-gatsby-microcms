// React
import * as React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// 自作モジュール
import Layout from '../../components/Layout'
import BlogList from '../../components/BlogList'
import Pager from '../../components/Pager'

// 定数
import { SITE_TITLE, SITE_SUB_TITLE } from '../../components/Constant'

// 記事詳細
export default function category() {
  const sitePosition = category.name
  const siteDescription = SITE_TITLE + ' ' + SITE_SUB_TITLE + ' ' + category.name // サイト概要
  return (
    <Layout sitePosition={sitePosition} siteDescription={siteDescription}>
      <BlogList title={`カテゴリー：${category.name}`} blog={blog.contents} />
      <Pager pathBase={`/blog/category/${category.id}/`} pathName={`/blog/category/${category.id}'/[page]'`} offset={blog.offset} total={blog.totalCount} />
    </Layout>
  )
}
