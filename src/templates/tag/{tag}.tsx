// React
import * as React from 'react'

// Gatsby
import { graphql } from 'gatsby'

// 自作モジュール
import Layout from '../../../components/Layout'
import BlogList from '../../../components/BlogList'
import Pager from '../../../components/Pager'

// 定数
import { SITE_TITLE, SITE_SUB_TITLE } from '../../../components/Constant'

// タグ記事リスト
export default function tag() {
  const sitePosition = tag.name
  const siteDescription = SITE_TITLE + ' ' + SITE_SUB_TITLE + ' ' + tag.name // サイト概要
  return (
    <Layout sitePosition={sitePosition} siteDescription={siteDescription}>
      <BlogList title={'タグ：' + tag.name} blog={blog.contents} />
      <Pager pathBase={'/blog/tag/' + tag.tagId + '/'} offset={blog.offset} total={blog.totalCount} />
    </Layout>
  )
}
